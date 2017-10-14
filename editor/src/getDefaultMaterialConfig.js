
export default function () {
    return {

        name: '',
        
        color: '#fff',

        // Metallic and roughness
        metalness: 0,
        roughness: 0.5,

        // Specular and glossiness
        glossiness: 0.5,
        specularColor: '#111',

        $metalnessRange: [0, 1],
        $roughnessRange: [0, 1],
        $glossinessRange: [0, 1],

        emission: '#fff',

        emissionIntensity: 0
    };
}