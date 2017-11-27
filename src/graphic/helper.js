import Texture from 'qtek/src/Texture';
import Material from 'qtek/src/Material';
import LRUCache from 'zrender/src/core/LRU';
import textureUtil from 'qtek/src/util/texture';
import AmbientCubemapLight from 'qtek/src/light/AmbientCubemap';
import AmbientSHLight from 'qtek/src/light/AmbientSH';
import shUtil from 'qtek/src/util/sh';
import * as colorUtil from 'zrender/src/tool/color';
import Texture2D from 'qtek/src/Texture2D';

function isValueNone(value) {
    return !value || value === 'none';
}

function isValueImage(value) {
    return value instanceof HTMLCanvasElement
        || value instanceof HTMLImageElement
        || value instanceof Image;
}


/**
 * @param {string} textureName
 * @param {string|HTMLImageElement|HTMLCanvasElement} imgValue
 * @param {Viewer} app
 * @param {Object} [textureOpts]
 */
Material.prototype.setTextureImage = function (textureName, imgValue, app, textureOpts) {
    if (!this.shader) {
        return;
    }

    var material = this;
    var texture;
    // disableTexture first
    material.shader.disableTexture(textureName);
    if (!isValueNone(imgValue)) {
        texture = helper.loadTexture(imgValue, app, textureOpts, function (texture) {
            material.shader.enableTexture(textureName);
            app.refresh();
        });
        // Set texture immediately for other code to verify if have this texture.
        material.set(textureName, texture);
    }

    return texture;
};

var helper = {};

// Texture utilities
var blankImage = textureUtil.createBlank('rgba(255,255,255,0)').image;


function nearestPowerOfTwo(val) {
    return Math.pow(2, Math.round(Math.log(val) / Math.LN2));
}
function convertTextureToPowerOfTwo(texture) {
    if ((texture.wrapS === Texture.REPEAT || texture.wrapT === Texture.REPEAT)
     && texture.image
     ) {
        // var canvas = document.createElement('canvas');
        var width = nearestPowerOfTwo(texture.width);
        var height = nearestPowerOfTwo(texture.height);
        if (width !== texture.width || height !== texture.height) {
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(texture.image, 0, 0, width, height);
            canvas.srcImage = texture.image;
            texture.image = canvas;
            texture.dirty();
        }
    }
}

helper.firstNotNull = function () {
    for (var i = 0, len = arguments.length; i < len; i++) {
        if (arguments[i] != null) {
            return arguments[i];
        }
    }
},
/**
 * @param {string|HTMLImageElement|HTMLCanvasElement} imgValue
 * @param {Viewer} app
 * @param {Object} [textureOpts]
 * @param {Function} cb
 */
// TODO Promise, test
helper.loadTexture = function (imgValue, app, textureOpts, cb) {
    if (typeof textureOpts === 'function') {
        cb = textureOpts;
        textureOpts = {};
    }
    textureOpts = textureOpts || {};

    var keys = Object.keys(textureOpts).sort();
    var prefix = '';
    for (var i = 0; i < keys.length; i++) {
        prefix += keys[i] + '_' + textureOpts[keys[i]] + '_';
    }

    var textureCache = app.__textureCache = app.__textureCache || new LRUCache(20);

    if (isValueImage(imgValue)) {
        var id = imgValue.__textureid__;
        var textureObj = textureCache.get(prefix + id);
        if (!textureObj) {
            textureObj = {
                texture: new Texture2D({
                    image: imgValue
                })
            };
            for (var i = 0; i < keys.length; i++) {
                textureObj.texture[keys[i]] = textureOpts[keys[i]];
            }
            id = imgValue.__textureid__ || '__ecgl_image__' + textureObj.texture.__GUID__;
            imgValue.__textureid__ = id;
            textureCache.put(prefix + id, textureObj);

            convertTextureToPowerOfTwo(textureObj.texture);
            // TODO Next tick?
            cb && cb(textureObj.texture);
        }
        return textureObj.texture;
    }
    else {
        var textureObj = textureCache.get(prefix + imgValue);
        if (textureObj) {
            if (textureObj.callbacks) {
                // Add to pending callbacks
                textureObj.callbacks.push(cb);
            }
            else {
                // TODO Next tick?
                cb && cb(textureObj.texture);
            }
        }
        else {
            // Maybe base64
            if (imgValue.match(/.hdr$|^data:application\/octet-stream/)) {
                textureObj = {
                    callbacks: [cb]
                };
                var texture = textureUtil.loadTexture(imgValue, {
                    exposure: textureOpts.exposure,
                    fileType: 'hdr'
                }, function () {
                    texture.dirty();
                    textureObj.callbacks.forEach(function (cb) {
                        cb && cb(texture);
                    });
                    textureObj.callbacks = null;
                });
                textureObj.texture = texture;
                textureCache.put(prefix + imgValue, textureObj);
            }
            else {
                var texture = new Texture2D({
                    image: new Image()
                });
                for (var i = 0; i < keys.length; i++) {
                    texture[keys[i]] = textureOpts[keys[i]];
                }

                textureObj = {
                    texture: texture,
                    callbacks: [cb]
                };
                var originalImage = texture.image;
                originalImage.onload = function () {
                    texture.image = originalImage;
                    convertTextureToPowerOfTwo(texture);

                    texture.dirty();
                    textureObj.callbacks.forEach(function (cb) {
                        cb && cb(texture);
                    });
                    textureObj.callbacks = null;
                };
                originalImage.src = imgValue;
                // Use blank image as place holder.
                texture.image = blankImage;

                textureCache.put(prefix + imgValue, textureObj);
            }
        }

        return textureObj.texture;
    }
};

/**
 * Create ambientCubemap and ambientSH light. respectively to have specular and diffuse light
 * @return {Object} { specular, diffuse }
 */
helper.createAmbientCubemap = function (opt, app, cb) {
    opt = opt || {};
    var renderer = app.getRenderer();
    var textureUrl = opt.texture;
    var exposure = helper.firstNotNull(opt.exposure, 1.0);

    var ambientCubemap, ambientSH;
    if (opt.diffuseIntensity !== 0) {
        ambientSH = new AmbientSHLight({
            coefficients: [0.844, 0.712, 0.691, -0.037, 0.083, 0.167, 0.343, 0.288, 0.299, -0.041, -0.021, -0.009, -0.003, -0.041, -0.064, -0.011, -0.007, -0.004, -0.031, 0.034, 0.081, -0.060, -0.049, -0.060, 0.046, 0.056, 0.050]
        });
    }

    if (opt.specularIntensity !== 0) {
        ambientCubemap = new AmbientCubemapLight();
        ambientCubemap.cubemap = helper.loadTexture(textureUrl, app, {
            exposure: exposure
        }, function (cubemap) {
            ambientCubemap.cubemap = cubemap;
            // TODO Performance when multiple view
            cubemap.flipY = false;
            ambientCubemap.prefilter(renderer, 64);
            ambientSH.coefficients = shUtil.projectEnvironmentMap(renderer, ambientCubemap.cubemap, {
                lod: 1
            });

            setTimeout(function () {
                cb && cb(); 
            });
            // TODO Refresh ?
        });
    }
    else {
        setTimeout(function () {
            cb && cb();
        });
    }
    return {
        specular: ambientCubemap,
        diffuse: ambientSH
    };
};

/**
 * Create a blank texture for placeholder
 */
helper.createBlankTexture = textureUtil.createBlank;

/**
 * If value is image
 * @param {*}
 * @return {boolean}
 */
helper.isImage = isValueImage;

helper.additiveBlend = function (gl) {
    gl.blendEquation(gl.FUNC_ADD);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
};

/**
 * @param {string|Array.<number>} colorStr
 * @param {Array.<number>} [rgba]
 * @return {Array.<number>} rgba
 */
helper.parseColor = function (colorStr, rgba) {
    if (colorStr instanceof Array) {
        if (!rgba) {
            rgba = [];
        }
        // Color has been parsed.
        rgba[0] = colorStr[0];
        rgba[1] = colorStr[1];
        rgba[2] = colorStr[2];
        if (colorStr.length > 3) {
            rgba[3] = colorStr[3];
        }
        else {
            rgba[3] = 1;
        }
        return rgba;
    }

    rgba = colorUtil.parse(colorStr || '#000', rgba) || [0, 0, 0, 0];
    rgba[0] /= 255;
    rgba[1] /= 255;
    rgba[2] /= 255;
    return rgba;
};

/**
 * @param {Array.<number>} colorArr
 * @return {string}
 */
helper.stringifyColor = function (colorArr, type) {
    colorArr = colorArr.slice();
    colorArr[0] = Math.round(colorArr[0] * 255);
    colorArr[1] = Math.round(colorArr[1] * 255);
    colorArr[2] = Math.round(colorArr[2] * 255);
    if (type === 'hex') {
        return '#' + ((1 << 24) + (colorArr[0] << 16) + (colorArr[1] << 8) + colorArr[2]).toString(16).slice(1);
    }
    return colorUtil.stringify(colorArr, type);
};

/**
 * Convert alpha beta rotation to direction.
 * @param {number} alpha
 * @param {number} beta
 * @return {Array.<number>}
 */
helper.directionFromAlphaBeta = function (alpha, beta) {
    var theta = alpha / 180 * Math.PI + Math.PI / 2;
    var phi = -beta / 180 * Math.PI + Math.PI / 2;

    var dir = [];
    var r = Math.sin(theta);
    dir[0] = r * Math.cos(phi);
    dir[1] = -Math.cos(theta);
    dir[2] = r * Math.sin(phi);

    return dir;
};

helper.convertTextureToPowerOfTwo = convertTextureToPowerOfTwo;

export default helper;