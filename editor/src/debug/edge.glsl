@export qmv.editor.edge

uniform sampler2D texture;

uniform vec2 textureSize;

uniform vec4 edgeColor: [0,0,0,1.0];
uniform float edgeWidth: 1;

varying vec2 v_Texcoord;

float getCol(vec2 coord) {
    return texture2D(texture, coord).a;
}

void main() {
    vec2 cc = v_Texcoord;
    // center
    float center = getCol(cc);

    // PENDING Fade out in 100 - 500
    float dx = edgeWidth / textureSize.x;
    float dy = edgeWidth / textureSize.y;

    vec2 coord;
    // top left
    float topLeft = getCol(cc+vec2(-dx, -dy));
    // top
    float top = getCol(cc+vec2(0.0, -dy));
    // top right
    float topRight = getCol(cc+vec2(dx, -dy));
    // left
    float left = getCol(cc+vec2(-dx, 0.0));
    // right
    float right = getCol(cc+vec2(dx, 0.0));
    // bottom left
    float bottomLeft = getCol(cc+vec2(-dx, dy));
    // bottom
    float bottom = getCol(cc+vec2(0.0, dy));
    // bottom right
    float bottomRight = getCol(cc+vec2(dx, dy));

    float v = -topLeft-2.0*top-topRight+bottomLeft+2.0*bottom+bottomRight;
    float h = -bottomLeft-2.0*left-topLeft+bottomRight+2.0*right+topRight;

    float edge = sqrt(h * h + v * v);

    edge = smoothstep(0.9, 1.0, edge);
    if (edge < 0.5) {
        discard;
    }

    gl_FragColor = edgeColor;
}
@end