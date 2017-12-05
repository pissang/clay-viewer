import Matrix4 from 'qtek/src/math/Matrix4';
import Vector3 from 'qtek/src/math/Vector3';
import Texture2D from 'qtek/src/Texture2D';
import Texture from 'qtek/src/Texture';
import Pass from 'qtek/src/compositor/Pass';
import Shader from 'qtek/src/Shader';
import FrameBuffer from 'qtek/src/FrameBuffer';
import halton from './halton';
import cubemapUtil from 'qtek/src/util/cubemap';

import SSRGLSLCode from './SSR.glsl.js';

Shader.import(SSRGLSLCode);

function SSRPass(opt) {
    opt = opt || {};

    this._ssrPass = new Pass({
        fragment: Shader.source('ecgl.ssr.main'),
        clearColor: [0, 0, 0, 0]
    });
    this._blurPass1 = new Pass({
        fragment: Shader.source('ecgl.ssr.blur'),
        clearColor: [0, 0, 0, 0]
    });
    this._blurPass2 = new Pass({
        fragment: Shader.source('ecgl.ssr.blur'),
        clearColor: [0, 0, 0, 0]
    });

    this._ssrPass.setUniform('gBufferTexture1', opt.normalTexture);
    this._ssrPass.setUniform('gBufferTexture2', opt.depthTexture);

    this._blurPass1.setUniform('gBufferTexture1', opt.normalTexture);
    this._blurPass1.setUniform('gBufferTexture2', opt.depthTexture);
    
    this._blurPass2.setUniform('gBufferTexture1', opt.normalTexture);
    this._blurPass2.setUniform('gBufferTexture2', opt.depthTexture);

    this._blurPass2.material.shader.define('fragment', 'VERTICAL');
    this._blurPass2.material.shader.define('fragment', 'BLEND');

    this._texture1 = new Texture2D({
        type: Texture.HALF_FLOAT
    });
    this._texture2 = new Texture2D({
        type: Texture.HALF_FLOAT
    });

    this._frameBuffer = new FrameBuffer();

    this._normalDistribution = null;

    this._sampleSize = 1024;
    this._samplePerFrame = 10;

    this._ssrPass.material.shader.define('fragment', 'SAMPLE_PER_FRAME', this._samplePerFrame);
}

SSRPass.prototype.update = function (renderer, camera, sourceTexture, frame) {
    var width = renderer.getWidth();
    var height = renderer.getHeight();
    var texture1 = this._texture1;
    var texture2 = this._texture2;
    texture1.width = texture2.width = width;
    texture1.height = texture2.height = height;
    var frameBuffer = this._frameBuffer;

    var ssrPass = this._ssrPass;
    var blurPass1 = this._blurPass1;
    var blurPass2 = this._blurPass2;

    var viewInverseTranspose = new Matrix4();
    Matrix4.transpose(viewInverseTranspose, camera.worldTransform);

    ssrPass.setUniform('sourceTexture', sourceTexture);
    ssrPass.setUniform('projection', camera.projectionMatrix._array);
    ssrPass.setUniform('projectionInv', camera.invProjectionMatrix._array);
    ssrPass.setUniform('viewInverseTranspose', viewInverseTranspose._array);
    ssrPass.setUniform('nearZ', camera.near);
    ssrPass.setUniform('jitterOffset', frame / 30);
    ssrPass.setUniform('normalJitter', frame / 30 / this._samplePerFrame);

    var textureSize = [width, height];

    blurPass1.setUniform('textureSize', textureSize);
    blurPass2.setUniform('textureSize', textureSize);
    blurPass2.setUniform('sourceTexture', sourceTexture);

    blurPass1.setUniform('projection', camera.projectionMatrix._array);
    blurPass2.setUniform('projection', camera.projectionMatrix._array);

    frameBuffer.attach(texture2);
    frameBuffer.bind(renderer);
    ssrPass.render(renderer);

    frameBuffer.attach(texture1);
    blurPass1.setUniform('texture', texture2);
    blurPass1.render(renderer);

    frameBuffer.attach(texture2);
    blurPass2.setUniform('texture', texture1);
    blurPass2.render(renderer);
    frameBuffer.unbind(renderer);
};

SSRPass.prototype.getTargetTexture = function () {
    return this._texture2;
};

SSRPass.prototype.setParameter = function (name, val) {
    if (name === 'maxIteration') {
        this._ssrPass.material.shader.define('fragment', 'MAX_ITERATION', val);
    }
    else {
        this._ssrPass.setUniform(name, val);
    }
};

SSRPass.prototype.setPhysicallyCorrect = function (isPhysicallyCorrect) {
    if (isPhysicallyCorrect) {
        if (!this._normalDistribution) {
            this._normalDistribution = cubemapUtil.generateNormalDistribution(256, this._sampleSize);
        }
        this._ssrPass.material.shader.define('fragment', 'PHYSICALLY_CORRECT');
        this._ssrPass.material.set('normalDistribution', this._normalDistribution);
    }
    else {
        this._ssrPass.material.shader.undefine('fragment', 'PHYSICALLY_CORRECT');
    }
};

SSRPass.prototype.setSSAOTexture = function (texture) {
    var blendPass = this._blurPass2;
    if (texture) {
        blendPass.material.shader.enableTexture('ssaoTex');
        blendPass.material.set('ssaoTex', texture);
    }
    else {
        blendPass.material.shader.disableTexture('ssaoTex');
    }
};

SSRPass.prototype.dispose = function (renderer) {
    this._texture1.dispose(renderer);
    this._texture2.dispose(renderer);
    this._frameBuffer.dispose(renderer);
};

export default SSRPass;