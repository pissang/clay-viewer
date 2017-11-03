import Texture2D from 'qtek/src/Texture2D';
import Texture from 'qtek/src/Texture';
import Pass from 'qtek/src/compositor/Pass';
import Shader from 'qtek/src/Shader';
import FrameBuffer from 'qtek/src/FrameBuffer';
import Material from 'qtek/src/Material';

import edgeShader from './edge.glsl.js';
Shader['import'](edgeShader);

var texture = new Texture2D();
var framebuffer = new FrameBuffer();
framebuffer.attach(texture);

var edgePass = new Pass({
    fragment: Shader.source('qmv.editor.edge')
});

export default function (viewer, meshes, camera) {
    var renderer = viewer.getRenderer();
    texture.width = renderer.getWidth();
    texture.height = renderer.getHeight();
    
    framebuffer.bind(renderer);
    renderer.gl.clearColor(0, 0, 0, 0);
    renderer.gl.clear(renderer.gl.COLOR_BUFFER_BIT | renderer.gl.DEPTH_BUFFER_BIT);
    camera.update();
    var materialsMap = {};
    meshes.forEach(function (mesh) {
        materialsMap[mesh.__GUID__] = mesh.material;
        if (!mesh.__outlineBasicMaterial) {
            var vertexDefines = {};
            if (mesh.material.shader.isDefined('vertex', 'SKINNING')) {
                vertexDefines['SKINNING'] = null;
                vertexDefines['JOINT_COUNT'] = mesh.material.shader.getDefine('vertex', 'JOINT_COUNT');
            }
            mesh.__outlineBasicMaterial = new Material({
                shader: viewer.shaderLibrary.get('qtek.basic', {
                    vertexDefines: vertexDefines
                })
            });
        }
        mesh.material = mesh.__outlineBasicMaterial;
        mesh.material.setUniform('color', [1, 1, 1, 1]);
    });
    renderer.renderQueue(meshes, camera);
    meshes.forEach(function (mesh) {
        mesh.material = materialsMap[mesh.__GUID__];
    });
    framebuffer.unbind(renderer);

    edgePass.setUniform('edgeWidth', 1.5);
    edgePass.setUniform('edgeColor', [1, 1, 0, 1]);
    edgePass.setUniform('texture', texture);
    edgePass.setUniform('textureSize', [texture.width, texture.height]);
    edgePass.render(renderer);
}