import Renderer from 'qtek/src/Renderer';
import GLTF2Loader from 'qtek/src/loader/GLTF2';
import Vector3 from 'qtek/src/math/Vector3';
import Animation from 'qtek/src/animation/Animation';
import meshUtil from 'qtek/src/util/mesh';
import Task from 'qtek/src/async/Task';
import TaskGroup from 'qtek/src/async/TaskGroup';
import util from 'qtek/src/core/util';
import Node from 'qtek/src/Node';
import Mesh from 'qtek/src/Mesh';
import Material from 'qtek/src/Material';
import PlaneGeometry from 'qtek/src/geometry/Plane';
import Shader from 'qtek/src/Shader';
import RayPicking from 'qtek/src/picking/RayPicking';
import notifier from 'qtek/src/core/mixin/notifier';
import shaderLibrary from 'qtek/src/shader/library';

import RenderMain from './graphic/RenderMain';
import graphicHelper from './graphic/helper';
import SceneHelper from './graphic/SceneHelper';
import defaultSceneConfig from './defaultSceneConfig';
import zrUtil from 'zrender/lib/core/util';

import getBoundingBoxWithSkinning from './util/getBoundingBoxWithSkinning';
import OrbitControl from 'qtek/src/plugin/OrbitControl';
import HotspotManager from './HotspotManager';

import groundGLSLCode from './graphic/ground.glsl.js';
Shader.import(groundGLSLCode);

/**
 * @constructor
 * @param {HTMLDivElement} dom Root node
 * @param {Object} [sceneConfig]
 * @param {Object} [sceneConfig.shadow]
 * @param {boolean} [sceneConfig.devicePixelRatio]
 * @param {Object} [sceneConfig.postEffect]
 * @param {Object} [sceneConfig.mainLight]
 * @param {Object} [sceneConfig.ambientLight]
 * @param {Object} [sceneConfig.ambientCubemapLight]
 */
function Viewer(dom, sceneConfig) {

    sceneConfig = zrUtil.clone(sceneConfig);
    zrUtil.merge(sceneConfig, defaultSceneConfig);

    this.init(dom, sceneConfig);
}

Viewer.prototype.init = function (dom, opts) {
    opts = opts || {};

    /**
     * @type {HTMLDivElement}
     */
    this.root = dom;

    /**
     * @private
     */
    this._animation = new Animation();

    var renderer = new Renderer({
        devicePixelRatio: opts.devicePixelRatio || window.devicePixelRatio
    });
    dom.appendChild(renderer.canvas);
    renderer.canvas.style.cssText = 'position:absolute;left:0;top:0';

    /**
     * @private
     */
    this._renderer = renderer;

    this._renderMain = new RenderMain(renderer, opts.shadow, 'perspective');
    this._renderMain.afterRenderScene = (function (renderer, scene, camera) {
        this.trigger('renderscene', renderer, scene, camera);
    }).bind(this);

    var cameraControl = this._cameraControl = new OrbitControl({
        renderer: renderer,
        animation: this._animation,
        domElement: dom
    });
    cameraControl.target = this._renderMain.camera;
    cameraControl.init();

    this._hotspotManager = new HotspotManager({
        dom: dom,
        renderer: renderer,
        camera: this._renderMain.camera
    });

    /**
     * List of skeletons
     */
    this._skeletons = [];
    /**
     * List of animation clips
     */
    this._clips = [];
    /**
     * Map of materials
     */
    this._materialsMap = {};

    this._sceneHelper = new SceneHelper(this._renderMain.scene);
    this._sceneHelper.initLight(this._renderMain.scene);

    this.resize();

    if (opts.postEffect) {
        this.setPostEffect(opts.postEffect);
    }
    if (opts.mainLight) {
        this.setMainLight(opts.mainLight);
    }
    if (opts.secondaryLight) {
        this.setSecondaryLight(opts.secondaryLight);
    }
    if (opts.tertiaryLight) {
        this.setTertiaryLight(opts.tertiaryLight);
    }
    if (opts.ambientCubemapLight) {
        this.setAmbientCubemapLight(opts.ambientCubemapLight);
    }
    if (opts.ambientLight) {
        this.setAmbientLight(opts.ambientLight);
    }
    if (opts.environment) {
        this.setEnvironment(opts.environment);
    }

    this._createGround();
    if (opts.ground) {
        this.setGround(opts.ground);
    }

    this.setCameraControl({
        distance: 20,
        minDisntance: 2,
        maxDistance: 100,
        center: [0, 0, 0]
    });

    this._initHandlers();

    cameraControl.on('update', function () {
        this.trigger('updatecamera', {
            center: cameraControl.getCenter(),
            alpha: cameraControl.getAlpha(),
            beta: cameraControl.getBeta(),
            distance: cameraControl.getDistance()
        });

        this.refresh();
    }, this);

    this._shaderLibrary = shaderLibrary.createLibrary();
};

Viewer.prototype._createGround = function () {
    var groundMesh = new Mesh({
        isGround: true,
        material: new Material({
            shader: new Shader({
                vertex: Shader.source('qmv.ground.vertex'),
                fragment: Shader.source('qmv.ground.fragment')
            }),
            transparent: true
        }),
        castShadow: false,
        geometry: new PlaneGeometry()
    });
    groundMesh.material.set('color', [1, 1, 1, 1]);
    groundMesh.scale.set(50, 50, 1);
    groundMesh.rotation.rotateX(-Math.PI / 2);
    this._groundMesh = groundMesh;

    this._renderMain.scene.add(groundMesh);
};

Viewer.prototype._addModel = function (modelNode, nodes, skeletons, clips) {
    // Remove previous loaded
    var prevModelNode = this._modelNode;
    if (prevModelNode) {
        this._renderer.disposeNode(prevModelNode);
        this._renderMain.scene.remove(prevModelNode);
    }

    this._skeletons.forEach(function (skeleton) {
        if (skeleton.__debugScene) {
            this._renderer.disposeScene(skeleton.__debugScene);
        }
    }, this);

    this._renderMain.scene.add(modelNode);

    this._skeletons = skeletons.slice();
    this._modelNode = modelNode;

    this._setAnimationClips(clips);

    // Not save if glTF has only animation info
    if (nodes && nodes.length) {
        this._nodes = nodes;
    }
    var materialsMap = {};
    modelNode.traverse(function (node) {
        // Save material
        if (node.material) {
            var material = node.material;
            // Avoid name duplicate
            materialsMap[material.name] = materialsMap[material.name] || [];
            materialsMap[material.name].push(material);
        }
    }, this);
    this._materialsMap = materialsMap;

    this._updateMaterialsSRGB();
    
    this._stopAccumulating();
};

Viewer.prototype._setAnimationClips = function (clips) {

    this._clips.forEach(function (clip) {
        this._animation.removeClip(clip);
    }, this);

    var self = this;
    clips.forEach(function (clip) {
        if (!clip.target) {
            clip.target = this._nodes[clip.targetNodeIndex];
        }
        // Override onframe.
        clip.onframe = function () {
            self.refresh();
        };

        this._animation.addClip(clip);
    }, this);

    this._clips = clips.slice();
};

Viewer.prototype._initHandlers = function () {

    this._picking = new RayPicking({
        renderer: this._renderer,
        scene: this._renderMain.scene,
        camera: this._renderMain.camera
    });

    this._clickHandler = this._clickHandler.bind(this);
    this._mouseDownHandler = this._mouseDownHandler.bind(this);

    this.root.addEventListener('mousedown', this._mouseDownHandler);
    this.root.addEventListener('click', this._clickHandler);
};

Viewer.prototype._mouseDownHandler = function (e) {
    this._startX = e.clientX;
    this._startY = e.clientY;
};

Viewer.prototype._clickHandler = function (e) {
    var dx = e.clientX - this._startX;
    var dy = e.clientY - this._startY;
    if (Math.sqrt(dx * dx + dy * dy) >= 10) {
        return;
    }

    var result = this._picking.pick(e.clientX, e.clientY, true);
    if (result) {
        this._renderMain.setDOFFocusOnPoint(result.distance);
        this.trigger('doffocus', result);
        this.refresh();
    }

    if (result && !result.target.isGround) {
        this._selectResult = result;
        this.trigger('select', result);
    }
    else {
        if (this._selectResult) {
            this.trigger('unselect', this._selectResult);
        }
        this._selectResult = null;
    }
};

Viewer.prototype.resize = function () {
    var renderer = this._renderer;
    renderer.resize(this.root.clientWidth, this.root.clientHeight);
    this._renderMain.setViewport(0, 0, renderer.getWidth(), renderer.getHeight(), renderer.getDevicePixelRatio());

    this.refresh();
};

/**
 * Scale model to auto fit the camera.
 */
Viewer.prototype.autoFitModel = function (fitSize) {
    fitSize = fitSize || 10;
    if (this._modelNode) {
        this.setPose(0);
        this._modelNode.update();
        var bbox = getBoundingBoxWithSkinning(this._modelNode);
        bbox.applyTransform(this._modelNode.localTransform);

        var size = new Vector3();
        size.copy(bbox.max).sub(bbox.min);

        var center = new Vector3();
        center.copy(bbox.max).add(bbox.min).scale(0.5);

        var scale = fitSize / Math.max(size.x, size.y, size.z);

        this._modelNode.scale.set(scale, scale, scale);
        this._modelNode.position.copy(center).scale(-scale);

        this._hotspotManager.setBoundingBox(bbox.min._array, bbox.max._array);

        // Fit the ground
        this._groundMesh.position.y = -size.y * scale / 2;
    }
};

/**
 * Load glTF model resource
 * @param {string|Object} gltfFile Model url or json
 * @param {Object} [opts]
 * @param {Object} [opts.shader='lambert'] 'basic'|'lambert'|'standard'
 * @param {boolean} [opts.includeTexture=true]
 * @param {Object} [opts.files] Pre-read files map
 * @param {boolean} [opts.zUpToYUp=false] Change model to y up
 * @param {boolean} [opts.textureFlipY=false]
 */
Viewer.prototype.loadModel = function (gltfFile, opts) {
    opts = opts || {};
    if (!gltfFile) {
        throw new Error('URL of model is not provided');
    }
    var shaderName = opts.shader || 'standard';

    var pathResolver = null;
    if (opts.files) {
        pathResolver = function (uri) {
            if (uri.match(/^data:(.*?)base64,/)) {
                return uri;
            }
            var fileName = uri.substr(uri.lastIndexOf('/') + 1);
            if (opts.files[fileName]) {
                return opts.files[fileName];
            }
            else {
                return fileName;
            }
        };
    }
    var loaderOpts = {
        rootNode: new Node(),
        shaderName: 'qtek.' + shaderName,
        textureRootPath: opts.textureRootPath,
        bufferRootPath: opts.bufferRootPath,
        crossOrigin: 'Anonymous',
        includeTexture: opts.includeTexture == null ? true : opts.includeTexture,
        textureFlipY: opts.textureFlipY,
        shaderLibrary: this._shaderLibrary
    };
    if (pathResolver) {
        loaderOpts.resolveTexturePath =
        loaderOpts.resolveBinaryPath = pathResolver;
    }

    var loader = new GLTF2Loader(loaderOpts);
    if (typeof gltfFile === 'string') {
        loader.load(gltfFile);
    }
    else {
        loader.parse(gltfFile);
    }

    if (opts.zUpToYUp) {
        loader.rootNode.rotation.rotateX(-Math.PI / 2);
    }

    var task = new Task();

    var vertexCount = 0;
    var triangleCount = 0;
    var nodeCount = 0;

    loader.success(function (res) {
        res.rootNode.traverse(function (mesh) {
            nodeCount++;
            if (mesh.geometry) {
                triangleCount += mesh.geometry.triangleCount;
                vertexCount += mesh.geometry.vertexCount;
            }
        });
        this._preprocessModel(res.rootNode, opts);

        this._addModel(res.rootNode, res.nodes, res.skeletons, res.clips);

        this.autoFitModel();

        var stat = {
            triangleCount: triangleCount,
            vertexCount: vertexCount,
            nodeCount: nodeCount,
            meshCount: Object.keys(res.meshes).length,
            materialCount: Object.keys(res.materials).length,
            textureCount: Object.keys(res.textures).length
        };

        task.trigger('loadmodel', stat);
        
        var loadingTextures = [];
        util.each(res.textures, function (texture) {
            if (!texture.isRenderable()) {
                loadingTextures.push(texture);
            }
        });
        var taskGroup = new TaskGroup();
        taskGroup.allSettled(loadingTextures).success(function () {
            task.trigger('ready');
            this.refresh();
        }, this);

        this.refresh();
    }, this);
    loader.error(function () {
        task.trigger('error');
    });

    this._textureFlipY = opts.textureFlipY;
    this._shaderName = shaderName;

    return task;
};

Viewer.prototype.getScene = function () {
    return this._renderMain.scene;
};

Viewer.prototype._preprocessModel = function (rootNode, opts) {

    var alphaCutoff = opts.alphaCutoff != null ? opts.alphaCutoff : 0.95;
    var shaderName = opts.shader || 'standard';
    var shaderLibrary = this._shaderLibrary;

    var meshNeedsSplit = [];
    rootNode.traverse(function (mesh) {
        if (mesh.skeleton) {
            meshNeedsSplit.push(mesh);
        }
    });
    meshNeedsSplit.forEach(function (mesh) {
        meshUtil.splitByJoints(mesh, 15, true, shaderLibrary, 'qtek.' + shaderName);
    }, this);
    rootNode.traverse(function (mesh) {
        if (mesh.geometry) {
            mesh.geometry.updateBoundingBox();
            mesh.culling = false;
        }
        if (mesh.skeleton) {
            // Avoid wrong culling when skinning matrices transforms alot.
            mesh.frustumCulling = false;
        }
        if (mesh.material) {
            mesh.material.shader.define('fragment', 'DIFFUSEMAP_ALPHA_ALPHA');
            mesh.material.shader.define('fragment', 'ALPHA_TEST');
            mesh.material.shader.precision = 'mediump';
            mesh.material.set('alphaCutoff', alphaCutoff);

            mesh.material.set('emission', [0, 0, 0]);

            // Transparent mesh not cast shadow
            if (mesh.material.transparent) {
                mesh.castShadow = false;
            }
        }
    });

};

/**
 * Load animation glTF
 * @param {string} url
 */
Viewer.prototype.loadAnimation = function (url) {
    var loader = new GLTF2Loader({
        rootNode: new Node(),
        crossOrigin: 'Anonymous'
    });
    loader.load(url);
    loader.success(function (res) {
        this._setAnimationClips(res.clips);
        // this.autoFitModel();
    }, this);

    return loader;
};

/**
 * Pause animation
 */
Viewer.prototype.pauseAnimation = function () {
    this._clips.forEach(function (clip) {
        clip.pause();
    });
};

/**
 * Resume animation
 */
Viewer.prototype.resumeAnimation = function () {
    this._clips.forEach(function (clip) {
        clip.resume();
    });
};

/**
 * @param {Object} [opts]
 * @param {number} [opts.distance]
 * @param {number} [opts.minDistance]
 * @param {number} [opts.maxDistance]
 * @param {number} [opts.alpha]
 * @param {number} [opts.beta]
 * @param {number} [opts.minAlpha]
 * @param {number} [opts.maxAlpha]
 * @param {number} [opts.minBeta]
 * @param {number} [opts.maxBeta]
 * @param {number} [opts.rotateSensitivity]
 * @param {number} [opts.panSensitivity]
 * @param {number} [opts.zoomSensitivity]
 */
Viewer.prototype.setCameraControl = function (opts) {
    this._cameraControl.setOption(opts);
    this.refresh();
};

/**
 * @param {Object} [opts]
 * @param {number} [opts.intensity]
 * @param {string} [opts.color]
 * @param {number} [opts.alpha]
 * @param {number} [opts.beta]
 * @param {number} [opts.shadow]
 * @param {number} [opts.shadowQuality]
 */
Viewer.prototype.setMainLight = function (opts) {
    this._sceneHelper.updateMainLight(opts, this);
    this.refresh();
};

/**
 * @param {Object} [opts]
 * @param {number} [opts.intensity]
 * @param {string} [opts.color]
 * @param {number} [opts.alpha]
 * @param {number} [opts.beta]
 * @param {number} [opts.shadow]
 * @param {number} [opts.shadowQuality]
 */
Viewer.prototype.setSecondaryLight = function (opts) {
    this._sceneHelper.updateSecondaryLight(opts, this);
    this.refresh();
};

/**
 * @param {Object} [opts]
 * @param {number} [opts.intensity]
 * @param {string} [opts.color]
 * @param {number} [opts.alpha]
 * @param {number} [opts.beta]
 * @param {number} [opts.shadow]
 * @param {number} [opts.shadowQuality]
 */
Viewer.prototype.setTertiaryLight = function (opts) {
    this._sceneHelper.updateTertiaryLight(opts, this);
    this.refresh();
};

/**
 * @param {Object} [opts]
 * @param {number} [opts.intensity]
 * @param {string} [opts.color]
 */
Viewer.prototype.setAmbientLight = function (opts) {
    this._sceneHelper.updateAmbientLight(opts, this);
    this.refresh();
};
/**
 * @param {Object} [opts]
 * @param {Object} [opts.texture]
 * @param {Object} [opts.exposure]
 * @param {number} [opts.diffuseIntensity]
 * @param {number} [opts.specularIntensity]
 */
Viewer.prototype.setAmbientCubemapLight = function (opts) {
    this._sceneHelper.updateAmbientCubemapLight(opts, this);
    this.refresh();
};

/**
 * @param {string} envUrl
 */
Viewer.prototype.setEnvironment = function (envUrl) {
    this._sceneHelper.updateSkybox(envUrl, this._renderMain.isLinearSpace(), this);
};

/**
 * @param {string} matName
 * @param {Object} materialCfg
 * @param {boolean} [materialCfg.transparent]
 * @param {boolean} [materialCfg.alphaCutoff]
 * @param {boolean} [materialCfg.metalness]
 * @param {boolean} [materialCfg.roughness]
 */
Viewer.prototype.setMaterial = function (matName, materialCfg) {
    materialCfg = materialCfg || {};
    var materials = this._materialsMap[matName];
    var app = this;
    var textureFlipY = this._textureFlipY;
    if (!materials || !materials.length) {
        console.warn('Material %s not exits', name);
        return;
    }

    var enabledTextures = materials[0].shader.getEnabledTextures();

    function haveTexture(val) {
        return val && val !== 'none';
    }

    function addTexture(propName) {
        // Not change if texture name is not in the config.
        if (propName in materialCfg) {
            var idx = enabledTextures.indexOf(propName);
            if (haveTexture(materialCfg[propName])) {
                var texture = graphicHelper.loadTexture(materialCfg[propName], app, {
                    flipY: textureFlipY,
                    anisotropic: 8
                }, function () {
                    app.refresh();
                });
                textures[propName] = texture;
                // Enable texture.
                if (idx < 0) {
                    enabledTextures.push(propName);
                }
            }
            else {
                // Disable texture.
                if (idx >= 0) {
                    enabledTextures.splice(idx, 1);
                }
            }
        }
    }
    var textures = {};
    ['diffuseMap', 'normalMap', 'emissiveMap'].forEach(function (propName) {
        addTexture(propName);
    }, this);
    if (materials[0].shader.isDefined('fragment', 'USE_METALNESS')) {
        ['metalnessMap', 'roughnessMap'].forEach(function (propName) {
            addTexture(propName);
        }, this);
    }
    else {
        ['specularMap', 'glossinessMap'].forEach(function (propName) {
            addTexture(propName);
        }, this);
    }

    if (textures.normalMap) {
        this._modelNode.traverse(function (mesh) {
            if (mesh.material && mesh.material.name === matName) {
                mesh.geometry.generateTangents();       
            }
        });
    }
    materials.forEach(function (mat) {
        if (materialCfg.transparent != null) {
            mat.transparent = !!materialCfg.transparent;
            mat.depthMask = !materialCfg.transparent;
        }
        ['color', 'emission', 'specularColor'].forEach(function (propName) {
            if (materialCfg[propName] != null) {
                mat.set(propName, graphicHelper.parseColor(materialCfg[propName]));
            }
        });
        ['alphaCutoff', 'metalness', 'roughness', 'glossiness', 'emissionIntensity', 'uvRepeat'].forEach(function (propName) {
            if (materialCfg[propName] != null) {
                mat.set(propName, materialCfg[propName]);
            }
        });
        for (var texName in textures) {
            mat.set(texName, textures[texName]);
        }
        mat.attachShader(this._shaderLibrary.get('qtek.' + (this._shaderName || 'standard'), {
            fragmentDefines: mat.shader.fragmentDefines,
            textures: enabledTextures,
            vertexDefines: mat.shader.vertexDefines,
            precision: mat.shader.precision
        }), true);
    }, this);
    this.refresh();
};

/**
 * @param {string} name
 */
Viewer.prototype.getMaterial = function (name) {
    var materials = this._materialsMap[name];
    if (!materials) {
        console.warn('Material %s not exits', name);
        return;
    }
    var mat = materials[0];
    var materialCfg = {
        name: name
    };
    ['color', 'emission'].forEach(function (propName) {
        materialCfg[propName] = graphicHelper.stringifyColor(mat.get(propName), 'hex');
    });
    ['alphaCutoff', 'emissionIntensity', 'uvRepeat'].forEach(function (propName) {
        materialCfg[propName] = mat.get(propName);
    });
    function getTextureUri(propName) {
        var texture = mat.get(propName);
        if (texture && texture.image && texture.image.src && texture.isRenderable()) {
            return texture.image.src;
        }
        else {
            return '';
        }
    }
    ['diffuseMap', 'normalMap', 'emissiveMap'].forEach(function (propName) {
        materialCfg[propName] = getTextureUri(propName);
    });
    if (mat.shader.isDefined('fragment', 'USE_METALNESS')) {
        ['metalness', 'roughness'].forEach(function (propName) {
            materialCfg[propName] = mat.get(propName);
        });
        ['metalnessMap', 'roughnessMap'].forEach(function (propName) {
            materialCfg[propName] = getTextureUri(propName);
        });
    }
    else {
        materialCfg.specularColor = graphicHelper.stringifyColor(mat.get('specularColor'), 'hex');
        materialCfg.glossiness = mat.get('glossiness');
        ['specularMap', 'glossinessMap'].forEach(function (propName) {
            materialCfg[propName] = getTextureUri(propName);
        });
    }
    return materialCfg;
};

/**
 * @param {Object} opts
 * @param {boolean} [opts.show]
 */
Viewer.prototype.setGround = function (opts) {
    this._groundMesh.invisible = !opts.show;
    this.refresh();
};

/**
 * @return {Array.<string>}
 */
Viewer.prototype.getMaterialsNames = function () {
    return Object.keys(this._materialsMap);
};

/**
 * @param {Object} opts
 */
Viewer.prototype.setPostEffect = function (opts) {
    this._renderMain.setPostEffect(opts);

    this._updateMaterialsSRGB();
    this.refresh();
};

/**
 * Start loop.
 */
Viewer.prototype.start = function () {
    if (this._disposed) {
        console.warn('Viewer already disposed');
        return;
    }

    this._animation.start();
    this._animation.on('frame', this._loop, this);
};

/**
 * Stop loop.
 */
Viewer.prototype.stop = function () {
    this._animation.stop();
    this._animation.off('frame', this._loop);
};

/**
 * Add html tip
 */
Viewer.prototype.addHotspot = function (position, tipHTML) {
    return this._hotspotManager.add(position, tipHTML);
};

Viewer.prototype.setPose = function (time) {
    this._clips.forEach(function (clip) {
        clip.setTime(time);
    });
    this._updateClipAndSkeletons();

    this.refresh();
};

Viewer.prototype.refresh = function () {
    this._needsRefresh = true;
};

Viewer.prototype.getRenderer = function () {
    return this._renderer;
};

Viewer.prototype._updateMaterialsSRGB = function () {
    var isLinearSpace = this._renderMain.isLinearSpace();
    for (var name in this._materialsMap) {
        var materials = this._materialsMap[name];
        for (var i = 0; i < materials.length; i++) {
            materials[i].shader[isLinearSpace ? 'define' : 'undefine']('fragment', 'SRGB_DECODE');
        }
    }
};

Viewer.prototype._updateClipAndSkeletons = function () {
    // Manually sync the transform for nodes not in skeleton
    this._clips.forEach(function (clip) {
        if (clip.channels.position) {
            clip.target.position.setArray(clip.position);
        }
        if (clip.channels.rotation) {
            clip.target.rotation.setArray(clip.rotation);
        }
        if (clip.channels.scale) {
            clip.target.scale.setArray(clip.scale);
        }
    });
    this._skeletons.forEach(function (skeleton) {
        skeleton.update();
    });
};

Viewer.prototype._loop = function (deltaTime) {
    if (this._disposed) {
        return;
    }
    if (!this._needsRefresh) {
        return;
    }

    this._needsRefresh = false;

    this._updateClipAndSkeletons();

    this._renderMain.prepareRender();
    this._renderMain.render();
    // this._renderer.render(this._renderMain.scene, this._renderMain.camera);

    this._startAccumulating();

    this._hotspotManager.update();
};

var accumulatingId = 1;
Viewer.prototype._stopAccumulating = function () {
    this._accumulatingId = 0;
    clearTimeout(this._accumulatingTimeout);
};

Viewer.prototype._startAccumulating = function (immediate) {
    var self = this;
    this._stopAccumulating();

    var needsAccumulate = self._renderMain.needsAccumulate();
    if (!needsAccumulate) {
        return;
    }

    function accumulate(id) {
        if (!self._accumulatingId || id !== self._accumulatingId || self._disposed) {
            return;
        }

        var isFinished = self._renderMain.isAccumulateFinished() && needsAccumulate;

        if (!isFinished) {
            self._renderMain.render(true);

            if (immediate) {
                accumulate(id);
            }
            else {
                requestAnimationFrame(function () {
                    accumulate(id);
                });
            }
        }
    }

    this._accumulatingId = accumulatingId++;

    if (immediate) {
        accumulate(self._accumulatingId);
    }
    else {
        this._accumulatingTimeout = setTimeout(function () {
            accumulate(self._accumulatingId);
        }, 50);
    }
};

/**
 * Dispose viewer.
 */
Viewer.prototype.dispose = function () {
    this._disposed = true;
    
    this._renderer.disposeScene(this._renderMain.scene);
    this._renderMain.dispose(this._renderer);
    this._sceneHelper.dispose(this._renderer);

    this._renderer.dispose();
    this._cameraControl.dispose();
    this.root.innerHTML = '';

    this.stop();
};

util.extend(Viewer.prototype, notifier);

export default Viewer;




