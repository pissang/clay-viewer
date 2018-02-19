import Shader from 'claygl/src/Shader';
import Texture2D from 'claygl/src/Texture2D';
import Texture from 'claygl/src/Texture';
import FrameBuffer from 'claygl/src/FrameBuffer';
import createCompositor from 'claygl/src/compositor/createCompositor';
import SSAOPass from './SSAOPass';
import SSRPass from './SSRPass';
import poissonKernel from './poissonKernel';
import GBuffer from 'claygl/src/deferred/GBuffer';
// import EdgePass from './EdgePass';
import Matrix4 from 'claygl/src/math/Matrix4';
import graphicHelper from './helper';

import effectJson from './composite.js';

import blurGLSL from 'claygl/src/shader/source/compositor/blur.glsl.js';
import outputGLSL from 'claygl/src/shader/source/compositor/output.glsl.js';
import brightGLSL from 'claygl/src/shader/source/compositor/bright.glsl.js';
import downsampleGLSL from 'claygl/src/shader/source/compositor/downsample.glsl.js';
import upsampleGLSL from 'claygl/src/shader/source/compositor/upsample.glsl.js';
import hdrGLSL from 'claygl/src/shader/source/compositor/hdr.glsl.js';
import blendGLSL from 'claygl/src/shader/source/compositor/blend.glsl.js';
import fxaaGLSL from 'claygl/src/shader/source/compositor/fxaa.glsl.js';

import gbufferGLSL from 'claygl/src/shader/source/deferred/gbuffer.glsl.js';
import dofGLSL from './DOF.glsl.js';
import edgeGLSL from './edge.glsl.js';

Shader['import'](blurGLSL);
Shader['import'](outputGLSL);
Shader['import'](brightGLSL);
Shader['import'](downsampleGLSL);
Shader['import'](upsampleGLSL);
Shader['import'](hdrGLSL);
Shader['import'](blendGLSL);
Shader['import'](fxaaGLSL);
Shader['import'](gbufferGLSL);
Shader['import'](dofGLSL);
Shader['import'](edgeGLSL);

var PHYSICALLY_CORRECTED_SSR = true;

var commonOutputs = {
    color: {
        parameters: {
            width: function (renderer) {
                return renderer.getWidth();
            },
            height: function (renderer) {
                return renderer.getHeight();
            }
        }
    }
}

var FINAL_NODES_CHAIN = ['composite', 'FXAA'];

function EffectCompositor() {
    this._sourceTexture = new Texture2D({
        type: Texture.HALF_FLOAT
    });
    this._depthTexture = new Texture2D({
        format: Texture.DEPTH_COMPONENT,
        type: Texture.UNSIGNED_INT
    });

    this._framebuffer = new FrameBuffer();
    this._framebuffer.attach(this._sourceTexture);
    this._framebuffer.attach(this._depthTexture, FrameBuffer.DEPTH_ATTACHMENT);

    this._gBufferPass = new GBuffer({
        enableTargetTexture3: PHYSICALLY_CORRECTED_SSR
    });

    this._compositor = createCompositor(effectJson);

    var sourceNode = this._compositor.getNodeByName('source');
    sourceNode.texture = this._sourceTexture;
    var cocNode = this._compositor.getNodeByName('coc');

    this._sourceNode = sourceNode;
    this._cocNode = cocNode;
    this._compositeNode = this._compositor.getNodeByName('composite');
    this._fxaaNode = this._compositor.getNodeByName('FXAA');

    this._dofBlurNodes = ['dof_far_blur', 'dof_near_blur', 'dof_coc_blur'].map(function (name) {
        return this._compositor.getNodeByName(name);
    }, this);

    this._dofBlurKernel = null;
    this._dofBlurKernelSize = new Float32Array(0);

    this._finalNodesChain = FINAL_NODES_CHAIN.map(function (name) {
        return this._compositor.getNodeByName(name);
    }, this);

    var gBufferObj = {
        normalTexture: this._gBufferPass.getTargetTexture1(),
        depthTexture: this._gBufferPass.getTargetTexture2(),
        albedoTexture: PHYSICALLY_CORRECTED_SSR ? this._gBufferPass.getTargetTexture3() : null
    };
    this._ssaoPass = new SSAOPass(gBufferObj);
    this._ssrPass = new SSRPass(gBufferObj);
    this._ssrPass.setPhysicallyCorrect(PHYSICALLY_CORRECTED_SSR);
}

EffectCompositor.prototype.resize = function (width, height, dpr) {
    dpr = dpr || 1;
    width = width * dpr;
    height = height * dpr;
    var sourceTexture = this._sourceTexture;
    var depthTexture = this._depthTexture;

    sourceTexture.width = width;
    sourceTexture.height = height;
    depthTexture.width = width;
    depthTexture.height = height;

    this._gBufferPass.resize(width, height);
};

EffectCompositor.prototype._ifRenderNormalPass = function () {
    return this._enableSSAO || this._enableEdge || this._enableSSR;
};

EffectCompositor.prototype._getPrevNode = function (node) {
    var idx = FINAL_NODES_CHAIN.indexOf(node.name) - 1;
    var prevNode = this._finalNodesChain[idx];
    while (prevNode && !this._compositor.getNodeByName(prevNode.name)) {
        idx -= 1;
        prevNode = this._finalNodesChain[idx];
    }
    return prevNode;
};
EffectCompositor.prototype._getNextNode = function (node) {
    var idx = FINAL_NODES_CHAIN.indexOf(node.name) + 1;
    var nextNode = this._finalNodesChain[idx];
    while (nextNode && !this._compositor.getNodeByName(nextNode.name)) {
        idx += 1;
        nextNode = this._finalNodesChain[idx];
    }
    return nextNode;
};
EffectCompositor.prototype._addChainNode = function (node) {
    var prevNode = this._getPrevNode(node);
    var nextNode = this._getNextNode(node);
    if (!prevNode) {
        return;
    }

    prevNode.outputs = commonOutputs;
    node.inputs.texture = prevNode.name;
    if (nextNode) {
        node.outputs = commonOutputs;
        nextNode.inputs.texture = node.name;
    }
    else {
        node.outputs = null;
    }
    this._compositor.addNode(node);
};
EffectCompositor.prototype._removeChainNode = function (node) {
    var prevNode = this._getPrevNode(node);
    var nextNode = this._getNextNode(node);
    if (!prevNode) {
        return;
    }

    if (nextNode) {
        prevNode.outputs = commonOutputs;
        nextNode.inputs.texture = prevNode.name;
    }
    else {
        prevNode.outputs = null;
    }
    this._compositor.removeNode(node);
};
/**
 * Update normal
 */
EffectCompositor.prototype.updateNormal = function (renderer, scene, camera, frame) {
    if (this._ifRenderNormalPass()) {
        this._gBufferPass.update(renderer, scene, camera);
    }
};

/**
 * Render SSAO after render the scene, before compositing
 */
EffectCompositor.prototype.updateSSAO = function (renderer, scene, camera, frame) {
    this._ssaoPass.update(renderer, camera, frame);
};

/**
 * Enable SSAO effect
 */
EffectCompositor.prototype.enableSSAO = function () {
    this._enableSSAO = true;
};

/**
 * Disable SSAO effect
 */
EffectCompositor.prototype.disableSSAO = function () {
    this._enableSSAO = false;
};

/**
 * Enable SSR effect
 */
EffectCompositor.prototype.enableSSR = function () {
    this._enableSSR = true;
};
/**
 * Disable SSR effect
 */
EffectCompositor.prototype.disableSSR = function () {
    this._enableSSR = false;
};

/**
 * Render SSAO after render the scene, before compositing
 */
EffectCompositor.prototype.getSSAOTexture = function (renderer, scene, camera, frame) {
    return this._ssaoPass.getTargetTexture();
};

/**
 * @return {clay.FrameBuffer}
 */
EffectCompositor.prototype.getSourceFrameBuffer = function () {
    return this._framebuffer;
};

/**
 * @return {clay.Texture2D}
 */
EffectCompositor.prototype.getSourceTexture = function () {
    return this._sourceTexture;
};

/**
 * Disable fxaa effect
 */
EffectCompositor.prototype.disableFXAA = function () {
    this._removeChainNode(this._fxaaNode);
};

/**
 * Enable fxaa effect
 */
EffectCompositor.prototype.enableFXAA = function () {
    this._addChainNode(this._fxaaNode);
};

/**
 * Enable bloom effect
 */
EffectCompositor.prototype.enableBloom = function () {
    this._compositeNode.inputs.bloom = 'bloom_composite';
    this._compositor.dirty();
};

/**
 * Disable bloom effect
 */
EffectCompositor.prototype.disableBloom = function () {
    this._compositeNode.inputs.bloom = null;
    this._compositor.dirty();
};

/**
 * Enable depth of field effect
 */
EffectCompositor.prototype.enableDOF = function () {
    this._compositeNode.inputs.texture = 'dof_composite';
    this._compositor.dirty();
};
/**
 * Disable depth of field effect
 */
EffectCompositor.prototype.disableDOF = function () {
    this._compositeNode.inputs.texture = 'source';
    this._compositor.dirty();
};

/**
 * Enable color correction
 */
EffectCompositor.prototype.enableColorCorrection = function () {
    this._compositeNode.define('COLOR_CORRECTION');
    this._enableColorCorrection = true;
};
/**
 * Disable color correction
 */
EffectCompositor.prototype.disableColorCorrection = function () {
    this._compositeNode.undefine('COLOR_CORRECTION');
    this._enableColorCorrection = false;
};

/**
 * Enable edge detection
 */
EffectCompositor.prototype.enableEdge = function () {
    this._enableEdge = true;
};

/**
 * Disable edge detection
 */
EffectCompositor.prototype.disableEdge = function () {
    this._enableEdge = false;
};

/**
 * Set bloom intensity
 * @param {number} value
 */
EffectCompositor.prototype.setBloomIntensity = function (value) {
    if (value == null) {
        return;
    }
    this._compositeNode.setParameter('bloomIntensity', value);
};

EffectCompositor.prototype.setSSAOParameter = function (name, value) {
    if (value == null) {
        return;
    }
    switch (name) {
        case 'quality':
            // PENDING
            var kernelSize = ({
                low: 6,
                medium: 12,
                high: 32,
                ultra: 62
            })[value] || 12;
            this._ssaoPass.setParameter('kernelSize', kernelSize);
            break;
        case 'radius':
            this._ssaoPass.setParameter(name, value);
            this._ssaoPass.setParameter('bias', value / 50);
            break;
        case 'intensity':
            this._ssaoPass.setParameter(name, value);
            break;
    }
};

EffectCompositor.prototype.setDOFParameter = function (name, value) {
    if (value == null) {
        return;
    }
    switch (name) {
        case 'focalDistance':
        case 'focalRange':
        case 'fstop':
            this._cocNode.setParameter(name, value);
            break;
        case 'blurRadius':
            for (var i = 0; i < this._dofBlurNodes.length; i++) {
                this._dofBlurNodes[i].setParameter('blurRadius', value);
            }
            break;
        case 'quality':
            var kernelSize = ({
                low: 4, medium: 8, high: 16, ultra: 32
            })[value] || 8;
            this._dofBlurKernelSize = kernelSize;
            for (var i = 0; i < this._dofBlurNodes.length; i++) {
                this._dofBlurNodes[i].define('POISSON_KERNEL_SIZE', kernelSize);
            }
            this._dofBlurKernel = new Float32Array(kernelSize * 2);
            break;
    }
};

EffectCompositor.prototype.setSSRParameter = function (name, value) {
    if (value == null) {
        return;
    }
    switch (name) {
        case 'quality':
            // PENDING
            var maxIteration = ({
                low: 10,
                medium: 20,
                high: 40,
                ultra: 80
            })[value] || 20;
            var pixelStride = ({
                low: 32,
                medium: 16,
                high: 8,
                ultra: 4
            })[value] || 16;
            this._ssrPass.setParameter('maxIteration', maxIteration);
            this._ssrPass.setParameter('pixelStride', pixelStride);
            break;
        case 'maxRoughness':
            this._ssrPass.setParameter('minGlossiness', Math.max(Math.min(1.0 - value, 1.0), 0.0));
            break;
        default:
            console.warn('Unkown SSR parameter ' + name);
    }
}
;
/**
 * Set color of edge
 */
EffectCompositor.prototype.setEdgeColor = function (value) {
    // if (value == null) {
    //     return;
    // }
    // this._edgePass.setParameter('edgeColor', value);
};

EffectCompositor.prototype.setExposure = function (value) {
    if (value == null) {
        return;
    }
    this._compositeNode.setParameter('exposure', Math.pow(2, value));
};

EffectCompositor.prototype.setColorLookupTexture = function (image, api) {
    this._compositeNode.pass.material.setTextureImage('lut', this._enableColorCorrection ? image : 'none', api, {
        minFilter: Texture.NEAREST,
        magFilter: Texture.NEAREST,
        flipY: false
    });
};
EffectCompositor.prototype.setColorCorrection = function (type, value) {
    this._compositeNode.setParameter(type, value);
};

EffectCompositor.prototype.composite = function (renderer, scene, camera, framebuffer, frame) {

    var sourceTexture = this._sourceTexture;
    var targetTexture = sourceTexture;

    if (this._enableSSR) {
        this._ssrPass.update(renderer, camera, sourceTexture, frame);
        targetTexture = this._ssrPass.getTargetTexture();

        this._ssrPass.setSSAOTexture(
            this._enableSSAO ? this._ssaoPass.getTargetTexture() : null
        );
        var lights = scene.getLights();
        for (var i = 0; i < lights.length; i++) {
            if (lights[i].cubemap) {
                this._ssrPass.setAmbientCubemap(lights[i].cubemap, lights[i].intensity);
            }
        }
    }
    this._sourceNode.texture = targetTexture;

    this._cocNode.setParameter('depth', this._depthTexture);

    var blurKernel = this._dofBlurKernel;
    var blurKernelSize = this._dofBlurKernelSize;
    var frameAll = Math.floor(poissonKernel.length / 2 / blurKernelSize);
    var kernelOffset = frame % frameAll;

    for (var i = 0; i < blurKernelSize * 2; i++) {
        blurKernel[i] = poissonKernel[i + kernelOffset * blurKernelSize * 2];
    }

    for (var i = 0; i < this._dofBlurNodes.length; i++) {
        this._dofBlurNodes[i].setParameter('percent', frame / 30.0);
        this._dofBlurNodes[i].setParameter('poissonKernel', blurKernel);
    }

    this._cocNode.setParameter('zNear', camera.near);
    this._cocNode.setParameter('zFar', camera.far);

    this._compositor.render(renderer, framebuffer);
};

EffectCompositor.prototype.isSSRFinished = function (frame) {
    return this._ssrPass ? this._ssrPass.isFinished(frame) : true;
};

EffectCompositor.prototype.isSSAOFinished = function (frame) {
    return this._ssaoPass ? this._ssaoPass.isFinished(frame) : true;
};

EffectCompositor.prototype.dispose = function (renderer) {
    this._sourceTexture.dispose(renderer);
    this._depthTexture.dispose(renderer);
    this._framebuffer.dispose(renderer);
    this._compositor.dispose(renderer);

    this._gBufferPass.dispose(renderer);
    this._ssaoPass.dispose(renderer);
};

export default EffectCompositor;