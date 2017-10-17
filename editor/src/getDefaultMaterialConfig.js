
export default function () {
    return {

        name: '',
        
        color: '#fff',

        diffuseMap: '',
        normalMap: '',

        emission: '#fff',
        emissionIntensity: 0,
        emissiveMap: '',
        
        // Metallic and roughness
        metalness: 0,
        roughness: 0.5,
        metalnessMap: '',
        roughnessMap: '',

        // Specular and glossiness
        glossiness: 0.5,
        specularColor: '#111',
        glossinessMap: '',
        specularMap: '',

        $metalnessRange: [0, 1],
        $roughnessRange: [0, 1],
        $glossinessRange: [0, 1]

    };
}