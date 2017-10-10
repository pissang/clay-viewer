var QMV = require('../../index');
var getDefaultConfig = require('./getDefaultConfig');
var project = require('./project');
var env = require('./env');


var config = getDefaultConfig();

var viewer = new QMV.Viewer(document.getElementById('main'), config);
viewer.setCameraControl({
    alpha: 20,
    beta: 30,
    distance: 8
});
viewer.start();

var controlKit = new ControlKit({
    loadAndSave: true,
    useExternalStyle:true
    // history: true
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
    config.ambientCubemapLight.diffuseIntensity = config.ambientCubemapLight.specularIntensity = config.ambientCubemapLight.$intensity;
    viewer.setAmbientCubemapLight(config.ambientCubemapLight);
}
function updateGround() {
    viewer.setGround(config.ground);
}

var scenePanel = controlKit.addPanel({ label: 'Scene', width: 250 })
scenePanel.addGroup({ label: 'Global' })
    .addSubGroup( { label: 'Load Option'})
        .addCheckbox(config, 'textureFlipY', { label: 'Flip Texture' })
        .addCheckbox(config, 'zUpToYUp', { label: 'Z Up' })
    .addSubGroup( { label: 'Ground' })
        .addCheckbox(config.ground, 'show', { label: 'Show', onChange: updateGround });

scenePanel.addGroup({ label: 'Environment', enable: false })
    .addSelect(config.ambientCubemapLight, '$textureOptions', { label: 'HDR Texture', onChange: updateEnvironment, target: '$texture' })
    .addNumberInput(config.ambientCubemapLight, '$intensity', { label: 'Intensity', onChange: updateEnvironment, step: 0.1 });

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
        .addNumberInput(config.postEffect.screenSpaceReflection, 'maxRoughness', { label: 'Max Roughness', step: 0.01, onChange: updatePostEffect })
        .addSelect(config.postEffect.screenSpaceReflection, '$qualityOptions', { label: 'Quality', onChange: updatePostEffect, target: 'quality' })

    .addSubGroup({ label: 'Depth of Field', enable: false })
        .addCheckbox(config.postEffect.depthOfField, 'enable', { label: 'Enable', onChange: updatePostEffect })
        .addNumberInput(config.postEffect.depthOfField, 'fstop', { label: 'f-stop', step: 0.1, onChange: updatePostEffect })
        .addNumberInput(config.postEffect.depthOfField, 'focalRange', { label: 'Focal Range', step: 0.1, onChange: updatePostEffect })
        .addNumberInput(config.postEffect.depthOfField, 'blurRadius', { label: 'Blur Radius', step: 0.1, onChange: updatePostEffect })
        .addSelect(config.postEffect.depthOfField, '$qualityOptions', { label: 'Quality', onChange: updatePostEffect, target: 'quality' })

    .addSubGroup({ label: 'Color Correction', enable: false })
        .addNumberInput(config.postEffect.colorCorrection, 'exposure', { label: 'Exposure', step: 0.1, onChange: updatePostEffect })
        .addNumberInput(config.postEffect.colorCorrection, 'brightness', { label: 'Brightness', step: 0.1, onChange: updatePostEffect })
        .addNumberInput(config.postEffect.colorCorrection, 'contrast', { label: 'Contrast', step: 0.1, onChange: updatePostEffect })
        .addNumberInput(config.postEffect.colorCorrection, 'saturation', { label: 'Saturation', step: 0.1, onChange: updatePostEffect });
    
    
window.addEventListener('resize', function () { viewer.resize(); });
//  var postProcessGroup = scenePanel.getGroups()[scenePanel.getGroups().length - 1];
//  postProcessGroup.disable();

///////////// Drag and drop
FileAPI.event.dnd(document.getElementById('main'), function (files) {
    files = files.filter(function (file) {
        return file.name.match(/.(gltf|bin)$/)
            || file.type.match(/image/);
    });
    project.loadSceneFiles(files, function (glTF, filesMap) {
        viewer.loadModel(glTF, {
            files: filesMap,
            textureFlipY: config.textureFlipY,
            zUpToYUp: config.zUpToYUp
        });
    });
    project.saveSceneFiles(files);
});

project.init(function (glTF, filesMap) {
    if (glTF) {
        viewer.loadModel(glTF, {
            files: filesMap,
            textureFlipY: config.textureFlipY,
            zUpToYUp: config.zUpToYUp
        });
    }
});
