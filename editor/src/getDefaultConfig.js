var env = require('./env');

module.exports = function () {
    return {
        textureFlipY: false,
    
        zUpToYUp: false,
    
        shadow: true,
    
        environment: 'auto',
    
        ground: {
            show: true
        },
        
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
            intensity: 0.0,
            // ambient light color.
            color: '#fff'
        },
        ambientCubemapLight: {
            // Environment panorama texture url for cubemap lighting
            texture: env.ENV_TEXTURE_ROOT + 'pisa.hdr',
    
            $texture: 'pisa',
            $textureOptions: ['pisa', 'Barce_Rooftop_C', 'Factory_Catwalk', 'Grand_Canyon_C', 'Ice_Lake', 'Old_Industrial_Hall'],
    
            // Exposure factor when parsing hdr format.
            exposure: 1,
            // Intensity of diffuse radiance.
            diffuseIntensity: 0.5,
            // Intensity of specular radiance.
            specularIntensity: 0.5,
    
            $intensity: 0.5
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
};