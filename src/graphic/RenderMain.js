// TODO Default parameter of postEffect

import Scene from 'claygl/src/Scene';
import ShadowMapPass from 'claygl/src/prePass/ShadowMap';
import PerspectiveCamera from 'claygl/src/camera/Perspective';
import OrthographicCamera from 'claygl/src/camera/Orthographic';
import Matrix4 from 'claygl/src/math/Matrix4';
import Vector3 from 'claygl/src/math/Vector3';
import Vector2 from 'claygl/src/math/Vector2';

import notifier from 'claygl/src/core/mixin/notifier';

import EffectCompositor from './EffectCompositor';
import TemporalSuperSampling from './TemporalSuperSampling';
import halton from './halton';

function RenderMain(renderer, enableShadow, projection) {

    this.renderer = renderer;

    projection = projection || 'perspective';

    /**
     * @type {clay.Scene}
     */
    this.scene = new Scene();

    /**
     * @type {clay.Node}
     */
    this.rootNode = this.scene;

    this.viewport = {
        x: 0, y: 0, width: 0, height: 0
    };

    this.preZ = false;

    this.setProjection(projection);

    this._compositor = new EffectCompositor();

    this._temporalSS = new TemporalSuperSampling();

    if (enableShadow) {
        this._shadowMapPass = new ShadowMapPass({
            lightFrustumBias: 20
        });
    }

    var pcfKernels = [];
    var off = 0;
    for (var i = 0; i < 30; i++) {
        var pcfKernel = [];
        for (var k = 0; k < 6; k++) {
            pcfKernel.push(halton(off, 2) * 4.0 - 2.0);
            pcfKernel.push(halton(off, 3) * 4.0 - 2.0);
            off++;
        }
        pcfKernels.push(pcfKernel);
    }
    this._pcfKernels = pcfKernels;

    this._enableTemporalSS = 'auto';

    this.scene.on('beforerender', function (renderer, scene, camera) {
        if (this.needsTemporalSS()) {
            this._temporalSS.jitterProjection(renderer, camera);
        }
    }, this);
}

/**
 * Set camera type of group
 * @param {string} cameraType 'perspective' | 'orthographic'
 */
RenderMain.prototype.setProjection = function (projection) {
    var oldCamera = this.camera;
    oldCamera && oldCamera.update();
    if (projection === 'perspective') {
        if (!(this.camera instanceof PerspectiveCamera)) {
            this.camera = new PerspectiveCamera();
            if (oldCamera) {
                this.camera.setLocalTransform(oldCamera.localTransform);
            }
        }
    }
    else {
        if (!(this.camera instanceof OrthographicCamera)) {
            this.camera = new OrthographicCamera();
            if (oldCamera) {
                this.camera.setLocalTransform(oldCamera.localTransform);
            }
        }
    }
    this.camera.near = 0.1;
    this.camera.far = 2000;
};

/**
 * Set viewport of group
 * @param {number} x Viewport left bottom x
 * @param {number} y Viewport left bottom y
 * @param {number} width Viewport height
 * @param {number} height Viewport height
 * @param {number} [dpr=1]
 */
RenderMain.prototype.setViewport = function (x, y, width, height, dpr) {
    if (this.camera instanceof PerspectiveCamera) {
        this.camera.aspect = width / height;
    }
    dpr = dpr || 1;

    this.viewport.x = x;
    this.viewport.y = y;
    this.viewport.width = width;
    this.viewport.height = height;
    this.viewport.devicePixelRatio = dpr;

    // Source and output of compositor use high dpr texture.
    // But the intermediate texture of bloom, dof effects use fixed 1.0 dpr
    this._compositor.resize(width * dpr, height * dpr);
    this._temporalSS.resize(width * dpr, height * dpr);
};

/**
 * If contain screen point x, y
 * @param {number} x offsetX
 * @param {number} y offsetY
 * @return {boolean}
 */
RenderMain.prototype.containPoint = function (x, y) {
    var viewport = this.viewport;
    var height = this.layer.renderer.getHeight();
    // Flip y;
    y = height - y;
    return x >= viewport.x && y >= viewport.y
        && x <= viewport.x + viewport.width && y <= viewport.y + viewport.height;
};

/**
 * Cast a ray
 * @param {number} x offsetX
 * @param {number} y offsetY
 * @param {clay.math.Ray} out
 * @return {clay.math.Ray}
 */
var ndc = new Vector2();
RenderMain.prototype.castRay = function (x, y, out) {
    var renderer = this.layer.renderer;

    var oldViewport = renderer.viewport;
    renderer.viewport = this.viewport;
    renderer.screenToNDC(x, y, ndc);
    this.camera.castRay(ndc, out);
    renderer.viewport = oldViewport;

    return out;
};

/**
 * Prepare and update scene before render
 */
RenderMain.prototype.prepareRender = function () {
    this.scene.update();
    this.scene.updateLights();
    this.scene.updateRenderList(this.camera);

    this.camera.update();

    this._frame = 0;
    this._temporalSS.resetFrame();

    var lights = this.scene.getLights();
    for (var i = 0; i < lights.length; i++) {
        if (lights[i].cubemap) {
            if (this._compositor && this._compositor.isSSREnabled()) {
                lights[i].invisible = true;
            }
            else {
                lights[i].invisible = false;
            }
        }
    }
};

RenderMain.prototype.render = function (accumulating) {
    this._doRender(accumulating, this._frame);
    this._frame++;
};

RenderMain.prototype.needsAccumulate = function () {
    return this.needsTemporalSS() || this._needsSortProgressively;
};

RenderMain.prototype.needsTemporalSS = function () {
    var enableTemporalSS = this._enableTemporalSS;
    if (enableTemporalSS === 'auto') {
        enableTemporalSS = this._enablePostEffect;
    }
    return enableTemporalSS;
};

RenderMain.prototype.hasDOF = function () {
    return this._enableDOF;
};

RenderMain.prototype.isAccumulateFinished = function () {
    var frame = this._frame;
    return !(this.needsTemporalSS() && !this._temporalSS.isFinished(frame))
        && !(this._compositor && !this._compositor.isSSAOFinished(frame))
        && !(this._compositor && !this._compositor.isSSRFinished(frame))
        && !(this._compositor && frame < 30);
};

RenderMain.prototype._doRender = function (accumulating, accumFrame) {

    var scene = this.scene;
    var camera = this.camera;
    var renderer = this.renderer;

    accumFrame = accumFrame || 0;

    if (!accumulating && this._shadowMapPass) {
        this._shadowMapPass.kernelPCF = this._pcfKernels[0];
        // Not render shadowmap pass in accumulating frame.
        this._shadowMapPass.render(renderer, scene, camera, true);
    }

    this._updateShadowPCFKernel(accumFrame);

    // Shadowmap will set clearColor.
    renderer.gl.clearColor(0.0, 0.0, 0.0, 0.0);

    if (this._enablePostEffect) {
        // normal render also needs to be jittered when have edge pass.
        if (this.needsTemporalSS()) {
            this._temporalSS.jitterProjection(renderer, camera);
        }
        this._compositor.updateNormal(renderer, scene, camera, this._temporalSS.getFrame());
    }

    // Always update SSAO to make sure have correct ssaoMap status
    this._updateSSAO(renderer, scene, camera, this._temporalSS.getFrame());

    var frameBuffer;
    if (this._enablePostEffect) {

        frameBuffer = this._compositor.getSourceFrameBuffer();
        frameBuffer.bind(renderer);
        renderer.gl.clear(renderer.gl.DEPTH_BUFFER_BIT | renderer.gl.COLOR_BUFFER_BIT);
        // FIXME Enable pre z will make alpha test failed
        renderer.render(scene, camera, true, this.preZ);
        this.afterRenderScene(renderer, scene, camera);
        frameBuffer.unbind(renderer);

        if (this.needsTemporalSS() && accumulating) {
            this._compositor.composite(renderer, scene, camera, this._temporalSS.getSourceFrameBuffer(), this._temporalSS.getFrame());
            renderer.setViewport(this.viewport);
            this._temporalSS.render(renderer);
        }
        else {
            renderer.setViewport(this.viewport);
            this._compositor.composite(renderer, scene, camera, null, 0);
        }
    }
    else {
        if (this.needsTemporalSS() && accumulating) {
            frameBuffer = this._temporalSS.getSourceFrameBuffer();
            frameBuffer.bind(renderer);
            renderer.saveClear();
            renderer.clearBit = renderer.gl.DEPTH_BUFFER_BIT | renderer.gl.COLOR_BUFFER_BIT;
            renderer.render(scene, camera, true, this.preZ);
            this.afterRenderScene(renderer, scene, camera);
            renderer.restoreClear();
            frameBuffer.unbind(renderer);
            renderer.setViewport(this.viewport);
            this._temporalSS.render(renderer);
        }
        else {
            renderer.setViewport(this.viewport);
            renderer.render(scene, camera, true, this.preZ);
            this.afterRenderScene(renderer, scene, camera);
        }
    }

    this.afterRenderAll(renderer, scene, camera);

    // this._compositor._gBufferPass.renderDebug(renderer, camera, 'normal');
    // this._shadowMapPass.renderDebug(renderer);
};

RenderMain.prototype.afterRenderScene = function (renderer, scene, camera) {};
RenderMain.prototype.afterRenderAll = function (renderer, scene, camera) {};

RenderMain.prototype._updateSSAO = function (renderer, scene, camera, frame) {
    var ifEnableSSAO = this._enableSSAO && this._enablePostEffect;
    var compositor = this._compositor;
    if (ifEnableSSAO) {
        this._compositor.updateSSAO(renderer, scene, camera, this._temporalSS.getFrame());
    }

    function updateQueue(queue) {
        for (var i = 0; i < queue.length; i++) {
            var renderable = queue[i];
            renderable.material[ifEnableSSAO ? 'enableTexture' : 'disableTexture']('ssaoMap');
            if (ifEnableSSAO) {
                renderable.material.set('ssaoMap', compositor.getSSAOTexture());
            }
        }
    }
    updateQueue(scene.getRenderList(camera).opaque);
    updateQueue(scene.getRenderList(camera).transparent);
};

RenderMain.prototype._updateShadowPCFKernel = function (frame) {
    var pcfKernel = this._pcfKernels[frame % this._pcfKernels.length];
    function updateQueue(queue) {
        for (var i = 0; i < queue.length; i++) {
            if (queue[i].receiveShadow) {
                queue[i].material.set('pcfKernel', pcfKernel);
                if (queue[i].material) {
                    queue[i].material.define('fragment', 'PCF_KERNEL_SIZE', pcfKernel.length / 2);
                }
            }
        }
    }
    updateQueue(this.scene.getRenderList(this.camera).opaque);
    updateQueue(this.scene.getRenderList(this.camera).transparent);
};

RenderMain.prototype.dispose = function (renderer) {
    this._compositor.dispose(renderer);
    this._temporalSS.dispose(renderer);
    if (this._shadowMapPass) {
        this._shadowMapPass.dispose(renderer);
    }
};

RenderMain.prototype.setPostEffect = function (opts, api) {
    var compositor = this._compositor;
    opts = opts || {};
    this._enablePostEffect = !!opts.enable;
    var bloomOpts = opts.bloom || {};
    var edgeOpts = opts.edge || {};
    var dofOpts = opts.depthOfField || {};
    var ssaoOpts = opts.screenSpaceAmbientOcclusion || {};
    var ssrOpts = opts.screenSpaceReflection || {};
    var fxaaOpts = opts.FXAA || {};
    var colorCorrOpts = opts.colorCorrection || {};
    bloomOpts.enable ? compositor.enableBloom() : compositor.disableBloom();
    dofOpts.enable ? compositor.enableDOF() : compositor.disableDOF();
    ssrOpts.enable ? compositor.enableSSR() : compositor.disableSSR();
    colorCorrOpts.enable ? compositor.enableColorCorrection() : compositor.disableColorCorrection();
    edgeOpts.enable ? compositor.enableEdge() : compositor.disableEdge();
    fxaaOpts.enable ? compositor.enableFXAA() : compositor.disableFXAA();

    this._enableDOF = dofOpts.enable;
    this._enableSSAO = ssaoOpts.enable;

    this._enableSSAO ? compositor.enableSSAO() : compositor.disableSSAO();

    compositor.setBloomIntensity(bloomOpts.intensity);
    compositor.setEdgeColor(edgeOpts.color);
    compositor.setColorLookupTexture(colorCorrOpts.lookupTexture, api);
    compositor.setExposure(colorCorrOpts.exposure);

    ['radius', 'quality', 'intensity'].forEach(function (name) {
        compositor.setSSAOParameter(name, ssaoOpts[name]);
    });
    ['quality', 'maxRoughness'].forEach(function (name) {
        compositor.setSSRParameter(name, ssrOpts[name]);
    });
    ['quality', 'focalDistance', 'focalRange', 'blurRadius', 'fstop'].forEach(function (name) {
        compositor.setDOFParameter(name, dofOpts[name]);
    });
    ['brightness', 'contrast', 'saturation'].forEach(function (name) {
        compositor.setColorCorrection(name, colorCorrOpts[name]);
    });
};

RenderMain.prototype.isDOFEnabled = function () {
    return this._enablePostEffect && this._enableDOF;
}

RenderMain.prototype.setDOFFocusOnPoint = function (depth) {
    if (this._enablePostEffect) {

        if (depth > this.camera.far || depth < this.camera.near) {
            return;
        }

        this._compositor.setDOFParameter('focalDistance', depth);
        return true;
    }
};

RenderMain.prototype.setTemporalSuperSampling = function (temporalSuperSamplingOpt) {
    temporalSuperSamplingOpt = temporalSuperSamplingOpt || {};
    this._enableTemporalSS = temporalSuperSamplingOpt.enable;
};

RenderMain.prototype.isLinearSpace = function () {
    return this._enablePostEffect;
};

RenderMain.prototype.setRootNode = function (rootNode) {
    if (this.rootNode === rootNode) {
        return;
    }
    var children = this.rootNode.children();
    for (var i = 0; i < children.length; i++) {
        rootNode.add(children[i]);
    }
    if (rootNode !== this.scene) {
        this.scene.add(rootNode);
    }

    this.rootNode = rootNode;
};
// Proxies
RenderMain.prototype.add = function (node3D) {
    this.rootNode.add(node3D);
};
RenderMain.prototype.remove = function (node3D) {
    this.rootNode.remove(node3D);
};
RenderMain.prototype.removeAll = function (node3D) {
    this.rootNode.removeAll(node3D);
};

export default RenderMain;