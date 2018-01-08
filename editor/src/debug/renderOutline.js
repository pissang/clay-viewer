import Texture2D from 'claygl/src/Texture2D';
import Texture from 'claygl/src/Texture';
import Pass from 'claygl/src/compositor/Pass';
import Shader from 'claygl/src/Shader';
import FrameBuffer from 'claygl/src/FrameBuffer';
import Material from 'claygl/src/Material';

import edgeShader from './edge.glsl.js';
Shader['import'](edgeShader);

var texture = new Texture2D();
var framebuffer = new FrameBuffer();
framebuffer.attach(texture);

var edgePass = new Pass({
    fragment: Shader.source('qmv.editor.edge')
});

var outlineBasicMaterial = new Material({
    shader: new Shader(Shader.source('clay.basic.vertex'), Shader.source('clay.basic.fragment'))
});

export default function (viewer, meshes, camera) {
    var renderer = viewer.getRenderer();
    texture.width = renderer.getWidth();
    texture.height = renderer.getHeight();

    framebuffer.bind(renderer);
    renderer.gl.clearColor(0, 0, 0, 0);
    renderer.gl.clear(renderer.gl.COLOR_BUFFER_BIT | renderer.gl.DEPTH_BUFFER_BIT);
    camera.update();
    renderer.renderPass(meshes, camera, {
        getMaterial: function () {
            return outlineBasicMaterial;
        }
    });
    framebuffer.unbind(renderer);

    edgePass.setUniform('edgeWidth', 1.5);
    edgePass.setUniform('edgeColor', [1, 1, 0, 1]);
    edgePass.setUniform('texture', texture);
    edgePass.setUniform('textureSize', [texture.width, texture.height]);
    edgePass.render(renderer);
}