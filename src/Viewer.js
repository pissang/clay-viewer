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

var OrbitControl = require('./OrbitControl');

/**
 * @constructor
 * @param {HTMLDivElement} dom Root node
 * @param {Object} [opts]
 * @param {boolean} [opts.shadow=false] If enable shadow
 */
function Viewer(dom, opts) {

    this.init(dom, opts);
}

Viewer.prototype.init = function (dom, opts) {
    opts = opts || {};

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
    this._camera = new PerspectiveCamera();

    this._cameraControl = new OrbitControl({
        renderer: renderer,
        animation: this._animation
    });
    this._cameraControl.setCamera(this._camera);
    this._cameraControl.init();

    this._initLights();

    this.resize();
};

Viewer.prototype._initLights = function () {
    var light = new DirectionalLight({
        intensity: 1,
        shadowResolution: 1024,
        shadowBias: 0.05
    });

    this._mainLight = light;

    this._scene.add(light);

    this._scene.add(new AmbientSHLight({
        intensity : 0.8,
        coefficients: [0.4901205003261566, 0.496532678604126, 0.7081291079521179, -0.0044515603221952915, 0.003780306549742818, 0.011885687708854675, -0.17520742118358612, -0.045615702867507935, 0.13985709846019745, 0.0018043766031041741, -0.005721535999327898, -0.00747253792360425, -0.013539238832890987, -0.009005839005112648, -0.0029368270188570023, -0.0036218082532286644, -0.0014644089387729764, 0.002722999081015587, 0.003975209314376116, -0.0012733691837638617, -0.006120394915342331, -0.010730908252298832, 0.02799658663570881, 0.05306524038314819, -0.0002291168348165229, 0.017803849652409554, 0.030858537182211876]
    }));
};

Viewer.prototype._addModel = function (modelNode, skeleton) {
    // Remove previous loaded
    var prevModelNode = this._modelNode;
    if (prevModelNode) {
        this._renderer.disposeNode(prevModelNode);
        this._scene.remove(prevModelNode);
    }
    if (this._skeleton) {
        this._animation.removeClip(this._skeleton.getClip(0));
    }

    this._scene.add(modelNode);
    if (skeleton) {
        this._animation.addClip(skeleton.getClip(0));
        skeleton.getClip(0).setLoop(true);
        this._skeleton = skeleton;
    }
    this._modelNode = modelNode;
};

Viewer.prototype.resize = function () {
    var renderer = this._renderer;
    renderer.resize(this.root.clientWidth, this.root.clientHeight);
    this._camera.aspect = renderer.canvas.width / renderer.canvas.height;
};

Viewer.prototype.focusToModel = function (ratio) {
    if (ratio == null) {
        ratio = 2;
    }
    if (this._modelNode) {
        var bbox = this._modelNode.getBoundingBox();
        var size = new Vector3();
        size.copy(bbox.max).sub(bbox.min).scale(0.5);

        var center = new Vector3();
        center.copy(bbox.max).add(bbox.min).scale(0.5);

        var distance = size.len() * ratio;
        var minDistance = distance * 0.2;
        var maxDistance = distance * 5;
        this.setCameraControl({
            distance: size.len() * ratio,
            minDistance: minDistance,
            maxDistance: maxDistance,
            center: center.toArray()
        });

        this._mainLight.position.copy(center).add(new Vector3(1, 3, 1));
        this._mainLight.lookAt(center);
    }
};

/**
 * Load glTF model resource
 * @param {string} url model url
 * @param {Function} callback
 */
Viewer.prototype.loadModel = function (url, cb) {

    var loader = new GLTFLoader({
        rootNode: new Node()
    });
    loader.load(url);

    loader.success(function (res) {
        var meshNeedsSplit = [];
        res.rootNode.traverse(function (mesh) {
            if (mesh.skeleton) {
                meshNeedsSplit.push(mesh);
            }
        });
        meshNeedsSplit.forEach(function (mesh) {
            meshUtil.splitByJoints(mesh, 15, true);
        });
        res.rootNode.traverse(function (mesh) {
            if (mesh.geometry) {
                mesh.geometry.updateBoundingBox();
            }
            if (mesh.material) {
                mesh.material.shader.define('fragment', 'DIFFUSEMAP_ALPHA_ALPHA');
                mesh.material.shader.define('fragment', 'ALPHA_TEST');
                mesh.material.shader.define('fragment', 'ALPHA_TEST_THRESHOLD', 0.9);
            }
        });

        this._addModel(res.rootNode, res.skeletons && res.skeletons['skin_0']);

        this.focusToModel();

        cb && cb();
    }, this);
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
 * Start loop.
 */
Viewer.prototype.start = function () {
    this._animation.start();
    this._animation.on('frame', this._loop, this);
};

Viewer.prototype._loop = function (deltaTime) {
    this._skeleton && this._skeleton.setPose(0);
    this._shadowMapPass && this._shadowMapPass.render(this._renderer, this._scene, this._camera);
    this._renderer.render(this._scene, this._camera);
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