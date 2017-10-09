var config = {
    textureFlipY: false,

    showGround: true,
    shadow: true,

    environment: 'auto',
    
    mainLight: {
        // If enable shadow of main light.
        shadow: true,
        // Quality of main light shadow. 'low'|'medium'|'high'|'ultra'
        shadowQuality: 'medium',
        // Intensity of main light
        intensity: 0.8,
        // Color of main light
        color: '#fff',
        // Alpha is rotation from bottom to up.
        alpha: 45,
        // Beta is rotation from left to right.
        beta: 45,

        $padAngle: [0.25, 0.5]
    },
    // Configuration of secondary light
    secondaryLight: {
        // If enable shadow of secondary light.
        shadow: false,
        shadowQuality: 'medium',
        // Intensity of secondary light. Defaultly not enable secondary light.
        intensity: 0,
        // Color of secondary light.
        color: '#fff',
        alpha: 60,
        beta: -50,
        
        $padAngle: [-50 / 180, 60 / 90]
    },
    // Configuration of tertiary light
    tertiaryLight: {
        // If enable shadow of tertiary light.
        shadow: false,
        shadowQuality: 'medium',
        // Intensity of secondary light. Defaultly not enable secondary light.
        intensity: 0,
        // Color of tertiary light.
        color: '#fff',
        alpha: 89,
        beta: 0,
        
        $padAngle: [0, 89 / 90]
    },
    // Configuration of constant ambient light.
    // Which will add a constant color on any surface.
    ambientLight: {
        // ambient light intensity.
        intensity: 0.3,
        // ambient light color.
        color: '#fff'
    },
    ambientCubemapLight: {
        // Environment panorama texture url for cubemap lighting
        texture: '../examples/asset/texture/pisa.hdr',
        // Exposure factor when parsing hdr format.
        exposure: 1,
        // Intensity of diffuse radiance.
        diffuseIntensity: 0.5,
        // Intensity of specular radiance.
        specularIntensity: 0.5
    },
    // Configuration about post effects.
    postEffect: {
        // If enable post effects.
        enable: true,
        // Configuration about bloom post effect
        bloom: {
            // If enable bloom
            enable: true,
            // Intensity of bloom
            intensity: 0.1
        },
        // Configuration about depth of field
        depthOfField: {
            enable: false,
            // Focal distance of camera in word space.
            focalDistance: 4,
            // Focal range of camera in word space. in this range image will be absolutely sharp.
            focalRange: 2,
            // Max out of focus blur radius.
            blurRadius: 5,
            // fstop of camera. Smaller fstop will have shallow depth of field
            fstop: 10,
            // Blur quality. 'low'|'medium'|'high'|'ultra'
            quality: 'medium',

            $qualityOptions: ['low', 'medium', 'high', 'ultra']
        },
        // Configuration about screen space ambient occulusion
        screenSpaceAmbientOcclusion: {
            // If enable SSAO
            enable: false,
            // Sampling radius in work space.
            // Larger will produce more soft concat shadow.
            // But also needs higher quality or it will have more obvious artifacts
            radius: 0.5,
            // Quality of SSAO. 'low'|'medium'|'high'|'ultra'
            quality: 'medium',
            // Intensity of SSAO
            intensity: 1,

            $qualityOptions: ['low', 'medium', 'high', 'ultra']
        },
        // Configuration about screen space reflection
        screenSpaceReflection: {
            enable: false,
            // Quality of SSR. 'low'|'medium'|'high'|'ultra'
            quality: 'medium',
            // Surface with less roughness will have reflection.
            maxRoughness: 0.8,
            
            $qualityOptions: ['low', 'medium', 'high', 'ultra']
        },
        // Configuration about color correction
        colorCorrection: {
            // If enable color correction
            enable: true,
            exposure: 0,
            brightness: 0,
            contrast: 1,
            saturation: 1,
            // Lookup texture for color correction.
            // See https://ecomfe.github.io/echarts-doc/public/cn/option-gl.html#globe.postEffect.colorCorrection.lookupTexture
            lookupTexture: ''
        },
        FXAA: {
            // If enable FXAA
            enable: true
        }
    }
};



var viewer = new QMV.Viewer(document.getElementById('main'), config);
viewer.setCameraControl({
    alpha: 20,
    beta: 30,
    distance: 8
});
viewer.start();
// viewer.loadModel('../examples/sample_asset/audi/audi.gltf', {
//     })
//     .on('loadmodel', function () {
//     });



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

var scenePanel = controlKit.addPanel({ label: 'Scene', width: 250 })
scenePanel.addSubGroup({ label: 'Global' })
    .addCheckbox(config, 'textureFlipY', { label: 'Flip Texture' });

scenePanel.addGroup({ label: 'Light' })
    .addSubGroup({ label: 'Main' })
        .addCheckbox(config.mainLight, 'shadow', { label: 'Cast Shadow', onChange: updateLight })
        .addNumberInput(config.mainLight, 'intensity', { label: 'Intensity', step: 0.1, onChange: updateLight })
        .addColor(config.mainLight, 'color', { label: 'Color', onChange: updateLight })
        .addPad(config.mainLight, '$padAngle', { label: 'Direction', onChange: updateLight })

    .addSubGroup({ label: 'Secondary' })
        .addNumberInput(config.secondaryLight, 'intensity', { label: 'Intensity', step: 0.1, onChange: updateLight })
        .addColor(config.secondaryLight, 'color', { label: 'Color', onChange: updateLight })
        .addPad(config.secondaryLight, '$padAngle', { label: 'Direction', onChange: updateLight })
        
    .addSubGroup({ label: 'Tertiary' })
        .addNumberInput(config.tertiaryLight, 'intensity', { label: 'Intensity', step: 0.1, onChange: updateLight })
        .addColor(config.tertiaryLight, 'color', { label: 'Color', onChange: updateLight })
        .addPad(config.tertiaryLight, '$padAngle', { label: 'Direction', onChange: updateLight })

    .addSubGroup({ label: 'Ambient' })
        .addNumberInput(config.ambientLight, 'intensity', { label: 'Intensity', step: 0.1, onChange: updateLight })
        .addColor(config.ambientLight, 'color', { label: 'Color', onChange: updateLight });

 var lightGroup = scenePanel.getGroups()[scenePanel.getGroups().length - 1];
 lightGroup.disable();

 scenePanel.addGroup({ label: 'Post Effect'})
    .addSubGroup({ label: 'Bloom' })
        .addCheckbox(config.postEffect.bloom, 'enable', { label: 'Enable', onChange: updatePostEffect })
        .addNumberInput(config.postEffect.bloom, 'intensity', { label: 'Intensity', step: 0.1, onChange: updatePostEffect })
    
    .addSubGroup({ label: 'Screen Space Ambient Occulusion' })
        .addCheckbox(config.postEffect.screenSpaceAmbientOcclusion, 'enable', { label: 'Enable', onChange: updatePostEffect })
        .addNumberInput(config.postEffect.screenSpaceAmbientOcclusion, 'radius', { label: 'Radius', step: 0.1, onChange: updatePostEffect })
        .addNumberInput(config.postEffect.screenSpaceAmbientOcclusion, 'intensity', { label: 'Intensity', step: 0.1, onChange: updatePostEffect })
        .addSelect(config.postEffect.screenSpaceAmbientOcclusion, '$qualityOptions', { label: 'Quality', onChange: updatePostEffect, selectTarget: 'quality' })

    .addSubGroup({ label: 'Screen Space Reflection' })
        .addCheckbox(config.postEffect.screenSpaceReflection, 'enable', { label: 'Enable', onChange: updatePostEffect })
        .addNumberInput(config.postEffect.screenSpaceReflection, 'maxRoughness', { label: 'Max Roughness', step: 0.01, onChange: updatePostEffect })
        .addSelect(config.postEffect.screenSpaceReflection, '$qualityOptions', { label: 'Quality', onChange: updatePostEffect, selectTarget: 'quality' })
    
    .addSubGroup({ label: 'Depth of Field' })
        .addCheckbox(config.postEffect.depthOfField, 'enable', { label: 'Enable', onChange: updatePostEffect })
        .addNumberInput(config.postEffect.depthOfField, 'fstop', { label: 'f-stop', step: 0.1, onChange: updatePostEffect })
        .addNumberInput(config.postEffect.depthOfField, 'focalRange', { label: 'Focal Range', step: 0.1, onChange: updatePostEffect })
        .addNumberInput(config.postEffect.depthOfField, 'blurRadius', { label: 'Blur Radius', step: 0.1, onChange: updatePostEffect })
        .addSelect(config.postEffect.screenSpaceAmbientOcclusion, '$qualityOptions', { label: 'Quality', onChange: updatePostEffect, selectTarget: 'quality' })
    
window.addEventListener('resize', function () { viewer.resize(); });
//  var postProcessGroup = scenePanel.getGroups()[scenePanel.getGroups().length - 1];
//  postProcessGroup.disable();



FileAPI.event.dnd(document.getElementById('main'), function (files) {
    files = files.filter(function (file) {
        return file.name.match(/.(gltf|bin)$/)
            || file.type.match(/image/);
    });
    var glTFFile = files.find(function (file) {
        return file.name.match(/.gltf$/);
    });
    if (!glTFFile) {
        alert('glTF file nout found');
    }
    console.log(files);

    function readAllFiles(cb) {
        var count = 0;
        var filesMap = {};
        files.forEach(function (file) {
            if (file !== glTFFile) {
                count++;
                FileAPI.readAsDataURL(file, function (evt) {
                    if (evt.type === 'load') {
                        count--;
                        filesMap[file.name] = evt.result;
                        if (count === 0) {
                            cb && cb(filesMap);
                        }
                    }
                });
            }
        });
    }
    FileAPI.readAsText(glTFFile, 'utf-8', function (evt) {
        if (evt.type == 'load') {
            // Success
             var json = JSON.parse(evt.result);
             readAllFiles(function (filesMap) {
                viewer.loadModel(json, {
                    files: filesMap,
                    textureFlipY: config.textureFlipY
                });
             });
        } else if(evt.type =='progress'){
            var pr = evt.loaded / evt.total * 100;
        }
    });
});