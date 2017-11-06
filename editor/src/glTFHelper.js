import graphicHelper from '../../src/graphic/helper';
import GLTFLoader from 'qtek/src/loader/GLTF';
import Texture from 'qtek/src/Texture';

var TEXTURES = ['diffuseMap', 'normalMap', 'emissiveMap', 'metalnessMap', 'roughnessMap', 'specularMap', 'glossinessMap']

function prepareImageData(imgFiles, updateImgData) {
    return new Promise(function (resolve, reject) {
        Promise.all(imgFiles.map(function (imgFile) {
            var imgUrl = imgFile && URL.createObjectURL(imgFile);
            return new Promise(function (resolve, reject) {
                if (!imgUrl) {
                    resolve(null);
                }
                else {
                    var img = new Image();
                    img.src = imgUrl;
                    img.onload = function () { resolve(img); };
                }
            });
        })).then(function (imgs) {
            var firstImg = imgs.find(function (img) {
                return img != null;
            });
            if (!firstImg) {
                resolve(null);
            }

            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            var width = canvas.width = firstImg.width;
            var height = canvas.height = firstImg.height;

            var imageDataList = imgs.map(function (img) {
                if (img) {
                    ctx.drawImage(img, 0, 0, width, height);
                    return ctx.getImageData(0, 0, width, height).data;
                }
                return null;
            });
            resolve({
                canvas: canvas,
                imageDataList: imageDataList
            });
        });
    });
}

function mergeMetallicRoughness(metallicFile, roughnessFile, metallicFactor, roughnessFactor) {
    return new Promise(function (resolve, reject) {
        prepareImageData([metallicFile, roughnessFile])
            .then(function (result) {
                var canvas = result.canvas;
                var ctx = canvas.getContext('2d');
                var metallicImgData = result.imageDataList[0];
                var roughnessImgData = result.imageDataList[1];
                var finalImgData = ctx.createImageData(canvas.width, canvas.height);
                for (var i = 0; i < (metallicImgData || roughnessImgData).length; i += 4) {
                    var m = metallicFactor;
                    if (metallicImgData) {
                        // Metallic use B channel.
                        // TODO Specified channel ?
                        var m2 = metallicImgData[i + 2] / 255;
                        m = Math.min(Math.max(m2 + (m - 0.5) * 2, 0), 1);
                    }
                    var r = roughnessFactor;
                    if (roughnessImgData) {
                        // Roughness use G channel.
                        // TODO Specified channel ?
                        var r2 = roughnessImgData[i + 1] / 255;
                        r = Math.min(Math.max(r2 + (r - 0.5) * 2, 0), 1);
                    }
                    finalImgData.data[i] = finalImgData.data[i + 3] = 0;
                    finalImgData.data[i + 1] = Math.round(r * 255);
                    finalImgData.data[i + 2] = Math.round(m * 255);
                }
                ctx.putImageData(finalImgData, 0, 0);
    
                resolve(canvas);
            });
    });
}

function mergeSpecularGlossiness(specularFile, glossinessFile, specularFactor, glossinessFactor) {
    specularFactor = graphicHelper.parseColor(specularFactor).slice(0, 3);
    return new Promise(function (resolve, reject) {
        prepareImageData([specularFile, glossinessFile])
            .then(function (result) {
                var canvas = result.canvas;
                var ctx = canvas.getContext('2d');
                var specularImgData = result.imageDataList[0];
                var glossinessImgData = result.imageDataList[1];
                var finalImgData = ctx.createImageData(canvas.width, canvas.height);
                for (var i = 0; i < (specularImgData || glossinessImgData).length; i += 4) {
                    var spec = specularFactor.slice();
                    if (specularImgData) {
                        spec[0] *= specularImgData[i] / 255;
                        spec[1] *= specularImgData[i + 1] / 255;
                        spec[2] *= specularImgData[i + 2] / 255;
                    }
                    var g = glossinessFactor;
                    if (glossinessImgData) {
                        // Roughness use G channel.
                        // TODO Specified channel ?
                        var g2 = glossinessImgData[i + 3] / 255;
                        g = Math.min(Math.max(g2 + (g - 0.5) * 2, 0), 1);
                    }
                    for (var k = 0; k < 3; k++) {
                        finalImgData.data[i + k] = Math.round(spec[k] * 255);
                    }
                    finalImgData.data[i + 3] = Math.round(g * 255);
                }
                ctx.putImageData(finalImgData, 0, 0);
    
                resolve(canvas);
            });
    });
}

function writeTextures(glTF, sceneConfig) {
    var textureIndices = {};
    var currentIndex = 0;
    glTF.images = [];
    glTF.textures = [];
    glTF.samplers = [{
        minFilter: Texture.LINEAR_MIPMAP_LINEAR,
        magFilter: Texture.LINEAR,
        wrapS: Texture.REPEAT,
        wrapT: Texture.REPEAT
    }];
    sceneConfig.materials.forEach(function (matConfig, idx) {
        // metalnessMap is already merged with roughnessMap
        TEXTURES.forEach(function (texName) {
            if (matConfig[texName] && !textureIndices.hasOwnProperty(texName)) {
                glTF.images.push({
                    uri: matConfig[texName]
                });
                glTF.textures.push({
                    sampler: 0,
                    source: currentIndex
                });
                textureIndices[matConfig[texName]] = currentIndex++;
            }
        });
    });

    return textureIndices;
}

function getMetallicRoughnessMat(matConfig, textureIndices) {
    var metallicRoughness = {
        baseColorFactor: graphicHelper.parseColor(matConfig.color),
        metallicFactor: matConfig.metalness,
        roughnessFactor: matConfig.roughness
    };
    metallicRoughness.baseColorFactor[3] = matConfig.alpha;
    if (matConfig.diffuseMap) {
        metallicRoughness.baseColorTexture = {
            index: textureIndices[matConfig.diffuseMap],
            texCoord: 0
        };
    }
    if (matConfig.metalnessMap) {
        // metalnessMap is already merged with roughnessMap
        metallicRoughness.metallicRoughnessTexture = {
            index: textureIndices[matConfig.metalnessMap],
            texCoord: 0
        };
        metallicRoughness.metallicFactor = 1;
        metallicRoughness.roughnessFactor = 1;
    }

    return metallicRoughness;
}

function getSpecularGlossiness(matConfig, textureIndices) {
    var specularGlossiness = {
        diffuseFactor: graphicHelper.parseColor(matConfig.color),
        specularFactor: graphicHelper.parseColor(matConfig.specularColor).slice(0, 3),
        glossinessFactor: matConfig.glossiness
    };
    specularGlossiness.diffuseFactor[3] = matConfig.alpha;
    if (matConfig.specularMap) {
        // specularMap is already merged with glossinessMap
        specularGlossiness.specularGlossinessTexture = {
            index: textureIndices[matConfig.specularMap],
            texCoord: 0
        };
        specularGlossiness.specularFactor = [1, 1, 1];
        specularGlossiness.glossinessFactor = 1;
    }

    return specularGlossiness;
}

function updateGLTFMaterials(glTF, sceneConfig) {
    if (!glTF.materials) {
        return;
    }
    var textureIndices = writeTextures(glTF, sceneConfig);

    var primitivesMap = {};
    glTF.materials = [];
    glTF.nodes.forEach(function (nodeInfo, nodeIdx) {
        if (nodeInfo.mesh != null) {
            var meshInfo = glTF.meshes[nodeInfo.mesh];
            if (meshInfo.primitives.length === 1) {
                // Use node name instead of mesh name.
                // FIXME Hard coded
                primitivesMap[nodeInfo.name] = meshInfo.primitives[0];
            }
            else {
                meshInfo.primitives.forEach(function (primitive, idx) {
                    primitivesMap[GLTFLoader.generateMeshName(glTF.meshes, nodeInfo.mesh, idx)] = primitive;
                });
            }
        }
    });

    sceneConfig.materials.forEach(function (matConfig, idx) {
        var gltfMat = {
            name: matConfig.name,
            emissiveFactor: graphicHelper.parseColor(matConfig.emission).slice(0, 3).map(function (channel) {
                return channel * matConfig.emissionIntensity;
            })
            // TODO Alpha mode
            // TODO texture tiling.
        };
        if (matConfig.normalMap) {
            gltfMat.normalTexture = {
                texCoord: 0,
                scale: 1,
                index: textureIndices[matConfig.normalMap]
            };
        }
        if (matConfig.emissiveMap) {
            gltfMat.emissiveTexture = {
                texCoord: 0,
                index: textureIndices[matConfig.emissiveMap]
            };
        }

        if (matConfig.type === 'pbrMetallicRoughness') {
            gltfMat.pbrMetallicRoughness = getMetallicRoughnessMat(matConfig, textureIndices);
        }
        else {
            gltfMat.extensions = {
                'KHR_materials_pbrSpecularGlossiness': getSpecularGlossiness(matConfig, textureIndices)
            };
        }
        matConfig.targetMeshes.forEach(function (meshName) {
            primitivesMap[meshName].material = idx;
        });
        glTF.materials[idx] = gltfMat;
    });

    glTF.extras = glTF.extras || {};
    glTF.extras.qtekModelViewerConfig = sceneConfig;
    return glTF;
}

export { 
    updateGLTFMaterials,
    mergeMetallicRoughness,
    mergeSpecularGlossiness,
    TEXTURES
};