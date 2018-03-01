@export qmv.ground.vertex
@import clay.lambert.vertex
@end


@export qmv.ground.fragment

varying vec2 v_Texcoord;
varying vec3 v_Normal;
varying vec3 v_WorldPosition;

uniform vec4 color : [1.0, 1.0, 1.0, 1.0];
uniform float gridSize: 5;
uniform float gridSize2: 1;
uniform vec4 gridColor: [0, 0, 0, 1];
uniform vec4 gridColor2: [0.3, 0.3, 0.3, 1];

uniform bool showGrid: true;

uniform float glossiness: 0.7;

#ifdef SSAOMAP_ENABLED
// For ssao prepass
uniform sampler2D ssaoMap;
uniform vec4 viewport : VIEWPORT;
#endif

#ifdef AMBIENT_LIGHT_COUNT
@import clay.header.ambient_light
#endif
#ifdef AMBIENT_SH_LIGHT_COUNT
@import clay.header.ambient_sh_light
#endif
#ifdef DIRECTIONAL_LIGHT_COUNT
@import clay.header.directional_light
#endif

@import clay.plugin.compute_shadow_map

void main()
{
    gl_FragColor = color;

    if (showGrid) {
        float wx = v_WorldPosition.x;
        float wz = v_WorldPosition.z;
        float x0 = abs(fract(wx / gridSize - 0.5) - 0.5) / fwidth(wx) * gridSize / 2.0;
        float z0 = abs(fract(wz / gridSize - 0.5) - 0.5) / fwidth(wz) * gridSize / 2.0;

        float x1 = abs(fract(wx / gridSize2 - 0.5) - 0.5) / fwidth(wx) * gridSize2;
        float z1 = abs(fract(wz / gridSize2 - 0.5) - 0.5) / fwidth(wz) * gridSize2;

        float v0 = 1.0 - clamp(min(x0, z0), 0.0, 1.0);
        float v1 = 1.0 - clamp(min(x1, z1), 0.0, 1.0);
        if (v0 > 0.1) {
            gl_FragColor = mix(gl_FragColor, gridColor, v0);
        }
        else {
            gl_FragColor = mix(gl_FragColor, gridColor2, v1);
        }
    }

    vec3 diffuseColor = vec3(0.0, 0.0, 0.0);

#ifdef AMBIENT_LIGHT_COUNT
    for(int _idx_ = 0; _idx_ < AMBIENT_LIGHT_COUNT; _idx_++)
    {
        diffuseColor += ambientLightColor[_idx_];
    }
#endif
#ifdef AMBIENT_SH_LIGHT_COUNT
    for(int _idx_ = 0; _idx_ < AMBIENT_SH_LIGHT_COUNT; _idx_++)
    {{
        diffuseColor += calcAmbientSHLight(_idx_, v_Normal) * ambientSHLightColor[_idx_];
    }}
#endif

#ifdef DIRECTIONAL_LIGHT_COUNT
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
    float shadowContribsDir[DIRECTIONAL_LIGHT_COUNT];
    if(shadowEnabled)
    {
        computeShadowOfDirectionalLights(v_WorldPosition, shadowContribsDir);
    }
#endif
    for(int i = 0; i < DIRECTIONAL_LIGHT_COUNT; i++)
    {
        vec3 lightDirection = -directionalLightDirection[i];
        vec3 lightColor = directionalLightColor[i];

        float ndl = dot(v_Normal, normalize(lightDirection));

        float shadowContrib = 1.0;
#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)
        if( shadowEnabled )
        {
            shadowContrib = shadowContribsDir[i];
        }
#endif

        diffuseColor += lightColor * clamp(ndl, 0.0, 1.0) * shadowContrib;
    }
#endif

#ifdef SSAOMAP_ENABLED
    diffuseColor *= texture2D(ssaoMap, (gl_FragCoord.xy - viewport.xy) / viewport.zw).r;
#endif

    gl_FragColor.rgb *= diffuseColor;

    gl_FragColor.a *= 1.0 - clamp(length(v_WorldPosition.xz) / 30.0, 0.0, 1.0);

}

@end