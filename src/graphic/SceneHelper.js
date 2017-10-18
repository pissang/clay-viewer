import helper from './helper';
import Skybox from 'qtek/src/plugin/Skybox';
import Skydome from 'qtek/src/plugin/Skydome';
import Vector3 from 'qtek/src/math/Vector3';
import DirectionalLight from 'qtek/src/light/Directional';
import AmbientLight from 'qtek/src/light/Ambient';

function SceneHelper(scene) {
    this.setScene(scene);
}

SceneHelper.prototype = {
    constructor: SceneHelper,

    setScene: function (scene) {
        this._scene = scene;

        if (this._skybox) {
            this._skybox.attachScene(this._scene);
        }

    },

    initLight: function (rootNode) {
        this._lightRoot = rootNode;
        /**
         * @type {qtek.light.Directional}
         */
        this.mainLight = new DirectionalLight({
            shadowBias: 0.005
        });
        /**
         * @type {qtek.light.Directional}
         */
        this.secondaryLight = new DirectionalLight({
            shadowBias: 0.005
        });
        /**
         * @type {qtek.light.Directional}
         */
        this.tertiaryLight = new DirectionalLight({
            shadowBias: 0.005
        });

        /**
         * @type {qtek.light.Ambient}
         */
        this.ambientLight = new AmbientLight();
    },

    dispose: function (renderer) {
        if (this._lightRoot) {
            this._lightRoot.remove(this.mainLight);
            this._lightRoot.remove(this.ambientLight);
        }
        if (this._currentCubemapLights) {
            this._lightRoot.remove(this._currentCubemapLights.diffuse);
            if (this._currentCubemapLights.specular) {
                this._lightRoot.remove(this._currentCubemapLights.specular);
                this._currentCubemapLights.specular.cubemap.dispose(renderer);
            }
        }
    },

    updateMainLight: function (opts, app) {
        this._updateDirectionalLight(this.mainLight, opts, app);
    },

    updateSecondaryLight: function (opts, app) {
        this._updateDirectionalLight(this.secondaryLight, opts, app);
    },

    updateTertiaryLight: function (opts, app) {
        this._updateDirectionalLight(this.tertiaryLight, opts, app);
    },

    _updateDirectionalLight: function (light, opts, app) {
        opts = opts || {};
        if (opts.intensity != null) {
            light.intensity = opts.intensity;
            this._lightRoot[opts.intensity ? 'add' : 'remove'](light);
        }
        if (opts.color != null) {
            light.color = helper.parseColor(opts.color).slice(0, 3);
        }
        var alpha = helper.firstNotNull(opts.alpha, 45);
        var beta = helper.firstNotNull(opts.beta, 45);

        light.position.setArray(helper.directionFromAlphaBeta(alpha, beta));
        light.lookAt(Vector3.ZERO);

        var shadowResolution = ({
            'low': 512,
            'medium': 1024,
            'high': 2048,
            'ultra': 4096
        })[opts.quality] || 1024;

        light.castShadow = helper.firstNotNull(opts.shadow, true);
        light.shadowResolution = shadowResolution;
    },

    updateAmbientLight: function (opts, app) {
        opts = opts || {};
        if (opts.intensity != null) {
            this.ambientLight.intensity = opts.intensity;
            this._lightRoot[opts.intensity ? 'add' : 'remove'](this.ambientLight);
        }
        if (opts.color != null) {
            this.ambientLight.color = helper.parseColor(opts.color).slice(0, 3);
        }
    },

    updateAmbientCubemapLight: function (opts, app) {
        opts = opts || {};
        var renderer = app.getRenderer();
        var textureUrl = opts.texture;
        var self = this;

        // TODO Change exposure
        if (!this._currentCubemapLights || textureUrl !== this._currentCubemapLights.textureUrl) {
            if (this._currentCubemapLights) {
                this._lightRoot.remove(this._currentCubemapLights.diffuse);
                if (this._currentCubemapLights.specular) {
                    this._lightRoot.remove(this._currentCubemapLights.specular);
                    this._currentCubemapLights.specular.cubemap.dispose(renderer.gl);
                }
            }
            if (textureUrl) {
                var lights = helper.createAmbientCubemap(opts, app, function () {
                    // Use prefitered cubemap
                    if (lights.specular && (self._skybox instanceof Skybox)) {
                        self._skybox.setEnvironmentMap(lights.specular.cubemap);
                    }
                    app.refresh();
                });
                if (lights.diffuse) {
                    this._lightRoot.add(lights.diffuse);
                }
                if (lights.specular) {
                    this._lightRoot.add(lights.specular);
                }
    
                this._currentCubemapLights = lights;
                this._currentCubemapLights.textureUrl = textureUrl;
            }
            else if (this._currentCubemapLights) {
                this._lightRoot.remove(this._currentCubemapLights.diffuse);
                this._lightRoot.remove(this._currentCubemapLights.specular);
                this._currentCubemapLights = null;
            }
        }

        if (this._currentCubemapLights) {
            if (opts.specularIntensity != null) {
                this._currentCubemapLights.specular.intensity = opts.specularIntensity;
            }
            if (opts.diffuseIntensity != null) {
                this._currentCubemapLights.diffuse.intensity = opts.diffuseIntensity;
            }
        }
        
    },

    updateSkybox: function (environmentUrl, isLinearSpace, app) {
        var renderer = app.getRenderer();
        var self = this;
        function getSkybox() {
            if (!(self._skybox instanceof Skybox)) {
                if (self._skybox) {
                    self._skybox.dispose(renderer);
                }
                self._skybox = new Skybox();
            }
            return self._skybox;
        }
        function getSkydome() {
            if (!(self._skybox instanceof Skydome)) {
                if (self._skybox) {
                    self._skybox.dispose(renderer);
                }
                self._skybox = new Skydome();
            }
            return self._skybox;
        }

        if (environmentUrl && environmentUrl !== 'none') {
            if (environmentUrl === 'auto') {
                // Use environment in ambient cubemap
                if (this._currentCubemapLights) {
                    var skybox = getSkybox();
                    if (this._currentCubemapLights.specular) {
                        var cubemap = this._currentCubemapLights.specular.cubemap;
                        skybox.setEnvironmentMap(cubemap);
                    }
                    if (this._scene) {
                        skybox.attachScene(this._scene);
                    }
                    skybox.material.set('lod', 2);
                }
                else if (this._skybox) {
                    this._skybox.detachScene();
                }
            }
            else  {
                // Panorama
                var skydome = getSkydome();
                var texture = helper.loadTexture(environmentUrl, app, {
                    flipY: false
                }, function () {
                    app.refresh();
                });
                skydome.setEnvironmentMap(texture);

                skydome.attachScene(this._scene);
            }
        }
        else {
            if (this._skybox) {
                this._skybox.detachScene(this._scene);
            }
            this._skybox = null;
        }

        if (this._skybox) {
            if (environmentUrl !== 'auto'
                && !(environmentUrl.match && environmentUrl.match(/.hdr$/))
            ) {
                var srgbDefineMethod = isLinearSpace ? 'define' : 'undefine';
                this._skybox.material.shader[srgbDefineMethod]('fragment', 'SRGB_DECODE');
            }
            else {
                this._skybox.material.shader.undefine('fragment', 'SRGB_DECODE');
            }
        }
    }
};

export default SceneHelper;