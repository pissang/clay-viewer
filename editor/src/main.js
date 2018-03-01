import ClayViewer from '../../index';
import getDefaultSceneConfig from './getDefaultSceneConfig';
import getDefaultMaterialConfig from './getDefaultMaterialConfig';
import * as project from './project';
import env from './env';
import util from 'claygl/src/core/util';
import * as zrUtil from 'zrender/lib/core/util';
import TextureUI from './ui/Texture';
import * as timeline from './timeline';
import renderOutline from './debug/renderOutline';
import openURL from 'vendor/openURL';

var config = getDefaultSceneConfig();
var materialConfig = getDefaultMaterialConfig();

var viewer;

var controlKit = new ControlKit({
    loadAndSave: false,
    useExternalStyle: true
});

function updateLight() {
    ['mainLight', 'secondaryLight', 'tertiaryLight'].forEach(function (lightType) {
        config[lightType].alpha = config[lightType].$padAngle[1] * 90;
        config[lightType].beta = config[lightType].$padAngle[0] * 180;
    });
    viewer.setMainLight(config.mainLight);
    viewer.setSecondaryLight(config.secondaryLight);
    viewer.setTertiaryLight(config.tertiaryLight);
    viewer.setAmbientLight(config.ambientLight);
}

function updatePostEffect() {
    viewer.setPostEffect(config.postEffect);
}

function updateEnvironment() {
    config.ambientCubemapLight.texture = env.ENV_TEXTURE_ROOT + config.ambientCubemapLight.$texture + '.hdr';
    viewer.setAmbientCubemapLight(config.ambientCubemapLight);
}
function updateGround() {
    viewer.setGround(config.ground);
}
function updateAll() {
    updateLight();
    updatePostEffect();
    updateEnvironment();
    updateGround();
}

function updateMaterial() {
    var $textureTiling = Math.max(materialConfig.$textureTiling, 0.01);
    materialConfig.uvRepeat = [$textureTiling, $textureTiling];
    // TODO configuration
    materialConfig.transparent = materialConfig.alpha < 1;
    viewer.setMaterial(materialConfig.name, materialConfig);
}

function selectMaterial(mat) {
    materialConfig.name = mat.name;
    var matConfig = viewer.getMaterial(mat.name);
    matConfig.$textureTiling = matConfig.uvRepeat[0];
    util.extend(materialConfig, matConfig);
    if (matConfig.specularColor == null) {
        pbrRoughnessMetallicPanel.enable();
        pbrSpecularGlossinessPanel.disable();
    }
    else {
        pbrSpecularGlossinessPanel.enable();
        pbrRoughnessMetallicPanel.disable();
    }
    controlKit.update();
}

function haveTexture(val) {
    return val && val !== 'none';
}

function changeTexture(type, file, val) {
    var uiNeedUpdate = false;
    if (haveTexture(val)) {
        [
            ['diffuseMap', 'color', '#fff'],
            ['metalnessMap', 'metalness', 0.5],
            ['roughnessMap', 'roughness', 0.5],
            ['glossinessMap', 'glossiness', 0.5],
            ['specularMap', 'specularColor', '#fff'],
            ['emissiveMap', 'emission', '#fff']
        ].forEach(function (item) {
            if (type === item[0]) {
                console.warn('Force %s to be %s after set %s', item[1], item[2], item[0]);
                materialConfig[item[1]] = item[2];

                uiNeedUpdate = true;
            }
        }, this);

        // TODO Remove old textures.
        showSaveTip();
        env.AUTO_SAVE && project.writeTextureImage(file).then(hideBackgroundProgress).catch(hideBackgroundProgress);
        filesMapInverse[val] = file.name;

        uiNeedUpdate && controlKit.update();
    }

    updateMaterial();
}

var scenePanel;
var pbrRoughnessMetallicPanel;
var pbrSpecularGlossinessPanel;
var selectedMesh;
var outlineMeshes = [];

function showTip() {
    document.getElementById('tip').style.display = 'block';
}
function hideTip() {
    document.getElementById('tip').style.display = 'none';
}

function createViewer() {
    viewer = new ClayViewer(document.getElementById('viewport'), config);
    viewer.enablePicking();
    viewer.setCameraControl(config.viewControl);
    viewer.start();

    viewer.on('select', function (result) {
        viewer.refresh();
        selectMaterial(result.target.material);

        selectedMesh = result.target;
        outlineMeshes = [];
        viewer.getModelRoot().traverse(function (mesh) {
            if (mesh.material && mesh.material.name === selectedMesh.material.name) {
                outlineMeshes.push(mesh);
            }
        });
    });
    viewer.on('doffocus', function (result) {
        if (config.postEffect.depthOfField.enable) {
            config.postEffect.depthOfField.focalDistance = result.distance;
            controlKit.update();
        }
    });
    viewer.on('unselect', function () {
        viewer.refresh();
        pbrRoughnessMetallicPanel.disable();
        pbrSpecularGlossinessPanel.disable();
        selectedMesh = null;
        outlineMeshes = [];
    });

    viewer.on('afterrender', function (renderer, scene, camera) {
        if (selectedMesh) {
            renderOutline(viewer, outlineMeshes, camera);
        }
    });

    viewer.on('updatecamera', function (params) {
        config.viewControl = {
            center: params.center,
            alpha: params.alpha,
            beta: params.beta,
            distance: params.distance
        };
    });
}


var loadingEl = document.getElementById('loading');
var backgroundProgressEl = document.getElementById('background-progress');
function showLoading(text) {
    document.body.appendChild(loadingEl);
    loadingEl.querySelector('#loading-text').innerHTML = text || 'LOADING';
}
function hideLoading() {
    // Remove loading
    if (loadingEl.parentNode) {
        loadingEl.parentNode.removeChild(loadingEl);
    }
}

function showSaveTip() {
    backgroundProgressEl.style.display = 'block';
    backgroundProgressEl.querySelector('#background-progress-text').innerHTML = 'Saving...DONT close the page.';
}

function showPrepareTip() {
    backgroundProgressEl.style.display = 'block';
    backgroundProgressEl.querySelector('#background-progress-text').innerHTML = 'Preparing for download...DONT close the page.';
}

function hideBackgroundProgress () {
    backgroundProgressEl.style.display = 'none';
}

function init() {
    hideLoading();


    document.getElementById('toolbar').style.display = 'block';
    document.getElementById('reset').addEventListener('click', reset);
    document.getElementById('download').addEventListener('click', download);

    createViewer();

    ///////////// Drag and drop
    FileAPI.event.dnd(document.getElementById('main'), function (over) {

    }, function (files) {

        showLoading('Loading model');
        timeline.hideTimeline();

        project.createModelFilesURL(files).then(function (res) {
            var glTF = res.glTF;
            var filesMap = res.filesMap;
            var buffers = res.buffers;
            var files = res.allFiles;

            filesMapInverse = {};
            for (var name in filesMap) {
                filesMapInverse[filesMap[name]] = name;
            }
            var haveViewerConfig = !!(glTF.extras && glTF.extras.clayViewerConfig);
            if (haveViewerConfig) {
                zrUtil.merge(config, glTF.extras.clayViewerConfig, true);
                viewer.setCameraControl(config.viewControl);
                updateAll();
                controlKit.update();
            }
            viewer.loadModel(glTF, {
                files: filesMap,
                buffers: buffers,
                textureFlipY: config.textureFlipY,
                doubleSided: true,
                upAxis: config.zUpToYUp ? 'z' : 'y',
                includeTexture: !haveViewerConfig
            }).on('ready', function () {

                hideTip();
                hideLoading();

                if (haveViewerConfig) {
                    (glTF.extras.clayViewerConfig.materials || []).forEach(function (matConfig) {
                        for (var key in matConfig) {
                            if (filesMap[matConfig[key]]) {
                                matConfig[key] = filesMap[matConfig[key]];
                            }
                        }
                        viewer.setMaterial(matConfig.name, matConfig);
                    });
                }

                setTimeout(function () {
                    showSaveTip();
                    env.AUTO_SAVE && project.saveModelFiles(files).then(hideBackgroundProgress).catch(hideBackgroundProgress);
                }, 200);
            })
            .on('loadmodel', afterLoadModel)
            .on('error', function () {
                hideLoading();
                swal('Model load error');
            });

            pbrRoughnessMetallicPanel.disable();
            pbrSpecularGlossinessPanel.disable();

        }).catch(function (err) {

            hideLoading();
            if (!viewer.getModelRoot()) {
                showTip();
            }
            timeline.updateAnimationUI(viewer);

            console.log(err);
            swal(err.toString());
        });
    });


    initUI();

    inited = true;
}

function initUI() {
    scenePanel = controlKit.addPanel({ label: 'Settings', width: 250 });

    scenePanel.addGroup({ label: 'Global' })
        .addSubGroup( { label: 'Load Option'})
            .addCheckbox(config, 'textureFlipY', { label: 'Flip Texture', onChange: function () {
                viewer.setTextureFlipY(config.textureFlipY);
            } })
            .addCheckbox(config, 'zUpToYUp', { label: 'Z Up', onChange: function () {
                viewer.setModelUpAxis(config.zUpToYUp ? 'Z' : 'Y');
            } })
        .addSubGroup( { label: 'Ground' })
            .addCheckbox(config.ground, 'show', { label: 'Show', onChange: updateGround })
            .addCheckbox(config.ground, 'grid', { label: 'Grid', onChange: updateGround });

    scenePanel.addGroup({ label: 'Environment', enable: false })
        .addSelect(config.ambientCubemapLight, '$textureOptions', { label: 'HDR Texture', onChange: updateEnvironment, target: '$texture' })
        .addNumberInput(config.ambientCubemapLight, 'diffuseIntensity', { label: 'Diffuse Intensity', onChange: updateEnvironment, step: 0.1 })
        .addNumberInput(config.ambientCubemapLight, 'specularIntensity', { label: 'Specular Intensity', onChange: updateEnvironment, step: 0.1 });

    scenePanel.addGroup({ label: 'Light', enable: false })
        .addSubGroup({ label: 'Main', enable: false })
            .addCheckbox(config.mainLight, 'shadow', { label: 'Cast Shadow', onChange: updateLight })
            .addNumberInput(config.mainLight, 'intensity', { label: 'Intensity', step: 0.1, onChange: updateLight })
            .addColor(config.mainLight, 'color', { label: 'Color', onChange: updateLight })
            .addPad(config.mainLight, '$padAngle', { label: 'Direction', onChange: updateLight })

        .addSubGroup({ label: 'Secondary', enable: false })
            .addNumberInput(config.secondaryLight, 'intensity', { label: 'Intensity', step: 0.1, onChange: updateLight })
            .addColor(config.secondaryLight, 'color', { label: 'Color', onChange: updateLight })
            .addPad(config.secondaryLight, '$padAngle', { label: 'Direction', onChange: updateLight })

        .addSubGroup({ label: 'Tertiary', enable: false })
            .addNumberInput(config.tertiaryLight, 'intensity', { label: 'Intensity', step: 0.1, onChange: updateLight })
            .addColor(config.tertiaryLight, 'color', { label: 'Color', onChange: updateLight })
            .addPad(config.tertiaryLight, '$padAngle', { label: 'Direction', onChange: updateLight })

        .addSubGroup({ label: 'Ambient', enable: false })
            .addNumberInput(config.ambientLight, 'intensity', { label: 'Intensity', step: 0.1, onChange: updateLight })
            .addColor(config.ambientLight, 'color', { label: 'Color', onChange: updateLight });

    scenePanel.addGroup({ label: 'Post Effect', enable: false})
        .addCheckbox(config.postEffect, 'enable', { label: 'Enable', onChange: updatePostEffect })
        .addSubGroup({ label: 'Bloom', enable: false })
            .addCheckbox(config.postEffect.bloom, 'enable', { label: 'Enable', onChange: updatePostEffect })
            .addNumberInput(config.postEffect.bloom, 'intensity', { label: 'Intensity', step: 0.1, onChange: updatePostEffect })

        .addSubGroup({ label: 'Screen Space Ambient Occulusion', enable: false })
            .addCheckbox(config.postEffect.screenSpaceAmbientOcclusion, 'enable', { label: 'Enable', onChange: updatePostEffect })
            .addNumberInput(config.postEffect.screenSpaceAmbientOcclusion, 'radius', { label: 'Radius', step: 0.1, onChange: updatePostEffect })
            .addNumberInput(config.postEffect.screenSpaceAmbientOcclusion, 'intensity', { label: 'Intensity', step: 0.1, onChange: updatePostEffect })
            .addSelect(config.postEffect.screenSpaceAmbientOcclusion, '$qualityOptions', { label: 'Quality', onChange: updatePostEffect, target: 'quality' })

        .addSubGroup({ label: 'Screen Space Reflection', enable: false })
            .addCheckbox(config.postEffect.screenSpaceReflection, 'enable', { label: 'Enable', onChange: updatePostEffect })
            .addCheckbox(config.postEffect.screenSpaceReflection, 'physical', { label: 'Physical', onChange: updatePostEffect })
            .addNumberInput(config.postEffect.screenSpaceReflection, 'maxRoughness', { label: 'Max Roughness', step: 0.01, onChange: updatePostEffect })
            .addSelect(config.postEffect.screenSpaceReflection, '$qualityOptions', { label: 'Quality', onChange: updatePostEffect, target: 'quality' })

        .addSubGroup({ label: 'Depth of Field', enable: false })
            .addCheckbox(config.postEffect.depthOfField, 'enable', { label: 'Enable', onChange: updatePostEffect })
            .addNumberInput(config.postEffect.depthOfField, 'fstop', { label: 'f-stop', step: 0.1, onChange: updatePostEffect })
            .addNumberInput(config.postEffect.depthOfField, 'focalDistance', { label: 'Focal Distance', step: 0.1, onChange: updatePostEffect })
            .addNumberInput(config.postEffect.depthOfField, 'focalRange', { label: 'Focal Range', step: 0.1, onChange: updatePostEffect })
            .addNumberInput(config.postEffect.depthOfField, 'blurRadius', { label: 'Blur Radius', step: 0.1, onChange: updatePostEffect })
            .addSelect(config.postEffect.depthOfField, '$qualityOptions', { label: 'Quality', onChange: updatePostEffect, target: 'quality' })

        .addSubGroup({ label: 'Color Correction', enable: false })
            .addNumberInput(config.postEffect.colorCorrection, 'exposure', { label: 'Exposure', step: 0.1, onChange: updatePostEffect })
            .addNumberInput(config.postEffect.colorCorrection, 'brightness', { label: 'Brightness', step: 0.1, onChange: updatePostEffect })
            .addNumberInput(config.postEffect.colorCorrection, 'contrast', { label: 'Contrast', step: 0.1, onChange: updatePostEffect })
            .addNumberInput(config.postEffect.colorCorrection, 'saturation', { label: 'Saturation', step: 0.1, onChange: updatePostEffect });

    function getTextureFileName(url) {
        return filesMapInverse && filesMapInverse[url];
    }

    function addCommmonProperties(panel) {
        panel
            .addStringOutput(materialConfig, 'name', { label: 'Name' })
            .addColor(materialConfig, 'color', { label: 'Base Color', onChange: updateMaterial })
            .addSlider(materialConfig, 'alpha', '$alphaRange', { label: 'Alpha', onChange: updateMaterial })
            .addSlider(materialConfig, 'alphaCutoff', '$alphaCutoffRange', { label: 'Alpha Cutoff', onChange: updateMaterial })
            .addNumberInput(materialConfig, '$textureTiling', { label: 'Tiling', onChange: updateMaterial, step: 0.5 })
            .addCustomComponent(TextureUI, materialConfig, 'diffuseMap', { label: 'Base Map', onChange: changeTexture.bind(null, 'diffuseMap'), getFileName: getTextureFileName })
            .addCustomComponent(TextureUI, materialConfig, 'normalMap', { label: 'Normal/Bump Map', onChange: changeTexture.bind(null, 'normalMap'), getFileName: getTextureFileName })
    }
    function addUncommonProperties(panel) {
        panel
            .addCustomComponent(TextureUI, materialConfig, 'parallaxOcclusionMap', { label: 'Parallax Occlusion Map', onChange: changeTexture.bind(null, 'parallaxOcclusionMap'), getFileName: getTextureFileName })
            .addSlider(materialConfig, 'parallaxOcclusionScale', '$parallaxOcclusionScaleRange', { label: 'Scale', onChange: updateMaterial })
            .addColor(materialConfig, 'emission', { label: 'Emission', onChange: updateMaterial })
            .addNumberInput(materialConfig, 'emissionIntensity', { label: 'Emission Intensity', onChange: updateMaterial })
            .addCustomComponent(TextureUI, materialConfig, 'emissiveMap', { label: 'Emissive Map', onChange: changeTexture.bind(null, 'emissiveMap'), getFileName: getTextureFileName });
    }

    pbrRoughnessMetallicPanel = controlKit.addPanel({ label: 'Material - Metalllic Roughness', width: 240, fixed: false, align: 'left', position: [10, 10] });
    addCommmonProperties(pbrRoughnessMetallicPanel);
    pbrRoughnessMetallicPanel
        .addCustomComponent(TextureUI, materialConfig, 'metalnessMap', { label: 'Metalness Map', onChange: changeTexture.bind(null, 'metalnessMap'), getFileName: getTextureFileName })
        .addSlider(materialConfig, 'metalness', '$metalnessRange', { label: 'Metalness', onChange: updateMaterial })
        .addCustomComponent(TextureUI, materialConfig, 'roughnessMap', { label: 'Roughness Map', onChange: changeTexture.bind(null, 'roughnessMap'), getFileName: getTextureFileName })
        .addSlider(materialConfig, 'roughness', '$roughnessRange', { label: 'Roughness', onChange: updateMaterial });
    addUncommonProperties(pbrRoughnessMetallicPanel);
    pbrRoughnessMetallicPanel.disable();

    pbrSpecularGlossinessPanel = controlKit.addPanel({ label: 'Material - Specular Glossiness', width: 240, fixed: false, align: 'left', position: [10, 10] });
    addCommmonProperties(pbrSpecularGlossinessPanel);
    pbrSpecularGlossinessPanel
        .addCustomComponent(TextureUI, materialConfig, 'specularMap', { label: 'Specular Map', onChange: changeTexture.bind(null, 'specularMap'), getFileName: getTextureFileName })
        .addColor(materialConfig, 'specularColor', { label: 'Specular Factor', onChange: updateMaterial })
        .addCustomComponent(TextureUI, materialConfig, 'glossinessMap', { label: 'Glossiness Map', onChange: changeTexture.bind(null, 'glossinessMap'), getFileName: getTextureFileName })
        .addSlider(materialConfig, 'glossiness', '$glossinessRange', { label: 'Glossiness', onChange: updateMaterial });
    addUncommonProperties(pbrSpecularGlossinessPanel);
    pbrSpecularGlossinessPanel.disable();
}

function reset() {
    swal({
        title: 'Reset?',
        text: 'Reset the viewer',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes!'
    }).then(function () {
        zrUtil.merge(config, getDefaultSceneConfig(), true);
        zrUtil.merge(materialConfig, getDefaultMaterialConfig(), true);
        controlKit.update();
        pbrRoughnessMetallicPanel.disable();
        pbrSpecularGlossinessPanel.disable();

        selectedMesh = null;
        outlineMeshes = [];
        viewer.dispose();
        createViewer();

        project.removeProject();

        showTip();

        timeline.updateAnimationUI(viewer);
        hideBackgroundProgress();
    }).catch(function () {});
}

function download() {
    swal({
        title: 'Select download format.',
        input: 'radio',
        inputOptions: {
            'glb': 'GLB',
            'zip': 'ZIP'
        }
    }).then(function (result) {
        showPrepareTip();
        project.downloadProject(result, hideBackgroundProgress, hideBackgroundProgress);
    });
}

function afterLoadModel() {
    selectedMesh = null;
    viewer.stopAnimation();
    timeline.updateAnimationUI(viewer);
}

var filesMapInverse;
var inited = false;

project.init(function (glTF, filesMap, loadedSceneCfg) {

    if (loadedSceneCfg) {
        zrUtil.merge(config, loadedSceneCfg, true);
    }
    if (inited) {
        return;
    }

    init();

    if (glTF) {
        filesMapInverse = {};
        for (var name in filesMap) {
            filesMapInverse[filesMap[name]] = name;
        }
        viewer.loadModel(glTF, {
            files: filesMap,
            textureFlipY: config.textureFlipY,
            upAxis: config.zUpToYUp ? 'z' : 'y',
            doubleSided: true,
            // Not load texture, setMaterial will do it.
            includeTexture: false
        }).on('ready', function () {
            if (loadedSceneCfg && loadedSceneCfg.materials) {
                loadedSceneCfg.materials.forEach(function (matConfig) {
                    // From file name to object URL
                    for (var key in matConfig) {
                        if (filesMap[matConfig[key]]) {
                            matConfig[key] = filesMap[matConfig[key]];
                        }
                    }
                    viewer.setMaterial(matConfig.name, matConfig);
                });
            }
        })
        .on('loadmodel', afterLoadModel)
        .on('error', function () {
            showTip();
            swal('Model load error');
        });
    }
    else {
        showTip();
    }
});

setTimeout(function () {
    if (inited) {
        return;
    }
    console.warn('Init time out');
    init();
}, 5000);

setInterval(function () {
    if (viewer && !document.hidden) {
        var materialsMap = {};
        config.materials = viewer.getMaterialsNames().map(function (matName) {
            var matConfig = viewer.getMaterial(matName);
            // From object URL to file name;
            for (var key in matConfig) {
                if (filesMapInverse[matConfig[key]]) {
                    matConfig[key] = filesMapInverse[matConfig[key]];
                }
            }
            matConfig.targetMeshes = [];
            materialsMap[matName] = matConfig;
            return matConfig;
        });

        if (viewer.getModelRoot()) {
            viewer.getModelRoot().traverse(function (mesh) {
                if (mesh.material && materialsMap[mesh.material.name]) {
                    materialsMap[mesh.material.name].targetMeshes.push(mesh.originalMeshName || mesh.name);
                }
            });
        }

        showSaveTip();
        env.AUTO_SAVE && project.saveSceneConfig(config).then(function () {
            hideBackgroundProgress();
            console.log('Saved');
        }).catch(hideBackgroundProgress);
    }
}, 5000);


window.addEventListener('resize', function () { viewer.resize(); });

window.addEventListener('dragover', function (e) {
    e.preventDefault();
});
window.addEventListener('drop', function (e) {
    e.preventDefault();
});

$(document).on('click', 'a[href^="http"]', function(event) {
    event.preventDefault();
    openURL(this.href);
});