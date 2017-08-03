var Renderer = require('qtek/lib/Renderer');
var PerspectiveCamera = require('qtek/lib/camera/Perspective');
var ShadowMapPass = require('qtek/lib/prePass/ShadowMap');
var GLTFLoader = require('qtek/lib/loader/GLTF');
var DirectionalLight = require('qtek/lib/light/Directional');
var AmbientSHLight = require('qtek/lib/light/AmbientSH');
var Scene = require('qtek/lib/Scene');
var Node = require('qtek/lib/Node');
var Vector3 = require('qtek/lib/math/Vector3');
var Animation = require('qtek/lib/animation/Animation');
var meshUtil = require('qtek/lib/util/mesh');
var SphereGeo = require('qtek/lib/geometry/Sphere');
var CubeGeo = require('qtek/lib/geometry/Cube');
var Mesh = require('qtek/lib/Mesh');
var Material = require('qtek/lib/Material');
var Shader = require('qtek/lib/Shader');
var StaticGeometry = require('qtek/lib/StaticGeometry');
var Task = require('qtek/lib/async/Task');
var TaskGroup = require('qtek/lib/async/TaskGroup');
var util = require('qtek/lib/core/util');
var colorUtil = require('zrender/lib/tool/color');

var getBundingBoxWithSkinning = require('./util/getBoundingBoxWithSkinning');
var directionFromAlphaBeta = require('./util/directionFromAlphaBeta');
var OrbitControl = require('./OrbitControl');
var HotspotManager = require('./HotspotManager');

function createSkeletonDebugScene(skeleton) {
    var scene = new Scene();
    var sphereGeo = new SphereGeo({
        radius: 0.04
    });
    var sphereMat = new Material({
        shader: new Shader({
            vertex: Shader.source('qtek.basic.vertex'),
            fragment: Shader.source('qtek.basic.fragment')
        })
    });
    sphereMat.set('color', [0.3, 0.3, 0.3]);

    var jointDebugSpheres = [];

    var updates = [];
    skeleton.joints.forEach(function(joint) {

        var parentJoint = skeleton.joints[joint.parentIndex];
        var sphere = new Mesh({
            geometry: sphereGeo,
            material: sphereMat
        });
        scene.add(sphere);

        var lineGeo = new StaticGeometry({
            dynamic: true
        });
        var lineGeoVertices = lineGeo.attributes.position;
        lineGeoVertices.fromArray([0, 0, 0, 0, 0, 0]);
        var line = new Mesh({
            geometry: lineGeo,
            material: sphereMat,
            mode: Mesh.LINES,
            lineWidth: 2
        });
        scene.add(line);

        updates.push(function() {
            sphere.localTransform.copy(joint.node.worldTransform);
            sphere.decomposeLocalTransform();
            sphere.scale.set(1, 1, 1);
            if (parentJoint) {
                lineGeoVertices.set(0, joint.node.getWorldPosition()._array);
                lineGeoVertices.set(1, parentJoint.node.getWorldPosition()._array);
            }
            lineGeo.dirty();
        });
    });

    scene.before('render', function() {
        for (var i = 0; i < updates.length; i++) {
            updates[i]();
        }
    });
    return scene;
}

/**
 * @constructor
 * @param {HTMLDivElement} dom Root node
 * @param {Object} [opts]
 * @param {boolean} [opts.shadow=false] If enable shadow
 * @param {boolean} [opts.shader='lambert'] If enable shadow
 * @param {boolean} [opts.renderDebugSkeleton=false]
 */
function Viewer(dom, opts) {

    this.init(dom, opts);
}

Viewer.prototype.init = function (dom, opts) {
    opts = opts || {};

    this._shaderName = opts.shader || 'lambert';
    this._renderDebugSkeleton = opts.renderDebugSkeleton;

    if (opts.shadow) {
        /**
         * @private
         */
        this._shadowMapPass = new ShadowMapPass();
    }

    /**
     * @type {HTMLDivElement}
     */
    this.root = dom;

    /**
     * @private
     */
    this._animation = new Animation();

    var renderer = new Renderer();
    dom.appendChild(renderer.canvas);
    renderer.canvas.style.cssText = 'position:absolute;left:0;top:0';

    /**
     * @private
     */
    this._renderer = renderer;

    /**
     * @private
     */
    this._scene = new Scene();
    /**
     * @private
     */
    this._camera = new PerspectiveCamera({
        near: 0.1,
        far: 100
    });

    this._cameraControl = new OrbitControl({
        renderer: renderer,
        animation: this._animation,
        dom: dom
    });
    this._cameraControl.setCamera(this._camera);
    this._cameraControl.init();

    this._hotspotManager = new HotspotManager({
        dom: dom,
        renderer: renderer,
        camera: this._camera
    });

    /**
     * List of skeletons
     */
    this._skeletons = [];
    /**
     * List of animation clips
     */
    this._clips = [];

    this._initLights();

    this.resize();

    /**
     * Alpha and beta angle of main light.
     */
    this._mainLightAlpha = 45;
    this._mainLightBeta = 45;
};

Viewer.prototype._initLights = function () {
    var light = new DirectionalLight({
        intensity: 1,
        shadowResolution: 1024,
        shadowBias: 0.05
    });
    var ambientLight = new AmbientSHLight({
        intensity : 0.8,
        coefficients: [0.4901205003261566, 0.496532678604126, 0.7081291079521179, -0.0044515603221952915, 0.003780306549742818, 0.011885687708854675, -0.17520742118358612, -0.045615702867507935, 0.13985709846019745, 0.0018043766031041741, -0.005721535999327898, -0.00747253792360425, -0.013539238832890987, -0.009005839005112648, -0.0029368270188570023, -0.0036218082532286644, -0.0014644089387729764, 0.002722999081015587, 0.003975209314376116, -0.0012733691837638617, -0.006120394915342331, -0.010730908252298832, 0.02799658663570881, 0.05306524038314819, -0.0002291168348165229, 0.017803849652409554, 0.030858537182211876]
    });

    this._mainLight = light;

    this._ambientLight = ambientLight;

    this._scene.add(light);

    this._scene.add(ambientLight);
};

Viewer.prototype._addModel = function (modelNode, skeletons, clips) {
    // Remove previous loaded
    var prevModelNode = this._modelNode;
    if (prevModelNode) {
        this._renderer.disposeNode(prevModelNode);
        this._scene.remove(prevModelNode);
    }

    this._skeletons.forEach(function (skeleton) {
        if (skeleton.__debugScene) {
            this._renderer.disposeScene(skeleton.__debugScene);
        }
    }, this);
    this._clips.forEach(function (clip) {
        this._animation.removeClip(clips[id]);
    }, this);

    this._scene.add(modelNode);

    var skeletonsList = [];
    var clipsList = [];
    for (var id in skeletons) {
        var skeleton = skeletons[id];

        for (var clipId in clips) {
            clipsList.push(clips[clipId]);

            this._animation.addClip(clips[clipId]);
            clips[clipId].setLoop(true);
        }
        skeletonsList.push(skeleton);

        if (this._renderDebugSkeleton) {
            skeleton.__debugScene = createSkeletonDebugScene(skeleton);
        }
    }

    this._skeletons = skeletonsList;
    this._clips = clipsList;
    
    this._modelNode = modelNode;
};

Viewer.prototype.resize = function () {
    var renderer = this._renderer;
    renderer.resize(this.root.clientWidth, this.root.clientHeight);
    this._camera.aspect = renderer.canvas.width / renderer.canvas.height;
};

/**
 * Scale model to auto fit the camera.
 */
Viewer.prototype.autoFitModel = function (fitSize) {
    fitSize = fitSize || 10;
    if (this._modelNode) {
        this._modelNode.update();
        var bbox = getBundingBoxWithSkinning(this._modelNode);

        var size = new Vector3();
        size.copy(bbox.max).sub(bbox.min);

        var center = new Vector3();
        center.copy(bbox.max).add(bbox.min).scale(0.5);

        var scale = fitSize / Math.max(size.x, size.y, size.z);

        this._modelNode.scale.set(scale, scale, scale);
        this._modelNode.position.copy(center).scale(-scale);

        this._mainLight.position.set(1, 3, 1);
        this._mainLight.lookAt(Vector3.ZERO);

        this._hotspotManager.setBoundingBox(bbox.min._array, bbox.max._array);
    }
};

/**
 * Load glTF model resource
 * @param {string} url Model url
 * @param {Object} [opts] 
 */
Viewer.prototype.loadModel = function (url, opts) {
    opts = opts || {};
    if (!url) {
        throw new Error('URL of model is not provided');
    }

    var loader = new GLTFLoader({
        rootNode: new Node(),
        shaderName: 'qtek.' + this._shaderName,
        textureRootPath: opts.textureRootPath,
        bufferRootPath: opts.bufferRootPath,
        crossOrigin: 'Anonymous'
    });
    loader.load(url);

    var task = new Task();

    var vertexCount = 0;
    var triangleCount = 0;
    var nodeCount = 0;

    loader.success(function (res) {
        var meshNeedsSplit = [];
        res.rootNode.traverse(function (mesh) {
            nodeCount++;
            if (mesh.skeleton && mesh.skeleton.getClip(0)) {
                meshNeedsSplit.push(mesh);
            }
            if (mesh.geometry) {
                triangleCount += mesh.geometry.triangleCount;
                vertexCount += mesh.geometry.vertexCount;
            }
        });
        meshNeedsSplit.forEach(function (mesh) {
            meshUtil.splitByJoints(mesh, 15, true);
        });
        res.rootNode.traverse(function (mesh) {
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
                mesh.material.shader.define('fragment', 'ALPHA_TEST_THRESHOLD', 0.95);

                mesh.material.shader.precision = 'mediump';
            }
        });

        this._addModel(res.rootNode, res.skeletons, res.clips);

        this.autoFitModel();

        this.setCameraControl({
            distance: 20,
            minDisntance: 2,
            maxDistance: 100,
            center: [0, 0, 0]
        });

        var stat = {
            triangleCount: vertexCount,
            vertexCount: triangleCount,
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
        });
    }, this);
    loader.error(function () {
        task.trigger('error');
    });

    return task;
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
};

/**
 * @param {Object} [opts]
 * @param {number} [opts.intensity]
 * @param {string} [opts.color]
 * @param {number} [opts.alpha]
 * @param {number} [opts.beta]
 */
Viewer.prototype.setMainLight = function (opts) {
    if (opts.intensity != null) {
        this._mainLight.intensity = opts.intensity;
    }
    if (opts.color != null) {
        this._mainLight.color = (colorUtil.parse(opts.color) || [0, 0, 0]).slice(0, 3).map(function (chanel) {
            return chanel / 255;
        });
    }
    if (opts.alpha != null) {
        this._mainLightAlpha = opts.alpha;
    }
    if (opts.beta != null) {
        this._mainLightBeta = opts.beta;
    }

    this._mainLight.position.setArray(directionFromAlphaBeta(this._mainLightAlpha, this._mainLightBeta));
    this._mainLight.lookAt(Vector3.ZERO);
};

/**
 * @param {Object} [opts]
 * @param {number} [opts.intensity]
 */
Viewer.prototype.setAmbientLight = function (opts) {
    if (opts.intensity != null) {
        this._ambientLight.intensity = opts.intensity;
    }
};

/**
 * Start loop.
 */
Viewer.prototype.start = function () {
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


Viewer.prototype._loop = function (deltaTime) {
    this._scene.update();
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
        skeleton.setPose(0);
    });
    this._shadowMapPass && this._shadowMapPass.render(this._renderer, this._scene, this._camera);
    this._renderer.render(this._scene, this._camera);

    this._hotspotManager.update();

    if (this._renderDebugSkeleton) {
        this._renderer.saveClear();
        this._renderer.clearBit = this._renderer.gl.DEPTH_BUFFER_BIT;
        this._skeletons.forEach(function (skeleton) {
            this._renderer.render(skeleton.__debugScene, this._camera);
        }, this);
        this._renderer.restoreClear();
    }
};

/**
 * Dispose viewer.
 */
Viewer.prototype.dispose = function () {
    this._shadowMapPass.dispose(this._renderer);
    this._renderer.disposeScene(this._scene);
    this._renderer.dispose();
    this._cameraControl.dispose();
    this.root.innerHTML = '';

    this._animation.stop();
};

module.exports = Viewer;