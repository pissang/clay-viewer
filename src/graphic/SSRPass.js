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

function generateNormals(size, offset, hemisphere) {
    var kernel = new Float32Array(size * 3);
    offset = offset || 0;
    for (var i = 0; i < size; i++) {
        var phi = halton(i + offset, 2) * (hemisphere ? 1 : 2) * Math.PI / 2;
        var theta = halton(i + offset, 3) * 2 * Math.PI;
        var x = Math.cos(theta) * Math.sin(phi);
        var y = Math.sin(theta) * Math.sin(phi);
        var z = Math.cos(phi);
        kernel[i * 3] = x;
        kernel[i * 3 + 1] = y;
        kernel[i * 3 + 2] = z;
    }
    return kernel;
}

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
    this._blendPass = new Pass({
        fragment: Shader.source('qtek.compositor.blend')
    });
    this._blendPass.material.shader.disableTexturesAll();
    this._blendPass.material.shader.enableTexture(['texture1', 'texture2']);

    this._ssrPass.setUniform('gBufferTexture1', opt.normalTexture);
    this._ssrPass.setUniform('gBufferTexture2', opt.depthTexture);
    this._ssrPass.setUniform('gBufferTexture3', opt.albedoTexture);

    this._blurPass1.setUniform('gBufferTexture1', opt.normalTexture);
    this._blurPass1.setUniform('gBufferTexture2', opt.depthTexture);
    
    this._blurPass2.setUniform('gBufferTexture1', opt.normalTexture);
    this._blurPass2.setUniform('gBufferTexture2', opt.depthTexture);

    this._blurPass2.material.shader.define('fragment', 'VERTICAL');
    this._blurPass2.material.shader.define('fragment', 'BLEND');

    this._ssrTexture = new Texture2D({
        type: Texture.HALF_FLOAT
    });
    this._texture2 = new Texture2D({
        type: Texture.HALF_FLOAT
    });
    this._texture3 = new Texture2D({
        type: Texture.HALF_FLOAT
    });
    this._prevTexture = new Texture2D({
        type: Texture.HALF_FLOAT
    });
    this._currentTexture = new Texture2D({
        type: Texture.HALF_FLOAT
    });

    this._frameBuffer = new FrameBuffer({
        depthBuffer: false
    });

    this._normalDistribution = null;

    this._totalSamples = 2048;
    this._samplePerFrame = 10;

    this._ssrPass.material.shader.define('fragment', 'SAMPLE_PER_FRAME', this._samplePerFrame);

    this._downScale = 2;

    this._diffuseSampleNormals = [];
    for (var i = 0; i < this._totalSamples; i++) {
        this._diffuseSampleNormals.push(generateNormals(this._samplePerFrame, i * this._samplePerFrame, true));
    }
}

SSRPass.prototype.update = function (renderer, camera, sourceTexture, frame) {
    var width = renderer.getWidth();
    var height = renderer.getHeight();
    var ssrTexture = this._ssrTexture;
    var texture2 = this._texture2;
    var texture3 = this._texture3;
    ssrTexture.width = this._prevTexture.width = this._currentTexture.width = width / this._downScale;
    ssrTexture.height = this._prevTexture.height = this._currentTexture.height = height / this._downScale;

    texture2.width = texture3.width = width;
    texture2.height = texture3.height = height;

    var frameBuffer = this._frameBuffer;

    var ssrPass = this._ssrPass;
    var blurPass1 = this._blurPass1;
    var blurPass2 = this._blurPass2;
    var blendPass = this._blendPass;

    var viewInverseTranspose = new Matrix4();
    Matrix4.transpose(viewInverseTranspose, camera.worldTransform);

    ssrPass.setUniform('sourceTexture', frame >= 1 ? texture3 : sourceTexture);
    ssrPass.setUniform('projection', camera.projectionMatrix._array);
    ssrPass.setUniform('projectionInv', camera.invProjectionMatrix._array);
    ssrPass.setUniform('viewInverseTranspose', viewInverseTranspose._array);
    ssrPass.setUniform('nearZ', camera.near);

    var percent = frame / this._totalSamples * this._samplePerFrame;
    ssrPass.setUniform('jitterOffset', percent);
    // ssrPass.setUniform('normalJitter', frame / this._totalSamples);
    ssrPass.setUniform('lambertNormals', this._diffuseSampleNormals[frame % this._totalSamples]);

    var textureSize = [ssrTexture.width, ssrTexture.height];

    blurPass1.setUniform('textureSize', textureSize);
    blurPass2.setUniform('textureSize', textureSize);
    blurPass2.setUniform('sourceTexture', sourceTexture);

    blurPass1.setUniform('projection', camera.projectionMatrix._array);
    blurPass2.setUniform('projection', camera.projectionMatrix._array);

    frameBuffer.attach(ssrTexture);
    frameBuffer.bind(renderer);
    ssrPass.render(renderer);

    frameBuffer.attach(this._currentTexture);
    blendPass.setUniform('texture1', ssrTexture);
    blendPass.setUniform('texture2', this._prevTexture);
    blendPass.material.set({
        'weight1': 2,
        'weight2': frame >= 1 ? 1 : 0
    });
    blendPass.render(renderer);

    frameBuffer.attach(texture2);
    blurPass1.setUniform('texture', this._currentTexture);
    blurPass1.render(renderer);

    frameBuffer.attach(texture3);
    blurPass2.setUniform('texture', texture2);
    blurPass2.render(renderer);
    frameBuffer.unbind(renderer);

    var tmp = this._prevTexture;
    this._prevTexture = this._currentTexture;
    this._currentTexture = tmp;
};

SSRPass.prototype.getTargetTexture = function () {
    return this._texture3;
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
            this._normalDistribution = cubemapUtil.generateNormalDistribution(256, this._totalSamples);
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

SSRPass.prototype.isFinished = function (frame) {
    return frame > (this._totalSamples / this._samplePerFrame);
};

SSRPass.prototype.dispose = function (renderer) {
    this._ssrTexture.dispose(renderer);
    this._texture2.dispose(renderer);
    this._texture3.dispose(renderer);
    this._prevTexture.dispose(renderer);
    this._currentTexture.dispose(renderer);
    this._frameBuffer.dispose(renderer);
};

export default SSRPass;