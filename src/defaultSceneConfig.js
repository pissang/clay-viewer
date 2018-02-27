export default {
    devicePixelRatio: null,

    // If enable preZ
    preZ: false,
    // If enable picking
    picking: false,

    // If enable shadow
    shadow: true,
    // Environment panorama texture url.
    environment: '',

    // Configuration abount ground
    ground: {
        show: false
    },

    // QMV provide three directional lights and two ambient lights.

    // Configuration of main light
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
        beta: 45
    },
    // Configuration of secondary light
    secondaryLight: {
        // If enable shadow of secondary light.
        shadow: true,
        shadowQuality: 'medium',
        // Intensity of secondary light. Defaultly not enable secondary light.
        intensity: 0,
        // Color of secondary light.
        color: '#fff',
        alpha: 60,
        beta: -50
    },
    // Configuration of tertiary light
    tertiaryLight: {
        // If enable shadow of tertiary light.
        shadow: true,
        shadowQuality: 'medium',
        // Intensity of secondary light. Defaultly not enable secondary light.
        intensity: 0,
        // Color of tertiary light.
        color: '#fff',
        alpha: 89,
        beta: 0
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
        texture: '',
        // Exposure factor when parsing hdr format.
        exposure: 3,
        // Intensity of diffuse radiance.
        diffuseIntensity: 0.5,
        // Intensity of specular radiance.
        specularIntensity: 0.5
    },
    // Configuration about post effects.
    postEffect: {
        // If enable post effects.
        enable: false,
        // Configuration about bloom post effect
        bloom: {
            // If enable bloom
            enable: false,
            // Intensity of bloom
            intensity: 0.1
        },
        // Configuration about depth of field
        depthOfField: {
            enable: false,
            // Focal distance of camera in word space.
            focalDistance: 5,
            // Focal range of camera in word space. in this range image will be absolutely sharp.
            focalRange: 1,
            // Max out of focus blur radius.
            blurRadius: 5,
            // fstop of camera. Smaller fstop will have shallow depth of field
            fstop: 2.8,
            // Blur quality. 'low'|'medium'|'high'|'ultra'
            quality: 'medium'
        },
        // Configuration about screen space ambient occulusion
        screenSpaceAmbientOcculusion: {
            // If enable SSAO
            enable: false,
            // If physically corrected.
            physical: false,
            // Sampling radius in work space.
            // Larger will produce more soft concat shadow.
            // But also needs higher quality or it will have more obvious artifacts
            radius: 0.5,
            // Quality of SSAO. 'low'|'medium'|'high'|'ultra'
            quality: 'medium',
            // Intensity of SSAO
            intensity: 1
        },
        // Configuration about screen space reflection
        screenSpaceReflection: {
            enable: false,
            // Quality of SSR. 'low'|'medium'|'high'|'ultra'
            quality: 'medium',
            // Surface with less roughness will have reflection.
            maxRoughness: 0.8
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
            enable: false
        }
    }
};