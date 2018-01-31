import graphicHelper from '../../src/graphic/helper';
import GLTFLoader from 'claygl/src/loader/GLTF';
import Texture from 'claygl/src/Texture';

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
    if (matConfig.diffuseMap) {
        specularGlossiness.diffuseTexture = {
            index: textureIndices[matConfig.diffuseMap],
            texCoord: 0
        };
    }
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
            }),
            alphaMode: matConfig.transparent ? 'BLEND' : 'OPAQUE'
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
    glTF.extras.clayViewerConfig = sceneConfig;
    return glTF;
}

function convertToBinary(glTF, binaryBuffers, imageBuffersMap) {

    function alignedLength(len) {
        return Math.ceil(len / 4) * 4;
    }

    var bufferOffset = 0;
    var bufferOffsets = [];
    var buffers = binaryBuffers.slice();
    glTF.buffers.forEach(function (buffer) {
        bufferOffsets.push(bufferOffset);
        bufferOffset += alignedLength(buffer.byteLength);
        delete buffer.uri;
    });

    glTF.bufferViews.forEach(function (bufferView) {
        if (bufferView.byteOffset == null) {
            bufferView.byteOffset = 0;
        }
        else {
            bufferView.byteOffset = bufferView.byteOffset + bufferOffsets[bufferView.buffer];
        }
    });

    (glTF.images || []).forEach(function (imageInfo, idx) {
        var uri = imageInfo.uri;
        var imageBuffer = imageBuffersMap[uri];
        delete imageInfo.uri;
        if (!imageBuffer) {
            return;
        }
        var bufferView = {
            buffer: 0,
            byteOffset: bufferOffset,
            byteLength: imageBuffer.byteLength
        };
        bufferOffsets.push(bufferOffset);
        bufferOffset += alignedLength(imageBuffer.byteLength);
        imageInfo.bufferView = glTF.bufferViews.length;
        imageInfo.mimeType = getMimeType(uri);
        glTF.bufferViews.push(bufferView);
        buffers.push(imageBuffer);
    });
    var binBufferSize = bufferOffset;
    glTF.buffers = [{
        byteLength: binBufferSize
    }];
    var enc = new TextEncoder();
    var jsonBuffer = enc.encode(JSON.stringify(glTF));
    var jsonAlignedLength = alignedLength(jsonBuffer.length);
    var padding;
    if (jsonAlignedLength !== jsonBuffer.length) {
        padding = jsonAlignedLength - jsonBuffer.length;
    }
    var totalSize = 12 + // file header: magic + version + length
        8 + // json chunk header: json length + type
        jsonAlignedLength +
        8 + // bin chunk header: chunk length + type
        binBufferSize;
    var outBuffer = new ArrayBuffer(totalSize);
    var dataView = new DataView(outBuffer);
    var bufIndex = 0;
    // Magic number
    dataView.setUint32(bufIndex, 0x46546C67, true);
    bufIndex += 4;
    // Version
    dataView.setUint32(bufIndex, 2, true);
    bufIndex += 4;
    dataView.setUint32(bufIndex, totalSize, true);
    bufIndex += 4;
    // JSON
    dataView.setUint32(bufIndex, jsonAlignedLength, true);
    bufIndex += 4;
    dataView.setUint32(bufIndex, 0x4E4F534A, true);
    bufIndex += 4;
    for (var j = 0; j< jsonBuffer.length; j++){
        dataView.setUint8(bufIndex++, jsonBuffer[j]);
    }
    if (padding != null) {
        for (var j = 0; j< padding;j++) {
            dataView.setUint8(bufIndex++, 0x20);
        }
    }
    // BIN
    dataView.setUint32(bufIndex, binBufferSize, true);
    bufIndex += 4;
    dataView.setUint32(bufIndex, 0x004E4942, true);
    bufIndex += 4;
    for (var i = 0; i < buffers.length; i++) {
        var bufoffset = bufIndex + bufferOffsets[i];
        var buf = new Uint8Array(buffers[i]);
        var thisbufindex = bufoffset;
        for (var j = 0; j < buf.byteLength; j++) {
            dataView.setUint8(thisbufindex, buf[j]);
            thisbufindex++;
        }
    }

    return outBuffer;
}
// https://github.com/sbtron/makeglb/blob/master/index.html
function getMimeType(filename) {
    for (var mimeType in MILE_TYPES) {
        for (var extensionIndex in MILE_TYPES[mimeType]) {
            var extension = MILE_TYPES[mimeType][extensionIndex];
            if (filename.toLowerCase().endsWith('.' + extension)) {
                return mimeType;
            }
        }
    }
    return 'application/octet-stream';
}
var MILE_TYPES = {
    'image/png': ['png'],
    'image/jpeg': ['jpg', 'jpeg'],
    'text/plain': ['glsl', 'vert', 'vs', 'frag', 'fs', 'txt'],
    'image/vnd-ms.dds': ['dds']
};

export {
    updateGLTFMaterials,
    mergeMetallicRoughness,
    mergeSpecularGlossiness,
    convertToBinary,
    TEXTURES
};