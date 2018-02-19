import Matrix4 from 'claygl/src/math/Matrix4';
import Vector3 from 'claygl/src/math/Vector3';
import Texture2D from 'claygl/src/Texture2D';
import Texture from 'claygl/src/Texture';
import Pass from 'claygl/src/compositor/Pass';
import Shader from 'claygl/src/Shader';
import FrameBuffer from 'claygl/src/FrameBuffer';
import halton from './halton';
import cubemapUtil from 'claygl/src/util/cubemap';

import SSRGLSLCode from './SSR.glsl.js';

Shader.import(SSRGLSLCode);

// function generateNormals(size, offset, hemisphere) {
//     var kernel = new Float32Array(size * 3);
//     offset = offset || 0;
//     for (var i = 0; i < size; i++) {
//         var phi = halton(i + offset, 2) * (hemisphere ? 1 : 2) * Math.PI / 2;
//         var theta = halton(i + offset, 3) * 2 * Math.PI;
//         var x = Math.cos(theta) * Math.sin(phi);
//         var y = Math.sin(theta) * Math.sin(phi);
//         var z = Math.cos(phi);
//         kernel[i * 3] = x;
//         kernel[i * 3 + 1] = y;
//         kernel[i * 3 + 2] = z;
//     }
//     return kernel;
// }

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
        fragment: Shader.source('clay.compositor.blend')
    });
    this._blendPass.material.disableTexturesAll();
    this._blendPass.material.enableTexture(['texture1', 'texture2']);

    this._ssrPass.setUniform('gBufferTexture1', opt.normalTexture);
    this._ssrPass.setUniform('gBufferTexture2', opt.depthTexture);
    this._ssrPass.setUniform('gBufferTexture3', opt.albedoTexture);

    this._blurPass1.setUniform('gBufferTexture1', opt.normalTexture);
    this._blurPass1.setUniform('gBufferTexture2', opt.depthTexture);

    this._blurPass2.setUniform('gBufferTexture1', opt.normalTexture);
    this._blurPass2.setUniform('gBufferTexture2', opt.depthTexture);

    this._blurPass2.material.define('fragment', 'VERTICAL');
    this._blurPass2.material.define('fragment', 'BLEND');

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

    this._totalSamples = 256;
    this._samplePerFrame = 2;

    this._ssrPass.material.define('fragment', 'SAMPLE_PER_FRAME', this._samplePerFrame);
    this._ssrPass.material.define('fragment', 'TOTAL_SAMPLES', this._totalSamples);

    this._downScale = 1;

    // this._diffuseSampleNormals = [];
    // for (var i = 0; i < this._totalSamples; i++) {
    //     this._diffuseSampleNormals.push(generateNormals(this._samplePerFrame, i * this._samplePerFrame, true));
    // }
}

SSRPass.prototype.setAmbientCubemap = function (specularCubemap, specularIntensity) {
    this._ssrPass.material.set('specularCubemap', specularCubemap);
    this._ssrPass.material.set('specularIntensity', specularIntensity);

    var enableSpecularMap = specularCubemap && specularIntensity;
    this._ssrPass.material[enableSpecularMap ? 'enableTexture' : 'disableTexture']('specularCubemap');
};

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

    ssrPass.setUniform('sourceTexture', sourceTexture);
    ssrPass.setUniform('projection', camera.projectionMatrix.array);
    ssrPass.setUniform('projectionInv', camera.invProjectionMatrix.array);
    ssrPass.setUniform('viewInverseTranspose', viewInverseTranspose.array);
    ssrPass.setUniform('nearZ', camera.near);

    var percent = frame / this._totalSamples * this._samplePerFrame;
    ssrPass.setUniform('jitterOffset', percent);
    ssrPass.setUniform('normalJitter', frame / this._totalSamples);
    // ssrPass.setUniform('lambertNormals', this._diffuseSampleNormals[frame % this._totalSamples]);

    blurPass1.setUniform('textureSize', [ssrTexture.width, ssrTexture.height]);
    blurPass2.setUniform('textureSize', [width, height]);
    blurPass2.setUniform('sourceTexture', sourceTexture);

    blurPass1.setUniform('projection', camera.projectionMatrix.array);
    blurPass2.setUniform('projection', camera.projectionMatrix.array);

    frameBuffer.attach(ssrTexture);
    frameBuffer.bind(renderer);
    ssrPass.render(renderer);

    if (this._physicallyCorrect) {
        frameBuffer.attach(this._currentTexture);
        blendPass.setUniform('texture1', this._prevTexture);
        blendPass.setUniform('texture2', ssrTexture);
        blendPass.material.set({
            'weight1': frame >= 1 ? 0.9 : 0,
            'weight2': frame >= 1 ? 0.1 : 0.1
        });
        blendPass.render(renderer);
    }

    frameBuffer.attach(texture2);
    blurPass1.setUniform('texture', this._physicallyCorrect ? this._currentTexture : ssrTexture);
    blurPass1.render(renderer);

    frameBuffer.attach(texture3);
    blurPass2.setUniform('texture', texture2);
    blurPass2.render(renderer);
    frameBuffer.unbind(renderer);

    if (this._physicallyCorrect) {
        var tmp = this._prevTexture;
        this._prevTexture = this._currentTexture;
        this._currentTexture = tmp;
    }
};

SSRPass.prototype.getTargetTexture = function () {
    return this._texture3;
};

SSRPass.prototype.setParameter = function (name, val) {
    if (name === 'maxIteration') {
        this._ssrPass.material.define('fragment', 'MAX_ITERATION', val);
    }
    else {
        this._ssrPass.setUniform(name, val);
    }
};

SSRPass.prototype.setPhysicallyCorrect = function (isPhysicallyCorrect) {
    if (isPhysicallyCorrect) {
        if (!this._normalDistribution) {
            this._normalDistribution = cubemapUtil.generateNormalDistribution(64, this._totalSamples);
        }
        this._ssrPass.material.define('fragment', 'PHYSICALLY_CORRECT');
        this._ssrPass.material.set('normalDistribution', this._normalDistribution);
        this._ssrPass.material.set('normalDistributionSize', [64, this._totalSamples]);
    }
    else {
        this._ssrPass.material.undefine('fragment', 'PHYSICALLY_CORRECT');
    }

    this._physicallyCorrect = isPhysicallyCorrect;
};

SSRPass.prototype.setSSAOTexture = function (texture) {
    var blendPass = this._blurPass2;
    if (texture) {
        blendPass.material.enableTexture('ssaoTex');
        blendPass.material.set('ssaoTex', texture);
    }
    else {
        blendPass.material.disableTexture('ssaoTex');
    }
};

SSRPass.prototype.isFinished = function (frame) {
    if (this._physicallyCorrect) {
        return frame > (this._totalSamples / this._samplePerFrame);
    }
    else {
        return true;
    }
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