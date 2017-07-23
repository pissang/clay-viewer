(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["QMV"] = factory();
	else
		root["QMV"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 40);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @fileoverview gl-matrix - High performance matrix and vector operations
 * @author Brandon Jones
 * @author Colin MacKenzie IV
 * @version 2.2.2
 */

/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


(function(_global) {
  "use strict";

  var shim = {};
  if (false) {
    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      shim.exports = {};
      define(function() {
        return shim.exports;
      });
    } else {
      // gl-matrix lives in a browser, define its namespaces in global
      shim.exports = typeof(window) !== 'undefined' ? window : _global;
    }
  }
  else {
    // gl-matrix lives in commonjs, define its namespaces in exports
    shim.exports = exports;
  }

  (function(exports) {
    /* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */


if(!GLMAT_EPSILON) {
    var GLMAT_EPSILON = 0.000001;
}

if(!GLMAT_ARRAY_TYPE) {
    var GLMAT_ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
}

if(!GLMAT_RANDOM) {
    var GLMAT_RANDOM = Math.random;
}

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    GLMAT_ARRAY_TYPE = type;
}

if(typeof(exports) !== 'undefined') {
    exports.glMatrix = glMatrix;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */

var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new GLMAT_ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
vec2.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }

        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }

        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec2 = vec2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */

var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new GLMAT_ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
vec3.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = GLMAT_RANDOM() * 2.0 * Math.PI;
    var z = (GLMAT_RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
      //Translate point to the origin
      p[0] = a[0] - b[0];
      p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

      //perform rotation
      r[0] = p[0];
      r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
      r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

      //translate to correct position
      out[0] = r[0] + b[0];
      out[1] = r[1] + b[1];
      out[2] = r[2] + b[2];

    return out;
};

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateY = function(out, a, b, c){
    var p = [], r=[];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
    r[1] = p[1];
    r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateZ = function(out, a, b, c){
    var p = [], r=[];
    //Translate point to the origin
    p[0] = a[0] - b[0];
    p[1] = a[1] - b[1];
    p[2] = a[2] - b[2];

    //perform rotation
    r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
    r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
    r[2] = p[2];

    //translate to correct position
    out[0] = r[0] + b[0];
    out[1] = r[1] + b[1];
    out[2] = r[2] + b[2];

    return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }

        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }

        return a;
    };
})();

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
vec3.angle = function(a, b) {

    var tempA = vec3.fromValues(a[0], a[1], a[2]);
    var tempB = vec3.fromValues(b[0], b[1], b[2]);

    vec3.normalize(tempA, tempA);
    vec3.normalize(tempB, tempB);

    var cosine = vec3.dot(tempA, tempB);

    if(cosine > 1.0){
        return 0;
    } else {
        return Math.acos(cosine);
    }
};

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec3 = vec3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4 Dimensional Vector
 * @name vec4
 */

var vec4 = {};

/**
 * Creates a new, empty vec4
 *
 * @returns {vec4} a new 4D vector
 */
vec4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
};

/**
 * Creates a new vec4 initialized with values from an existing vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new 4D vector
 */
vec4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new 4D vector
 */
vec4.fromValues = function(x, y, z, w) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Copy the values from one vec4 to another
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the source vector
 * @returns {vec4} out
 */
vec4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set the components of a vec4 to the given values
 *
 * @param {vec4} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} out
 */
vec4.set = function(out, x, y, z, w) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
};

/**
 * Adds two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link vec4.subtract}
 * @function
 */
vec4.sub = vec4.subtract;

/**
 * Multiplies two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    out[3] = a[3] * b[3];
    return out;
};

/**
 * Alias for {@link vec4.multiply}
 * @function
 */
vec4.mul = vec4.multiply;

/**
 * Divides two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    out[3] = a[3] / b[3];
    return out;
};

/**
 * Alias for {@link vec4.divide}
 * @function
 */
vec4.div = vec4.divide;

/**
 * Returns the minimum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    out[3] = Math.min(a[3], b[3]);
    return out;
};

/**
 * Returns the maximum of two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {vec4} out
 */
vec4.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    out[3] = Math.max(a[3], b[3]);
    return out;
};

/**
 * Scales a vec4 by a scalar number
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec4} out
 */
vec4.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two vec4's after scaling the second operand by a scalar value
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec4} out
 */
vec4.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} distance between a and b
 */
vec4.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.distance}
 * @function
 */
vec4.dist = vec4.distance;

/**
 * Calculates the squared euclidian distance between two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec4.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2],
        w = b[3] - a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredDistance}
 * @function
 */
vec4.sqrDist = vec4.squaredDistance;

/**
 * Calculates the length of a vec4
 *
 * @param {vec4} a vector to calculate length of
 * @returns {Number} length of a
 */
vec4.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return Math.sqrt(x*x + y*y + z*z + w*w);
};

/**
 * Alias for {@link vec4.length}
 * @function
 */
vec4.len = vec4.length;

/**
 * Calculates the squared length of a vec4
 *
 * @param {vec4} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec4.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    return x*x + y*y + z*z + w*w;
};

/**
 * Alias for {@link vec4.squaredLength}
 * @function
 */
vec4.sqrLen = vec4.squaredLength;

/**
 * Negates the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to negate
 * @returns {vec4} out
 */
vec4.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = -a[3];
    return out;
};

/**
 * Returns the inverse of the components of a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to invert
 * @returns {vec4} out
 */
vec4.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  out[3] = 1.0 / a[3];
  return out;
};

/**
 * Normalize a vec4
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a vector to normalize
 * @returns {vec4} out
 */
vec4.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2],
        w = a[3];
    var len = x*x + y*y + z*z + w*w;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
        out[3] = a[3] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec4's
 *
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @returns {Number} dot product of a and b
 */
vec4.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
};

/**
 * Performs a linear interpolation between two vec4's
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the first operand
 * @param {vec4} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec4} out
 */
vec4.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec4} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec4} out
 */
vec4.random = function (out, scale) {
    scale = scale || 1.0;

    //TODO: This is a pretty awful way of doing this. Find something better.
    out[0] = GLMAT_RANDOM();
    out[1] = GLMAT_RANDOM();
    out[2] = GLMAT_RANDOM();
    out[3] = GLMAT_RANDOM();
    vec4.normalize(out, out);
    vec4.scale(out, out, scale);
    return out;
};

/**
 * Transforms the vec4 with a mat4.
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec4} out
 */
vec4.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2], w = a[3];
    out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
    out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
    out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
    out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
    return out;
};

/**
 * Transforms the vec4 with a quat
 *
 * @param {vec4} out the receiving vector
 * @param {vec4} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec4} out
 */
vec4.transformQuat = function(out, a, q) {
    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Perform some operation over an array of vec4s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec4.forEach = (function() {
    var vec = vec4.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 4;
        }

        if(!offset) {
            offset = 0;
        }

        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2]; vec[3] = a[i+3];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2]; a[i+3] = vec[3];
        }

        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec4} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec4.str = function (a) {
    return 'vec4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.vec4 = vec4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x2 Matrix
 * @name mat2
 */

var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }

    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix
 * @param {mat2} D the diagonal matrix
 * @param {mat2} U the upper triangular matrix
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) {
    L[2] = a[2]/a[0];
    U[0] = a[0];
    U[1] = a[1];
    U[3] = a[3] - L[2] * U[1];
    return [L, D, U];
};

if(typeof(exports) !== 'undefined') {
    exports.mat2 = mat2;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 2x3 Matrix
 * @name mat2d
 *
 * @description
 * A mat2d contains six elements defined as:
 * <pre>
 * [a, c, tx,
 *  b, d, ty]
 * </pre>
 * This is a short form for the 3x3 matrix:
 * <pre>
 * [a, c, tx,
 *  b, d, ty,
 *  0, 0, 1]
 * </pre>
 * The last row is ignored so the array is shorter and operations are faster.
 */

var mat2d = {};

/**
 * Creates a new identity mat2d
 *
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.create = function() {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Creates a new mat2d initialized with values from an existing matrix
 *
 * @param {mat2d} a matrix to clone
 * @returns {mat2d} a new 2x3 matrix
 */
mat2d.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(6);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Copy the values from one mat2d to another
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    return out;
};

/**
 * Set a mat2d to the identity matrix
 *
 * @param {mat2d} out the receiving matrix
 * @returns {mat2d} out
 */
mat2d.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
};

/**
 * Inverts a mat2d
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the source matrix
 * @returns {mat2d} out
 */
mat2d.invert = function(out, a) {
    var aa = a[0], ab = a[1], ac = a[2], ad = a[3],
        atx = a[4], aty = a[5];

    var det = aa * ad - ab * ac;
    if(!det){
        return null;
    }
    det = 1.0 / det;

    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
};

/**
 * Calculates the determinant of a mat2d
 *
 * @param {mat2d} a the source matrix
 * @returns {Number} determinant of a
 */
mat2d.determinant = function (a) {
    return a[0] * a[3] - a[1] * a[2];
};

/**
 * Multiplies two mat2d's
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the first operand
 * @param {mat2d} b the second operand
 * @returns {mat2d} out
 */
mat2d.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    out[4] = a0 * b4 + a2 * b5 + a4;
    out[5] = a1 * b4 + a3 * b5 + a5;
    return out;
};

/**
 * Alias for {@link mat2d.multiply}
 * @function
 */
mat2d.mul = mat2d.multiply;


/**
 * Rotates a mat2d by the given angle
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2d} out
 */
mat2d.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Scales the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2d} out
 **/
mat2d.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    out[4] = a4;
    out[5] = a5;
    return out;
};

/**
 * Translates the mat2d by the dimensions in the given vec2
 *
 * @param {mat2d} out the receiving matrix
 * @param {mat2d} a the matrix to translate
 * @param {vec2} v the vec2 to translate the matrix by
 * @returns {mat2d} out
 **/
mat2d.translate = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5],
        v0 = v[0], v1 = v[1];
    out[0] = a0;
    out[1] = a1;
    out[2] = a2;
    out[3] = a3;
    out[4] = a0 * v0 + a2 * v1 + a4;
    out[5] = a1 * v0 + a3 * v1 + a5;
    return out;
};

/**
 * Returns a string representation of a mat2d
 *
 * @param {mat2d} a matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2d.str = function (a) {
    return 'mat2d(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
                    a[3] + ', ' + a[4] + ', ' + a[5] + ')';
};

/**
 * Returns Frobenius norm of a mat2d
 *
 * @param {mat2d} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2d.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + 1))
};

if(typeof(exports) !== 'undefined') {
    exports.mat2d = mat2d;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 3x3 Matrix
 * @name mat3
 */

var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }

    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' +
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' +
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};


if(typeof(exports) !== 'undefined') {
    exports.mat3 = mat3;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class 4x4 Matrix
 * @name mat4
 */

var mat4 = {};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new GLMAT_ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
};

/**
 * Inverts a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Calculates the adjugate of a mat4
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Multiplies two affine mat4's
 * Add by https://github.com/pissang
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiplyAffine = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[4], a11 = a[5], a12 = a[6],
        a20 = a[8], a21 = a[9], a22 = a[10],
        a30 = a[12], a31 = a[13], a32 = a[14];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2];
    out[0] = b0*a00 + b1*a10 + b2*a20;
    out[1] = b0*a01 + b1*a11 + b2*a21;
    out[2] = b0*a02 + b1*a12 + b2*a22;
    // out[3] = 0;

    b0 = b[4]; b1 = b[5]; b2 = b[6];
    out[4] = b0*a00 + b1*a10 + b2*a20;
    out[5] = b0*a01 + b1*a11 + b2*a21;
    out[6] = b0*a02 + b1*a12 + b2*a22;
    // out[7] = 0;

    b0 = b[8]; b1 = b[9]; b2 = b[10];
    out[8] = b0*a00 + b1*a10 + b2*a20;
    out[9] = b0*a01 + b1*a11 + b2*a21;
    out[10] = b0*a02 + b1*a12 + b2*a22;
    // out[11] = 0;

    b0 = b[12]; b1 = b[13]; b2 = b[14];
    out[12] = b0*a00 + b1*a10 + b2*a20 + a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + a32;
    // out[15] = 1;
    return out;
};

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Alias for {@link mat4.multiplyAffine}
 * @function
 */
mat4.mulAffine = mat4.multiplyAffine;
/**
 * Translate a mat4 by the given vector
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Rotates a mat4 by the given angle
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < GLMAT_EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < GLMAT_EPSILON &&
        Math.abs(eyey - centery) < GLMAT_EPSILON &&
        Math.abs(eyez - centerz) < GLMAT_EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};


if(typeof(exports) !== 'undefined') {
    exports.mat4 = mat4;
}
;
/* Copyright (c) 2013, Brandon Jones, Colin MacKenzie IV. All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

  * Redistributions of source code must retain the above copyright notice, this
    list of conditions and the following disclaimer.
  * Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

/**
 * @class Quaternion
 * @name quat
 */

var quat = {};

/**
 * Creates a new identity quat
 *
 * @returns {quat} a new quaternion
 */
quat.create = function() {
    var out = new GLMAT_ARRAY_TYPE(4);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quaternion to represent the shortest rotation from one
 * vector to another.
 *
 * Both vectors are assumed to be unit length.
 *
 * @param {quat} out the receiving quaternion.
 * @param {vec3} a the initial vector
 * @param {vec3} b the destination vector
 * @returns {quat} out
 */
quat.rotationTo = (function() {
    var tmpvec3 = vec3.create();
    var xUnitVec3 = vec3.fromValues(1,0,0);
    var yUnitVec3 = vec3.fromValues(0,1,0);

    return function(out, a, b) {
        var dot = vec3.dot(a, b);
        if (dot < -0.999999) {
            vec3.cross(tmpvec3, xUnitVec3, a);
            if (vec3.length(tmpvec3) < 0.000001)
                vec3.cross(tmpvec3, yUnitVec3, a);
            vec3.normalize(tmpvec3, tmpvec3);
            quat.setAxisAngle(out, tmpvec3, Math.PI);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            vec3.cross(tmpvec3, a, b);
            out[0] = tmpvec3[0];
            out[1] = tmpvec3[1];
            out[2] = tmpvec3[2];
            out[3] = 1 + dot;
            return quat.normalize(out, out);
        }
    };
})();

/**
 * Sets the specified quaternion with values corresponding to the given
 * axes. Each axis is a vec3 and is expected to be unit length and
 * perpendicular to all other specified axes.
 *
 * @param {vec3} view  the vector representing the viewing direction
 * @param {vec3} right the vector representing the local "right" direction
 * @param {vec3} up    the vector representing the local "up" direction
 * @returns {quat} out
 */
quat.setAxes = (function() {
    var matr = mat3.create();

    return function(out, view, right, up) {
        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];

        return quat.normalize(out, quat.fromMat3(out, matr));
    };
})();

/**
 * Creates a new quat initialized with values from an existing quaternion
 *
 * @param {quat} a quaternion to clone
 * @returns {quat} a new quaternion
 * @function
 */
quat.clone = vec4.clone;

/**
 * Creates a new quat initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} a new quaternion
 * @function
 */
quat.fromValues = vec4.fromValues;

/**
 * Copy the values from one quat to another
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the source quaternion
 * @returns {quat} out
 * @function
 */
quat.copy = vec4.copy;

/**
 * Set the components of a quat to the given values
 *
 * @param {quat} out the receiving quaternion
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {quat} out
 * @function
 */
quat.set = vec4.set;

/**
 * Set a quat to the identity quaternion
 *
 * @param {quat} out the receiving quaternion
 * @returns {quat} out
 */
quat.identity = function(out) {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Sets a quat from the given angle and rotation axis,
 * then returns it.
 *
 * @param {quat} out the receiving quaternion
 * @param {vec3} axis the axis around which to rotate
 * @param {Number} rad the angle in radians
 * @returns {quat} out
 **/
quat.setAxisAngle = function(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
};

/**
 * Adds two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 * @function
 */
quat.add = vec4.add;

/**
 * Multiplies two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {quat} out
 */
quat.multiply = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    out[0] = ax * bw + aw * bx + ay * bz - az * by;
    out[1] = ay * bw + aw * by + az * bx - ax * bz;
    out[2] = az * bw + aw * bz + ax * by - ay * bx;
    out[3] = aw * bw - ax * bx - ay * by - az * bz;
    return out;
};

/**
 * Alias for {@link quat.multiply}
 * @function
 */
quat.mul = quat.multiply;

/**
 * Scales a quat by a scalar number
 *
 * @param {quat} out the receiving vector
 * @param {quat} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {quat} out
 * @function
 */
quat.scale = vec4.scale;

/**
 * Rotates a quaternion by the given angle about the X axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateX = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + aw * bx;
    out[1] = ay * bw + az * bx;
    out[2] = az * bw - ay * bx;
    out[3] = aw * bw - ax * bx;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Y axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateY = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        by = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw - az * by;
    out[1] = ay * bw + aw * by;
    out[2] = az * bw + ax * by;
    out[3] = aw * bw - ay * by;
    return out;
};

/**
 * Rotates a quaternion by the given angle about the Z axis
 *
 * @param {quat} out quat receiving operation result
 * @param {quat} a quat to rotate
 * @param {number} rad angle (in radians) to rotate
 * @returns {quat} out
 */
quat.rotateZ = function (out, a, rad) {
    rad *= 0.5;

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bz = Math.sin(rad), bw = Math.cos(rad);

    out[0] = ax * bw + ay * bz;
    out[1] = ay * bw - ax * bz;
    out[2] = az * bw + aw * bz;
    out[3] = aw * bw - az * bz;
    return out;
};

/**
 * Calculates the W component of a quat from the X, Y, and Z components.
 * Assumes that quaternion is 1 unit in length.
 * Any existing W component will be ignored.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate W component of
 * @returns {quat} out
 */
quat.calculateW = function (out, a) {
    var x = a[0], y = a[1], z = a[2];

    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
    return out;
};

/**
 * Calculates the dot product of two quat's
 *
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @returns {Number} dot product of a and b
 * @function
 */
quat.dot = vec4.dot;

/**
 * Performs a linear interpolation between two quat's
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 * @function
 */
quat.lerp = vec4.lerp;

/**
 * Performs a spherical linear interpolation between two quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a the first operand
 * @param {quat} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {quat} out
 */
quat.slerp = function (out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations

    var ax = a[0], ay = a[1], az = a[2], aw = a[3],
        bx = b[0], by = b[1], bz = b[2], bw = b[3];

    var        omega, cosom, sinom, scale0, scale1;

    // calc cosine
    cosom = ax * bx + ay * by + az * bz + aw * bw;
    // adjust signs (if necessary)
    if ( cosom < 0.0 ) {
        cosom = -cosom;
        bx = - bx;
        by = - by;
        bz = - bz;
        bw = - bw;
    }
    // calculate coefficients
    if ( (1.0 - cosom) > 0.000001 ) {
        // standard case (slerp)
        omega  = Math.acos(cosom);
        sinom  = Math.sin(omega);
        scale0 = Math.sin((1.0 - t) * omega) / sinom;
        scale1 = Math.sin(t * omega) / sinom;
    } else {
        // "from" and "to" quaternions are very close
        //  ... so we can do a linear interpolation
        scale0 = 1.0 - t;
        scale1 = t;
    }
    // calculate final values
    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;

    return out;
};

/**
 * Calculates the inverse of a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate inverse of
 * @returns {quat} out
 */
quat.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        dot = a0*a0 + a1*a1 + a2*a2 + a3*a3,
        invDot = dot ? 1.0/dot : 0;

    // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

    out[0] = -a0*invDot;
    out[1] = -a1*invDot;
    out[2] = -a2*invDot;
    out[3] = a3*invDot;
    return out;
};

/**
 * Calculates the conjugate of a quat
 * If the quaternion is normalized, this function is faster than quat.inverse and produces the same result.
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quat to calculate conjugate of
 * @returns {quat} out
 */
quat.conjugate = function (out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] = a[3];
    return out;
};

/**
 * Calculates the length of a quat
 *
 * @param {quat} a vector to calculate length of
 * @returns {Number} length of a
 * @function
 */
quat.length = vec4.length;

/**
 * Alias for {@link quat.length}
 * @function
 */
quat.len = quat.length;

/**
 * Calculates the squared length of a quat
 *
 * @param {quat} a vector to calculate squared length of
 * @returns {Number} squared length of a
 * @function
 */
quat.squaredLength = vec4.squaredLength;

/**
 * Alias for {@link quat.squaredLength}
 * @function
 */
quat.sqrLen = quat.squaredLength;

/**
 * Normalize a quat
 *
 * @param {quat} out the receiving quaternion
 * @param {quat} a quaternion to normalize
 * @returns {quat} out
 * @function
 */
quat.normalize = vec4.normalize;

/**
 * Creates a quaternion from the given 3x3 rotation matrix.
 *
 * NOTE: The resultant quaternion is not normalized, so you should be sure
 * to renormalize the quaternion yourself where necessary.
 *
 * @param {quat} out the receiving quaternion
 * @param {mat3} m rotation matrix
 * @returns {quat} out
 * @function
 */
quat.fromMat3 = function(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if ( fTrace > 0.0 ) {
        // |w| > 1/2, may as well choose w > 1/2
        fRoot = Math.sqrt(fTrace + 1.0);  // 2w
        out[3] = 0.5 * fRoot;
        fRoot = 0.5/fRoot;  // 1/(4w)
        out[0] = (m[5]-m[7])*fRoot;
        out[1] = (m[6]-m[2])*fRoot;
        out[2] = (m[1]-m[3])*fRoot;
    } else {
        // |w| <= 1/2
        var i = 0;
        if ( m[4] > m[0] )
          i = 1;
        if ( m[8] > m[i*3+i] )
          i = 2;
        var j = (i+1)%3;
        var k = (i+2)%3;

        fRoot = Math.sqrt(m[i*3+i]-m[j*3+j]-m[k*3+k] + 1.0);
        out[i] = 0.5 * fRoot;
        fRoot = 0.5 / fRoot;
        out[3] = (m[j*3+k] - m[k*3+j]) * fRoot;
        out[j] = (m[j*3+i] + m[i*3+j]) * fRoot;
        out[k] = (m[k*3+i] + m[i*3+k]) * fRoot;
    }

    return out;
};

/**
 * Returns a string representation of a quatenion
 *
 * @param {quat} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
quat.str = function (a) {
    return 'quat(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

if(typeof(exports) !== 'undefined') {
    exports.quat = quat;
}
;













  })(shim.exports);
})(this);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var extendMixin = __webpack_require__(56);
    var notifierMixin = __webpack_require__(57);
    var util = __webpack_require__(13);

    /**
     * Base class of all objects
     * @constructor
     * @alias qtek.core.Base
     * @mixes qtek.core.mixin.notifier
     */
    var Base = function () {
        /**
         * @type {number}
         */
        this.__GUID__ = util.genGUID();
    };

    Base.__initializers__ = [
        function (opts) {
            util.extend(this, opts);
        }
    ];

    util.extend(Base, extendMixin);
    util.extend(Base.prototype, notifierMixin);

    module.exports = Base;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * @namespace qtek.core.glenum
 * @see http://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14
 */


module.exports = {
    /* ClearBufferMask */
    DEPTH_BUFFER_BIT               : 0x00000100,
    STENCIL_BUFFER_BIT             : 0x00000400,
    COLOR_BUFFER_BIT               : 0x00004000,

    /* BeginMode */
    POINTS                         : 0x0000,
    LINES                          : 0x0001,
    LINE_LOOP                      : 0x0002,
    LINE_STRIP                     : 0x0003,
    TRIANGLES                      : 0x0004,
    TRIANGLE_STRIP                 : 0x0005,
    TRIANGLE_FAN                   : 0x0006,

    /* AlphaFunction (not supported in ES20) */
    /*      NEVER */
    /*      LESS */
    /*      EQUAL */
    /*      LEQUAL */
    /*      GREATER */
    /*      NOTEQUAL */
    /*      GEQUAL */
    /*      ALWAYS */

    /* BlendingFactorDest */
    ZERO                           : 0,
    ONE                            : 1,
    SRC_COLOR                      : 0x0300,
    ONE_MINUS_SRC_COLOR            : 0x0301,
    SRC_ALPHA                      : 0x0302,
    ONE_MINUS_SRC_ALPHA            : 0x0303,
    DST_ALPHA                      : 0x0304,
    ONE_MINUS_DST_ALPHA            : 0x0305,

    /* BlendingFactorSrc */
    /*      ZERO */
    /*      ONE */
    DST_COLOR                      : 0x0306,
    ONE_MINUS_DST_COLOR            : 0x0307,
    SRC_ALPHA_SATURATE             : 0x0308,
    /*      SRC_ALPHA */
    /*      ONE_MINUS_SRC_ALPHA */
    /*      DST_ALPHA */
    /*      ONE_MINUS_DST_ALPHA */

    /* BlendEquationSeparate */
    FUNC_ADD                       : 0x8006,
    BLEND_EQUATION                 : 0x8009,
    BLEND_EQUATION_RGB             : 0x8009, /* same as BLEND_EQUATION */
    BLEND_EQUATION_ALPHA           : 0x883D,

    /* BlendSubtract */
    FUNC_SUBTRACT                  : 0x800A,
    FUNC_REVERSE_SUBTRACT          : 0x800B,

    /* Separate Blend Functions */
    BLEND_DST_RGB                  : 0x80C8,
    BLEND_SRC_RGB                  : 0x80C9,
    BLEND_DST_ALPHA                : 0x80CA,
    BLEND_SRC_ALPHA                : 0x80CB,
    CONSTANT_COLOR                 : 0x8001,
    ONE_MINUS_CONSTANT_COLOR       : 0x8002,
    CONSTANT_ALPHA                 : 0x8003,
    ONE_MINUS_CONSTANT_ALPHA       : 0x8004,
    BLEND_COLOR                    : 0x8005,

    /* Buffer Objects */
    ARRAY_BUFFER                   : 0x8892,
    ELEMENT_ARRAY_BUFFER           : 0x8893,
    ARRAY_BUFFER_BINDING           : 0x8894,
    ELEMENT_ARRAY_BUFFER_BINDING   : 0x8895,

    STREAM_DRAW                    : 0x88E0,
    STATIC_DRAW                    : 0x88E4,
    DYNAMIC_DRAW                   : 0x88E8,

    BUFFER_SIZE                    : 0x8764,
    BUFFER_USAGE                   : 0x8765,

    CURRENT_VERTEX_ATTRIB          : 0x8626,

    /* CullFaceMode */
    FRONT                          : 0x0404,
    BACK                           : 0x0405,
    FRONT_AND_BACK                 : 0x0408,

    /* DepthFunction */
    /*      NEVER */
    /*      LESS */
    /*      EQUAL */
    /*      LEQUAL */
    /*      GREATER */
    /*      NOTEQUAL */
    /*      GEQUAL */
    /*      ALWAYS */

    /* EnableCap */
    /* TEXTURE_2D */
    CULL_FACE                      : 0x0B44,
    BLEND                          : 0x0BE2,
    DITHER                         : 0x0BD0,
    STENCIL_TEST                   : 0x0B90,
    DEPTH_TEST                     : 0x0B71,
    SCISSOR_TEST                   : 0x0C11,
    POLYGON_OFFSET_FILL            : 0x8037,
    SAMPLE_ALPHA_TO_COVERAGE       : 0x809E,
    SAMPLE_COVERAGE                : 0x80A0,

    /* ErrorCode */
    NO_ERROR                       : 0,
    INVALID_ENUM                   : 0x0500,
    INVALID_VALUE                  : 0x0501,
    INVALID_OPERATION              : 0x0502,
    OUT_OF_MEMORY                  : 0x0505,

    /* FrontFaceDirection */
    CW                             : 0x0900,
    CCW                            : 0x0901,

    /* GetPName */
    LINE_WIDTH                     : 0x0B21,
    ALIASED_POINT_SIZE_RANGE       : 0x846D,
    ALIASED_LINE_WIDTH_RANGE       : 0x846E,
    CULL_FACE_MODE                 : 0x0B45,
    FRONT_FACE                     : 0x0B46,
    DEPTH_RANGE                    : 0x0B70,
    DEPTH_WRITEMASK                : 0x0B72,
    DEPTH_CLEAR_VALUE              : 0x0B73,
    DEPTH_FUNC                     : 0x0B74,
    STENCIL_CLEAR_VALUE            : 0x0B91,
    STENCIL_FUNC                   : 0x0B92,
    STENCIL_FAIL                   : 0x0B94,
    STENCIL_PASS_DEPTH_FAIL        : 0x0B95,
    STENCIL_PASS_DEPTH_PASS        : 0x0B96,
    STENCIL_REF                    : 0x0B97,
    STENCIL_VALUE_MASK             : 0x0B93,
    STENCIL_WRITEMASK              : 0x0B98,
    STENCIL_BACK_FUNC              : 0x8800,
    STENCIL_BACK_FAIL              : 0x8801,
    STENCIL_BACK_PASS_DEPTH_FAIL   : 0x8802,
    STENCIL_BACK_PASS_DEPTH_PASS   : 0x8803,
    STENCIL_BACK_REF               : 0x8CA3,
    STENCIL_BACK_VALUE_MASK        : 0x8CA4,
    STENCIL_BACK_WRITEMASK         : 0x8CA5,
    VIEWPORT                       : 0x0BA2,
    SCISSOR_BOX                    : 0x0C10,
    /*      SCISSOR_TEST */
    COLOR_CLEAR_VALUE              : 0x0C22,
    COLOR_WRITEMASK                : 0x0C23,
    UNPACK_ALIGNMENT               : 0x0CF5,
    PACK_ALIGNMENT                 : 0x0D05,
    MAX_TEXTURE_SIZE               : 0x0D33,
    MAX_VIEWPORT_DIMS              : 0x0D3A,
    SUBPIXEL_BITS                  : 0x0D50,
    RED_BITS                       : 0x0D52,
    GREEN_BITS                     : 0x0D53,
    BLUE_BITS                      : 0x0D54,
    ALPHA_BITS                     : 0x0D55,
    DEPTH_BITS                     : 0x0D56,
    STENCIL_BITS                   : 0x0D57,
    POLYGON_OFFSET_UNITS           : 0x2A00,
    /*      POLYGON_OFFSET_FILL */
    POLYGON_OFFSET_FACTOR          : 0x8038,
    TEXTURE_BINDING_2D             : 0x8069,
    SAMPLE_BUFFERS                 : 0x80A8,
    SAMPLES                        : 0x80A9,
    SAMPLE_COVERAGE_VALUE          : 0x80AA,
    SAMPLE_COVERAGE_INVERT         : 0x80AB,

    /* GetTextureParameter */
    /*      TEXTURE_MAG_FILTER */
    /*      TEXTURE_MIN_FILTER */
    /*      TEXTURE_WRAP_S */
    /*      TEXTURE_WRAP_T */

    COMPRESSED_TEXTURE_FORMATS     : 0x86A3,

    /* HintMode */
    DONT_CARE                      : 0x1100,
    FASTEST                        : 0x1101,
    NICEST                         : 0x1102,

    /* HintTarget */
    GENERATE_MIPMAP_HINT            : 0x8192,

    /* DataType */
    BYTE                           : 0x1400,
    UNSIGNED_BYTE                  : 0x1401,
    SHORT                          : 0x1402,
    UNSIGNED_SHORT                 : 0x1403,
    INT                            : 0x1404,
    UNSIGNED_INT                   : 0x1405,
    FLOAT                          : 0x1406,

    /* PixelFormat */
    DEPTH_COMPONENT                : 0x1902,
    ALPHA                          : 0x1906,
    RGB                            : 0x1907,
    RGBA                           : 0x1908,
    LUMINANCE                      : 0x1909,
    LUMINANCE_ALPHA                : 0x190A,

    /* PixelType */
    /*      UNSIGNED_BYTE */
    UNSIGNED_SHORT_4_4_4_4         : 0x8033,
    UNSIGNED_SHORT_5_5_5_1         : 0x8034,
    UNSIGNED_SHORT_5_6_5           : 0x8363,

    /* Shaders */
    FRAGMENT_SHADER                  : 0x8B30,
    VERTEX_SHADER                    : 0x8B31,
    MAX_VERTEX_ATTRIBS               : 0x8869,
    MAX_VERTEX_UNIFORM_VECTORS       : 0x8DFB,
    MAX_VARYING_VECTORS              : 0x8DFC,
    MAX_COMBINED_TEXTURE_IMAGE_UNITS : 0x8B4D,
    MAX_VERTEX_TEXTURE_IMAGE_UNITS   : 0x8B4C,
    MAX_TEXTURE_IMAGE_UNITS          : 0x8872,
    MAX_FRAGMENT_UNIFORM_VECTORS     : 0x8DFD,
    SHADER_TYPE                      : 0x8B4F,
    DELETE_STATUS                    : 0x8B80,
    LINK_STATUS                      : 0x8B82,
    VALIDATE_STATUS                  : 0x8B83,
    ATTACHED_SHADERS                 : 0x8B85,
    ACTIVE_UNIFORMS                  : 0x8B86,
    ACTIVE_ATTRIBUTES                : 0x8B89,
    SHADING_LANGUAGE_VERSION         : 0x8B8C,
    CURRENT_PROGRAM                  : 0x8B8D,

    /* StencilFunction */
    NEVER                          : 0x0200,
    LESS                           : 0x0201,
    EQUAL                          : 0x0202,
    LEQUAL                         : 0x0203,
    GREATER                        : 0x0204,
    NOTEQUAL                       : 0x0205,
    GEQUAL                         : 0x0206,
    ALWAYS                         : 0x0207,

    /* StencilOp */
    /*      ZERO */
    KEEP                           : 0x1E00,
    REPLACE                        : 0x1E01,
    INCR                           : 0x1E02,
    DECR                           : 0x1E03,
    INVERT                         : 0x150A,
    INCR_WRAP                      : 0x8507,
    DECR_WRAP                      : 0x8508,

    /* StringName */
    VENDOR                         : 0x1F00,
    RENDERER                       : 0x1F01,
    VERSION                        : 0x1F02,

    /* TextureMagFilter */
    NEAREST                        : 0x2600,
    LINEAR                         : 0x2601,

    /* TextureMinFilter */
    /*      NEAREST */
    /*      LINEAR */
    NEAREST_MIPMAP_NEAREST         : 0x2700,
    LINEAR_MIPMAP_NEAREST          : 0x2701,
    NEAREST_MIPMAP_LINEAR          : 0x2702,
    LINEAR_MIPMAP_LINEAR           : 0x2703,

    /* TextureParameterName */
    TEXTURE_MAG_FILTER             : 0x2800,
    TEXTURE_MIN_FILTER             : 0x2801,
    TEXTURE_WRAP_S                 : 0x2802,
    TEXTURE_WRAP_T                 : 0x2803,

    /* TextureTarget */
    TEXTURE_2D                     : 0x0DE1,
    TEXTURE                        : 0x1702,

    TEXTURE_CUBE_MAP               : 0x8513,
    TEXTURE_BINDING_CUBE_MAP       : 0x8514,
    TEXTURE_CUBE_MAP_POSITIVE_X    : 0x8515,
    TEXTURE_CUBE_MAP_NEGATIVE_X    : 0x8516,
    TEXTURE_CUBE_MAP_POSITIVE_Y    : 0x8517,
    TEXTURE_CUBE_MAP_NEGATIVE_Y    : 0x8518,
    TEXTURE_CUBE_MAP_POSITIVE_Z    : 0x8519,
    TEXTURE_CUBE_MAP_NEGATIVE_Z    : 0x851A,
    MAX_CUBE_MAP_TEXTURE_SIZE      : 0x851C,

    /* TextureUnit */
    TEXTURE0                       : 0x84C0,
    TEXTURE1                       : 0x84C1,
    TEXTURE2                       : 0x84C2,
    TEXTURE3                       : 0x84C3,
    TEXTURE4                       : 0x84C4,
    TEXTURE5                       : 0x84C5,
    TEXTURE6                       : 0x84C6,
    TEXTURE7                       : 0x84C7,
    TEXTURE8                       : 0x84C8,
    TEXTURE9                       : 0x84C9,
    TEXTURE10                      : 0x84CA,
    TEXTURE11                      : 0x84CB,
    TEXTURE12                      : 0x84CC,
    TEXTURE13                      : 0x84CD,
    TEXTURE14                      : 0x84CE,
    TEXTURE15                      : 0x84CF,
    TEXTURE16                      : 0x84D0,
    TEXTURE17                      : 0x84D1,
    TEXTURE18                      : 0x84D2,
    TEXTURE19                      : 0x84D3,
    TEXTURE20                      : 0x84D4,
    TEXTURE21                      : 0x84D5,
    TEXTURE22                      : 0x84D6,
    TEXTURE23                      : 0x84D7,
    TEXTURE24                      : 0x84D8,
    TEXTURE25                      : 0x84D9,
    TEXTURE26                      : 0x84DA,
    TEXTURE27                      : 0x84DB,
    TEXTURE28                      : 0x84DC,
    TEXTURE29                      : 0x84DD,
    TEXTURE30                      : 0x84DE,
    TEXTURE31                      : 0x84DF,
    ACTIVE_TEXTURE                 : 0x84E0,

    /* TextureWrapMode */
    REPEAT                         : 0x2901,
    CLAMP_TO_EDGE                  : 0x812F,
    MIRRORED_REPEAT                : 0x8370,

    /* Uniform Types */
    FLOAT_VEC2                     : 0x8B50,
    FLOAT_VEC3                     : 0x8B51,
    FLOAT_VEC4                     : 0x8B52,
    INT_VEC2                       : 0x8B53,
    INT_VEC3                       : 0x8B54,
    INT_VEC4                       : 0x8B55,
    BOOL                           : 0x8B56,
    BOOL_VEC2                      : 0x8B57,
    BOOL_VEC3                      : 0x8B58,
    BOOL_VEC4                      : 0x8B59,
    FLOAT_MAT2                     : 0x8B5A,
    FLOAT_MAT3                     : 0x8B5B,
    FLOAT_MAT4                     : 0x8B5C,
    SAMPLER_2D                     : 0x8B5E,
    SAMPLER_CUBE                   : 0x8B60,

    /* Vertex Arrays */
    VERTEX_ATTRIB_ARRAY_ENABLED        : 0x8622,
    VERTEX_ATTRIB_ARRAY_SIZE           : 0x8623,
    VERTEX_ATTRIB_ARRAY_STRIDE         : 0x8624,
    VERTEX_ATTRIB_ARRAY_TYPE           : 0x8625,
    VERTEX_ATTRIB_ARRAY_NORMALIZED     : 0x886A,
    VERTEX_ATTRIB_ARRAY_POINTER        : 0x8645,
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING : 0x889F,

    /* Shader Source */
    COMPILE_STATUS                 : 0x8B81,

    /* Shader Precision-Specified Types */
    LOW_FLOAT                      : 0x8DF0,
    MEDIUM_FLOAT                   : 0x8DF1,
    HIGH_FLOAT                     : 0x8DF2,
    LOW_INT                        : 0x8DF3,
    MEDIUM_INT                     : 0x8DF4,
    HIGH_INT                       : 0x8DF5,

    /* Framebuffer Object. */
    FRAMEBUFFER                    : 0x8D40,
    RENDERBUFFER                   : 0x8D41,

    RGBA4                          : 0x8056,
    RGB5_A1                        : 0x8057,
    RGB565                         : 0x8D62,
    DEPTH_COMPONENT16              : 0x81A5,
    STENCIL_INDEX                  : 0x1901,
    STENCIL_INDEX8                 : 0x8D48,
    DEPTH_STENCIL                  : 0x84F9,

    RENDERBUFFER_WIDTH             : 0x8D42,
    RENDERBUFFER_HEIGHT            : 0x8D43,
    RENDERBUFFER_INTERNAL_FORMAT   : 0x8D44,
    RENDERBUFFER_RED_SIZE          : 0x8D50,
    RENDERBUFFER_GREEN_SIZE        : 0x8D51,
    RENDERBUFFER_BLUE_SIZE         : 0x8D52,
    RENDERBUFFER_ALPHA_SIZE        : 0x8D53,
    RENDERBUFFER_DEPTH_SIZE        : 0x8D54,
    RENDERBUFFER_STENCIL_SIZE      : 0x8D55,

    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE           : 0x8CD0,
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME           : 0x8CD1,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL         : 0x8CD2,
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE : 0x8CD3,

    COLOR_ATTACHMENT0              : 0x8CE0,
    DEPTH_ATTACHMENT               : 0x8D00,
    STENCIL_ATTACHMENT             : 0x8D20,
    DEPTH_STENCIL_ATTACHMENT       : 0x821A,

    NONE                           : 0,

    FRAMEBUFFER_COMPLETE                      : 0x8CD5,
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT         : 0x8CD6,
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT : 0x8CD7,
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS         : 0x8CD9,
    FRAMEBUFFER_UNSUPPORTED                   : 0x8CDD,

    FRAMEBUFFER_BINDING            : 0x8CA6,
    RENDERBUFFER_BINDING           : 0x8CA7,
    MAX_RENDERBUFFER_SIZE          : 0x84E8,

    INVALID_FRAMEBUFFER_OPERATION  : 0x0506,

    /* WebGL-specific enums */
    UNPACK_FLIP_Y_WEBGL            : 0x9240,
    UNPACK_PREMULTIPLY_ALPHA_WEBGL : 0x9241,
    CONTEXT_LOST_WEBGL             : 0x9242,
    UNPACK_COLORSPACE_CONVERSION_WEBGL : 0x9243,
    BROWSER_DEFAULT_WEBGL          : 0x9244,
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var glMatrix = __webpack_require__(0);
    var vec3 = glMatrix.vec3;

    /**
     * @constructor
     * @alias qtek.math.Vector3
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    var Vector3 = function(x, y, z) {

        x = x || 0;
        y = y || 0;
        z = z || 0;

        /**
         * Storage of Vector3, read and write of x, y, z will change the values in _array
         * All methods also operate on the _array instead of x, y, z components
         * @name _array
         * @type {Float32Array}
         */
        this._array = vec3.fromValues(x, y, z);

        /**
         * Dirty flag is used by the Node to determine
         * if the matrix is updated to latest
         * @name _dirty
         * @type {boolean}
         */
        this._dirty = true;
    };

    Vector3.prototype = {

        constructor : Vector3,

        /**
         * Add b to self
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        add: function (b) {
            vec3.add(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Set x, y and z components
         * @param  {number}  x
         * @param  {number}  y
         * @param  {number}  z
         * @return {qtek.math.Vector3}
         */
        set: function (x, y, z) {
            this._array[0] = x;
            this._array[1] = y;
            this._array[2] = z;
            this._dirty = true;
            return this;
        },

        /**
         * Set x, y and z components from array
         * @param  {Float32Array|number[]} arr
         * @return {qtek.math.Vector3}
         */
        setArray: function (arr) {
            this._array[0] = arr[0];
            this._array[1] = arr[1];
            this._array[2] = arr[2];

            this._dirty = true;
            return this;
        },

        /**
         * Clone a new Vector3
         * @return {qtek.math.Vector3}
         */
        clone: function () {
            return new Vector3(this.x, this.y, this.z);
        },

        /**
         * Copy from b
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        copy: function (b) {
            vec3.copy(this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Cross product of self and b, written to a Vector3 out
         * @param  {qtek.math.Vector3} a
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        cross: function (a, b) {
            vec3.cross(this._array, a._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for distance
         * @param  {qtek.math.Vector3} b
         * @return {number}
         */
        dist: function (b) {
            return vec3.dist(this._array, b._array);
        },

        /**
         * Distance between self and b
         * @param  {qtek.math.Vector3} b
         * @return {number}
         */
        distance: function (b) {
            return vec3.distance(this._array, b._array);
        },

        /**
         * Alias for divide
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        div: function (b) {
            vec3.div(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Divide self by b
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        divide: function (b) {
            vec3.divide(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Dot product of self and b
         * @param  {qtek.math.Vector3} b
         * @return {number}
         */
        dot: function (b) {
            return vec3.dot(this._array, b._array);
        },

        /**
         * Alias of length
         * @return {number}
         */
        len: function () {
            return vec3.len(this._array);
        },

        /**
         * Calculate the length
         * @return {number}
         */
        length: function () {
            return vec3.length(this._array);
        },
        /**
         * Linear interpolation between a and b
         * @param  {qtek.math.Vector3} a
         * @param  {qtek.math.Vector3} b
         * @param  {number}  t
         * @return {qtek.math.Vector3}
         */
        lerp: function (a, b, t) {
            vec3.lerp(this._array, a._array, b._array, t);
            this._dirty = true;
            return this;
        },

        /**
         * Minimum of self and b
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        min: function (b) {
            vec3.min(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Maximum of self and b
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        max: function (b) {
            vec3.max(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for multiply
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        mul: function (b) {
            vec3.mul(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Mutiply self and b
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        multiply: function (b) {
            vec3.multiply(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Negate self
         * @return {qtek.math.Vector3}
         */
        negate: function () {
            vec3.negate(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Normalize self
         * @return {qtek.math.Vector3}
         */
        normalize: function () {
            vec3.normalize(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Generate random x, y, z components with a given scale
         * @param  {number} scale
         * @return {qtek.math.Vector3}
         */
        random: function (scale) {
            vec3.random(this._array, scale);
            this._dirty = true;
            return this;
        },

        /**
         * Scale self
         * @param  {number}  scale
         * @return {qtek.math.Vector3}
         */
        scale: function (s) {
            vec3.scale(this._array, this._array, s);
            this._dirty = true;
            return this;
        },

        /**
         * Scale b and add to self
         * @param  {qtek.math.Vector3} b
         * @param  {number}  scale
         * @return {qtek.math.Vector3}
         */
        scaleAndAdd: function (b, s) {
            vec3.scaleAndAdd(this._array, this._array, b._array, s);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for squaredDistance
         * @param  {qtek.math.Vector3} b
         * @return {number}
         */
        sqrDist: function (b) {
            return vec3.sqrDist(this._array, b._array);
        },

        /**
         * Squared distance between self and b
         * @param  {qtek.math.Vector3} b
         * @return {number}
         */
        squaredDistance: function (b) {
            return vec3.squaredDistance(this._array, b._array);
        },

        /**
         * Alias for squaredLength
         * @return {number}
         */
        sqrLen: function () {
            return vec3.sqrLen(this._array);
        },

        /**
         * Squared length of self
         * @return {number}
         */
        squaredLength: function () {
            return vec3.squaredLength(this._array);
        },

        /**
         * Alias for subtract
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        sub: function (b) {
            vec3.sub(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Subtract b from self
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Vector3}
         */
        subtract: function (b) {
            vec3.subtract(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transform self with a Matrix3 m
         * @param  {qtek.math.Matrix3} m
         * @return {qtek.math.Vector3}
         */
        transformMat3: function (m) {
            vec3.transformMat3(this._array, this._array, m._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transform self with a Matrix4 m
         * @param  {qtek.math.Matrix4} m
         * @return {qtek.math.Vector3}
         */
        transformMat4: function (m) {
            vec3.transformMat4(this._array, this._array, m._array);
            this._dirty = true;
            return this;
        },
        /**
         * Transform self with a Quaternion q
         * @param  {qtek.math.Quaternion} q
         * @return {qtek.math.Vector3}
         */
        transformQuat: function (q) {
            vec3.transformQuat(this._array, this._array, q._array);
            this._dirty = true;
            return this;
        },

        /**
         * Trasnform self into projection space with m
         * @param  {qtek.math.Matrix4} m
         * @return {qtek.math.Vector3}
         */
        applyProjection: function (m) {
            var v = this._array;
            m = m._array;

            // Perspective projection
            if (m[15] === 0) {
                var w = -1 / v[2];
                v[0] = m[0] * v[0] * w;
                v[1] = m[5] * v[1] * w;
                v[2] = (m[10] * v[2] + m[14]) * w;
            }
            else {
                v[0] = m[0] * v[0] + m[12];
                v[1] = m[5] * v[1] + m[13];
                v[2] = m[10] * v[2] + m[14];
            }
            this._dirty = true;

            return this;
        },

        eulerFromQuat: function(q, order) {
            Vector3.eulerFromQuat(this, q, order);
        },

        eulerFromMat3: function (m, order) {
            Vector3.eulerFromMat3(this, m, order);
        },

        toString: function() {
            return '[' + Array.prototype.join.call(this._array, ',') + ']';
        },

        toArray: function () {
            return Array.prototype.slice.call(this._array);
        }
    };

    var defineProperty = Object.defineProperty;
    // Getter and Setter
    if (defineProperty) {

        var proto = Vector3.prototype;
        /**
         * @name x
         * @type {number}
         * @memberOf qtek.math.Vector3
         * @instance
         */
        defineProperty(proto, 'x', {
            get: function () {
                return this._array[0];
            },
            set: function (value) {
                this._array[0] = value;
                this._dirty = true;
            }
        });

        /**
         * @name y
         * @type {number}
         * @memberOf qtek.math.Vector3
         * @instance
         */
        defineProperty(proto, 'y', {
            get: function () {
                return this._array[1];
            },
            set: function (value) {
                this._array[1] = value;
                this._dirty = true;
            }
        });

        /**
         * @name z
         * @type {number}
         * @memberOf qtek.math.Vector3
         * @instance
         */
        defineProperty(proto, 'z', {
            get: function () {
                return this._array[2];
            },
            set: function (value) {
                this._array[2] = value;
                this._dirty = true;
            }
        });
    }


    // Supply methods that are not in place

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.add = function(out, a, b) {
        vec3.add(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {number}  x
     * @param  {number}  y
     * @param  {number}  z
     * @return {qtek.math.Vector3}
     */
    Vector3.set = function(out, x, y, z) {
        vec3.set(out._array, x, y, z);
        out._dirty = true;
    };

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.copy = function(out, b) {
        vec3.copy(out._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.cross = function(out, a, b) {
        vec3.cross(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {number}
     */
    Vector3.dist = function(a, b) {
        return vec3.distance(a._array, b._array);
    };

    /**
     * @method
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {number}
     */
    Vector3.distance = Vector3.dist;

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.div = function(out, a, b) {
        vec3.divide(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @method
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.divide = Vector3.div;

    /**
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {number}
     */
    Vector3.dot = function(a, b) {
        return vec3.dot(a._array, b._array);
    };

    /**
     * @param  {qtek.math.Vector3} a
     * @return {number}
     */
    Vector3.len = function(b) {
        return vec3.length(b._array);
    };

    // Vector3.length = Vector3.len;

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @param  {number}  t
     * @return {qtek.math.Vector3}
     */
    Vector3.lerp = function(out, a, b, t) {
        vec3.lerp(out._array, a._array, b._array, t);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.min = function(out, a, b) {
        vec3.min(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.max = function(out, a, b) {
        vec3.max(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.mul = function(out, a, b) {
        vec3.multiply(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @method
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.multiply = Vector3.mul;
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @return {qtek.math.Vector3}
     */
    Vector3.negate = function(out, a) {
        vec3.negate(out._array, a._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @return {qtek.math.Vector3}
     */
    Vector3.normalize = function(out, a) {
        vec3.normalize(out._array, a._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {number}  scale
     * @return {qtek.math.Vector3}
     */
    Vector3.random = function(out, scale) {
        vec3.random(out._array, scale);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {number}  scale
     * @return {qtek.math.Vector3}
     */
    Vector3.scale = function(out, a, scale) {
        vec3.scale(out._array, a._array, scale);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @param  {number}  scale
     * @return {qtek.math.Vector3}
     */
    Vector3.scaleAndAdd = function(out, a, b, scale) {
        vec3.scaleAndAdd(out._array, a._array, b._array, scale);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {number}
     */
    Vector3.sqrDist = function(a, b) {
        return vec3.sqrDist(a._array, b._array);
    };
    /**
     * @method
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {number}
     */
    Vector3.squaredDistance = Vector3.sqrDist;
    /**
     * @param  {qtek.math.Vector3} a
     * @return {number}
     */
    Vector3.sqrLen = function(a) {
        return vec3.sqrLen(a._array);
    };
    /**
     * @method
     * @param  {qtek.math.Vector3} a
     * @return {number}
     */
    Vector3.squaredLength = Vector3.sqrLen;

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.sub = function(out, a, b) {
        vec3.subtract(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @method
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Vector3} b
     * @return {qtek.math.Vector3}
     */
    Vector3.subtract = Vector3.sub;

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {Matrix3} m
     * @return {qtek.math.Vector3}
     */
    Vector3.transformMat3 = function(out, a, m) {
        vec3.transformMat3(out._array, a._array, m._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Matrix4} m
     * @return {qtek.math.Vector3}
     */
    Vector3.transformMat4 = function(out, a, m) {
        vec3.transformMat4(out._array, a._array, m._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector3} a
     * @param  {qtek.math.Quaternion} q
     * @return {qtek.math.Vector3}
     */
    Vector3.transformQuat = function(out, a, q) {
        vec3.transformQuat(out._array, a._array, q._array);
        out._dirty = true;
        return out;
    };

    function clamp(val, min, max) {
        return val < min ? min : (val > max ? max : val);
    }
    var atan2 = Math.atan2;
    var asin = Math.asin;
    var abs = Math.abs;
    /**
     * Convert quaternion to euler angle
     * Quaternion must be normalized
     * From three.js
     */
    Vector3.eulerFromQuat = function (out, q, order) {
        out._dirty = true;
        q = q._array;

        var target = out._array;
        var x = q[0], y = q[1], z = q[2], w = q[3];
        var x2 = x * x;
        var y2 = y * y;
        var z2 = z * z;
        var w2 = w * w;

        var order = (order || 'XYZ').toUpperCase();

        switch (order) {
            case 'XYZ':
                target[0] = atan2(2 * (x * w - y * z), (w2 - x2 - y2 + z2));
                target[1] = asin(clamp(2 * (x * z + y * w), - 1, 1));
                target[2] = atan2(2 * (z * w - x * y), (w2 + x2 - y2 - z2));
                break;
            case 'YXZ':
                target[0] = asin(clamp(2 * (x * w - y * z), - 1, 1));
                target[1] = atan2(2 * (x * z + y * w), (w2 - x2 - y2 + z2));
                target[2] = atan2(2 * (x * y + z * w), (w2 - x2 + y2 - z2));
                break;
            case 'ZXY':
                target[0] = asin(clamp(2 * (x * w + y * z), - 1, 1));
                target[1] = atan2(2 * (y * w - z * x), (w2 - x2 - y2 + z2));
                target[2] = atan2(2 * (z * w - x * y), (w2 - x2 + y2 - z2));
                break;
            case 'ZYX':
                target[0] = atan2(2 * (x * w + z * y), (w2 - x2 - y2 + z2));
                target[1] = asin(clamp(2 * (y * w - x * z), - 1, 1));
                target[2] = atan2(2 * (x * y + z * w), (w2 + x2 - y2 - z2));
                break;
            case 'YZX':
                target[0] = atan2(2 * (x * w - z * y), (w2 - x2 + y2 - z2));
                target[1] = atan2(2 * (y * w - x * z), (w2 + x2 - y2 - z2));
                target[2] = asin(clamp(2 * (x * y + z * w), - 1, 1));
                break;
            case 'XZY':
                target[0] = atan2(2 * (x * w + y * z), (w2 - x2 + y2 - z2));
                target[1] = atan2(2 * (x * z + y * w), (w2 + x2 - y2 - z2));
                target[2] = asin(clamp(2 * (z * w - x * y), - 1, 1));
                break;
            default:
                console.warn('Unkown order: ' + order);
        }
        return out;
    };

    /**
     * Convert rotation matrix to euler angle
     * from three.js
     */
    Vector3.eulerFromMat3 = function (out, m, order) {
        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        var te = m._array;
        var m11 = te[0], m12 = te[3], m13 = te[6];
        var m21 = te[1], m22 = te[4], m23 = te[7];
        var m31 = te[2], m32 = te[5], m33 = te[8];
        var target = out._array;

        var order = (order || 'XYZ').toUpperCase();

        switch (order) {
            case 'XYZ':
                target[1] = asin(clamp(m13, -1, 1));
                if (abs(m13) < 0.99999) {
                    target[0] = atan2(-m23, m33);
                    target[2] = atan2(-m12, m11);
                }
                else {
                    target[0] = atan2(m32, m22);
                    target[2] = 0;
                }
                break;
            case 'YXZ':
                target[0] = asin(-clamp(m23, -1, 1));
                if (abs(m23) < 0.99999) {
                    target[1] = atan2(m13, m33);
                    target[2] = atan2(m21, m22);
                }
                else {
                    target[1] = atan2(-m31, m11);
                    target[2] = 0;
                }
                break;
            case 'ZXY':
                target[0] = asin(clamp(m32, -1, 1));
                if (abs(m32) < 0.99999) {
                    target[1] = atan2(-m31, m33);
                    target[2] = atan2(-m12, m22);
                }
                else {
                    target[1] = 0;
                    target[2] = atan2(m21, m11);
                }
                break;
            case 'ZYX':
                target[1] = asin(-clamp(m31, -1, 1));
                if (abs(m31) < 0.99999) {
                    target[0] = atan2(m32, m33);
                    target[2] = atan2(m21, m11);
                }
                else {
                    target[0] = 0;
                    target[2] = atan2(-m12, m22);
                }
                break;
            case 'YZX':
                target[2] = asin(clamp(m21, -1, 1));
                if (abs(m21) < 0.99999) {
                    target[0] = atan2(-m23, m22);
                    target[1] = atan2(-m31, m11);
                }
                else {
                    target[0] = 0;
                    target[1] = atan2(m13, m33);
                }
                break;
            case 'XZY':
                target[2] = asin(-clamp(m12, -1, 1));
                if (abs(m12) < 0.99999) {
                    target[0] = atan2(m32, m22);
                    target[1] = atan2(m13, m11);
                }
                else {
                    target[0] = atan2(-m23, m33);
                    target[1] = 0;
                }
                break;
            default:
                console.warn('Unkown order: ' + order);
        }
        out._dirty = true;

        return out;
    };

    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.POSITIVE_X = new Vector3(1, 0, 0);
    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.NEGATIVE_X = new Vector3(-1, 0, 0);
    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.POSITIVE_Y = new Vector3(0, 1, 0);
    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.NEGATIVE_Y = new Vector3(0, -1, 0);
    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.POSITIVE_Z = new Vector3(0, 0, 1);
    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.NEGATIVE_Z = new Vector3(0, 0, -1);
    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.UP = new Vector3(0, 1, 0);
    /**
     * @type {qtek.math.Vector3}
     */
    Vector3.ZERO = new Vector3(0, 0, 0);

    module.exports = Vector3;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Vector3 = __webpack_require__(3);
    var glMatrix = __webpack_require__(0);
    var vec3 = glMatrix.vec3;

    var vec3Copy = vec3.copy;
    var vec3Set = vec3.set;

    /**
     * Axis aligned bounding box
     * @constructor
     * @alias qtek.math.BoundingBox
     * @param {qtek.math.Vector3} [min]
     * @param {qtek.math.Vector3} [max]
     */
    var BoundingBox = function (min, max) {

        /**
         * Minimum coords of bounding box
         * @type {qtek.math.Vector3}
         */
        this.min = min || new Vector3(Infinity, Infinity, Infinity);

        /**
         * Maximum coords of bounding box
         * @type {qtek.math.Vector3}
         */
        this.max = max || new Vector3(-Infinity, -Infinity, -Infinity);
    };

    BoundingBox.prototype = {

        constructor: BoundingBox,
        /**
         * Update min and max coords from a vertices array
         * @param  {array} vertices
         */
        updateFromVertices: function (vertices) {
            if (vertices.length > 0) {
                var min = this.min;
                var max = this.max;
                var minArr = min._array;
                var maxArr = max._array;
                vec3Copy(minArr, vertices[0]);
                vec3Copy(maxArr, vertices[0]);
                for (var i = 1; i < vertices.length; i++) {
                    var vertex = vertices[i];

                    if (vertex[0] < minArr[0]) { minArr[0] = vertex[0]; }
                    if (vertex[1] < minArr[1]) { minArr[1] = vertex[1]; }
                    if (vertex[2] < minArr[2]) { minArr[2] = vertex[2]; }

                    if (vertex[0] > maxArr[0]) { maxArr[0] = vertex[0]; }
                    if (vertex[1] > maxArr[1]) { maxArr[1] = vertex[1]; }
                    if (vertex[2] > maxArr[2]) { maxArr[2] = vertex[2]; }
                }
                min._dirty = true;
                max._dirty = true;
            }
        },

        /**
         * Union operation with another bounding box
         * @param  {qtek.math.BoundingBox} bbox
         */
        union: function (bbox) {
            var min = this.min;
            var max = this.max;
            vec3.min(min._array, min._array, bbox.min._array);
            vec3.max(max._array, max._array, bbox.max._array);
            min._dirty = true;
            max._dirty = true;
            return this;
        },

        /**
         * Intersection operation with another bounding box
         * @param  {qtek.math.BoundingBox} bbox
         */
        intersection: function (bbox) {
            var min = this.min;
            var max = this.max;
            vec3.max(min._array, min._array, bbox.min._array);
            vec3.min(max._array, max._array, bbox.max._array);
            min._dirty = true;
            max._dirty = true;
            return this;
        },

        /**
         * If intersect with another bounding box
         * @param  {qtek.math.BoundingBox} bbox
         * @return {boolean}
         */
        intersectBoundingBox: function (bbox) {
            var _min = this.min._array;
            var _max = this.max._array;

            var _min2 = bbox.min._array;
            var _max2 = bbox.max._array;

            return ! (_min[0] > _max2[0] || _min[1] > _max2[1] || _min[2] > _max2[2]
                || _max[0] < _min2[0] || _max[1] < _min2[1] || _max[2] < _min2[2]);
        },

        /**
         * If contain another bounding box entirely
         * @param  {qtek.math.BoundingBox} bbox
         * @return {boolean}
         */
        containBoundingBox: function (bbox) {

            var _min = this.min._array;
            var _max = this.max._array;

            var _min2 = bbox.min._array;
            var _max2 = bbox.max._array;

            return _min[0] <= _min2[0] && _min[1] <= _min2[1] && _min[2] <= _min2[2]
                && _max[0] >= _max2[0] && _max[1] >= _max2[1] && _max[2] >= _max2[2];
        },

        /**
         * If contain point entirely
         * @param  {qtek.math.Vector3} point
         * @return {boolean}
         */
        containPoint: function (p) {
            var _min = this.min._array;
            var _max = this.max._array;

            var _p = p._array;

            return _min[0] <= _p[0] && _min[1] <= _p[1] && _min[2] <= _p[2]
                && _max[0] >= _p[0] && _max[1] >= _p[1] && _max[2] >= _p[2];
        },

        /**
         * If bounding box is finite
         */
        isFinite: function () {
            var _min = this.min._array;
            var _max = this.max._array;
            return isFinite(_min[0]) && isFinite(_min[1]) && isFinite(_min[2])
                && isFinite(_max[0]) && isFinite(_max[1]) && isFinite(_max[2]);
        },

        /**
         * Apply an affine transform matrix to the bounding box
         * @param  {qtek.math.Matrix4} matrix
         */
        applyTransform: (function () {
            // http://dev.theomader.com/transform-bounding-boxes/
            var xa = vec3.create();
            var xb = vec3.create();
            var ya = vec3.create();
            var yb = vec3.create();
            var za = vec3.create();
            var zb = vec3.create();

            return function (matrix) {
                var min = this.min._array;
                var max = this.max._array;

                var m = matrix._array;

                xa[0] = m[0] * min[0]; xa[1] = m[1] * min[0]; xa[2] = m[2] * min[0];
                xb[0] = m[0] * max[0]; xb[1] = m[1] * max[0]; xb[2] = m[2] * max[0];

                ya[0] = m[4] * min[1]; ya[1] = m[5] * min[1]; ya[2] = m[6] * min[1];
                yb[0] = m[4] * max[1]; yb[1] = m[5] * max[1]; yb[2] = m[6] * max[1];

                za[0] = m[8] * min[2]; za[1] = m[9] * min[2]; za[2] = m[10] * min[2];
                zb[0] = m[8] * max[2]; zb[1] = m[9] * max[2]; zb[2] = m[10] * max[2];

                min[0] = Math.min(xa[0], xb[0]) + Math.min(ya[0], yb[0]) + Math.min(za[0], zb[0]) + m[12];
                min[1] = Math.min(xa[1], xb[1]) + Math.min(ya[1], yb[1]) + Math.min(za[1], zb[1]) + m[13];
                min[2] = Math.min(xa[2], xb[2]) + Math.min(ya[2], yb[2]) + Math.min(za[2], zb[2]) + m[14];

                max[0] = Math.max(xa[0], xb[0]) + Math.max(ya[0], yb[0]) + Math.max(za[0], zb[0]) + m[12];
                max[1] = Math.max(xa[1], xb[1]) + Math.max(ya[1], yb[1]) + Math.max(za[1], zb[1]) + m[13];
                max[2] = Math.max(xa[2], xb[2]) + Math.max(ya[2], yb[2]) + Math.max(za[2], zb[2]) + m[14];

                this.min._dirty = true;
                this.max._dirty = true;

                return this;
            };
        })(),

        /**
         * Apply a projection matrix to the bounding box
         * @param  {qtek.math.Matrix4} matrix
         */
        applyProjection: function (matrix) {
            var min = this.min._array;
            var max = this.max._array;

            var m = matrix._array;
            // min in min z
            var v10 = min[0];
            var v11 = min[1];
            var v12 = min[2];
            // max in min z
            var v20 = max[0];
            var v21 = max[1];
            var v22 = min[2];
            // max in max z
            var v30 = max[0];
            var v31 = max[1];
            var v32 = max[2];

            if (m[15] === 1) {  // Orthographic projection
                min[0] = m[0] * v10 + m[12];
                min[1] = m[5] * v11 + m[13];
                max[2] = m[10] * v12 + m[14];

                max[0] = m[0] * v30 + m[12];
                max[1] = m[5] * v31 + m[13];
                min[2] = m[10] * v32 + m[14];
            }
            else {
                var w = -1 / v12;
                min[0] = m[0] * v10 * w;
                min[1] = m[5] * v11 * w;
                max[2] = (m[10] * v12 + m[14]) * w;

                w = -1 / v22;
                max[0] = m[0] * v20 * w;
                max[1] = m[5] * v21 * w;

                w = -1 / v32;
                min[2] = (m[10] * v32 + m[14]) * w;
            }
            this.min._dirty = true;
            this.max._dirty = true;

            return this;
        },

        updateVertices: function () {
            var vertices = this.vertices;
            if (!vertices) {
                // Cube vertices
                var vertices = [];
                for (var i = 0; i < 8; i++) {
                    vertices[i] = vec3.fromValues(0, 0, 0);
                }

                /**
                 * Eight coords of bounding box
                 * @type {Float32Array[]}
                 */
                this.vertices = vertices;
            }
            var min = this.min._array;
            var max = this.max._array;
            //--- min z
            // min x
            vec3Set(vertices[0], min[0], min[1], min[2]);
            vec3Set(vertices[1], min[0], max[1], min[2]);
            // max x
            vec3Set(vertices[2], max[0], min[1], min[2]);
            vec3Set(vertices[3], max[0], max[1], min[2]);

            //-- max z
            vec3Set(vertices[4], min[0], min[1], max[2]);
            vec3Set(vertices[5], min[0], max[1], max[2]);
            vec3Set(vertices[6], max[0], min[1], max[2]);
            vec3Set(vertices[7], max[0], max[1], max[2]);

            return this;
        },
        /**
         * Copy values from another bounding box
         * @param  {qtek.math.BoundingBox} bbox
         */
        copy: function (bbox) {
            var min = this.min;
            var max = this.max;
            vec3Copy(min._array, bbox.min._array);
            vec3Copy(max._array, bbox.max._array);
            min._dirty = true;
            max._dirty = true;
            return this;
        },

        /**
         * Clone a new bounding box
         * @return {qtek.math.BoundingBox}
         */
        clone: function () {
            var boundingBox = new BoundingBox();
            boundingBox.copy(this);
            return boundingBox;
        }
    };

    module.exports = BoundingBox;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Mainly do the parse and compile of shader string
 * Support shader code chunk import and export
 * Support shader semantics
 * http://www.nvidia.com/object/using_sas.html
 * https://github.com/KhronosGroup/collada2json/issues/45
 *
 * TODO: Use etpl or other string template engine
 */


    var Base = __webpack_require__(1);
    var util = __webpack_require__(13);
    var Cache = __webpack_require__(17);
    var vendor = __webpack_require__(8);
    var glMatrix = __webpack_require__(0);
    var glInfo = __webpack_require__(6);
    var mat2 = glMatrix.mat2;
    var mat3 = glMatrix.mat3;
    var mat4 = glMatrix.mat4;

    var uniformRegex = /uniform\s+(bool|float|int|vec2|vec3|vec4|ivec2|ivec3|ivec4|mat2|mat3|mat4|sampler2D|samplerCube)\s+([\w\,]+)?(\[.*?\])?\s*(:\s*([\S\s]+?))?;/g;
    var attributeRegex = /attribute\s+(float|int|vec2|vec3|vec4)\s+(\w*)\s*(:\s*(\w+))?;/g;
    var defineRegex = /#define\s+(\w+)?(\s+[\w-.]+)?\s*;?\s*\n/g;
    var loopRegex = /for\s*?\(int\s*?_idx_\s*\=\s*([\w-]+)\;\s*_idx_\s*<\s*([\w-]+);\s*_idx_\s*\+\+\s*\)\s*\{\{([\s\S]+?)(?=\}\})\}\}/g;

    var uniformTypeMap = {
        'bool': '1i',
        'int': '1i',
        'sampler2D': 't',
        'samplerCube': 't',
        'float': '1f',
        'vec2': '2f',
        'vec3': '3f',
        'vec4': '4f',
        'ivec2': '2i',
        'ivec3': '3i',
        'ivec4': '4i',
        'mat2': 'm2',
        'mat3': 'm3',
        'mat4': 'm4'
    };

    var uniformValueConstructor = {
        'bool': function () {return true;},
        'int': function () {return 0;},
        'float': function () {return 0;},
        'sampler2D': function () {return null;},
        'samplerCube': function () {return null;},

        'vec2': function () {return [0, 0];},
        'vec3': function () {return [0, 0, 0];},
        'vec4': function () {return [0, 0, 0, 0];},

        'ivec2': function () {return [0, 0];},
        'ivec3': function () {return [0, 0, 0];},
        'ivec4': function () {return [0, 0, 0, 0];},

        'mat2': function () {return mat2.create();},
        'mat3': function () {return mat3.create();},
        'mat4': function () {return mat4.create();},

        'array': function () {return [];}
    };

    var attribSemantics = [
        'POSITION',
        'NORMAL',
        'BINORMAL',
        'TANGENT',
        'TEXCOORD',
        'TEXCOORD_0',
        'TEXCOORD_1',
        'COLOR',
        // Skinning
        // https://github.com/KhronosGroup/glTF/blob/master/specification/README.md#semantics
        'JOINT',
        'WEIGHT'
    ];
    var uniformSemantics = [
        'SKIN_MATRIX',
        // Information about viewport
        'VIEWPORT_SIZE',
        'VIEWPORT',
        'DEVICEPIXELRATIO',
        // Window size for window relative coordinate
        // https://www.opengl.org/sdk/docs/man/html/gl_FragCoord.xhtml
        'WINDOW_SIZE',
        // Infomation about camera
        'NEAR',
        'FAR',
        // Time
        'TIME'
    ];
    var matrixSemantics = [
        'WORLD',
        'VIEW',
        'PROJECTION',
        'WORLDVIEW',
        'VIEWPROJECTION',
        'WORLDVIEWPROJECTION',
        'WORLDINVERSE',
        'VIEWINVERSE',
        'PROJECTIONINVERSE',
        'WORLDVIEWINVERSE',
        'VIEWPROJECTIONINVERSE',
        'WORLDVIEWPROJECTIONINVERSE',
        'WORLDTRANSPOSE',
        'VIEWTRANSPOSE',
        'PROJECTIONTRANSPOSE',
        'WORLDVIEWTRANSPOSE',
        'VIEWPROJECTIONTRANSPOSE',
        'WORLDVIEWPROJECTIONTRANSPOSE',
        'WORLDINVERSETRANSPOSE',
        'VIEWINVERSETRANSPOSE',
        'PROJECTIONINVERSETRANSPOSE',
        'WORLDVIEWINVERSETRANSPOSE',
        'VIEWPROJECTIONINVERSETRANSPOSE',
        'WORLDVIEWPROJECTIONINVERSETRANSPOSE'
    ];

    // Enable attribute operation is global to all programs
    // Here saved the list of all enabled attribute index
    // http://www.mjbshaw.com/2013/03/webgl-fixing-invalidoperation.html
    var enabledAttributeList = {};

    var SHADER_STATE_TO_ENABLE = 1;
    var SHADER_STATE_KEEP_ENABLE = 2;
    var SHADER_STATE_PENDING = 3;

    /**
     * @constructor qtek.Shader
     * @extends qtek.core.Base
     *
     * @example
     *     // Create a phong shader
     *     var shader = new qtek.Shader({
     *         vertex: qtek.Shader.source('qtek.phong.vertex'),
     *         fragment: qtek.Shader.source('qtek.phong.fragment')
     *     });
     *     // Enable diffuse texture
     *     shader.enableTexture('diffuseMap');
     *     // Use alpha channel in diffuse texture
     *     shader.define('fragment', 'DIFFUSEMAP_ALPHA_ALPHA');
     */
    var Shader = Base.extend(function () {
        return /** @lends qtek.Shader# */ {
            /**
             * Vertex shader code
             * @type {string}
             */
            vertex: '',

            /**
             * Fragment shader code
             * @type {string}
             */
            fragment: '',


            // FIXME mediump is toooooo low for depth on mobile
            precision: 'highp',

            // Properties follow will be generated by the program
            attribSemantics: {},
            matrixSemantics: {},
            uniformSemantics: {},
            matrixSemanticKeys: [],

            uniformTemplates: {},
            attributeTemplates: {},

            /**
             * Custom defined values in the vertex shader
             * @type {Object}
             */
            vertexDefines: {},
            /**
             * Custom defined values in the vertex shader
             * @type {Object}
             */
            fragmentDefines: {},

            /**
             * Enabled extensions
             * @type {Array.<string>}
             */
            extensions: [
                'OES_standard_derivatives',
                'EXT_shader_texture_lod'
            ],

            /**
             * Used light group. default is all zero
             */
            lightGroup: 0,

            // Defines the each type light number in the scene
            // AMBIENT_LIGHT
            // AMBIENT_SH_LIGHT
            // AMBIENT_CUBEMAP_LIGHT
            // POINT_LIGHT
            // SPOT_LIGHT
            // AREA_LIGHT
            lightNumber: {},

            _textureSlot: 0,

            _attacheMaterialNumber: 0,

            _uniformList: [],
            // {
            //  enabled: true
            //  shaderType: "vertex",
            // }
            _textureStatus: {},

            _vertexProcessed: '',
            _fragmentProcessed: '',

            _currentLocationsMap: {}
        };
    }, function () {

        this._cache = new Cache();

        // All context use same code
        this._codeDirty = true;

        this._updateShaderString();
    },
    /** @lends qtek.Shader.prototype */
    {
        isEqual: function (otherShader) {
            if (!otherShader) {
                return false;
            }
            if (this === otherShader) {
                if (this._codeDirty) {
                    // Still needs update and rebind.
                    return false;
                }
                return true;
            }
            if (otherShader._codeDirty) {
                otherShader._updateShaderString();
            }
            if (this._codeDirty) {
                this._updateShaderString();
            }
            return !(otherShader._vertexProcessed !== this._vertexProcessed
                || otherShader._fragmentProcessed !== this._fragmentProcessed);
        },
        /**
         * Set vertex shader code
         * @param {string} str
         */
        setVertex: function (str) {
            this.vertex = str;
            this._updateShaderString();
            this.dirty();
        },

        /**
         * Set fragment shader code
         * @param {string} str
         */
        setFragment: function (str) {
            this.fragment = str;
            this._updateShaderString();
            this.dirty();
        },

        /**
         * Bind shader program
         * Return true or error msg if error happened
         * @param {WebGLRenderingContext} _gl
         */
        bind: function (_gl) {
            var cache = this._cache;
            cache.use(_gl.__GLID__, getCacheSchema);

            this._currentLocationsMap = cache.get('locations');

            // Reset slot
            this._textureSlot = 0;

            if (this._codeDirty) {
                // PENDING
                // var availableExts = [];
                // var extensions = this.extensions;
                // for (var i = 0; i < extensions.length; i++) {
                //     if (glInfo.getExtension(_gl, extensions[i])) {
                //         availableExts.push(extensions[i]);
                //     }
                // }
                this._updateShaderString();
            }

            if (cache.isDirty('program')) {
                var errMsg = this._buildProgram(_gl, this._vertexProcessed, this._fragmentProcessed);
                cache.fresh('program');

                if (errMsg) {
                    return errMsg;
                }
            }

            _gl.useProgram(cache.get('program'));
        },

        /**
         * Mark dirty and update program in next frame
         */
        dirty: function () {
            var cache = this._cache;
            this._codeDirty = true;
            cache.dirtyAll('program');
            for (var i = 0; i < cache._caches.length; i++) {
                if (cache._caches[i]) {
                    var context = cache._caches[i];
                    context['locations'] = {};
                    context['attriblocations'] = {};
                }
            }
        },

        _updateShaderString: function (extensions) {

            if (this.vertex !== this._vertexPrev ||
                this.fragment !== this._fragmentPrev
            ) {

                this._parseImport();

                this.attribSemantics = {};
                this.matrixSemantics = {};
                this._textureStatus = {};

                this._parseUniforms();
                this._parseAttributes();
                this._parseDefines();

                this._vertexPrev = this.vertex;
                this._fragmentPrev = this.fragment;
            }

            this._addDefineExtensionAndPrecision(extensions);

            this._vertexProcessed = this._unrollLoop(this._vertexProcessed, this.vertexDefines);
            this._fragmentProcessed = this._unrollLoop(this._fragmentProcessed, this.fragmentDefines);

            this._codeDirty = false;
        },

        /**
         * Add a #define micro in shader code
         * @param  {string} shaderType Can be vertex, fragment or both
         * @param  {string} symbol
         * @param  {number} [val]
         */
        define: function (shaderType, symbol, val) {
            var vertexDefines = this.vertexDefines;
            var fragmentDefines = this.fragmentDefines;
            if (shaderType !== 'vertex' && shaderType !== 'fragment' && shaderType !== 'both'
                && arguments.length < 3
            ) {
                // shaderType default to be 'both'
                val = symbol;
                symbol = shaderType;
                shaderType = 'both';
            }
            val = val != null ? val : null;
            if (shaderType === 'vertex' || shaderType === 'both') {
                if (vertexDefines[symbol] !== val) {
                    vertexDefines[symbol] = val;
                    // Mark as dirty
                    this.dirty();
                }
            }
            if (shaderType === 'fragment' || shaderType === 'both') {
                if (fragmentDefines[symbol] !== val) {
                    fragmentDefines[symbol] = val;
                    if (shaderType !== 'both') {
                        this.dirty();
                    }
                }
            }
        },

        /**
         * @param  {string} shaderType Can be vertex, fragment or both
         * @param  {string} symbol
         */
        undefine: function (shaderType, symbol) {
            if (shaderType !== 'vertex' && shaderType !== 'fragment' && shaderType !== 'both'
                && arguments.length < 2
            ) {
                // shaderType default to be 'both'
                symbol = shaderType;
                shaderType = 'both';
            }
            if (shaderType === 'vertex' || shaderType === 'both') {
                if (this.isDefined('vertex', symbol)) {
                    delete this.vertexDefines[symbol];
                    // Mark as dirty
                    this.dirty();
                }
            }
            if (shaderType === 'fragment' || shaderType === 'both') {
                if (this.isDefined('fragment', symbol)) {
                    delete this.fragmentDefines[symbol];
                    if (shaderType !== 'both') {
                        this.dirty();
                    }
                }
            }
        },

        /**
         * @param  {string} shaderType Can be vertex, fragment or both
         * @param  {string} symbol
         */
        isDefined: function (shaderType, symbol) {
            switch (shaderType) {
                case 'vertex':
                    return this.vertexDefines[symbol] !== undefined;
                case 'fragment':
                    return this.fragmentDefines[symbol] !== undefined;
            }
        },
        /**
         * @param  {string} shaderType Can be vertex, fragment or both
         * @param  {string} symbol
         */
        getDefine: function (shaderType, symbol) {
            switch(shaderType) {
                case 'vertex':
                    return this.vertexDefines[symbol];
                case 'fragment':
                    return this.fragmentDefines[symbol];
            }
        },
        /**
         * Enable a texture, actually it will add a #define micro in the shader code
         * For example, if texture symbol is diffuseMap, it will add a line `#define DIFFUSEMAP_ENABLED` in the shader code
         * @param  {string} symbol
         */
        enableTexture: function (symbol) {
            if (symbol instanceof Array) {
                for (var i = 0; i < symbol.length; i++) {
                    this.enableTexture(symbol[i]);
                }
                return;
            }

            var status = this._textureStatus[symbol];
            if (status) {
                var isEnabled = status.enabled;
                if (!isEnabled) {
                    status.enabled = true;
                    this.dirty();
                }
            }
        },
        /**
         * Enable all textures used in the shader
         */
        enableTexturesAll: function () {
            var textureStatus = this._textureStatus;
            for (var symbol in textureStatus) {
                textureStatus[symbol].enabled = true;
            }

            this.dirty();
        },
        /**
         * Disable a texture, it remove a #define micro in the shader
         * @param  {string} symbol
         */
        disableTexture: function (symbol) {
            if (symbol instanceof Array) {
                for (var i = 0; i < symbol.length; i++) {
                    this.disableTexture(symbol[i]);
                }
                return;
            }

            var status = this._textureStatus[symbol];
            if (status) {
                var isDisabled = ! status.enabled;
                if (!isDisabled) {
                    status.enabled = false;
                    this.dirty();
                }
            }
        },
        /**
         * Disable all textures used in the shader
         */
        disableTexturesAll: function () {
            var textureStatus = this._textureStatus;
            for (var symbol in textureStatus) {
                textureStatus[symbol].enabled = false;
            }

            this.dirty();
        },
        /**
         * @param  {string}  symbol
         * @return {boolean}
         */
        isTextureEnabled: function (symbol) {
            var textureStatus = this._textureStatus;
            return !!textureStatus[symbol]
                && textureStatus[symbol].enabled;
        },

        getEnabledTextures: function () {
            var enabledTextures = [];
            var textureStatus = this._textureStatus;
            for (var symbol in textureStatus) {
                if (textureStatus[symbol].enabled) {
                    enabledTextures.push(symbol);
                }
            }
            return enabledTextures;
        },

        hasUniform: function (symbol) {
            var location = this._currentLocationsMap[symbol];
            return location !== null && location !== undefined;
        },

        currentTextureSlot: function () {
            return this._textureSlot;
        },

        resetTextureSlot: function (slot) {
            this._textureSlot = slot || 0;
        },

        useCurrentTextureSlot: function (_gl, texture) {
            var textureSlot = this._textureSlot;

            this.useTextureSlot(_gl, texture, textureSlot);

            this._textureSlot++;

            return textureSlot;
        },

        useTextureSlot: function (_gl, texture, slot) {
            if (texture) {
                _gl.activeTexture(_gl.TEXTURE0 + slot);
                // Maybe texture is not loaded yet;
                if (texture.isRenderable()) {
                    texture.bind(_gl);
                }
                else {
                    // Bind texture to null
                    texture.unbind(_gl);
                }
            }
        },

        setUniform: function (_gl, type, symbol, value) {
            var locationMap = this._currentLocationsMap;
            var location = locationMap[symbol];
            // Uniform is not existed in the shader
            if (location === null || location === undefined) {
                return false;
            }
            switch (type) {
                case 'm4':
                    // The matrix must be created by glmatrix and can pass it directly.
                    _gl.uniformMatrix4fv(location, false, value);
                    break;
                case '2i':
                    _gl.uniform2i(location, value[0], value[1]);
                    break;
                case '2f':
                    _gl.uniform2f(location, value[0], value[1]);
                    break;
                case '3i':
                    _gl.uniform3i(location, value[0], value[1], value[2]);
                    break;
                case '3f':
                    _gl.uniform3f(location, value[0], value[1], value[2]);
                    break;
                case '4i':
                    _gl.uniform4i(location, value[0], value[1], value[2], value[3]);
                    break;
                case '4f':
                    _gl.uniform4f(location, value[0], value[1], value[2], value[3]);
                    break;
                case '1i':
                    _gl.uniform1i(location, value);
                    break;
                case '1f':
                    _gl.uniform1f(location, value);
                    break;
                case '1fv':
                    _gl.uniform1fv(location, value);
                    break;
                case '1iv':
                    _gl.uniform1iv(location, value);
                    break;
                case '2iv':
                    _gl.uniform2iv(location, value);
                    break;
                case '2fv':
                    _gl.uniform2fv(location, value);
                    break;
                case '3iv':
                    _gl.uniform3iv(location, value);
                    break;
                case '3fv':
                    _gl.uniform3fv(location, value);
                    break;
                case '4iv':
                    _gl.uniform4iv(location, value);
                    break;
                case '4fv':
                    _gl.uniform4fv(location, value);
                    break;
                case 'm2':
                case 'm2v':
                    _gl.uniformMatrix2fv(location, false, value);
                    break;
                case 'm3':
                case 'm3v':
                    _gl.uniformMatrix3fv(location, false, value);
                    break;
                case 'm4v':
                    // Raw value
                    if (value instanceof Array) {
                        var array = new vendor.Float32Array(value.length * 16);
                        var cursor = 0;
                        for (var i = 0; i < value.length; i++) {
                            var item = value[i];
                            for (var j = 0; j < 16; j++) {
                                array[cursor++] = item[j];
                            }
                        }
                        _gl.uniformMatrix4fv(location, false, array);
                    }
                    else if (value instanceof vendor.Float32Array) {   // ArrayBufferView
                        _gl.uniformMatrix4fv(location, false, value);
                    }
                    break;
            }
            return true;
        },

        setUniformOfSemantic: function (_gl, semantic, val) {
            var semanticInfo = this.uniformSemantics[semantic];
            if (semanticInfo) {
                return this.setUniform(_gl, semanticInfo.type, semanticInfo.symbol, val);
            }
            return false;
        },

        // Enable the attributes passed in and disable the rest
        // Example Usage:
        // enableAttributes(_gl, ["position", "texcoords"])
        enableAttributes: function (_gl, attribList, vao) {

            var program = this._cache.get('program');

            var locationMap = this._cache.get('attriblocations');

            var enabledAttributeListInContext;
            if (vao) {
                enabledAttributeListInContext = vao.__enabledAttributeList;
            }
            else {
                enabledAttributeListInContext = enabledAttributeList[_gl.__GLID__];
            }
            if (! enabledAttributeListInContext) {
                // In vertex array object context
                // PENDING Each vao object needs to enable attributes again?
                if (vao) {
                    enabledAttributeListInContext
                        = vao.__enabledAttributeList
                        = [];
                }
                else {
                    enabledAttributeListInContext
                        = enabledAttributeList[_gl.__GLID__]
                        = [];
                }
            }
            var locationList = [];
            for (var i = 0; i < attribList.length; i++) {
                var symbol = attribList[i];
                if (!this.attributeTemplates[symbol]) {
                    locationList[i] = -1;
                    continue;
                }
                var location = locationMap[symbol];
                if (location === undefined) {
                    location = _gl.getAttribLocation(program, symbol);
                    // Attrib location is a number from 0 to ...
                    if (location === -1) {
                        locationList[i] = -1;
                        continue;
                    }
                    locationMap[symbol] = location;
                }
                locationList[i] = location;

                if (!enabledAttributeListInContext[location]) {
                    enabledAttributeListInContext[location] = SHADER_STATE_TO_ENABLE;
                }
                else {
                    enabledAttributeListInContext[location] = SHADER_STATE_KEEP_ENABLE;
                }
            }

            for (var i = 0; i < enabledAttributeListInContext.length; i++) {
                switch(enabledAttributeListInContext[i]){
                    case SHADER_STATE_TO_ENABLE:
                        _gl.enableVertexAttribArray(i);
                        enabledAttributeListInContext[i] = SHADER_STATE_PENDING;
                        break;
                    case SHADER_STATE_KEEP_ENABLE:
                        enabledAttributeListInContext[i] = SHADER_STATE_PENDING;
                        break;
                    // Expired
                    case SHADER_STATE_PENDING:
                        _gl.disableVertexAttribArray(i);
                        enabledAttributeListInContext[i] = 0;
                        break;
                }
            }

            return locationList;
        },

        _parseImport: function () {

            this._vertexProcessedWithoutDefine = Shader.parseImport(this.vertex);
            this._fragmentProcessedWithoutDefine = Shader.parseImport(this.fragment);

        },

        _addDefineExtensionAndPrecision: function (extensions) {

            extensions = extensions || this.extensions;
            // Extension declaration must before all non-preprocessor codes
            // TODO vertex ? extension enum ?
            var extensionStr = [];
            for (var i = 0; i < extensions.length; i++) {
                extensionStr.push('#extension GL_' + extensions[i] + ' : enable');
            }

            // Add defines
            // VERTEX
            var defineStr = this._getDefineStr(this.vertexDefines);
            this._vertexProcessed = defineStr + '\n' + this._vertexProcessedWithoutDefine;

            // FRAGMENT
            var defineStr = this._getDefineStr(this.fragmentDefines);
            var code = defineStr + '\n' + this._fragmentProcessedWithoutDefine;

            // Add precision
            this._fragmentProcessed = extensionStr.join('\n') + '\n'
                + ['precision', this.precision, 'float'].join(' ') + ';\n'
                + ['precision', this.precision, 'int'].join(' ') + ';\n'
                // depth texture may have precision problem on iOS device.
                + ['precision', this.precision, 'sampler2D'].join(' ') + ';\n'
                + code;
        },

        _getDefineStr: function (defines) {

            var lightNumber = this.lightNumber;
            var textureStatus = this._textureStatus;
            var defineStr = [];
            for (var lightType in lightNumber) {
                var count = lightNumber[lightType];
                if (count > 0) {
                    defineStr.push('#define ' + lightType.toUpperCase() + '_COUNT ' + count);
                }
            }
            for (var symbol in textureStatus) {
                var status = textureStatus[symbol];
                if (status.enabled) {
                    defineStr.push('#define ' + symbol.toUpperCase() + '_ENABLED');
                }
            }
            // Custom Defines
            for (var symbol in defines) {
                var value = defines[symbol];
                if (value === null) {
                    defineStr.push('#define ' + symbol);
                }
                else{
                    defineStr.push('#define ' + symbol + ' ' + value.toString());
                }
            }
            return defineStr.join('\n');
        },

        _unrollLoop: function (shaderStr, defines) {
            // Loop unroll from three.js, https://github.com/mrdoob/three.js/blob/master/src/renderers/webgl/WebGLProgram.js#L175
            // In some case like shadowMap in loop use 'i' to index value much slower.

            // Loop use _idx_ and increased with _idx_++ will be unrolled
            // Use {{ }} to match the pair so the if statement will not be affected
            // Write like following
            // for (int _idx_ = 0; _idx_ < 4; _idx_++) {{
            //     vec3 color = texture2D(textures[_idx_], uv).rgb;
            // }}
            function replace(match, start, end, snippet) {
                var unroll = '';
                // Try to treat as define
                if (isNaN(start)) {
                    if (start in defines) {
                        start = defines[start];
                    }
                    else {
                        start = lightNumberDefines[start];
                    }
                }
                if (isNaN(end)) {
                    if (end in defines) {
                        end = defines[end];
                    }
                    else {
                        end = lightNumberDefines[end];
                    }
                }
                // TODO Error checking

                for (var idx = parseInt(start); idx < parseInt(end); idx++) {
                    // PENDING Add scope?
                    unroll += '{'
                        + snippet
                            .replace(/float\s*\(\s*_idx_\s*\)/g, idx.toFixed(1))
                            .replace(/_idx_/g, idx)
                    + '}';
                }

                return unroll;
            }

            var lightNumberDefines = {};
            for (var lightType in this.lightNumber) {
                lightNumberDefines[lightType + '_COUNT'] = this.lightNumber[lightType];
            }
            return shaderStr.replace(loopRegex, replace);
        },

        _parseUniforms: function () {
            var uniforms = {};
            var self = this;
            var shaderType = 'vertex';
            this._uniformList = [];

            this._vertexProcessedWithoutDefine = this._vertexProcessedWithoutDefine.replace(uniformRegex, _uniformParser);
            shaderType = 'fragment';
            this._fragmentProcessedWithoutDefine = this._fragmentProcessedWithoutDefine.replace(uniformRegex, _uniformParser);

            self.matrixSemanticKeys = Object.keys(this.matrixSemantics);

            function _uniformParser(str, type, symbol, isArray, semanticWrapper, semantic) {
                if (type && symbol) {
                    var uniformType = uniformTypeMap[type];
                    var isConfigurable = true;
                    var defaultValueFunc;
                    if (uniformType) {
                        self._uniformList.push(symbol);
                        if (type === 'sampler2D' || type === 'samplerCube') {
                            // Texture is default disabled
                            self._textureStatus[symbol] = {
                                enabled: false,
                                shaderType: shaderType
                            };
                        }
                        if (isArray) {
                            uniformType += 'v';
                        }
                        if (semantic) {
                            // This case is only for SKIN_MATRIX
                            // TODO
                            if (attribSemantics.indexOf(semantic) >= 0) {
                                self.attribSemantics[semantic] = {
                                    symbol: symbol,
                                    type: uniformType
                                };
                                isConfigurable = false;
                            }
                            else if (matrixSemantics.indexOf(semantic) >= 0) {
                                var isTranspose = false;
                                var semanticNoTranspose = semantic;
                                if (semantic.match(/TRANSPOSE$/)) {
                                    isTranspose = true;
                                    semanticNoTranspose = semantic.slice(0, -9);
                                }
                                self.matrixSemantics[semantic] = {
                                    symbol: symbol,
                                    type: uniformType,
                                    isTranspose: isTranspose,
                                    semanticNoTranspose: semanticNoTranspose
                                };
                                isConfigurable = false;
                            }
                            else if (uniformSemantics.indexOf(semantic) >= 0) {
                                self.uniformSemantics[semantic] = {
                                    symbol: symbol,
                                    type: uniformType
                                };
                                isConfigurable = false;
                            }
                            else {
                                // The uniform is not configurable, which means it will not appear
                                // in the material uniform properties
                                if (semantic === 'unconfigurable') {
                                    isConfigurable = false;
                                }
                                else {
                                    // Uniform have a defalut value, like
                                    // uniform vec3 color: [1, 1, 1];
                                    defaultValueFunc = self._parseDefaultValue(type, semantic);
                                    if (!defaultValueFunc) {
                                        throw new Error('Unkown semantic "' + semantic + '"');
                                    }
                                    else {
                                        semantic = '';
                                    }
                                }
                            }
                        }

                        if (isConfigurable) {
                            uniforms[symbol] = {
                                type: uniformType,
                                value: isArray ? uniformValueConstructor['array'] : (defaultValueFunc || uniformValueConstructor[type]),
                                semantic: semantic || null
                            };
                        }
                    }
                    return ['uniform', type, symbol, isArray].join(' ') + ';\n';
                }
            }

            this.uniformTemplates = uniforms;
        },

        _parseDefaultValue: function (type, str) {
            var arrayRegex = /\[\s*(.*)\s*\]/;
            if (type === 'vec2' || type === 'vec3' || type === 'vec4') {
                var arrayStr = arrayRegex.exec(str)[1];
                if (arrayStr) {
                    var arr = arrayStr.split(/\s*,\s*/);
                    return function () {
                        return new vendor.Float32Array(arr);
                    };
                }
                else {
                    // Invalid value
                    return;
                }
            }
            else if (type === 'bool') {
                return function () {
                    return str.toLowerCase() === 'true' ? true : false;
                };
            }
            else if (type === 'float') {
                return function () {
                    return parseFloat(str);
                };
            }
            else if (type === 'int') {
                return function () {
                    return parseInt(str);
                };
            }
        },

        // Create a new uniform instance for material
        createUniforms: function () {
            var uniforms = {};

            for (var symbol in this.uniformTemplates){
                var uniformTpl = this.uniformTemplates[symbol];
                uniforms[symbol] = {
                    type: uniformTpl.type,
                    value: uniformTpl.value()
                };
            }

            return uniforms;
        },

        // Attached to material
        attached: function () {
            this._attacheMaterialNumber++;
        },

        // Detached to material
        detached: function () {
            this._attacheMaterialNumber--;
        },

        isAttachedToAny: function () {
            return this._attacheMaterialNumber !== 0;
        },

        _parseAttributes: function () {
            var attributes = {};
            var self = this;
            this._vertexProcessedWithoutDefine = this._vertexProcessedWithoutDefine.replace(
                attributeRegex, _attributeParser
            );

            function _attributeParser(str, type, symbol, semanticWrapper, semantic) {
                if (type && symbol) {
                    var size = 1;
                    switch (type) {
                        case 'vec4':
                            size = 4;
                            break;
                        case 'vec3':
                            size = 3;
                            break;
                        case 'vec2':
                            size = 2;
                            break;
                        case 'float':
                            size = 1;
                            break;
                    }

                    attributes[symbol] = {
                        // Can only be float
                        type: 'float',
                        size: size,
                        semantic: semantic || null
                    };

                    if (semantic) {
                        if (attribSemantics.indexOf(semantic) < 0) {
                            throw new Error('Unkown semantic "' + semantic + '"');
                        }
                        else {
                            self.attribSemantics[semantic] = {
                                symbol: symbol,
                                type: type
                            };
                        }
                    }
                }

                return ['attribute', type, symbol].join(' ') + ';\n';
            }

            this.attributeTemplates = attributes;
        },

        _parseDefines: function () {
            var self = this;
            var shaderType = 'vertex';
            this._vertexProcessedWithoutDefine = this._vertexProcessedWithoutDefine.replace(defineRegex, _defineParser);
            shaderType = 'fragment';
            this._fragmentProcessedWithoutDefine = this._fragmentProcessedWithoutDefine.replace(defineRegex, _defineParser);

            function _defineParser(str, symbol, value) {
                var defines = shaderType === 'vertex' ? self.vertexDefines : self.fragmentDefines;
                if (!defines[symbol]) { // Haven't been defined by user
                    if (value == 'false') {
                        defines[symbol] = false;
                    }
                    else if (value == 'true') {
                        defines[symbol] = true;
                    }
                    else {
                        defines[symbol] = value ? parseFloat(value) : null;
                    }
                }
                return '';
            }
        },

        // Return true or error msg if error happened
        _buildProgram: function (_gl, vertexShaderString, fragmentShaderString) {
            var cache = this._cache;
            if (cache.get('program')) {
                _gl.deleteProgram(cache.get('program'));
            }
            var program = _gl.createProgram();

            var vertexShader = _gl.createShader(_gl.VERTEX_SHADER);
            _gl.shaderSource(vertexShader, vertexShaderString);
            _gl.compileShader(vertexShader);

            var fragmentShader = _gl.createShader(_gl.FRAGMENT_SHADER);
            _gl.shaderSource(fragmentShader, fragmentShaderString);
            _gl.compileShader(fragmentShader);

            var msg = checkShaderErrorMsg(_gl, vertexShader, vertexShaderString);
            if (msg) {
                return msg;
            }
            msg = checkShaderErrorMsg(_gl, fragmentShader, fragmentShaderString);
            if (msg) {
                return msg;
            }

            _gl.attachShader(program, vertexShader);
            _gl.attachShader(program, fragmentShader);
            // Force the position bind to location 0;
            if (this.attribSemantics['POSITION']) {
                _gl.bindAttribLocation(program, 0, this.attribSemantics['POSITION'].symbol);
            }
            else {
                // Else choose an attribute and bind to location 0;
                var keys = Object.keys(this.attributeTemplates);
                _gl.bindAttribLocation(program, 0, keys[0]);
            }

            _gl.linkProgram(program);

            if (!_gl.getProgramParameter(program, _gl.LINK_STATUS)) {
                return 'Could not link program\n' + 'VALIDATE_STATUS: ' + _gl.getProgramParameter(program, _gl.VALIDATE_STATUS) + ', gl error [' + _gl.getError() + ']';
            }

            // Cache uniform locations
            for (var i = 0; i < this._uniformList.length; i++) {
                var uniformSymbol = this._uniformList[i];
                var locationMap = cache.get('locations');
                locationMap[uniformSymbol] = _gl.getUniformLocation(program, uniformSymbol);
            }

            _gl.deleteShader(vertexShader);
            _gl.deleteShader(fragmentShader);

            cache.put('program', program);
        },

        /**
         * Clone a new shader
         * @return {qtek.Shader}
         */
        clone: function () {
            var shader = new Shader({
                vertex: this.vertex,
                fragment: this.fragment,
                vertexDefines: util.clone(this.vertexDefines),
                fragmentDefines: util.clone(this.fragmentDefines)
            });
            for (var name in this._textureStatus) {
                shader._textureStatus[name] = util.clone(this._textureStatus[name]);
            }
            return shader;
        },
        /**
         * Dispose given context
         * @param  {WebGLRenderingContext} _gl
         */
        dispose: function (_gl) {
            var cache = this._cache;

            cache.use(_gl.__GLID__);
            var program = cache.get('program');
            if (program) {
                _gl.deleteProgram(program);
            }
            cache.deleteContext(_gl.__GLID__);

            this._locations = {};
        }
    });

    function getCacheSchema() {
        return {
            locations: {},
            attriblocations: {}
        };
    }

    // Return true or error msg if error happened
    function checkShaderErrorMsg(_gl, shader, shaderString) {
        if (!_gl.getShaderParameter(shader, _gl.COMPILE_STATUS)) {
            return [_gl.getShaderInfoLog(shader), addLineNumbers(shaderString)].join('\n');
        }
    }

    // some util functions
    function addLineNumbers(string) {
        var chunks = string.split('\n');
        for (var i = 0, il = chunks.length; i < il; i ++) {
            // Chrome reports shader errors on lines
            // starting counting from 1
            chunks[i] = (i + 1) + ': ' + chunks[i];
        }
        return chunks.join('\n');
    }

    var importRegex = /(@import)\s*([0-9a-zA-Z_\-\.]*)/g;
    Shader.parseImport = function (shaderStr) {
        shaderStr = shaderStr.replace(importRegex, function (str, importSymbol, importName) {
            var str = Shader.source(importName);
            if (str) {
                // Recursively parse
                return Shader.parseImport(str);
            }
            else {
                console.error('Shader chunk "' + importName + '" not existed in library');
                return '';
            }
        });
        return shaderStr;
    };

    var exportRegex = /(@export)\s*([0-9a-zA-Z_\-\.]*)\s*\n([\s\S]*?)@end/g;

    /**
     * Import shader source
     * @param  {string} shaderStr
     * @memberOf qtek.Shader
     */
    Shader['import'] = function (shaderStr) {
        shaderStr.replace(exportRegex, function (str, exportSymbol, exportName, code) {
            var code = code.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+\x24)/g, '');
            if (code) {
                var parts = exportName.split('.');
                var obj = Shader.codes;
                var i = 0;
                var key;
                while (i < parts.length - 1) {
                    key = parts[i++];
                    if (!obj[key]) {
                        obj[key] = {};
                    }
                    obj = obj[key];
                }
                key = parts[i];
                obj[key] = code;
            }
            return code;
        });
    };

    /**
     * Library to store all the loaded shader codes
     * @type {Object}
     * @readOnly
     * @memberOf qtek.Shader
     */
    Shader.codes = {};

    /**
     * Get shader source
     * @param  {string} name
     * @return {string}
     * @memberOf qtek.Shader
     */
    Shader.source = function (name) {
        var parts = name.split('.');
        var obj = Shader.codes;
        var i = 0;
        while (obj && i < parts.length) {
            var key = parts[i++];
            obj = obj[key];
        }
        if (typeof obj !== 'string') {
            // FIXME Use default instead
            console.error('Shader "' + name + '" not existed in library');
            return '';
        }
        return obj;
    };

    module.exports = Shader;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @namespace qtek.core.glinfo
 * @see http://www.khronos.org/registry/webgl/extensions/
 */


    var EXTENSION_LIST = [
        'OES_texture_float',
        'OES_texture_half_float',
        'OES_texture_float_linear',
        'OES_texture_half_float_linear',
        'OES_standard_derivatives',
        'OES_vertex_array_object',
        'OES_element_index_uint',
        'WEBGL_compressed_texture_s3tc',
        'WEBGL_depth_texture',
        'EXT_texture_filter_anisotropic',
        'EXT_shader_texture_lod',
        'WEBGL_draw_buffers',
        'EXT_frag_depth',
        'EXT_sRGB'
    ];

    var PARAMETER_NAMES = [
        'MAX_TEXTURE_SIZE',
        'MAX_CUBE_MAP_TEXTURE_SIZE'
    ];

    var extensions = {};
    var parameters = {};

    var glinfo = {
        /**
         * Initialize all extensions and parameters in context
         * @param  {WebGLRenderingContext} _gl
         * @memberOf qtek.core.glinfo
         */
        initialize: function (_gl) {
            var glid = _gl.__GLID__;
            if (extensions[glid]) {
                return;
            }
            extensions[glid] = {};
            parameters[glid] = {};
            // Get webgl extension
            for (var i = 0; i < EXTENSION_LIST.length; i++) {
                var extName = EXTENSION_LIST[i];

                this._createExtension(_gl, extName);
            }
            // Get parameters
            for (var i = 0; i < PARAMETER_NAMES.length; i++) {
                var name = PARAMETER_NAMES[i];
                parameters[glid][name] = _gl.getParameter(_gl[name]);
            }
        },

        /**
         * Get extension
         * @param  {WebGLRenderingContext} _gl
         * @param {string} name - Extension name, vendorless
         * @return {WebGLExtension}
         * @memberOf qtek.core.glinfo
         */
        getExtension: function (_gl, name) {
            var glid = _gl.__GLID__;
            if (extensions[glid]) {
                if (typeof(extensions[glid][name]) == 'undefined') {
                    this._createExtension(_gl, name);
                }
                return extensions[glid][name];
            }
        },

        /**
         * Get parameter
         * @param {WebGLRenderingContext} _gl
         * @param {string} name Parameter name
         * @return {*}
         */
        getParameter: function (_gl, name) {
            var glid = _gl.__GLID__;
            if (parameters[glid]) {
                return parameters[glid][name];
            }
        },

        /**
         * Dispose context
         * @param  {WebGLRenderingContext} _gl
         * @memberOf qtek.core.glinfo
         */
        dispose: function (_gl) {
            delete extensions[_gl.__GLID__];
            delete parameters[_gl.__GLID__];
        },

        _createExtension: function (_gl, name) {
            var ext = _gl.getExtension(name);
            if (!ext) {
                ext = _gl.getExtension('MOZ_' + name);
            }
            if (!ext) {
                ext = _gl.getExtension('WEBKIT_' + name);
            }

            extensions[_gl.__GLID__][name] = ext;
        }
    };

    module.exports = glinfo;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Base = __webpack_require__(1);
    var Vector3 = __webpack_require__(3);
    var Quaternion = __webpack_require__(24);
    var Matrix4 = __webpack_require__(15);
    var glMatrix = __webpack_require__(0);
    var BoundingBox = __webpack_require__(4);
    var mat4 = glMatrix.mat4;

    var nameId = 0;

    /**
     * @constructor qtek.Node
     * @extends qtek.core.Base
     */
    var Node = Base.extend(
    /** @lends qtek.Node# */
    {
        /**
         * Scene node name
         * @type {string}
         */
        name: '',

        /**
         * Position relative to its parent node. aka translation.
         * @type {qtek.math.Vector3}
         */
        position: null,

        /**
         * Rotation relative to its parent node. Represented by a quaternion
         * @type {qtek.math.Quaternion}
         */
        rotation: null,

        /**
         * Scale relative to its parent node
         * @type {qtek.math.Vector3}
         */
        scale: null,

        /**
         * Affine transform matrix relative to its root scene.
         * @type {qtek.math.Matrix4}
         */
        worldTransform: null,

        /**
         * Affine transform matrix relative to its parent node.
         * Composited with position, rotation and scale.
         * @type {qtek.math.Matrix4}
         */
        localTransform: null,

        /**
         * If the local transform is update from SRT(scale, rotation, translation, which is position here) each frame
         * @type {boolean}
         */
        autoUpdateLocalTransform: true,

        /**
         * Parent of current scene node
         * @type {?qtek.Node}
         * @private
         */
        _parent: null,
        /**
         * The root scene mounted. Null if it is a isolated node
         * @type {?qtek.Scene}
         * @private
         */
        _scene: null,

        _needsUpdateWorldTransform: true,

        _inIterating: false,

        // Depth for transparent queue sorting
        __depth: 0

    }, function () {

        if (!this.name) {
            this.name = (this.type || 'NODE') + '_' + (nameId++);
        }

        if (!this.position) {
            this.position = new Vector3();
        }
        if (!this.rotation) {
            this.rotation = new Quaternion();
        }
        if (!this.scale) {
            this.scale = new Vector3(1, 1, 1);
        }

        this.worldTransform = new Matrix4();
        this.localTransform = new Matrix4();

        this._children = [];

    },
    /**@lends qtek.Node.prototype. */
    {

        /**
         * If node and its chilren invisible
         * @type {boolean}
         * @memberOf qtek.Node
         * @instance
         */
        invisible: false,

        /**
         * Return true if it is a renderable scene node, like Mesh and ParticleSystem
         * @return {boolean}
         */
        isRenderable: function () {
            return false;
        },

        /**
         * Set the name of the scene node
         * @param {string} name
         */
        setName: function (name) {
            var scene = this._scene;
            if (scene) {
                var nodeRepository = scene._nodeRepository;
                delete nodeRepository[this.name];
                nodeRepository[name] = this;
            }
            this.name = name;
        },

        /**
         * Add a child node
         * @param {qtek.Node} node
         */
        add: function (node) {
            if (this._inIterating) {
                console.warn('Add operation can cause unpredictable error when in iterating');
            }
            var originalParent = node._parent;
            if (originalParent === this) {
                return;
            }
            if (originalParent) {
                originalParent.remove(node);
            }
            node._parent = this;
            this._children.push(node);

            var scene = this._scene;
            if (scene && scene !== node.scene) {
                node.traverse(this._addSelfToScene, this);
            }
            // Mark children needs update transform
            // In case child are remove and added again after parent moved
            node._needsUpdateWorldTransform = true;
        },

        /**
         * Remove the given child scene node
         * @param {qtek.Node} node
         */
        remove: function (node) {
            if (this._inIterating) {
                console.warn('Remove operation can cause unpredictable error when in iterating');
            }
            var children = this._children;
            var idx = children.indexOf(node);
            if (idx < 0) {
                return;
            }

            children.splice(idx, 1);
            node._parent = null;

            if (this._scene) {
                node.traverse(this._removeSelfFromScene, this);
            }
        },

        /**
         * Remove all children
         */
        removeAll: function () {
            var children = this._children;

            for (var idx = 0; idx < children.length; idx++) {
                children[idx]._parent = null;

                if (this._scene) {
                    children[idx].traverse(this._removeSelfFromScene, this);
                }
            }

            this._children = [];
        },

        /**
         * Get the scene mounted
         * @return {qtek.Scene}
         */
        getScene: function () {
            return this._scene;
        },

        /**
         * Get parent node
         * @return {qtek.Scene}
         */
        getParent: function () {
            return this._parent;
        },

        _removeSelfFromScene: function (descendant) {
            descendant._scene.removeFromScene(descendant);
            descendant._scene = null;
        },

        _addSelfToScene: function (descendant) {
            this._scene.addToScene(descendant);
            descendant._scene = this._scene;
        },

        /**
         * Return true if it is ancestor of the given scene node
         * @param {qtek.Node} node
         */
        isAncestor: function (node) {
            var parent = node._parent;
            while(parent) {
                if (parent === this) {
                    return true;
                }
                parent = parent._parent;
            }
            return false;
        },

        /**
         * Get a new created array of all its children nodes
         * @return {qtek.Node[]}
         */
        children: function () {
            return this._children.slice();
        },

        childAt: function (idx) {
            return this._children[idx];
        },

        /**
         * Get first child with the given name
         * @param {string} name
         * @return {qtek.Node}
         */
        getChildByName: function (name) {
            var children = this._children;
            for (var i = 0; i < children.length; i++) {
                if (children[i].name === name) {
                    return children[i];
                }
            }
        },

        /**
         * Get first descendant have the given name
         * @param {string} name
         * @return {qtek.Node}
         */
        getDescendantByName: function (name) {
            var children = this._children;
            for (var i = 0; i < children.length; i++) {
                var child = children[i];
                if (child.name === name) {
                    return child;
                } else {
                    var res = child.getDescendantByName(name);
                    if (res) {
                        return res;
                    }
                }
            }
        },

        /**
         * Query descendant node by path
         * @param {string} path
         * @return {qtek.Node}
         */
        queryNode: function (path) {
            if (!path) {
                return;
            }
            // TODO Name have slash ?
            var pathArr = path.split('/');
            var current = this;
            for (var i = 0; i < pathArr.length; i++) {
                var name = pathArr[i];
                // Skip empty
                if (!name) {
                    continue;
                }
                var found = false;
                var children = current._children;
                for (var j = 0; j < children.length; j++) {
                    var child = children[j];
                    if (child.name === name) {
                        current = child;
                        found = true;
                        break;
                    }
                }
                // Early return if not found
                if (!found) {
                    return;
                }
            }

            return current;
        },

        /**
         * Get query path, relative to rootNode(default is scene)
         * @return {string}
         */
        getPath: function (rootNode) {
            if (!this._parent) {
                return '/';
            }

            var current = this._parent;
            var path = this.name;
            while (current._parent) {
                path = current.name + '/' + path;
                if (current._parent == rootNode) {
                    break;
                }
                current = current._parent;
            }
            if (!current._parent && rootNode) {
                return null;
            }
            return path;
        },

        /**
         * Depth first traverse all its descendant scene nodes and
         * @param {Function} callback
         * @param {Node} [context]
         * @param {Function} [ctor]
         */
        traverse: function (callback, context, ctor) {

            this._inIterating = true;

            if (ctor == null || this.constructor === ctor) {
                callback.call(context, this);
            }
            var _children = this._children;
            for(var i = 0, len = _children.length; i < len; i++) {
                _children[i].traverse(callback, context, ctor);
            }

            this._inIterating = false;
        },

        eachChild: function (callback, context, ctor) {
            this._inIterating = true;

            var _children = this._children;
            var noCtor = ctor == null;
            for(var i = 0, len = _children.length; i < len; i++) {
                var child = _children[i];
                if (noCtor || child.constructor === ctor) {
                    callback.call(context, child, i);
                }
            }

            this._inIterating = false;
        },

        /**
         * Set the local transform and decompose to SRT
         * @param {qtek.math.Matrix4} matrix
         */
        setLocalTransform: function (matrix) {
            mat4.copy(this.localTransform._array, matrix._array);
            this.decomposeLocalTransform();
        },

        /**
         * Decompose the local transform to SRT
         */
        decomposeLocalTransform: function (keepScale) {
            var scale = !keepScale ? this.scale: null;
            this.localTransform.decomposeMatrix(scale, this.rotation, this.position);
        },

        /**
         * Set the world transform and decompose to SRT
         * @param {qtek.math.Matrix4} matrix
         */
        setWorldTransform: function (matrix) {
            mat4.copy(this.worldTransform._array, matrix._array);
            this.decomposeWorldTransform();
        },

        /**
         * Decompose the world transform to SRT
         * @method
         */
        decomposeWorldTransform: (function () {

            var tmp = mat4.create();

            return function (keepScale) {
                var localTransform = this.localTransform;
                var worldTransform = this.worldTransform;
                // Assume world transform is updated
                if (this._parent) {
                    mat4.invert(tmp, this._parent.worldTransform._array);
                    mat4.multiply(localTransform._array, tmp, worldTransform._array);
                } else {
                    mat4.copy(localTransform._array, worldTransform._array);
                }
                var scale = !keepScale ? this.scale: null;
                localTransform.decomposeMatrix(scale, this.rotation, this.position);
            };
        })(),

        transformNeedsUpdate: function () {
            return this.position._dirty
                || this.rotation._dirty
                || this.scale._dirty;
        },

        /**
         * Update local transform from SRT
         * Notice that local transform will not be updated if _dirty mark of position, rotation, scale is all false
         */
        updateLocalTransform: function () {
            var position = this.position;
            var rotation = this.rotation;
            var scale = this.scale;

            if (this.transformNeedsUpdate()) {
                var m = this.localTransform._array;

                // Transform order, scale->rotation->position
                mat4.fromRotationTranslation(m, rotation._array, position._array);

                mat4.scale(m, m, scale._array);

                rotation._dirty = false;
                scale._dirty = false;
                position._dirty = false;

                this._needsUpdateWorldTransform = true;
            }
        },

        /**
         * Update world transform, assume its parent world transform have been updated
         */
        _updateWorldTransformTopDown: function () {
            var localTransform = this.localTransform._array;
            var worldTransform = this.worldTransform._array;
            if (this._parent) {
                mat4.multiplyAffine(
                    worldTransform,
                    this._parent.worldTransform._array,
                    localTransform
                );
            }
            else {
                mat4.copy(worldTransform, localTransform);
            }
        },

        // Update world transform before whole scene is updated.
        updateWorldTransform: function () {
            // Find the root node which transform needs update;
            var rootNodeIsDirty = this;
            while (rootNodeIsDirty && rootNodeIsDirty.getParent()
                && rootNodeIsDirty.getParent().transformNeedsUpdate()
            ) {
                rootNodeIsDirty = rootNodeIsDirty.getParent();
            }
            rootNodeIsDirty.update();
        },

        /**
         * Update local transform and world transform recursively
         * @param {boolean} forceUpdateWorld
         */
        update: function (forceUpdateWorld) {
            if (this.autoUpdateLocalTransform) {
                this.updateLocalTransform();
            }
            else {
                // Transform is manually setted
                forceUpdateWorld = true;
            }

            if (forceUpdateWorld || this._needsUpdateWorldTransform) {
                this._updateWorldTransformTopDown();
                forceUpdateWorld = true;
                this._needsUpdateWorldTransform = false;
            }

            var children = this._children;
            for(var i = 0, len = children.length; i < len; i++) {
                children[i].update(forceUpdateWorld);
            }
        },

        /**
         * Get bounding box of node
         * @param  {Function} [filter]
         * @param  {qtek.math.BoundingBox} [out]
         * @return {qtek.math.BoundingBox}
         */
        getBoundingBox: (function () {

            function defaultFilter (el) {
                return !el.invisible;
            }
            return function (filter, out) {
                out = out || new BoundingBox();
                filter = filter || defaultFilter;

                var children = this._children;
                if (children.length === 0) {
                    out.max.set(-Infinity, -Infinity, -Infinity);
                    out.min.set(Infinity, Infinity, Infinity);
                }

                var tmpBBox = new BoundingBox();
                for (var i = 0; i < children.length; i++) {
                    var child = children[i];
                    if (!filter(child)) {
                        continue;
                    }
                    child.getBoundingBox(filter, tmpBBox);
                    child.updateLocalTransform();
                    if (tmpBBox.isFinite()) {
                        tmpBBox.applyTransform(child.localTransform);
                    }
                    if (i === 0) {
                        out.copy(tmpBBox);
                    }
                    else {
                        out.union(tmpBBox);
                    }
                }

                return out;
            };
        })(),

        /**
         * Get world position, extracted from world transform
         * @param  {qtek.math.Vector3} [out]
         * @return {qtek.math.Vector3}
         */
        getWorldPosition: function (out) {
            // PENDING
            if (this.transformNeedsUpdate()) {
                this.updateWorldTransform();
            }
            var m = this.worldTransform._array;
            if (out) {
                var arr = out._array;
                arr[0] = m[12];
                arr[1] = m[13];
                arr[2] = m[14];
                return out;
            }
            else {
                return new Vector3(m[12], m[13], m[14]);
            }
        },

        // TODO Set world transform

        /**
         * Clone a new node
         * @return {Node}
         */
        clone: function () {
            var node = new this.constructor();
            var children = this._children;

            node.setName(this.name);
            node.position.copy(this.position);
            node.rotation.copy(this.rotation);
            node.scale.copy(this.scale);

            for (var i = 0; i < children.length; i++) {
                node.add(children[i].clone());
            }
            return node;
        },

        /**
         * Rotate the node around a axis by angle degrees, axis passes through point
         * @param {qtek.math.Vector3} point Center point
         * @param {qtek.math.Vector3} axis  Center axis
         * @param {number}       angle Rotation angle
         * @see http://docs.unity3d.com/Documentation/ScriptReference/Transform.RotateAround.html
         * @method
         */
        rotateAround: (function () {
            var v = new Vector3();
            var RTMatrix = new Matrix4();

            // TODO improve performance
            return function (point, axis, angle) {

                v.copy(this.position).subtract(point);

                var localTransform = this.localTransform;
                localTransform.identity();
                // parent node
                localTransform.translate(point);
                localTransform.rotate(angle, axis);

                RTMatrix.fromRotationTranslation(this.rotation, v);
                localTransform.multiply(RTMatrix);
                localTransform.scale(this.scale);

                this.decomposeLocalTransform();
                this._needsUpdateWorldTransform = true;
            };
        })(),

        /**
         * @param {qtek.math.Vector3} target
         * @param {qtek.math.Vector3} [up]
         * @see http://www.opengl.org/sdk/docs/man2/xhtml/gluLookAt.xml
         * @method
         */
        // TODO world space ?
        lookAt: (function () {
            var m = new Matrix4();
            return function (target, up) {
                m.lookAt(this.position, target, up || this.localTransform.y).invert();
                this.setLocalTransform(m);
            };
        })()
    });

    module.exports = Node;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var supportWebGL = true;
    try {
        var canvas = document.createElement('canvas');
        var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            throw new Error();
        }
    } catch (e) {
        supportWebGL = false;
    }

    var vendor = {};

    /**
     * If support WebGL
     * @return {boolean}
     */
    vendor.supportWebGL = function () {
        return supportWebGL;
    };


    vendor.Int8Array = typeof Int8Array == 'undefined' ? Array : Int8Array;

    vendor.Uint8Array = typeof Uint8Array == 'undefined' ? Array : Uint8Array;

    vendor.Uint16Array = typeof Uint16Array == 'undefined' ? Array : Uint16Array;

    vendor.Uint32Array = typeof Uint32Array == 'undefined' ? Array : Uint32Array;

    vendor.Int16Array = typeof Int16Array == 'undefined' ? Array : Int16Array;

    vendor.Float32Array = typeof Float32Array == 'undefined' ? Array : Float32Array;

    vendor.Float64Array = typeof Float64Array == 'undefined' ? Array : Float64Array;

    module.exports = vendor;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Node = __webpack_require__(7);

    /**
     * @constructor qtek.Light
     * @extends qtek.Node
     */
    var Light = Node.extend(function(){
        return /** @lends qtek.Light# */ {
            /**
             * Light RGB color
             * @type {number[]}
             */
            color: [1, 1, 1],

            /**
             * Light intensity
             * @type {number}
             */
            intensity: 1.0,

            // Config for shadow map
            /**
             * If light cast shadow
             * @type {boolean}
             */
            castShadow: true,

            /**
             * Shadow map size
             * @type {number}
             */
            shadowResolution: 512,

            /**
             * Light group, shader with same `lightGroup` will be affected
             *
             * Only useful in forward rendering
             * @type {number}
             */
            group: 0
        };
    },
    /** @lends qtek.Light.prototype. */
    {
        /**
         * Light type
         * @type {string}
         * @memberOf qtek.Light#
         */
        type: '',

        /**
         * @return {qtek.Light}
         * @memberOf qtek.Light.prototype
         */
        clone: function() {
            var light = Node.prototype.clone.call(this);
            light.color = Array.prototype.slice.call(this.color);
            light.intensity = this.intensity;
            light.castShadow = this.castShadow;
            light.shadowResolution = this.shadowResolution;

            return light;
        }
    });

    module.exports = Light;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Base = __webpack_require__(1);
    var Texture = __webpack_require__(12);

    /**
     * @constructor qtek.Material
     * @extends qtek.core.Base
     */
    var Material = Base.extend(
    /** @lends qtek.Material# */
    {
        /**
         * @type {string}
         */
        name: '',

        /**
         * @type {Object}
         */
        // uniforms: null,

        /**
         * @type {qtek.Shader}
         */
        // shader: null,

        /**
         * @type {boolean}
         */
        depthTest: true,

        /**
         * @type {boolean}
         */
        depthMask: true,

        /**
         * @type {boolean}
         */
        transparent: false,
        /**
         * Blend func is a callback function when the material
         * have custom blending
         * The gl context will be the only argument passed in tho the
         * blend function
         * Detail of blend function in WebGL:
         * http://www.khronos.org/registry/gles/specs/2.0/es_full_spec_2.0.25.pdf
         *
         * Example :
         * function(_gl) {
         *  _gl.blendEquation(_gl.FUNC_ADD);
         *  _gl.blendFunc(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA);
         * }
         */
        blend: null,

        // shadowTransparentMap : null

        _enabledUniforms: null,
    }, function () {
        if (!this.name) {
            this.name = 'MATERIAL_' + this.__GUID__;
        }
        if (this.shader) {
            this.attachShader(this.shader);
        }
        if (!this.uniforms) {
            this.uniforms = {};
        }
    },
    /** @lends qtek.Material.prototype */
    {

        /**
         * @param  {WebGLRenderingContext} _gl
         * @param  {qtek.Shader} [shader]
         * @param  {qtek.Material} [prevMaterial]
         * @param  {qtek.Shader} [prevShader]
         * @return {Object}
         */
        bind: function(_gl, shader, prevMaterial, prevShader) {

            // May use shader of other material if shader code are same
            var shader = shader || this.shader;

            var sameShader = prevShader === shader;

            var currentTextureSlot = shader.currentTextureSlot();
            // Set uniforms
            for (var u = 0; u < this._enabledUniforms.length; u++) {
                var symbol = this._enabledUniforms[u];
                var uniform = this.uniforms[symbol];
                var uniformValue = uniform.value;
                // When binding two materials with the same shader
                // Many uniforms will be be set twice even if they have the same value
                // So add a evaluation to see if the uniform is really needed to be set
                if (prevMaterial && sameShader) {
                    if (prevMaterial.uniforms[symbol].value === uniformValue) {
                        continue;
                    }
                }

                if (uniformValue === undefined) {
                    console.warn('Uniform value "' + symbol + '" is undefined');
                    continue;
                }
                else if (uniformValue === null) {
                    // FIXME Assume material with same shader have same order uniforms
                    // Or if different material use same textures,
                    // the slot will be different and still skipped because optimization
                    if (uniform.type === 't') {
                        var slot = shader.currentTextureSlot();
                        var res = shader.setUniform(_gl, '1i', symbol, slot);
                        if (res) { // Texture is enabled
                            // Still occupy the slot to make sure same texture in different materials have same slot.
                            shader.useCurrentTextureSlot(_gl, null);
                        }
                    }
                    continue;
                }
                else if (uniformValue instanceof Array
                    && !uniformValue.length) {
                    continue;
                }
                else if (uniformValue instanceof Texture) {
                    var slot = shader.currentTextureSlot();
                    var res = shader.setUniform(_gl, '1i', symbol, slot);
                    if (!res) { // Texture is not enabled
                        continue;
                    }
                    shader.useCurrentTextureSlot(_gl, uniformValue);
                }
                else if (uniformValue instanceof Array) {
                    if (uniformValue.length === 0) {
                        continue;
                    }
                    // Texture Array
                    var exampleValue = uniformValue[0];

                    if (exampleValue instanceof Texture) {
                        if (!shader.hasUniform(symbol)) {
                            continue;
                        }

                        var arr = [];
                        for (var i = 0; i < uniformValue.length; i++) {
                            var texture = uniformValue[i];

                            var slot = shader.currentTextureSlot();
                            arr.push(slot);

                            shader.useCurrentTextureSlot(_gl, texture);
                        }

                        shader.setUniform(_gl, '1iv', symbol, arr);
                    }
                    else {
                        shader.setUniform(_gl, uniform.type, symbol, uniformValue);
                    }
                }
                else{
                    shader.setUniform(_gl, uniform.type, symbol, uniformValue);
                }
            }
            // Texture slot maybe used out of material.
            shader.resetTextureSlot(currentTextureSlot);
        },

        /**
         * @param {string} symbol
         * @param {number|array|qtek.Texture|ArrayBufferView} value
         */
        setUniform: function (symbol, value) {
            if (value === undefined) {
                console.warn('Uniform value "' + symbol + '" is undefined');
            }
            var uniform = this.uniforms[symbol];
            if (uniform) {
                uniform.value = value;
            }
        },

        /**
         * @param {Object} obj
         */
        setUniforms: function(obj) {
            for (var key in obj) {
                var val = obj[key];
                this.setUniform(key, val);
            }
        },

        /**
         * Enable a uniform
         * It only have effect on the uniform exists in shader.
         * @param  {string} symbol
         */
        // enableUniform: function (symbol) {
        //     if (this.uniforms[symbol] && !this.isUniformEnabled(symbol)) {
        //         this._enabledUniforms.push(symbol);
        //     }
        // },

        // /**
        //  * Disable a uniform
        //  * It will not affect the uniform state in the shader. Because the shader uniforms is parsed from shader code with naive regex. When using micro to disable some uniforms in the shader. It will still try to set these uniforms in each rendering pass. We can disable these uniforms manually if we need this bit performance improvement. Mostly we can simply ignore it.
        //  * @param  {string} symbol
        //  */
        // disableUniform: function (symbol) {
        //     var idx = this._enabledUniforms.indexOf(symbol);
        //     if (idx >= 0) {
        //         this._enabledUniforms.splice(idx, 1);
        //     }
        // },

        /**
         * @param  {string}  symbol
         * @return {boolean}
         */
        isUniformEnabled: function (symbol) {
            return this._enabledUniforms.indexOf(symbol) >= 0;
        },

        /**
         * Alias of setUniform and setUniforms
         * @param {object|string} symbol
         * @param {number|array|qtek.Texture|ArrayBufferView} [value]
         */
        set: function (symbol, value) {
            if (typeof(symbol) === 'object') {
                for (var key in symbol) {
                    var val = symbol[key];
                    this.set(key, val);
                }
            }
            else {
                var uniform = this.uniforms[symbol];
                if (uniform) {
                    uniform.value = value;
                }
            }
        },
        /**
         * Get uniform value
         * @param  {string} symbol
         * @return {number|array|qtek.Texture|ArrayBufferView}
         */
        get: function (symbol) {
            var uniform = this.uniforms[symbol];
            if (uniform) {
                return uniform.value;
            }
        },
        /**
         * Attach a shader instance
         * @param  {qtek.Shader} shader
         * @param  {boolean} keepUniform If try to keep uniform value
         */
        attachShader: function(shader, keepUniform) {
            if (this.shader) {
                this.shader.detached();
            }

            var originalUniforms = this.uniforms;

            // Ignore if uniform can use in shader.
            this.uniforms = shader.createUniforms();
            this.shader = shader;

            var uniforms = this.uniforms;
            this._enabledUniforms = Object.keys(uniforms);
            // Make sure uniforms are set in same order to avoid texture slot wrong
            this._enabledUniforms.sort();

            if (keepUniform) {
                for (var symbol in originalUniforms) {
                    if (uniforms[symbol]) {
                        uniforms[symbol].value = originalUniforms[symbol].value;
                    }
                }
            }

            shader.attached();
        },

        /**
         * Detach a shader instance
         */
        detachShader: function() {
            this.shader.detached();
            this.shader = null;
            this.uniforms = {};
        },

        /**
         * Clone a new material and keep uniforms, shader will not be cloned
         * @return {qtek.Material}
         */
        clone: function () {
            var material = new this.constructor({
                name: this.name,
                shader: this.shader
            });
            for (var symbol in this.uniforms) {
                material.uniforms[symbol].value = this.uniforms[symbol].value;
            }
            material.depthTest = this.depthTest;
            material.depthMask = this.depthMask;
            material.transparent = this.transparent;
            material.blend = this.blend;

            return material;
        },

        /**
         * Dispose material, if material shader is not attached to any other materials
         * Shader will also be disposed
         * @param {WebGLRenderingContext} gl
         * @param {boolean} [disposeTexture=false] If dispose the textures used in the material
         */
        dispose: function(_gl, disposeTexture) {
            if (disposeTexture) {
                for (var name in this.uniforms) {
                    var val = this.uniforms[name].value;
                    if (!val) {
                        continue;
                    }
                    if (val instanceof Texture) {
                        val.dispose(_gl);
                    }
                    else if (val instanceof Array) {
                        for (var i = 0; i < val.length; i++) {
                            if (val[i] instanceof Texture) {
                                val[i].dispose(_gl);
                            }
                        }
                    }
                }
            }
            var shader = this.shader;
            if (shader) {
                this.detachShader();
                if (!shader.isAttachedToAny()) {
                    shader.dispose(_gl);
                }
            }
        }
    });

    module.exports = Material;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * StaticGeometry can not be changed once they've been setup
 */


    var Geometry = __webpack_require__(46);
    var BoundingBox = __webpack_require__(4);
    var glMatrix = __webpack_require__(0);
    var vendor = __webpack_require__(8);
    var glenum = __webpack_require__(2);
    var mat4 = glMatrix.mat4;
    var vec3 = glMatrix.vec3;

    var StaticAttribute = Geometry.StaticAttribute;
    var vec3Create = vec3.create;
    var vec3Add = vec3.add;
    var vec3Set = vec3.set;

    function makeAttrKey(attrName) {
        return 'attr_' + attrName;
    }
    /**
     * @constructor qtek.StaticGeometry
     * @extends qtek.Geometry
     */
    var StaticGeometry = Geometry.extend(function () {
        return /** @lends qtek.StaticGeometry# */ {
            attributes: {
                 position: new StaticAttribute('position', 'float', 3, 'POSITION'),
                 texcoord0: new StaticAttribute('texcoord0', 'float', 2, 'TEXCOORD_0'),
                 texcoord1: new StaticAttribute('texcoord1', 'float', 2, 'TEXCOORD_1'),
                 normal: new StaticAttribute('normal', 'float', 3, 'NORMAL'),
                 tangent: new StaticAttribute('tangent', 'float', 4, 'TANGENT'),
                 color: new StaticAttribute('color', 'float', 4, 'COLOR'),
                 // Skinning attributes
                 // Each vertex can be bind to 4 bones, because the
                 // sum of weights is 1, so the weights is stored in vec3 and the last
                 // can be calculated by 1-w.x-w.y-w.z
                 weight: new StaticAttribute('weight', 'float', 3, 'WEIGHT'),
                 joint: new StaticAttribute('joint', 'float', 4, 'JOINT'),
                 // For wireframe display
                 // http://codeflow.org/entries/2012/aug/02/easy-wireframe-display-with-barycentric-coordinates/
                 barycentric: new StaticAttribute('barycentric', 'float', 3, null),
            },

            hint: glenum.STATIC_DRAW,

            /**
             * @type {Uint16Array|Uint32Array}
             */
            indices: null,

            _normalType: 'vertex',

            _enabledAttributes: null
        };
    },
    /** @lends qtek.StaticGeometry.prototype */
    {
        updateBoundingBox: function () {
            var bbox = this.boundingBox;
            if (!bbox) {
                bbox = this.boundingBox = new BoundingBox();
            }
            var posArr = this.attributes.position.value;
            if (posArr && posArr.length) {
                var min = bbox.min;
                var max = bbox.max;
                var minArr = min._array;
                var maxArr = max._array;
                vec3.set(minArr, posArr[0], posArr[1], posArr[2]);
                vec3.set(maxArr, posArr[0], posArr[1], posArr[2]);
                for (var i = 3; i < posArr.length;) {
                    var x = posArr[i++];
                    var y = posArr[i++];
                    var z = posArr[i++];
                    if (x < minArr[0]) { minArr[0] = x; }
                    if (y < minArr[1]) { minArr[1] = y; }
                    if (z < minArr[2]) { minArr[2] = z; }

                    if (x > maxArr[0]) { maxArr[0] = x; }
                    if (y > maxArr[1]) { maxArr[1] = y; }
                    if (z > maxArr[2]) { maxArr[2] = z; }
                }
                min._dirty = true;
                max._dirty = true;
            }
        },

        dirty: function () {
            var enabledAttributes = this.getEnabledAttributes();
            for (var i = 0; i < enabledAttributes.length; i++) {
                this.dirtyAttribute(enabledAttributes[i]);
            }
            this.dirtyIndices();
            this._enabledAttributes = null;
        },

        dirtyIndices: function () {
            this._cache.dirtyAll('indices');
        },

        dirtyAttribute: function (attrName) {
            this._cache.dirtyAll(makeAttrKey(attrName));
            this._cache.dirtyAll('attributes');
        },

        getTriangleIndices: function (idx, out) {
            if (idx < this.triangleCount && idx >= 0) {
                if (!out) {
                    out = vec3Create();
                }
                var indices = this.indices;
                out[0] = indices[idx * 3];
                out[1] = indices[idx * 3 + 1];
                out[2] = indices[idx * 3 + 2];
                return out;
            }
        },

        setTriangleIndices: function (idx, arr) {
            var indices = this.indices;
            indices[idx * 3] = arr[0];
            indices[idx * 3 + 1] = arr[1];
            indices[idx * 3 + 2] = arr[2];
        },

        isUseIndices: function () {
            return !!this.indices;
        },

        initIndicesFromArray: function (array) {
            var value;
            var ArrayConstructor = this.vertexCount > 0xffff
                ? vendor.Uint32Array : vendor.Uint16Array;
            // Convert 2d array to flat
            if (array[0] && (array[0].length)) {
                var n = 0;
                var size = 3;

                value = new ArrayConstructor(array.length * size);
                for (var i = 0; i < array.length; i++) {
                    for (var j = 0; j < size; j++) {
                        value[n++] = array[i][j];
                    }
                }
            }
            else {
                value = new ArrayConstructor(array);
            }

            this.indices = value;
        },

        createAttribute: function (name, type, size, semantic) {
            var attrib = new StaticAttribute(name, type, size, semantic);
            if (this.attributes[name]) {
                this.removeAttribute(name);
            }
            this.attributes[name] = attrib;
            this._attributeList.push(name);
            return attrib;
        },

        removeAttribute: function (name) {
            var attributeList = this._attributeList;
            var idx = attributeList.indexOf(name);
            if (idx >= 0) {
                attributeList.splice(idx, 1);
                delete this.attributes[name];
                return true;
            }
            return false;
        },

        /**
         * Get enabled attributes name list
         * Attribute which has the same vertex number with position is treated as a enabled attribute
         * @return {string[]}
         */
        getEnabledAttributes: function () {
            var enabledAttributes = this._enabledAttributes;
            var attributeList = this._attributeList;
            // Cache
            if (enabledAttributes) {
                return enabledAttributes;
            }

            var result = [];
            var nVertex = this.vertexCount;

            for (var i = 0; i < attributeList.length; i++) {
                var name = attributeList[i];
                var attrib = this.attributes[name];
                if (attrib.value) {
                    if (attrib.value.length === nVertex * attrib.size) {
                        result.push(name);
                    }
                }
            }

            this._enabledAttributes = result;

            return result;
        },

        getBufferChunks: function (_gl) {
            var cache = this._cache;
            cache.use(_gl.__GLID__);
            var isAttributesDirty = cache.isDirty('attributes');
            var isIndicesDirty = cache.isDirty('indices');
            if (isAttributesDirty || isIndicesDirty) {
                this._updateBuffer(_gl, isAttributesDirty, isIndicesDirty);
                var enabledAttributes = this.getEnabledAttributes();
                for (var i = 0; i < enabledAttributes.length; i++) {
                    cache.fresh(makeAttrKey(enabledAttributes[i]));
                }
                cache.fresh('attributes');
                cache.fresh('indices');
            }
            return cache.get('chunks');
        },

        _updateBuffer: function (_gl, isAttributesDirty, isIndicesDirty) {
            var cache = this._cache;
            var chunks = cache.get('chunks');
            var firstUpdate = false;
            if (!chunks) {
                chunks = [];
                // Intialize
                chunks[0] = {
                    attributeBuffers: [],
                    indicesBuffer: null
                };
                cache.put('chunks', chunks);
                firstUpdate = true;
            }

            var chunk = chunks[0];
            var attributeBuffers = chunk.attributeBuffers;
            var indicesBuffer = chunk.indicesBuffer;

            if (isAttributesDirty || firstUpdate) {
                var attributeList = this.getEnabledAttributes();

                var attributeBufferMap = {};
                if (!firstUpdate) {
                    for (var i = 0; i < attributeBuffers.length; i++) {
                        attributeBufferMap[attributeBuffers[i].name] = attributeBuffers[i];
                    }
                }
                // FIXME If some attributes removed
                for (var k = 0; k < attributeList.length; k++) {
                    var name = attributeList[k];
                    var attribute = this.attributes[name];

                    var bufferInfo;

                    if (!firstUpdate) {
                        bufferInfo = attributeBufferMap[name];
                    }
                    var buffer;
                    if (bufferInfo) {
                        buffer = bufferInfo.buffer;
                    }
                    else {
                        buffer = _gl.createBuffer();
                    }
                    if (cache.isDirty(makeAttrKey(name))) {
                        // Only update when they are dirty.
                        // TODO: Use BufferSubData?
                        _gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
                        _gl.bufferData(_gl.ARRAY_BUFFER, attribute.value, this.hint);
                    }

                    attributeBuffers[k] = new Geometry.AttributeBuffer(name, attribute.type, buffer, attribute.size, attribute.semantic);
                }
                // Remove unused attributes buffers.
                // PENDING
                for (var i = k; i < attributeBuffers.length; i++) {
                    _gl.deleteBuffer(attributeBuffers[i].buffer);
                }
                attributeBuffers.length = k;

            }

            if (this.isUseIndices() && (isIndicesDirty || firstUpdate)) {
                if (!indicesBuffer) {
                    indicesBuffer = new Geometry.IndicesBuffer(_gl.createBuffer());
                    chunk.indicesBuffer = indicesBuffer;
                }
                indicesBuffer.count = this.indices.length;
                _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, indicesBuffer.buffer);
                _gl.bufferData(_gl.ELEMENT_ARRAY_BUFFER, this.indices, this.hint);
            }
        },

        generateVertexNormals: function () {
            if (!this.vertexCount) {
                return;
            }

            var indices = this.indices;
            var attributes = this.attributes;
            var positions = attributes.position.value;
            var normals = attributes.normal.value;

            if (!normals || normals.length !== positions.length) {
                normals = attributes.normal.value = new vendor.Float32Array(positions.length);
            }
            else {
                // Reset
                for (var i = 0; i < normals.length; i++) {
                    normals[i] = 0;
                }
            }

            var p1 = vec3Create();
            var p2 = vec3Create();
            var p3 = vec3Create();

            var v21 = vec3Create();
            var v32 = vec3Create();

            var n = vec3Create();

            // TODO if no indices
            for (var f = 0; f < indices.length;) {
                var i1 = indices[f++];
                var i2 = indices[f++];
                var i3 = indices[f++];

                vec3Set(p1, positions[i1*3], positions[i1*3+1], positions[i1*3+2]);
                vec3Set(p2, positions[i2*3], positions[i2*3+1], positions[i2*3+2]);
                vec3Set(p3, positions[i3*3], positions[i3*3+1], positions[i3*3+2]);

                vec3.sub(v21, p1, p2);
                vec3.sub(v32, p2, p3);
                vec3.cross(n, v21, v32);
                // Already be weighted by the triangle area
                for (var i = 0; i < 3; i++) {
                    normals[i1*3+i] = normals[i1*3+i] + n[i];
                    normals[i2*3+i] = normals[i2*3+i] + n[i];
                    normals[i3*3+i] = normals[i3*3+i] + n[i];
                }
            }

            for (var i = 0; i < normals.length;) {
                vec3Set(n, normals[i], normals[i+1], normals[i+2]);
                vec3.normalize(n, n);
                normals[i++] = n[0];
                normals[i++] = n[1];
                normals[i++] = n[2];
            }
            this.dirty();
        },

        generateFaceNormals: function () {
            if (!this.vertexCount) {
                return;
            }

            if (!this.isUniqueVertex()) {
                this.generateUniqueVertex();
            }

            var indices = this.indices;
            var attributes = this.attributes;
            var positions = attributes.position.value;
            var normals = attributes.normal.value;

            var p1 = vec3Create();
            var p2 = vec3Create();
            var p3 = vec3Create();

            var v21 = vec3Create();
            var v32 = vec3Create();
            var n = vec3Create();

            if (!normals) {
                normals = attributes.normal.value = new Float32Array(positions.length);
            }
            for (var f = 0; f < indices.length;) {
                var i1 = indices[f++];
                var i2 = indices[f++];
                var i3 = indices[f++];

                vec3Set(p1, positions[i1*3], positions[i1*3+1], positions[i1*3+2]);
                vec3Set(p2, positions[i2*3], positions[i2*3+1], positions[i2*3+2]);
                vec3Set(p3, positions[i3*3], positions[i3*3+1], positions[i3*3+2]);

                vec3.sub(v21, p1, p2);
                vec3.sub(v32, p2, p3);
                vec3.cross(n, v21, v32);

                vec3.normalize(n, n);

                for (var i = 0; i < 3; i++) {
                    normals[i1*3 + i] = n[i];
                    normals[i2*3 + i] = n[i];
                    normals[i3*3 + i] = n[i];
                }
            }
            this.dirty();
        },

        generateTangents: function () {
            if (!this.vertexCount) {
                return;
            }

            var nVertex = this.vertexCount;
            var attributes = this.attributes;
            if (!attributes.tangent.value) {
                attributes.tangent.value = new Float32Array(nVertex * 4);
            }
            var texcoords = attributes.texcoord0.value;
            var positions = attributes.position.value;
            var tangents = attributes.tangent.value;
            var normals = attributes.normal.value;

            var tan1 = [];
            var tan2 = [];
            for (var i = 0; i < nVertex; i++) {
                tan1[i] = [0.0, 0.0, 0.0];
                tan2[i] = [0.0, 0.0, 0.0];
            }

            var sdir = [0.0, 0.0, 0.0];
            var tdir = [0.0, 0.0, 0.0];
            var indices = this.indices;
            for (var i = 0; i < indices.length;) {
                var i1 = indices[i++],
                    i2 = indices[i++],
                    i3 = indices[i++],

                    st1s = texcoords[i1 * 2],
                    st2s = texcoords[i2 * 2],
                    st3s = texcoords[i3 * 2],
                    st1t = texcoords[i1 * 2 + 1],
                    st2t = texcoords[i2 * 2 + 1],
                    st3t = texcoords[i3 * 2 + 1],

                    p1x = positions[i1 * 3],
                    p2x = positions[i2 * 3],
                    p3x = positions[i3 * 3],
                    p1y = positions[i1 * 3 + 1],
                    p2y = positions[i2 * 3 + 1],
                    p3y = positions[i3 * 3 + 1],
                    p1z = positions[i1 * 3 + 2],
                    p2z = positions[i2 * 3 + 2],
                    p3z = positions[i3 * 3 + 2];

                var x1 = p2x - p1x,
                    x2 = p3x - p1x,
                    y1 = p2y - p1y,
                    y2 = p3y - p1y,
                    z1 = p2z - p1z,
                    z2 = p3z - p1z;

                var s1 = st2s - st1s,
                    s2 = st3s - st1s,
                    t1 = st2t - st1t,
                    t2 = st3t - st1t;

                var r = 1.0 / (s1 * t2 - t1 * s2);
                sdir[0] = (t2 * x1 - t1 * x2) * r;
                sdir[1] = (t2 * y1 - t1 * y2) * r;
                sdir[2] = (t2 * z1 - t1 * z2) * r;

                tdir[0] = (s1 * x2 - s2 * x1) * r;
                tdir[1] = (s1 * y2 - s2 * y1) * r;
                tdir[2] = (s1 * z2 - s2 * z1) * r;

                vec3Add(tan1[i1], tan1[i1], sdir);
                vec3Add(tan1[i2], tan1[i2], sdir);
                vec3Add(tan1[i3], tan1[i3], sdir);
                vec3Add(tan2[i1], tan2[i1], tdir);
                vec3Add(tan2[i2], tan2[i2], tdir);
                vec3Add(tan2[i3], tan2[i3], tdir);
            }
            var tmp = vec3Create();
            var nCrossT = vec3Create();
            var n = vec3Create();
            for (var i = 0; i < nVertex; i++) {
                n[0] = normals[i * 3];
                n[1] = normals[i * 3 + 1];
                n[2] = normals[i * 3 + 2];
                var t = tan1[i];

                // Gram-Schmidt orthogonalize
                vec3.scale(tmp, n, vec3.dot(n, t));
                vec3.sub(tmp, t, tmp);
                vec3.normalize(tmp, tmp);
                // Calculate handedness.
                vec3.cross(nCrossT, n, t);
                tangents[i * 4] = tmp[0];
                tangents[i * 4 + 1] = tmp[1];
                tangents[i * 4 + 2] = tmp[2];
                tangents[i * 4 + 3] = vec3.dot(nCrossT, tan2[i]) < 0.0 ? -1.0 : 1.0;
            }
            this.dirty();
        },

        isUniqueVertex: function () {
            if (this.isUseIndices()) {
                return this.vertexCount === this.indices.length;
            }
            else {
                return true;
            }
        },

        generateUniqueVertex: function () {
            if (!this.vertexCount) {
                return;
            }

            if (this.indices.length > 0xffff) {
                this.indices = new vendor.Uint32Array(this.indices);
            }

            var attributes = this.attributes;
            var indices = this.indices;

            var attributeNameList = this.getEnabledAttributes();

            var oldAttrValues = {};
            for (var a = 0; a < attributeNameList.length; a++) {
                var name = attributeNameList[a];
                oldAttrValues[name] = attributes[name].value;
                attributes[name].init(this.indices.length);
            }

            var cursor = 0;
            for (var i = 0; i < indices.length; i++) {
                var ii = indices[i];
                for (var a = 0; a < attributeNameList.length; a++) {
                    var name = attributeNameList[a];
                    var array = attributes[name].value;
                    var size = attributes[name].size;

                    for (var k = 0; k < size; k++) {
                        array[cursor * size + k] = oldAttrValues[name][ii * size + k];
                    }
                }
                indices[i] = cursor;
                cursor++;
            }

            this.dirty();
        },

        generateBarycentric: function () {
            if (!this.vertexCount) {
                return;
            }

            if (!this.isUniqueVertex()) {
                this.generateUniqueVertex();
            }

            var attributes = this.attributes;
            var array = attributes.barycentric.value;
            var indices = this.indices;
            // Already existed;
            if (array && array.length === indices.length * 3) {
                return;
            }
            array = attributes.barycentric.value = new Float32Array(indices.length * 3);
            for (var i = 0; i < indices.length;) {
                for (var j = 0; j < 3; j++) {
                    var ii = indices[i++];
                    array[ii * 3 + j] = 1;
                }
            }
            this.dirty();
        },

        applyTransform: function (matrix) {

            var attributes = this.attributes;
            var positions = attributes.position.value;
            var normals = attributes.normal.value;
            var tangents = attributes.tangent.value;

            matrix = matrix._array;
            // Normal Matrix
            var inverseTransposeMatrix = mat4.create();
            mat4.invert(inverseTransposeMatrix, matrix);
            mat4.transpose(inverseTransposeMatrix, inverseTransposeMatrix);

            var vec3TransformMat4 = vec3.transformMat4;
            var vec3ForEach = vec3.forEach;
            vec3ForEach(positions, 3, 0, null, vec3TransformMat4, matrix);
            if (normals) {
                vec3ForEach(normals, 3, 0, null, vec3TransformMat4, inverseTransposeMatrix);
            }
            if (tangents) {
                vec3ForEach(tangents, 4, 0, null, vec3TransformMat4, inverseTransposeMatrix);
            }

            if (this.boundingBox) {
                this.updateBoundingBox();
            }
        },

        dispose: function (_gl) {

            var cache = this._cache;

            cache.use(_gl.__GLID__);
            var chunks = cache.get('chunks');
            if (chunks) {
                for (var c = 0; c < chunks.length; c++) {
                    var chunk = chunks[c];

                    for (var k = 0; k < chunk.attributeBuffers.length; k++) {
                        var attribs = chunk.attributeBuffers[k];
                        _gl.deleteBuffer(attribs.buffer);
                    }
                }
            }
            cache.deleteContext(_gl.__GLID__);
        }
    });

    if (Object.defineProperty) {
        Object.defineProperty(StaticGeometry.prototype, 'vertexCount', {

            enumerable: false,

            get: function () {
                var mainAttribute = this.attributes[this.mainAttribute];
                if (!mainAttribute || !mainAttribute.value) {
                    return 0;
                }
                return mainAttribute.value.length / mainAttribute.size;
            }
        });
        Object.defineProperty(StaticGeometry.prototype, 'triangleCount', {

            enumerable: false,

            get: function () {
                var indices = this.indices;
                if (!indices) {
                    return 0;
                }
                else {
                    return indices.length / 3;
                }
            }
        });
    }

    StaticGeometry.Attribute = Geometry.StaticAttribute;

    module.exports = StaticGeometry;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Base class for all textures like compressed texture, texture2d, texturecube
 * TODO mapping
 */


    var Base = __webpack_require__(1);
    var glenum = __webpack_require__(2);
    var Cache = __webpack_require__(17);
    var glinfo = __webpack_require__(6);

    /**
     * @constructor qtek.Texture
     * @extends qtek.core.Base
     */
    var Texture = Base.extend(
    /** @lends qtek.Texture# */
    {
        /**
         * Texture width, only needed when the texture is used as a render target
         * @type {number}
         */
        width: 512,
        /**
         * Texture height, only needed when the texture is used as a render target
         * @type {number}
         */
        height: 512,
        /**
         * Texel data type
         * @type {number}
         */
        type: glenum.UNSIGNED_BYTE,
        /**
         * Format of texel data
         * @type {number}
         */
        format: glenum.RGBA,
        /**
         * @type {number}
         */
        wrapS: glenum.CLAMP_TO_EDGE,
        /**
         * @type {number}
         */
        wrapT: glenum.CLAMP_TO_EDGE,
        /**
         * @type {number}
         */
        minFilter: glenum.LINEAR_MIPMAP_LINEAR,
        /**
         * @type {number}
         */
        magFilter: glenum.LINEAR,
        /**
         * @type {boolean}
         */
        useMipmap: true,

        /**
         * Anisotropic filtering, enabled if value is larger than 1
         * @see http://blog.tojicode.com/2012/03/anisotropic-filtering-in-webgl.html
         * @type {number}
         */
        anisotropic: 1,
        // pixelStorei parameters, not available when texture is used as render target
        // http://www.khronos.org/opengles/sdk/docs/man/xhtml/glPixelStorei.xml
        /**
         * @type {boolean}
         */
        flipY: true,
        /**
         * @type {number}
         */
        unpackAlignment: 4,
        /**
         * @type {boolean}
         */
        premultiplyAlpha: false,

        /**
         * Dynamic option for texture like video
         * @type {boolean}
         */
        dynamic: false,

        NPOT: false
    }, function () {
        this._cache = new Cache();
    },
    /** @lends qtek.Texture.prototype */
    {

        getWebGLTexture: function (_gl) {
            var cache = this._cache;
            cache.use(_gl.__GLID__);

            if (cache.miss('webgl_texture')) {
                // In a new gl context, create new texture and set dirty true
                cache.put('webgl_texture', _gl.createTexture());
            }
            if (this.dynamic) {
                this.update(_gl);
            }
            else if (cache.isDirty()) {
                this.update(_gl);
                cache.fresh();
            }

            return cache.get('webgl_texture');
        },

        bind: function () {},
        unbind: function () {},

        /**
         * Mark texture is dirty and update in the next frame
         */
        dirty: function () {
            if (this._cache) {
                this._cache.dirtyAll();
            }
        },

        update: function (_gl) {},

        // Update the common parameters of texture
        updateCommon: function (_gl) {
            _gl.pixelStorei(_gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
            _gl.pixelStorei(_gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
            _gl.pixelStorei(_gl.UNPACK_ALIGNMENT, this.unpackAlignment);

            this._fallBack(_gl);
        },

        _fallBack: function (_gl) {
            // Use of none-power of two texture
            // http://www.khronos.org/webgl/wiki/WebGL_and_OpenGL_Differences

            var isPowerOfTwo = this.isPowerOfTwo();

            if (this.format === glenum.DEPTH_COMPONENT) {
                this.useMipmap = false;
            }

            var sRGBExt = glinfo.getExtension(_gl, 'EXT_sRGB');
            // Fallback
            if (this.format === Texture.SRGB && !sRGBExt) {
                this.format = Texture.RGB;
            }
            if (this.format === Texture.SRGB_ALPHA && !sRGBExt) {
                this.format = Texture.RGBA;
            }

            if (!isPowerOfTwo || !this.useMipmap) {
                // none-power of two flag
                this.NPOT = true;
                // Save the original value for restore
                this._minFilterOriginal = this.minFilter;
                this._magFilterOriginal = this.magFilter;
                this._wrapSOriginal = this.wrapS;
                this._wrapTOriginal = this.wrapT;

                if (this.minFilter == glenum.NEAREST_MIPMAP_NEAREST ||
                    this.minFilter == glenum.NEAREST_MIPMAP_LINEAR) {
                    this.minFilter = glenum.NEAREST;
                } else if (
                    this.minFilter == glenum.LINEAR_MIPMAP_LINEAR ||
                    this.minFilter == glenum.LINEAR_MIPMAP_NEAREST
                ) {
                    this.minFilter = glenum.LINEAR;
                }

                this.wrapS = glenum.CLAMP_TO_EDGE;
                this.wrapT = glenum.CLAMP_TO_EDGE;
            }
            else {
                this.NPOT = false;
                if (this._minFilterOriginal) {
                    this.minFilter = this._minFilterOriginal;
                }
                if (this._magFilterOriginal) {
                    this.magFilter = this._magFilterOriginal;
                }
                if (this._wrapSOriginal) {
                    this.wrapS = this._wrapSOriginal;
                }
                if (this._wrapTOriginal) {
                    this.wrapT = this._wrapTOriginal;
                }
            }

        },

        nextHighestPowerOfTwo: function (x) {
            --x;
            for (var i = 1; i < 32; i <<= 1) {
                x = x | x >> i;
            }
            return x + 1;
        },
        /**
         * @param  {WebGLRenderingContext} _gl
         */
        dispose: function (_gl) {

            var cache = this._cache;

            cache.use(_gl.__GLID__);

            var webglTexture = cache.get('webgl_texture');
            if (webglTexture){
                _gl.deleteTexture(webglTexture);
            }
            cache.deleteContext(_gl.__GLID__);

        },
        /**
         * Test if image of texture is valid and loaded.
         * @return {boolean}
         */
        isRenderable: function () {},

        isPowerOfTwo: function () {}
    });

    Object.defineProperty(Texture.prototype, 'width', {
        get: function () {
            return this._width;
        },
        set: function (value) {
            this._width = value;
        }
    });
    Object.defineProperty(Texture.prototype, 'height', {
        get: function () {
            return this._height;
        },
        set: function (value) {
            this._height = value;
        }
    });

    /* DataType */
    Texture.BYTE = glenum.BYTE;
    Texture.UNSIGNED_BYTE = glenum.UNSIGNED_BYTE;
    Texture.SHORT = glenum.SHORT;
    Texture.UNSIGNED_SHORT = glenum.UNSIGNED_SHORT;
    Texture.INT = glenum.INT;
    Texture.UNSIGNED_INT = glenum.UNSIGNED_INT;
    Texture.FLOAT = glenum.FLOAT;
    Texture.HALF_FLOAT = 0x8D61;

    // ext.UNSIGNED_INT_24_8_WEBGL for WEBGL_depth_texture extension
    Texture.UNSIGNED_INT_24_8_WEBGL = 34042;

    /* PixelFormat */
    Texture.DEPTH_COMPONENT = glenum.DEPTH_COMPONENT;
    Texture.DEPTH_STENCIL = glenum.DEPTH_STENCIL;
    Texture.ALPHA = glenum.ALPHA;
    Texture.RGB = glenum.RGB;
    Texture.RGBA = glenum.RGBA;
    Texture.LUMINANCE = glenum.LUMINANCE;
    Texture.LUMINANCE_ALPHA = glenum.LUMINANCE_ALPHA;

    // https://www.khronos.org/registry/webgl/extensions/EXT_sRGB/
    Texture.SRGB = 0x8C40;
    Texture.SRGB_ALPHA = 0x8C42;

    /* Compressed Texture */
    Texture.COMPRESSED_RGB_S3TC_DXT1_EXT = 0x83F0;
    Texture.COMPRESSED_RGBA_S3TC_DXT1_EXT = 0x83F1;
    Texture.COMPRESSED_RGBA_S3TC_DXT3_EXT = 0x83F2;
    Texture.COMPRESSED_RGBA_S3TC_DXT5_EXT = 0x83F3;

    /* TextureMagFilter */
    Texture.NEAREST = glenum.NEAREST;
    Texture.LINEAR = glenum.LINEAR;

    /* TextureMinFilter */
    /*      NEAREST */
    /*      LINEAR */
    Texture.NEAREST_MIPMAP_NEAREST = glenum.NEAREST_MIPMAP_NEAREST;
    Texture.LINEAR_MIPMAP_NEAREST = glenum.LINEAR_MIPMAP_NEAREST;
    Texture.NEAREST_MIPMAP_LINEAR = glenum.NEAREST_MIPMAP_LINEAR;
    Texture.LINEAR_MIPMAP_LINEAR = glenum.LINEAR_MIPMAP_LINEAR;

    /* TextureParameterName */
    // Texture.TEXTURE_MAG_FILTER = glenum.TEXTURE_MAG_FILTER;
    // Texture.TEXTURE_MIN_FILTER = glenum.TEXTURE_MIN_FILTER;

    /* TextureWrapMode */
    Texture.REPEAT = glenum.REPEAT;
    Texture.CLAMP_TO_EDGE = glenum.CLAMP_TO_EDGE;
    Texture.MIRRORED_REPEAT = glenum.MIRRORED_REPEAT;


    module.exports = Texture;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var guid = 0;

    var ArrayProto = Array.prototype;
    var nativeForEach = ArrayProto.forEach;

    /**
     * Util functions
     * @namespace qtek.core.util
     */
	var util = {

        /**
         * Generate GUID
         * @return {number}
         * @memberOf qtek.core.util
         */
		genGUID: function() {
			return ++guid;
		},
        /**
         * Relative path to absolute path
         * @param  {string} path
         * @param  {string} basePath
         * @return {string}
         * @memberOf qtek.core.util
         */
        relative2absolute: function(path, basePath) {
            if (!basePath || path.match(/^\//)) {
                return path;
            }
            var pathParts = path.split('/');
            var basePathParts = basePath.split('/');

            var item = pathParts[0];
            while(item === '.' || item === '..') {
                if (item === '..') {
                    basePathParts.pop();
                }
                pathParts.shift();
                item = pathParts[0];
            }
            return basePathParts.join('/') + '/' + pathParts.join('/');
        },

        /**
         * Extend target with source
         * @param  {Object} target
         * @param  {Object} source
         * @return {Object}
         * @memberOf qtek.core.util
         */
        extend: function(target, source) {
            if (source) {
                for (var name in source) {
                    if (source.hasOwnProperty(name)) {
                        target[name] = source[name];
                    }
                }
            }
            return target;
        },

        /**
         * Extend properties to target if not exist.
         * @param  {Object} target
         * @param  {Object} source
         * @return {Object}
         * @memberOf qtek.core.util
         */
        defaults: function(target, source) {
            if (source) {
                for (var propName in source) {
                    if (target[propName] === undefined) {
                        target[propName] = source[propName];
                    }
                }
            }
            return target;
        },
        /**
         * Extend properties with a given property list to avoid for..in.. iteration.
         * @param  {Object} target
         * @param  {Object} source
         * @param  {Array.<string>} propList
         * @return {Object}
         * @memberOf qtek.core.util
         */
        extendWithPropList: function(target, source, propList) {
            if (source) {
                for (var i = 0; i < propList.length; i++) {
                    var propName = propList[i];
                    target[propName] = source[propName];
                }
            }
            return target;
        },
        /**
         * Extend properties to target if not exist. With a given property list avoid for..in.. iteration.
         * @param  {Object} target
         * @param  {Object} source
         * @param  {Array.<string>} propList
         * @return {Object}
         * @memberOf qtek.core.util
         */
        defaultsWithPropList: function(target, source, propList) {
            if (source) {
                for (var i = 0; i < propList.length; i++) {
                    var propName = propList[i];
                    if (target[propName] == null) {
                        target[propName] = source[propName];
                    }
                }
            }
            return target;
        },
        /**
         * @param  {Object|Array} obj
         * @param  {Function} iterator
         * @param  {Object} [context]
         * @memberOf qtek.core.util
         */
        each: function(obj, iterator, context) {
            if (!(obj && iterator)) {
                return;
            }
            if (obj.forEach && obj.forEach === nativeForEach) {
                obj.forEach(iterator, context);
            } else if (obj.length === + obj.length) {
                for (var i = 0, len = obj.length; i < len; i++) {
                    iterator.call(context, obj[i], i, obj);
                }
            } else {
                for (var key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        iterator.call(context, obj[key], key, obj);
                    }
                }
            }
        },

        /**
         * Is object ?
         * @param  {}  obj
         * @return {boolean}
         * @memberOf qtek.core.util
         */
        isObject: function(obj) {
            return obj === Object(obj);
        },

        /**
         * Is array ?
         * @param  {}  obj
         * @return {boolean}
         * @memberOf qtek.core.util
         */
        isArray: function(obj) {
            return obj instanceof Array;
        },

        /**
         * Is array like, which have a length property
         * @param  {}  obj
         * @return {boolean}
         * @memberOf qtek.core.util
         */
        isArrayLike: function(obj) {
            if (!obj) {
                return false;
            } else {
                return obj.length === + obj.length;
            }
        },

        /**
         * @param  {} obj
         * @return {}
         * @memberOf qtek.core.util
         */
        clone: function(obj) {
            if (!util.isObject(obj)) {
                return obj;
            } else if (util.isArray(obj)) {
                return obj.slice();
            } else if (util.isArrayLike(obj)) { // is typed array
                var ret = new obj.constructor(obj.length);
                for (var i = 0; i < obj.length; i++) {
                    ret[i] = obj[i];
                }
                return ret;
            } else {
                return util.extend({}, obj);
            }
        }
	};

    module.exports = util;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Renderable = __webpack_require__(47);
    var glenum = __webpack_require__(2);

    /**
     * @constructor qtek.Mesh
     * @extends qtek.Renderable
     */
    var Mesh = Renderable.extend(
    /** @lends qtek.Mesh# */
    {
        /**
         * Used when it is a skinned mesh
         * @type {qtek.Skeleton}
         */
        skeleton: null,
        /**
         * Joints indices Meshes can share the one skeleton instance and each mesh can use one part of joints. Joints indices indicate the index of joint in the skeleton instance
         * @type {number[]}
         */
        joints: null

    }, function () {
        if (!this.joints) {
            this.joints = [];
        }
    }, {
        render: function(_gl, shader) {
            shader = shader || this.material.shader;
            // Set pose matrices of skinned mesh
            if (this.skeleton) {
                var skinMatricesArray = this.skeleton.getSubSkinMatrices(this.__GUID__, this.joints);
                shader.setUniformOfSemantic(_gl, 'SKIN_MATRIX', skinMatricesArray);
            }

            return Renderable.prototype.render.call(this, _gl, shader);
        }
    });

    // Enums
    Mesh.POINTS = glenum.POINTS;
    Mesh.LINES = glenum.LINES;
    Mesh.LINE_LOOP = glenum.LINE_LOOP;
    Mesh.LINE_STRIP = glenum.LINE_STRIP;
    Mesh.TRIANGLES = glenum.TRIANGLES;
    Mesh.TRIANGLE_STRIP = glenum.TRIANGLE_STRIP;
    Mesh.TRIANGLE_FAN = glenum.TRIANGLE_FAN;

    Mesh.BACK = glenum.BACK;
    Mesh.FRONT = glenum.FRONT;
    Mesh.FRONT_AND_BACK = glenum.FRONT_AND_BACK;
    Mesh.CW = glenum.CW;
    Mesh.CCW = glenum.CCW;

    module.exports = Mesh;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var glMatrix = __webpack_require__(0);
    var Vector3 = __webpack_require__(3);
    var mat4 = glMatrix.mat4;
    var vec3 = glMatrix.vec3;
    var mat3 = glMatrix.mat3;
    var quat = glMatrix.quat;

    /**
     * @constructor
     * @alias qtek.math.Matrix4
     */
    var Matrix4 = function() {

        this._axisX = new Vector3();
        this._axisY = new Vector3();
        this._axisZ = new Vector3();

        /**
         * Storage of Matrix4
         * @name _array
         * @type {Float32Array}
         */
        this._array = mat4.create();

        /**
         * @name _dirty
         * @type {boolean}
         */
        this._dirty = true;
    };

    Matrix4.prototype = {

        constructor: Matrix4,

        /**
         * Set components from array
         * @param  {Float32Array|number[]} arr
         */
        setArray: function (arr) {
            for (var i = 0; i < this._array.length; i++) {
                this._array[i] = arr[i];
            }
            this._dirty = true;
            return this;
        },
        /**
         * Calculate the adjugate of self, in-place
         * @return {qtek.math.Matrix4}
         */
        adjoint: function() {
            mat4.adjoint(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Clone a new Matrix4
         * @return {qtek.math.Matrix4}
         */
        clone: function() {
            return (new Matrix4()).copy(this);
        },

        /**
         * Copy from b
         * @param  {qtek.math.Matrix4} b
         * @return {qtek.math.Matrix4}
         */
        copy: function(a) {
            mat4.copy(this._array, a._array);
            this._dirty = true;
            return this;
        },

        /**
         * Calculate matrix determinant
         * @return {number}
         */
        determinant: function() {
            return mat4.determinant(this._array);
        },

        /**
         * Set upper 3x3 part from quaternion
         * @param  {qtek.math.Quaternion} q
         * @return {qtek.math.Matrix4}
         */
        fromQuat: function(q) {
            mat4.fromQuat(this._array, q._array);
            this._dirty = true;
            return this;
        },

        /**
         * Set from a quaternion rotation and a vector translation
         * @param  {qtek.math.Quaternion} q
         * @param  {qtek.math.Vector3} v
         * @return {qtek.math.Matrix4}
         */
        fromRotationTranslation: function(q, v) {
            mat4.fromRotationTranslation(this._array, q._array, v._array);
            this._dirty = true;
            return this;
        },

        /**
         * Set from Matrix2d, it is used when converting a 2d shape to 3d space.
         * In 3d space it is equivalent to ranslate on xy plane and rotate about z axis
         * @param  {qtek.math.Matrix2d} m2d
         * @return {qtek.math.Matrix4}
         */
        fromMat2d: function(m2d) {
            Matrix4.fromMat2d(this, m2d);
            return this;
        },

        /**
         * Set from frustum bounds
         * @param  {number} left
         * @param  {number} right
         * @param  {number} bottom
         * @param  {number} top
         * @param  {number} near
         * @param  {number} far
         * @return {qtek.math.Matrix4}
         */
        frustum: function (left, right, bottom, top, near, far) {
            mat4.frustum(this._array, left, right, bottom, top, near, far);
            this._dirty = true;
            return this;
        },

        /**
         * Set to a identity matrix
         * @return {qtek.math.Matrix4}
         */
        identity: function() {
            mat4.identity(this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Invert self
         * @return {qtek.math.Matrix4}
         */
        invert: function() {
            mat4.invert(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Set as a matrix with the given eye position, focal point, and up axis
         * @param  {qtek.math.Vector3} eye
         * @param  {qtek.math.Vector3} center
         * @param  {qtek.math.Vector3} up
         * @return {qtek.math.Matrix4}
         */
        lookAt: function(eye, center, up) {
            mat4.lookAt(this._array, eye._array, center._array, up._array);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for mutiply
         * @param  {qtek.math.Matrix4} b
         * @return {qtek.math.Matrix4}
         */
        mul: function(b) {
            mat4.mul(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for multiplyLeft
         * @param  {qtek.math.Matrix4} a
         * @return {qtek.math.Matrix4}
         */
        mulLeft: function(a) {
            mat4.mul(this._array, a._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Multiply self and b
         * @param  {qtek.math.Matrix4} b
         * @return {qtek.math.Matrix4}
         */
        multiply: function(b) {
            mat4.multiply(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Multiply a and self, a is on the left
         * @param  {qtek.math.Matrix3} a
         * @return {qtek.math.Matrix3}
         */
        multiplyLeft: function(a) {
            mat4.multiply(this._array, a._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Set as a orthographic projection matrix
         * @param  {number} left
         * @param  {number} right
         * @param  {number} bottom
         * @param  {number} top
         * @param  {number} near
         * @param  {number} far
         * @return {qtek.math.Matrix4}
         */
        ortho: function(left, right, bottom, top, near, far) {
            mat4.ortho(this._array, left, right, bottom, top, near, far);
            this._dirty = true;
            return this;
        },
        /**
         * Set as a perspective projection matrix
         * @param  {number} fovy
         * @param  {number} aspect
         * @param  {number} near
         * @param  {number} far
         * @return {qtek.math.Matrix4}
         */
        perspective: function(fovy, aspect, near, far) {
            mat4.perspective(this._array, fovy, aspect, near, far);
            this._dirty = true;
            return this;
        },

        /**
         * Rotate self by rad about axis.
         * Equal to right-multiply a rotaion matrix
         * @param  {number}   rad
         * @param  {qtek.math.Vector3} axis
         * @return {qtek.math.Matrix4}
         */
        rotate: function(rad, axis) {
            mat4.rotate(this._array, this._array, rad, axis._array);
            this._dirty = true;
            return this;
        },

        /**
         * Rotate self by a given radian about X axis.
         * Equal to right-multiply a rotaion matrix
         * @param {number} rad
         * @return {qtek.math.Matrix4}
         */
        rotateX: function(rad) {
            mat4.rotateX(this._array, this._array, rad);
            this._dirty = true;
            return this;
        },

        /**
         * Rotate self by a given radian about Y axis.
         * Equal to right-multiply a rotaion matrix
         * @param {number} rad
         * @return {qtek.math.Matrix4}
         */
        rotateY: function(rad) {
            mat4.rotateY(this._array, this._array, rad);
            this._dirty = true;
            return this;
        },

        /**
         * Rotate self by a given radian about Z axis.
         * Equal to right-multiply a rotaion matrix
         * @param {number} rad
         * @return {qtek.math.Matrix4}
         */
        rotateZ: function(rad) {
            mat4.rotateZ(this._array, this._array, rad);
            this._dirty = true;
            return this;
        },

        /**
         * Scale self by s
         * Equal to right-multiply a scale matrix
         * @param  {qtek.math.Vector3}  s
         * @return {qtek.math.Matrix4}
         */
        scale: function(v) {
            mat4.scale(this._array, this._array, v._array);
            this._dirty = true;
            return this;
        },

        /**
         * Translate self by v.
         * Equal to right-multiply a translate matrix
         * @param  {qtek.math.Vector3}  v
         * @return {qtek.math.Matrix4}
         */
        translate: function(v) {
            mat4.translate(this._array, this._array, v._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transpose self, in-place.
         * @return {qtek.math.Matrix2}
         */
        transpose: function() {
            mat4.transpose(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Decompose a matrix to SRT
         * @param {qtek.math.Vector3} [scale]
         * @param {qtek.math.Quaternion} rotation
         * @param {qtek.math.Vector} position
         * @see http://msdn.microsoft.com/en-us/library/microsoft.xna.framework.matrix.decompose.aspx
         */
        decomposeMatrix: (function() {

            var x = vec3.create();
            var y = vec3.create();
            var z = vec3.create();

            var m3 = mat3.create();

            return function(scale, rotation, position) {

                var el = this._array;
                vec3.set(x, el[0], el[1], el[2]);
                vec3.set(y, el[4], el[5], el[6]);
                vec3.set(z, el[8], el[9], el[10]);

                var sx = vec3.length(x);
                var sy = vec3.length(y);
                var sz = vec3.length(z);

                // if determine is negative, we need to invert one scale
                var det = this.determinant();
                if (det < 0) {
                    sx = -sx;
                }

                if (scale) {
                    scale.set(sx, sy, sz);
                }

                position.set(el[12], el[13], el[14]);

                mat3.fromMat4(m3, el);
                // Not like mat4, mat3 in glmatrix seems to be row-based
                // Seems fixed in gl-matrix 2.2.2
                // https://github.com/toji/gl-matrix/issues/114
                // mat3.transpose(m3, m3);

                m3[0] /= sx;
                m3[1] /= sx;
                m3[2] /= sx;

                m3[3] /= sy;
                m3[4] /= sy;
                m3[5] /= sy;

                m3[6] /= sz;
                m3[7] /= sz;
                m3[8] /= sz;

                quat.fromMat3(rotation._array, m3);
                quat.normalize(rotation._array, rotation._array);

                rotation._dirty = true;
                position._dirty = true;
            };
        })(),

        toString: function() {
            return '[' + Array.prototype.join.call(this._array, ',') + ']';
        },

        toArray: function () {
            return Array.prototype.slice.call(this._array);
        }
    };

    var defineProperty = Object.defineProperty;

    if (defineProperty) {
        var proto = Matrix4.prototype;
        /**
         * Z Axis of local transform
         * @name z
         * @type {qtek.math.Vector3}
         * @memberOf qtek.math.Matrix4
         * @instance
         */
        defineProperty(proto, 'z', {
            get: function () {
                var el = this._array;
                this._axisZ.set(el[8], el[9], el[10]);
                return this._axisZ;
            },
            set: function (v) {
                // TODO Here has a problem
                // If only set an item of vector will not work
                var el = this._array;
                v = v._array;
                el[8] = v[0];
                el[9] = v[1];
                el[10] = v[2];

                this._dirty = true;
            }
        });

        /**
         * Y Axis of local transform
         * @name y
         * @type {qtek.math.Vector3}
         * @memberOf qtek.math.Matrix4
         * @instance
         */
        defineProperty(proto, 'y', {
            get: function () {
                var el = this._array;
                this._axisY.set(el[4], el[5], el[6]);
                return this._axisY;
            },
            set: function (v) {
                var el = this._array;
                v = v._array;
                el[4] = v[0];
                el[5] = v[1];
                el[6] = v[2];

                this._dirty = true;
            }
        });

        /**
         * X Axis of local transform
         * @name x
         * @type {qtek.math.Vector3}
         * @memberOf qtek.math.Matrix4
         * @instance
         */
        defineProperty(proto, 'x', {
            get: function () {
                var el = this._array;
                this._axisX.set(el[0], el[1], el[2]);
                return this._axisX;
            },
            set: function (v) {
                var el = this._array;
                v = v._array;
                el[0] = v[0];
                el[1] = v[1];
                el[2] = v[2];

                this._dirty = true;
            }
        })
    }

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @return {qtek.math.Matrix4}
     */
    Matrix4.adjoint = function(out, a) {
        mat4.adjoint(out._array, a._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @return {qtek.math.Matrix4}
     */
    Matrix4.copy = function(out, a) {
        mat4.copy(out._array, a._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} a
     * @return {number}
     */
    Matrix4.determinant = function(a) {
        return mat4.determinant(a._array);
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @return {qtek.math.Matrix4}
     */
    Matrix4.identity = function(out) {
        mat4.identity(out._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {number}  left
     * @param  {number}  right
     * @param  {number}  bottom
     * @param  {number}  top
     * @param  {number}  near
     * @param  {number}  far
     * @return {qtek.math.Matrix4}
     */
    Matrix4.ortho = function(out, left, right, bottom, top, near, far) {
        mat4.ortho(out._array, left, right, bottom, top, near, far);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {number}  fovy
     * @param  {number}  aspect
     * @param  {number}  near
     * @param  {number}  far
     * @return {qtek.math.Matrix4}
     */
    Matrix4.perspective = function(out, fovy, aspect, near, far) {
        mat4.perspective(out._array, fovy, aspect, near, far);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Vector3} eye
     * @param  {qtek.math.Vector3} center
     * @param  {qtek.math.Vector3} up
     * @return {qtek.math.Matrix4}
     */
    Matrix4.lookAt = function(out, eye, center, up) {
        mat4.lookAt(out._array, eye._array, center._array, up._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @return {qtek.math.Matrix4}
     */
    Matrix4.invert = function(out, a) {
        mat4.invert(out._array, a._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {qtek.math.Matrix4} b
     * @return {qtek.math.Matrix4}
     */
    Matrix4.mul = function(out, a, b) {
        mat4.mul(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @method
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {qtek.math.Matrix4} b
     * @return {qtek.math.Matrix4}
     */
    Matrix4.multiply = Matrix4.mul;

    /**
     * @param  {qtek.math.Matrix4}    out
     * @param  {qtek.math.Quaternion} q
     * @return {qtek.math.Matrix4}
     */
    Matrix4.fromQuat = function(out, q) {
        mat4.fromQuat(out._array, q._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4}    out
     * @param  {qtek.math.Quaternion} q
     * @param  {qtek.math.Vector3}    v
     * @return {qtek.math.Matrix4}
     */
    Matrix4.fromRotationTranslation = function(out, q, v) {
        mat4.fromRotationTranslation(out._array, q._array, v._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} m4
     * @param  {qtek.math.Matrix2d} m2d
     * @return {qtek.math.Matrix4}
     */
    Matrix4.fromMat2d = function(m4, m2d) {
        m4._dirty = true;
        var m2d = m2d._array;
        var m4 = m4._array;

        m4[0] = m2d[0];
        m4[4] = m2d[2];
        m4[12] = m2d[4];

        m4[1] = m2d[1];
        m4[5] = m2d[3];
        m4[13] = m2d[5];

        return m4;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {number}  rad
     * @param  {qtek.math.Vector3} axis
     * @return {qtek.math.Matrix4}
     */
    Matrix4.rotate = function(out, a, rad, axis) {
        mat4.rotate(out._array, a._array, rad, axis._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {number}  rad
     * @return {qtek.math.Matrix4}
     */
    Matrix4.rotateX = function(out, a, rad) {
        mat4.rotateX(out._array, a._array, rad);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {number}  rad
     * @return {qtek.math.Matrix4}
     */
    Matrix4.rotateY = function(out, a, rad) {
        mat4.rotateY(out._array, a._array, rad);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {number}  rad
     * @return {qtek.math.Matrix4}
     */
    Matrix4.rotateZ = function(out, a, rad) {
        mat4.rotateZ(out._array, a._array, rad);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {qtek.math.Vector3} v
     * @return {qtek.math.Matrix4}
     */
    Matrix4.scale = function(out, a, v) {
        mat4.scale(out._array, a._array, v._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @return {qtek.math.Matrix4}
     */
    Matrix4.transpose = function(out, a) {
        mat4.transpose(out._array, a._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Matrix4} out
     * @param  {qtek.math.Matrix4} a
     * @param  {qtek.math.Vector3} v
     * @return {qtek.math.Matrix4}
     */
    Matrix4.translate = function(out, a, v) {
        mat4.translate(out._array, a._array, v._array);
        out._dirty = true;
        return out;
    };

    module.exports = Matrix4;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Easing = __webpack_require__(53);

    function noop () {}
    /**
     * @constructor
     * @alias qtek.animation.Clip
     * @param {Object} [opts]
     * @param {Object} [opts.target]
     * @param {number} [opts.life]
     * @param {number} [opts.delay]
     * @param {number} [opts.gap]
     * @param {number} [opts.playbackRate]
     * @param {boolean|number} [opts.loop] If loop is a number, it indicate the loop count of animation
     * @param {string|Function} [opts.easing]
     * @param {Function} [opts.onframe]
     * @param {Function} [opts.onfinish]
     * @param {Function} [opts.onrestart]
     */
    var Clip = function (opts) {

        opts = opts || {};

        /**
         * @type {string}
         */
        this.name = opts.name || '';

        /**
         * @type {Object}
         */
        this.target = opts.target;

        /**
         * @type {number}
         */
        this.life = opts.life || 1000;

        /**
         * @type {number}
         */
        this.delay = opts.delay || 0;

        /**
         * @type {number}
         */
        this.gap = opts.gap || 0;

        /**
         * @type {number}
         */
        this.playbackRate = opts.playbackRate || 1;


        this._initialized = false;

        this._elapsedTime = 0;

        this._loop = opts.loop == null ? false : opts.loop;
        this.setLoop(this._loop);

        if (opts.easing != null) {
            this.setEasing(opts.easing);
        }

        /**
         * @type {Function}
         */
        this.onframe = opts.onframe || noop;

        /**
         * @type {Function}
         */
        this.onfinish = opts.onfinish || noop;

        /**
         * @type {Function}
         */
        this.onrestart = opts.onrestart || noop;

    };

    Clip.prototype = {

        gap: 0,

        life: 0,

        delay: 0,

        /**
         * @param {number|boolean} loop
         */
        setLoop: function (loop) {
            this._loop = loop;
            if (loop) {
                if (typeof(loop) == 'number') {
                    this._loopRemained = loop;
                }
                else {
                    this._loopRemained = 1e8;
                }
            }
        },

        /**
         * @param {string|function} easing
         */
        setEasing: function (easing) {
            if (typeof(easing) === 'string') {
                easing = Easing[easing];
            }
            this.easing = easing;
        },

        /**
         * @param  {number} time
         * @return {string}
         */
        step: function (time) {
            if (!this._initialized) {
                this._currentTime = time;
                this._startTime = this._currentTime + this.delay;
                this._initialized = true;
            }

            if (time < this._startTime) {
                this._currentTime = time;
                return;
            }

            this._elapse(time);

            var percent = this._elapsedTime / this.life;

            if (percent < 0) {
                return;
            }
            if (percent > 1) {
                percent = 1;
            }

            var schedule;
            if (this.easing) {
                schedule = this.easing(percent);
            }
            else {
                schedule = percent;
            }
            this.fire('frame', schedule);

            if (percent === 1) {
                if (this._loop && this._loopRemained > 0) {
                    this._restartInLoop(time);
                    this._loopRemained--;
                    return 'restart';
                }
                else {
                    // Mark this clip to be deleted
                    // In the animation.update
                    this._needsRemove = true;

                    return 'finish';
                }
            }
            else {
                return null;
            }
        },

        /**
         * @param  {number} time
         * @return {string}
         */
        setTime: function (time) {
            return this.step(time + this._startTime);
        },

        restart: function (time) {
            // If user leave the page for a while, when he gets back
            // All clips may be expired and all start from the beginning value(position)
            // It is clearly wrong, so we use remainder to add a offset

            var remainder = 0;

            time = time;
            // Remainder ignored if restart is invoked manually
            if (time) {
                this._elapse(time);
                remainder = this._elapsedTime % this.life;
            }
            time = time || new Date().getTime();

            this._startTime = time - remainder + this.delay;
            this._elapsedTime = 0;
            this._currentTime = time - remainder;

            this._needsRemove = false;
        },

        _restartInLoop: function (time) {
            this._startTime = time + this.gap;
            this._currentTime = time;
            this._elapsedTime = 0;
        },

        _elapse: function (time) {
            this._elapsedTime += (time - this._currentTime) * this.playbackRate;
            this._currentTime = time;
        },

        fire: function (eventType, arg) {
            var eventName = 'on' + eventType;
            if (this[eventName]) {
                this[eventName](this.target, arg);
            }
        },

        clone: function () {
            var clip = new this.constructor();
            clip.name = this.name;
            clip._loop = this._loop;
            clip._loopRemained = this._loopRemained;

            clip.life = this.life;
            clip.gap = this.gap;
            clip.delay = this.delay;

            return clip;
        }
    };
    Clip.prototype.constructor = Clip;

    module.exports = Clip;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var DIRTY_PREFIX = '__dt__';

    var Cache = function () {

        this._contextId = 0;

        this._caches = [];

        this._context = {};
    };

    Cache.prototype = {

        use: function (contextId, documentSchema) {
            var caches = this._caches;
            if (!caches[contextId]) {
                caches[contextId] = {};

                if (documentSchema) {
                    caches[contextId] = documentSchema();
                }
            }
            this._contextId = contextId;

            this._context = caches[contextId];
        },

        put: function (key, value) {
            this._context[key] = value;
        },

        get: function (key) {
            return this._context[key];
        },

        dirty: function (field) {
            field = field || '';
            var key = DIRTY_PREFIX + field;
            this.put(key, true);
        },

        dirtyAll: function (field) {
            field = field || '';
            var key = DIRTY_PREFIX + field;
            var caches = this._caches;
            for (var i = 0; i < caches.length; i++) {
                if (caches[i]) {
                    caches[i][key] = true;
                }
            }
        },

        fresh: function (field) {
            field = field || '';
            var key = DIRTY_PREFIX + field;
            this.put(key, false);
        },

        freshAll: function (field) {
            field = field || '';
            var key = DIRTY_PREFIX + field;
            var caches = this._caches;
            for (var i = 0; i < caches.length; i++) {
                if (caches[i]) {
                    caches[i][key] = false;
                }
            }
        },

        isDirty: function (field) {
            field = field || '';
            var key = DIRTY_PREFIX + field;
            var context = this._context;
            return  !context.hasOwnProperty(key)
                || context[key] === true;
        },

        deleteContext: function (contextId) {
            delete this._caches[contextId];
            this._context = {};
        },

        delete: function (key) {
            delete this._context[key];
        },

        clearAll: function () {
            this._caches = {};
        },

        getContext: function () {
            return this._context;
        },

        eachContext : function (cb, context) {
            var keys = Object.keys(this._caches);
            keys.forEach(function (key) {
                cb && cb.call(context, key);
            });
        },

        miss: function (key) {
            return ! this._context.hasOwnProperty(key);
        }
    };

    Cache.prototype.constructor = Cache;

    module.exports = Cache;



/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @export{Object} library
 */


    var Shader = __webpack_require__(5);
    var util = __webpack_require__(13);

    var _library = {};

    /**
     * @export qtek.shader.library~Libaray
     */
    function ShaderLibrary () {
        this._pool = {};
    }

    /**
     * ### Builin shaders
     * + qtek.standard
     * + qtek.basic
     * + qtek.lambert
     * + qtek.phong
     * + qtek.wireframe
     *
     * @namespace qtek.shader.library
     */
    /**
     *
     * Get shader from library. use shader name and option as hash key.
     *
     * @param {string} name
     * @param {Object|string|Array.<string>} [option]
     * @return {qtek.Shader}
     *
     * @example
     *     qtek.shader.library.get('qtek.phong', 'diffuseMap', 'normalMap');
     *     qtek.shader.library.get('qtek.phong', ['diffuseMap', 'normalMap']);
     *     qtek.shader.library.get('qtek.phong', {
     *         textures: ['diffuseMap'],
     *         vertexDefines: {},
     *         fragmentDefines: {}
     *     })
     */
    ShaderLibrary.prototype.get = function(name, option) {
        var enabledTextures = [];
        var vertexDefines = {};
        var fragmentDefines = {};
        if (typeof(option) === 'string') {
            enabledTextures = Array.prototype.slice.call(arguments, 1);
        }
        else if (Object.prototype.toString.call(option) == '[object Object]') {
            enabledTextures = option.textures || [];
            vertexDefines = option.vertexDefines || {};
            fragmentDefines = option.fragmentDefines || {};
        }
        else if (option instanceof Array) {
            enabledTextures = option;
        }
        var vertexDefineKeys = Object.keys(vertexDefines);
        var fragmentDefineKeys = Object.keys(fragmentDefines);
        enabledTextures.sort();
        vertexDefineKeys.sort();
        fragmentDefineKeys.sort();

        var keyArr = [name];
        keyArr = keyArr.concat(enabledTextures);
        for (var i = 0; i < vertexDefineKeys.length; i++) {
            keyArr.push(
                vertexDefineKeys[i],
                vertexDefines[vertexDefineKeys[i]]
            );
        }
        for (var i = 0; i < fragmentDefineKeys.length; i++) {
            keyArr.push(
                fragmentDefineKeys[i],
                fragmentDefines[fragmentDefineKeys[i]]
            );
        }
        var key = keyArr.join('_');

        if (this._pool[key]) {
            return this._pool[key];
        }
        else {
            var source = _library[name];
            if (!source) {
                console.error('Shader "' + name + '"' + ' is not in the library');
                return;
            }
            var shader = new Shader({
                'vertex': source.vertex,
                'fragment': source.fragment
            });
            for (var i = 0; i < enabledTextures.length; i++) {
                shader.enableTexture(enabledTextures[i]);
            }
            for (var name in vertexDefines) {
                shader.define('vertex', name, vertexDefines[name]);
            }
            for (var name in fragmentDefines) {
                shader.define('fragment', name, fragmentDefines[name]);
            }
            this._pool[key] = shader;
            return shader;
        }
    };

    /**
     * Clear shaders
     */
    ShaderLibrary.prototype.clear = function() {
        this._pool = {};
    };

    /**
     * @memberOf qtek.shader.library
     * @param  {string} name
     * @param  {string} vertex - Vertex shader code
     * @param  {string} fragment - Fragment shader code
     */
    function template(name, vertex, fragment) {
        _library[name] = {
            vertex: vertex,
            fragment: fragment
        };
    }

    var defaultLibrary = new ShaderLibrary();

    module.exports = {
        createLibrary: function () {
            return new ShaderLibrary();
        },
        get: function () {
            return defaultLibrary.get.apply(defaultLibrary, arguments);
        },
        template: template,
        clear: function () {
            return defaultLibrary.clear();
        }
    };


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {



    var Texture = __webpack_require__(12);
    var glinfo = __webpack_require__(6);
    var glenum = __webpack_require__(2);
    var mathUtil = __webpack_require__(36);
    var isPowerOfTwo = mathUtil.isPowerOfTwo;

    /**
     * @constructor qtek.Texture2D
     * @extends qtek.Texture
     *
     * @example
     *     ...
     *     var mat = new qtek.Material({
     *         shader: qtek.shader.library.get('qtek.phong', 'diffuseMap')
     *     });
     *     var diffuseMap = new qtek.Texture2D();
     *     diffuseMap.load('assets/textures/diffuse.jpg');
     *     mat.set('diffuseMap', diffuseMap);
     *     ...
     *     diffuseMap.success(function() {
     *         // Wait for the diffuse texture loaded
     *         animation.on('frame', function(frameTime) {
     *             renderer.render(scene, camera);
     *         });
     *     });
     */
    var Texture2D = Texture.extend(function() {
        return /** @lends qtek.Texture2D# */ {
            /**
             * @type {HTMLImageElement|HTMLCanvasElemnet}
             */
            image: null,
            /**
             * @type {Uint8Array|Float32Array}
             */
            pixels: null,
            /**
             * @type {Array.<Object>}
             * @example
             *     [{
             *         image: mipmap0,
             *         pixels: null
             *     }, {
             *         image: mipmap1,
             *         pixels: null
             *     }, ....]
             */
            mipmaps: []
        };
    }, {
        update: function(_gl) {

            _gl.bindTexture(_gl.TEXTURE_2D, this._cache.get('webgl_texture'));

            this.updateCommon( _gl);

            var glFormat = this.format;
            var glType = this.type;

            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_S, this.wrapS);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_WRAP_T, this.wrapT);

            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MAG_FILTER, this.magFilter);
            _gl.texParameteri(_gl.TEXTURE_2D, _gl.TEXTURE_MIN_FILTER, this.minFilter);

            var anisotropicExt = glinfo.getExtension(_gl, 'EXT_texture_filter_anisotropic');
            if (anisotropicExt && this.anisotropic > 1) {
                _gl.texParameterf(_gl.TEXTURE_2D, anisotropicExt.TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropic);
            }

            // Fallback to float type if browser don't have half float extension
            if (glType === 36193) {
                var halfFloatExt = glinfo.getExtension(_gl, 'OES_texture_half_float');
                if (!halfFloatExt) {
                    glType = glenum.FLOAT;
                }
            }

            if (this.mipmaps.length) {
                var width = this.width;
                var height = this.height;
                for (var i = 0; i < this.mipmaps.length; i++) {
                    var mipmap = this.mipmaps[i];
                    this._updateTextureData(_gl, mipmap, i, width, height, glFormat, glType);
                    width /= 2;
                    height /= 2;
                }
            }
            else {
                this._updateTextureData(_gl, this, 0, this.width, this.height, glFormat, glType);

                if (this.useMipmap && !this.NPOT) {
                    _gl.generateMipmap(_gl.TEXTURE_2D);
                }
            }

            _gl.bindTexture(_gl.TEXTURE_2D, null);
        },

        _updateTextureData: function (_gl, data, level, width, height, glFormat, glType) {
            if (data.image) {
                _gl.texImage2D(_gl.TEXTURE_2D, level, glFormat, glFormat, glType, data.image);
            }
            else {
                // Can be used as a blank texture when writing render to texture(RTT)
                if (
                    glFormat <= Texture.COMPRESSED_RGBA_S3TC_DXT5_EXT
                    && glFormat >= Texture.COMPRESSED_RGB_S3TC_DXT1_EXT
                ) {
                    _gl.compressedTexImage2D(_gl.TEXTURE_2D, level, glFormat, width, height, 0, data.pixels);
                }
                else {
                    // Is a render target if pixels is null
                    _gl.texImage2D(_gl.TEXTURE_2D, level, glFormat, width, height, 0, glFormat, glType, data.pixels);
                }
            }
        },

        /**
         * @param  {WebGLRenderingContext} _gl
         * @memberOf qtek.Texture2D.prototype
         */
        generateMipmap: function(_gl) {
            if (this.useMipmap && !this.NPOT) {
                _gl.bindTexture(_gl.TEXTURE_2D, this._cache.get('webgl_texture'));
                _gl.generateMipmap(_gl.TEXTURE_2D);
            }
        },

        isPowerOfTwo: function() {
            var width;
            var height;
            if (this.image) {
                width = this.image.width;
                height = this.image.height;
            }
            else {
                width = this.width;
                height = this.height;
            }
            return isPowerOfTwo(width) && isPowerOfTwo(height);
        },

        isRenderable: function() {
            if (this.image) {
                return this.image.nodeName === 'CANVAS'
                    || this.image.nodeName === 'VIDEO'
                    || this.image.complete;
            }
            else {
                return !!(this.width && this.height);
            }
        },

        bind: function(_gl) {
            _gl.bindTexture(_gl.TEXTURE_2D, this.getWebGLTexture(_gl));
        },

        unbind: function(_gl) {
            _gl.bindTexture(_gl.TEXTURE_2D, null);
        },

        load: function (src) {
            var image = new Image();
            var self = this;
            image.onload = function() {
                self.dirty();
                self.trigger('success', self);
                image.onload = null;
            };
            image.onerror = function() {
                self.trigger('error', self);
                image.onerror = null;
            };

            image.src = src;
            this.image = image;

            return this;
        }
    });

    Object.defineProperty(Texture2D.prototype, 'width', {
        get: function () {
            if (this.image) {
                return this.image.width;
            }
            return this._width;
        },
        set: function (value) {
            if (this.image) {
                console.warn('Texture from image can\'t set width');
            }
            else {
                if (this._width !== value) {
                    this.dirty();
                }
                this._width = value;
            }
        }
    });
    Object.defineProperty(Texture2D.prototype, 'height', {
        get: function () {
            if (this.image) {
                return this.image.height;
            }
            return this._height;
        },
        set: function (value) {
            if (this.image) {
                console.warn('Texture from image can\'t set height');
            }
            else {
                if (this._height !== value) {
                    this.dirty();
                }
                this._height = value;
            }
        }
    });

    module.exports = Texture2D;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {



    var Texture = __webpack_require__(12);
    var glinfo = __webpack_require__(6);
    var glenum = __webpack_require__(2);
    var util = __webpack_require__(13);
    var mathUtil = __webpack_require__(36);
    var isPowerOfTwo = mathUtil.isPowerOfTwo;

    var targetList = ['px', 'nx', 'py', 'ny', 'pz', 'nz'];

    /**
     * @constructor qtek.TextureCube
     * @extends qtek.Texture
     *
     * @example
     *     ...
     *     var mat = new qtek.Material({
     *         shader: qtek.shader.library.get('qtek.phong', 'environmentMap')
     *     });
     *     var envMap = new qtek.TextureCube();
     *     envMap.load({
     *         'px': 'assets/textures/sky/px.jpg',
     *         'nx': 'assets/textures/sky/nx.jpg'
     *         'py': 'assets/textures/sky/py.jpg'
     *         'ny': 'assets/textures/sky/ny.jpg'
     *         'pz': 'assets/textures/sky/pz.jpg'
     *         'nz': 'assets/textures/sky/nz.jpg'
     *     });
     *     mat.set('environmentMap', envMap);
     *     ...
     *     envMap.success(function () {
     *         // Wait for the sky texture loaded
     *         animation.on('frame', function (frameTime) {
     *             renderer.render(scene, camera);
     *         });
     *     });
     */
    var TextureCube = Texture.extend(function () {
        return /** @lends qtek.TextureCube# */{
            /**
             * @type {Object}
             * @property {HTMLImageElement|HTMLCanvasElemnet} px
             * @property {HTMLImageElement|HTMLCanvasElemnet} nx
             * @property {HTMLImageElement|HTMLCanvasElemnet} py
             * @property {HTMLImageElement|HTMLCanvasElemnet} ny
             * @property {HTMLImageElement|HTMLCanvasElemnet} pz
             * @property {HTMLImageElement|HTMLCanvasElemnet} nz
             */
            image: {
                px: null,
                nx: null,
                py: null,
                ny: null,
                pz: null,
                nz: null
            },
            /**
             * @type {Object}
             * @property {Uint8Array} px
             * @property {Uint8Array} nx
             * @property {Uint8Array} py
             * @property {Uint8Array} ny
             * @property {Uint8Array} pz
             * @property {Uint8Array} nz
             */
            pixels: {
                px: null,
                nx: null,
                py: null,
                ny: null,
                pz: null,
                nz: null
            },

            /**
             * @type {Array.<Object>}
             */
            mipmaps: []
       };
    }, {
        update: function (_gl) {

            _gl.bindTexture(_gl.TEXTURE_CUBE_MAP, this._cache.get('webgl_texture'));

            this.updateCommon(_gl);

            var glFormat = this.format;
            var glType = this.type;

            _gl.texParameteri(_gl.TEXTURE_CUBE_MAP, _gl.TEXTURE_WRAP_S, this.wrapS);
            _gl.texParameteri(_gl.TEXTURE_CUBE_MAP, _gl.TEXTURE_WRAP_T, this.wrapT);

            _gl.texParameteri(_gl.TEXTURE_CUBE_MAP, _gl.TEXTURE_MAG_FILTER, this.magFilter);
            _gl.texParameteri(_gl.TEXTURE_CUBE_MAP, _gl.TEXTURE_MIN_FILTER, this.minFilter);

            var anisotropicExt = glinfo.getExtension(_gl, 'EXT_texture_filter_anisotropic');
            if (anisotropicExt && this.anisotropic > 1) {
                _gl.texParameterf(_gl.TEXTURE_CUBE_MAP, anisotropicExt.TEXTURE_MAX_ANISOTROPY_EXT, this.anisotropic);
            }

            // Fallback to float type if browser don't have half float extension
            if (glType === 36193) {
                var halfFloatExt = glinfo.getExtension(_gl, 'OES_texture_half_float');
                if (!halfFloatExt) {
                    glType = glenum.FLOAT;
                }
            }

            if (this.mipmaps.length) {
                var width = this.width;
                var height = this.height;
                for (var i = 0; i < this.mipmaps.length; i++) {
                    var mipmap = this.mipmaps[i];
                    this._updateTextureData(_gl, mipmap, i, width, height, glFormat, glType);
                    width /= 2;
                    height /= 2;
                }
            }
            else {
                this._updateTextureData(_gl, this, 0, this.width, this.height, glFormat, glType);

                if (!this.NPOT && this.useMipmap) {
                    _gl.generateMipmap(_gl.TEXTURE_CUBE_MAP);
                }
            }

            _gl.bindTexture(_gl.TEXTURE_CUBE_MAP, null);
        },

        _updateTextureData: function (_gl, data, level, width, height, glFormat, glType) {
            for (var i = 0; i < 6; i++) {
                var target = targetList[i];
                var img = data.image && data.image[target];
                if (img) {
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, level, glFormat, glFormat, glType, img);
                }
                else {
                    _gl.texImage2D(_gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, level, glFormat, width, height, 0, glFormat, glType, data.pixels && data.pixels[target]);
                }
            }
        },

        /**
         * @param  {WebGLRenderingContext} _gl
         * @memberOf qtek.TextureCube.prototype
         */
        generateMipmap: function (_gl) {
            if (this.useMipmap && !this.NPOT) {
                _gl.bindTexture(_gl.TEXTURE_CUBE_MAP, this._cache.get('webgl_texture'));
                _gl.generateMipmap(_gl.TEXTURE_CUBE_MAP);
            }
        },

        bind: function (_gl) {

            _gl.bindTexture(_gl.TEXTURE_CUBE_MAP, this.getWebGLTexture(_gl));
        },

        unbind: function (_gl) {
            _gl.bindTexture(_gl.TEXTURE_CUBE_MAP, null);
        },

        // Overwrite the isPowerOfTwo method
        isPowerOfTwo: function () {
            if (this.image.px) {
                return isPowerOfTwo(this.image.px.width)
                    && isPowerOfTwo(this.image.px.height);
            }
            else {
                return isPowerOfTwo(this.width)
                    && isPowerOfTwo(this.height);
            }
        },

        isRenderable: function () {
            if (this.image.px) {
                return isImageRenderable(this.image.px)
                    && isImageRenderable(this.image.nx)
                    && isImageRenderable(this.image.py)
                    && isImageRenderable(this.image.ny)
                    && isImageRenderable(this.image.pz)
                    && isImageRenderable(this.image.nz);
            }
            else {
                return !!(this.width && this.height);
            }
        },

        load: function (imageList) {
            var loading = 0;
            var self = this;
            util.each(imageList, function (src, target){
                var image = new Image();
                image.onload = function () {
                    loading --;
                    if (loading === 0){
                        self.dirty();
                        self.trigger('success', self);
                    }
                    image.onload = null;
                };
                image.onerror = function () {
                    loading --;
                    image.onerror = null;
                };

                loading++;
                image.src = src;
                self.image[target] = image;
            });

            return this;
        }
    });

    Object.defineProperty(TextureCube.prototype, 'width', {
        get: function () {
            if (this.image && this.image.px) {
                return this.image.px.width;
            }
            return this._width;
        },
        set: function (value) {
            if (this.image && this.image.px) {
                console.warn('Texture from image can\'t set width');
            }
            else {
                if (this._width !== value) {
                    this.dirty();
                }
                this._width = value;
            }
        }
    });
    Object.defineProperty(TextureCube.prototype, 'height', {
        get: function () {
            if (this.image && this.image.px) {
                return this.image.px.height;
            }
            return this._height;
        },
        set: function (value) {
            if (this.image && this.image.px) {
                console.warn('Texture from image can\'t set height');
            }
            else {
                if (this._height !== value) {
                    this.dirty();
                }
                this._height = value;
            }
        }
    });
    function isImageRenderable(image) {
        return image.nodeName === 'CANVAS' ||
                image.nodeName === 'VIDEO' ||
                image.complete;
    }

    module.exports = TextureCube;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Camera = __webpack_require__(25);
    /**
     * @constructor qtek.camera.Orthographic
     * @extends qtek.Camera
     */
    var Orthographic = Camera.extend(
    /** @lends qtek.camera.Orthographic# */
    {
        /**
         * @type {number}
         */
        left: -1,
        /**
         * @type {number}
         */
        right: 1,
        /**
         * @type {number}
         */
        near: -1,
        /**
         * @type {number}
         */
        far: 1,
        /**
         * @type {number}
         */
        top: 1,
        /**
         * @type {number}
         */
        bottom: -1
    },
    /** @lends qtek.camera.Orthographic.prototype */
    {

        updateProjectionMatrix: function() {
            this.projectionMatrix.ortho(this.left, this.right, this.bottom, this.top, this.near, this.far);
        },

        decomposeProjectionMatrix: function () {
            var m = this.projectionMatrix._array;
            this.left = (-1 - m[12]) / m[0];
            this.right = (1 - m[12]) / m[0];
            this.top = (1 - m[13]) / m[5];
            this.bottom = (-1 - m[13]) / m[5];
            this.near = -(-1 - m[14]) / m[10];
            this.far = -(1 - m[14]) / m[10];
        },
        /**
         * @return {qtek.camera.Orthographic}
         */
        clone: function() {
            var camera = Camera.prototype.clone.call(this);
            camera.left = this.left;
            camera.right = this.right;
            camera.near = this.near;
            camera.far = this.far;
            camera.top = this.top;
            camera.bottom = this.bottom;

            return camera;
        }
    });

    module.exports = Orthographic;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Camera = __webpack_require__(25);

    /**
     * @constructor qtek.camera.Perspective
     * @extends qtek.Camera
     */
    var Perspective = Camera.extend(
    /** @lends qtek.camera.Perspective# */
    {
        /**
         * Vertical field of view in radians
         * @type {number}
         */
        fov: 50,
        /**
         * Aspect ratio, typically viewport width / height
         * @type {number}
         */
        aspect: 1,
        /**
         * Near bound of the frustum
         * @type {number}
         */
        near: 0.1,
        /**
         * Far bound of the frustum
         * @type {number}
         */
        far: 2000
    },
    /** @lends qtek.camera.Perspective.prototype */
    {

        updateProjectionMatrix: function() {
            var rad = this.fov / 180 * Math.PI;
            this.projectionMatrix.perspective(rad, this.aspect, this.near, this.far);
        },
        decomposeProjectionMatrix: function () {
            var m = this.projectionMatrix._array;
            var rad = Math.atan(1 / m[5]) * 2;
            this.fov = rad / Math.PI * 180;
            this.aspect = m[5] / m[0];
            this.near = m[14] / (m[10] - 1);
            this.far = m[14] / (m[10] + 1);
        },
        /**
         * @return {qtek.camera.Perspective}
         */
        clone: function() {
            var camera = Camera.prototype.clone.call(this);
            camera.fov = this.fov;
            camera.aspect = this.aspect;
            camera.near = this.near;
            camera.far = this.far;

            return camera;
        }
    });

    module.exports = Perspective;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Light = __webpack_require__(9);
    var Vector3 = __webpack_require__(3);

    /**
     * @constructor qtek.light.Directional
     * @extends qtek.Light
     *
     * @example
     *     var light = new qtek.light.Directional({
     *         intensity: 0.5,
     *         color: [1.0, 0.0, 0.0]
     *     });
     *     light.position.set(10, 10, 10);
     *     light.lookAt(qtek.math.Vector3.ZERO);
     *     scene.add(light);
     */
    var DirectionalLight = Light.extend(
    /** @lends qtek.light.Directional# */
    {
        /**
         * @type {number}
         */
        shadowBias: 0.001,
        /**
         * @type {number}
         */
        shadowSlopeScale: 2.0,
        /**
         * Shadow cascade.
         * Use PSSM technique when it is larger than 1 and have a unique directional light in scene.
         * @type {number}
         */
        shadowCascade: 1,

        /**
         * Available when shadowCascade is larger than 1 and have a unique directional light in scene.
         * @type {number}
         */
        cascadeSplitLogFactor: 0.2
    }, {

        type: 'DIRECTIONAL_LIGHT',

        uniformTemplates: {
            directionalLightDirection: {
                type: '3f',
                value: function (instance) {
                    instance.__dir = instance.__dir || new Vector3();
                    // Direction is target to eye
                    return instance.__dir.copy(instance.worldTransform.z).normalize().negate()._array;
                }
            },
            directionalLightColor: {
                type: '3f',
                value: function (instance) {
                    var color = instance.color;
                    var intensity = instance.intensity;
                    return [color[0] * intensity, color[1] * intensity, color[2] * intensity];
                }
            }
        },
        /**
         * @return {qtek.light.Directional}
         * @memberOf qtek.light.Directional.prototype
         */
        clone: function () {
            var light = Light.prototype.clone.call(this);
            light.shadowBias = this.shadowBias;
            light.shadowSlopeScale = this.shadowSlopeScale;
            return light;
        }
    });

    module.exports = DirectionalLight;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var glMatrix = __webpack_require__(0);
    var quat = glMatrix.quat;

    /**
     * @constructor
     * @alias qtek.math.Quaternion
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} w
     */
    var Quaternion = function (x, y, z, w) {

        x = x || 0;
        y = y || 0;
        z = z || 0;
        w = w === undefined ? 1 : w;

        /**
         * Storage of Quaternion, read and write of x, y, z, w will change the values in _array
         * All methods also operate on the _array instead of x, y, z, w components
         * @name _array
         * @type {Float32Array}
         */
        this._array = quat.fromValues(x, y, z, w);

        /**
         * Dirty flag is used by the Node to determine
         * if the matrix is updated to latest
         * @name _dirty
         * @type {boolean}
         */
        this._dirty = true;
    };

    Quaternion.prototype = {

        constructor: Quaternion,

        /**
         * Add b to self
         * @param  {qtek.math.Quaternion} b
         * @return {qtek.math.Quaternion}
         */
        add: function (b) {
            quat.add(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Calculate the w component from x, y, z component
         * @return {qtek.math.Quaternion}
         */
        calculateW: function () {
            quat.calculateW(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Set x, y and z components
         * @param  {number}  x
         * @param  {number}  y
         * @param  {number}  z
         * @param  {number}  w
         * @return {qtek.math.Quaternion}
         */
        set: function (x, y, z, w) {
            this._array[0] = x;
            this._array[1] = y;
            this._array[2] = z;
            this._array[3] = w;
            this._dirty = true;
            return this;
        },

        /**
         * Set x, y, z and w components from array
         * @param  {Float32Array|number[]} arr
         * @return {qtek.math.Quaternion}
         */
        setArray: function (arr) {
            this._array[0] = arr[0];
            this._array[1] = arr[1];
            this._array[2] = arr[2];
            this._array[3] = arr[3];

            this._dirty = true;
            return this;
        },

        /**
         * Clone a new Quaternion
         * @return {qtek.math.Quaternion}
         */
        clone: function () {
            return new Quaternion(this.x, this.y, this.z, this.w);
        },

        /**
         * Calculates the conjugate of self If the quaternion is normalized,
         * this function is faster than invert and produces the same result.
         *
         * @return {qtek.math.Quaternion}
         */
        conjugate: function () {
            quat.conjugate(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Copy from b
         * @param  {qtek.math.Quaternion} b
         * @return {qtek.math.Quaternion}
         */
        copy: function (b) {
            quat.copy(this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Dot product of self and b
         * @param  {qtek.math.Quaternion} b
         * @return {number}
         */
        dot: function (b) {
            return quat.dot(this._array, b._array);
        },

        /**
         * Set from the given 3x3 rotation matrix
         * @param  {qtek.math.Matrix3} m
         * @return {qtek.math.Quaternion}
         */
        fromMat3: function (m) {
            quat.fromMat3(this._array, m._array);
            this._dirty = true;
            return this;
        },

        /**
         * Set from the given 4x4 rotation matrix
         * The 4th column and 4th row will be droped
         * @param  {qtek.math.Matrix4} m
         * @return {qtek.math.Quaternion}
         */
        fromMat4: (function () {
            var mat3 = glMatrix.mat3;
            var m3 = mat3.create();
            return function (m) {
                mat3.fromMat4(m3, m._array);
                // TODO Not like mat4, mat3 in glmatrix seems to be row-based
                mat3.transpose(m3, m3);
                quat.fromMat3(this._array, m3);
                this._dirty = true;
                return this;
            };
        })(),

        /**
         * Set to identity quaternion
         * @return {qtek.math.Quaternion}
         */
        identity: function () {
            quat.identity(this._array);
            this._dirty = true;
            return this;
        },
        /**
         * Invert self
         * @return {qtek.math.Quaternion}
         */
        invert: function () {
            quat.invert(this._array, this._array);
            this._dirty = true;
            return this;
        },
        /**
         * Alias of length
         * @return {number}
         */
        len: function () {
            return quat.len(this._array);
        },

        /**
         * Calculate the length
         * @return {number}
         */
        length: function () {
            return quat.length(this._array);
        },

        /**
         * Linear interpolation between a and b
         * @param  {qtek.math.Quaternion} a
         * @param  {qtek.math.Quaternion} b
         * @param  {number}  t
         * @return {qtek.math.Quaternion}
         */
        lerp: function (a, b, t) {
            quat.lerp(this._array, a._array, b._array, t);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for multiply
         * @param  {qtek.math.Quaternion} b
         * @return {qtek.math.Quaternion}
         */
        mul: function (b) {
            quat.mul(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for multiplyLeft
         * @param  {qtek.math.Quaternion} a
         * @return {qtek.math.Quaternion}
         */
        mulLeft: function (a) {
            quat.multiply(this._array, a._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Mutiply self and b
         * @param  {qtek.math.Quaternion} b
         * @return {qtek.math.Quaternion}
         */
        multiply: function (b) {
            quat.multiply(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Mutiply a and self
         * Quaternion mutiply is not commutative, so the result of mutiplyLeft is different with multiply.
         * @param  {qtek.math.Quaternion} a
         * @return {qtek.math.Quaternion}
         */
        multiplyLeft: function (a) {
            quat.multiply(this._array, a._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Normalize self
         * @return {qtek.math.Quaternion}
         */
        normalize: function () {
            quat.normalize(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Rotate self by a given radian about X axis
         * @param {number} rad
         * @return {qtek.math.Quaternion}
         */
        rotateX: function (rad) {
            quat.rotateX(this._array, this._array, rad);
            this._dirty = true;
            return this;
        },

        /**
         * Rotate self by a given radian about Y axis
         * @param {number} rad
         * @return {qtek.math.Quaternion}
         */
        rotateY: function (rad) {
            quat.rotateY(this._array, this._array, rad);
            this._dirty = true;
            return this;
        },

        /**
         * Rotate self by a given radian about Z axis
         * @param {number} rad
         * @return {qtek.math.Quaternion}
         */
        rotateZ: function (rad) {
            quat.rotateZ(this._array, this._array, rad);
            this._dirty = true;
            return this;
        },

        /**
         * Sets self to represent the shortest rotation from Vector3 a to Vector3 b.
         * a and b needs to be normalized
         * @param  {qtek.math.Vector3} a
         * @param  {qtek.math.Vector3} b
         * @return {qtek.math.Quaternion}
         */
        rotationTo: function (a, b) {
            quat.rotationTo(this._array, a._array, b._array);
            this._dirty = true;
            return this;
        },
        /**
         * Sets self with values corresponding to the given axes
         * @param {qtek.math.Vector3} view
         * @param {qtek.math.Vector3} right
         * @param {qtek.math.Vector3} up
         * @return {qtek.math.Quaternion}
         */
        setAxes: function (view, right, up) {
            quat.setAxes(this._array, view._array, right._array, up._array);
            this._dirty = true;
            return this;
        },

        /**
         * Sets self with a rotation axis and rotation angle
         * @param {qtek.math.Vector3} axis
         * @param {number} rad
         * @return {qtek.math.Quaternion}
         */
        setAxisAngle: function (axis, rad) {
            quat.setAxisAngle(this._array, axis._array, rad);
            this._dirty = true;
            return this;
        },
        /**
         * Perform spherical linear interpolation between a and b
         * @param  {qtek.math.Quaternion} a
         * @param  {qtek.math.Quaternion} b
         * @param  {number} t
         * @return {qtek.math.Quaternion}
         */
        slerp: function (a, b, t) {
            quat.slerp(this._array, a._array, b._array, t);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for squaredLength
         * @return {number}
         */
        sqrLen: function () {
            return quat.sqrLen(this._array);
        },

        /**
         * Squared length of self
         * @return {number}
         */
        squaredLength: function () {
            return quat.squaredLength(this._array);
        },

        /**
         * Set from euler
         * @param {qtek.math.Vector3} v
         * @param {String} order
         */
        fromEuler: function (v, order) {
            return Quaternion.fromEuler(this, v, order);
        },

        toString: function () {
            return '[' + Array.prototype.join.call(this._array, ',') + ']';
        },

        toArray: function () {
            return Array.prototype.slice.call(this._array);
        }
    };

    var defineProperty = Object.defineProperty;
    // Getter and Setter
    if (defineProperty) {

        var proto = Quaternion.prototype;
        /**
         * @name x
         * @type {number}
         * @memberOf qtek.math.Quaternion
         * @instance
         */
        defineProperty(proto, 'x', {
            get: function () {
                return this._array[0];
            },
            set: function (value) {
                this._array[0] = value;
                this._dirty = true;
            }
        });

        /**
         * @name y
         * @type {number}
         * @memberOf qtek.math.Quaternion
         * @instance
         */
        defineProperty(proto, 'y', {
            get: function () {
                return this._array[1];
            },
            set: function (value) {
                this._array[1] = value;
                this._dirty = true;
            }
        });

        /**
         * @name z
         * @type {number}
         * @memberOf qtek.math.Quaternion
         * @instance
         */
        defineProperty(proto, 'z', {
            get: function () {
                return this._array[2];
            },
            set: function (value) {
                this._array[2] = value;
                this._dirty = true;
            }
        });

        /**
         * @name w
         * @type {number}
         * @memberOf qtek.math.Quaternion
         * @instance
         */
        defineProperty(proto, 'w', {
            get: function () {
                return this._array[3];
            },
            set: function (value) {
                this._array[3] = value;
                this._dirty = true;
            }
        });
    }

    // Supply methods that are not in place

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Quaternion} a
     * @param  {qtek.math.Quaternion} b
     * @return {qtek.math.Quaternion}
     */
    Quaternion.add = function (out, a, b) {
        quat.add(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {number}     x
     * @param  {number}     y
     * @param  {number}     z
     * @param  {number}     w
     * @return {qtek.math.Quaternion}
     */
    Quaternion.set = function (out, x, y, z, w) {
        quat.set(out._array, x, y, z, w);
        out._dirty = true;
    };

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Quaternion} b
     * @return {qtek.math.Quaternion}
     */
    Quaternion.copy = function (out, b) {
        quat.copy(out._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Quaternion} a
     * @return {qtek.math.Quaternion}
     */
    Quaternion.calculateW = function (out, a) {
        quat.calculateW(out._array, a._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Quaternion} a
     * @return {qtek.math.Quaternion}
     */
    Quaternion.conjugate = function (out, a) {
        quat.conjugate(out._array, a._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Quaternion} out
     * @return {qtek.math.Quaternion}
     */
    Quaternion.identity = function (out) {
        quat.identity(out._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Quaternion} a
     * @return {qtek.math.Quaternion}
     */
    Quaternion.invert = function (out, a) {
        quat.invert(out._array, a._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Quaternion} a
     * @param  {qtek.math.Quaternion} b
     * @return {number}
     */
    Quaternion.dot = function (a, b) {
        return quat.dot(a._array, b._array);
    };

    /**
     * @param  {qtek.math.Quaternion} a
     * @return {number}
     */
    Quaternion.len = function (a) {
        return quat.length(a._array);
    };

    // Quaternion.length = Quaternion.len;

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Quaternion} a
     * @param  {qtek.math.Quaternion} b
     * @param  {number}     t
     * @return {qtek.math.Quaternion}
     */
    Quaternion.lerp = function (out, a, b, t) {
        quat.lerp(out._array, a._array, b._array, t);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Quaternion} a
     * @param  {qtek.math.Quaternion} b
     * @param  {number}     t
     * @return {qtek.math.Quaternion}
     */
    Quaternion.slerp = function (out, a, b, t) {
        quat.slerp(out._array, a._array, b._array, t);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Quaternion} a
     * @param  {qtek.math.Quaternion} b
     * @return {qtek.math.Quaternion}
     */
    Quaternion.mul = function (out, a, b) {
        quat.multiply(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @method
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Quaternion} a
     * @param  {qtek.math.Quaternion} b
     * @return {qtek.math.Quaternion}
     */
    Quaternion.multiply = Quaternion.mul;

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Quaternion} a
     * @param  {number}     rad
     * @return {qtek.math.Quaternion}
     */
    Quaternion.rotateX = function (out, a, rad) {
        quat.rotateX(out._array, a._array, rad);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Quaternion} a
     * @param  {number}     rad
     * @return {qtek.math.Quaternion}
     */
    Quaternion.rotateY = function (out, a, rad) {
        quat.rotateY(out._array, a._array, rad);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Quaternion} a
     * @param  {number}     rad
     * @return {qtek.math.Quaternion}
     */
    Quaternion.rotateZ = function (out, a, rad) {
        quat.rotateZ(out._array, a._array, rad);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Vector3}    axis
     * @param  {number}     rad
     * @return {qtek.math.Quaternion}
     */
    Quaternion.setAxisAngle = function (out, axis, rad) {
        quat.setAxisAngle(out._array, axis._array, rad);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Quaternion} a
     * @return {qtek.math.Quaternion}
     */
    Quaternion.normalize = function (out, a) {
        quat.normalize(out._array, a._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Quaternion} a
     * @return {number}
     */
    Quaternion.sqrLen = function (a) {
        return quat.sqrLen(a._array);
    };

    /**
     * @method
     * @param  {qtek.math.Quaternion} a
     * @return {number}
     */
    Quaternion.squaredLength = Quaternion.sqrLen;

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Matrix3}    m
     * @return {qtek.math.Quaternion}
     */
    Quaternion.fromMat3 = function (out, m) {
        quat.fromMat3(out._array, m._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Vector3}    view
     * @param  {qtek.math.Vector3}    right
     * @param  {qtek.math.Vector3}    up
     * @return {qtek.math.Quaternion}
     */
    Quaternion.setAxes = function (out, view, right, up) {
        quat.setAxes(out._array, view._array, right._array, up._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Quaternion} out
     * @param  {qtek.math.Vector3}    a
     * @param  {qtek.math.Vector3}    b
     * @return {qtek.math.Quaternion}
     */
    Quaternion.rotationTo = function (out, a, b) {
        quat.rotationTo(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * Set quaternion from euler
     * @param {qtek.math.Quaternion} out
     * @param {qtek.math.Vector3} v
     * @param {String} order
     */
    Quaternion.fromEuler = function (out, v, order) {

        out._dirty = true;

        v = v._array;
        var target = out._array;
        var c1 = Math.cos(v[0] / 2);
        var c2 = Math.cos(v[1] / 2);
        var c3 = Math.cos(v[2] / 2);
        var s1 = Math.sin(v[0] / 2);
        var s2 = Math.sin(v[1] / 2);
        var s3 = Math.sin(v[2] / 2);

        var order = (order || 'XYZ').toUpperCase();

        // http://www.mathworks.com/matlabcentral/fileexchange/
        //  20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
        //  content/SpinCalc.m

        switch (order) {
            case 'XYZ':
                target[0] = s1 * c2 * c3 + c1 * s2 * s3;
                target[1] = c1 * s2 * c3 - s1 * c2 * s3;
                target[2] = c1 * c2 * s3 + s1 * s2 * c3;
                target[3] = c1 * c2 * c3 - s1 * s2 * s3;
                break;
            case 'YXZ':
                target[0] = s1 * c2 * c3 + c1 * s2 * s3;
                target[1] = c1 * s2 * c3 - s1 * c2 * s3;
                target[2] = c1 * c2 * s3 - s1 * s2 * c3;
                target[3] = c1 * c2 * c3 + s1 * s2 * s3;
                break;
            case 'ZXY':
                target[0] = s1 * c2 * c3 - c1 * s2 * s3;
                target[1] = c1 * s2 * c3 + s1 * c2 * s3;
                target[2] = c1 * c2 * s3 + s1 * s2 * c3;
                target[3] = c1 * c2 * c3 - s1 * s2 * s3;
                break;
            case 'ZYX':
                target[0] = s1 * c2 * c3 - c1 * s2 * s3;
                target[1] = c1 * s2 * c3 + s1 * c2 * s3;
                target[2] = c1 * c2 * s3 - s1 * s2 * c3;
                target[3] = c1 * c2 * c3 + s1 * s2 * s3;
                break;
            case 'YZX':
                target[0] = s1 * c2 * c3 + c1 * s2 * s3;
                target[1] = c1 * s2 * c3 + s1 * c2 * s3;
                target[2] = c1 * c2 * s3 - s1 * s2 * c3;
                target[3] = c1 * c2 * c3 - s1 * s2 * s3;
                break;
            case 'XZY':
                target[0] = s1 * c2 * c3 - c1 * s2 * s3;
                target[1] = c1 * s2 * c3 - s1 * c2 * s3;
                target[2] = c1 * c2 * s3 + s1 * s2 * c3;
                target[3] = c1 * c2 * c3 + s1 * s2 * s3;
                break;
        }
    };

    module.exports = Quaternion;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Node = __webpack_require__(7);
    var Matrix4 = __webpack_require__(15);
    var Frustum = __webpack_require__(34);
    var Ray = __webpack_require__(64);

    var glMatrix = __webpack_require__(0);
    var vec3 = glMatrix.vec3;
    var vec4 = glMatrix.vec4;

    /**
     * @constructor qtek.Camera
     * @extends qtek.Node
     */
    var Camera = Node.extend(function () {
        return /** @lends qtek.Camera# */ {
            /**
             * Camera projection matrix
             * @type {qtek.math.Matrix4}
             */
            projectionMatrix: new Matrix4(),

            /**
             * Inverse of camera projection matrix
             * @type {qtek.math.Matrix4}
             */
            invProjectionMatrix: new Matrix4(),

            /**
             * View matrix, equal to inverse of camera's world matrix
             * @type {qtek.math.Matrix4}
             */
            viewMatrix: new Matrix4(),

            /**
             * Camera frustum in view space
             * @type {qtek.math.Frustum}
             */
            frustum: new Frustum()
        };
    }, function () {
        this.update(true);
    },
    /** @lends qtek.Camera.prototype */
    {

        update: function (force) {
            Node.prototype.update.call(this, force);
            Matrix4.invert(this.viewMatrix, this.worldTransform);

            this.updateProjectionMatrix();
            Matrix4.invert(this.invProjectionMatrix, this.projectionMatrix);

            this.frustum.setFromProjection(this.projectionMatrix);
        },

        /**
         * Set camera view matrix
         */
        setViewMatrix: function (viewMatrix) {
            Matrix4.copy(this.viewMatrix, viewMatrix);
            Matrix4.invert(this.worldTransform, viewMatrix);
            this.decomposeWorldTransform();
        },

        /**
         * Decompose camera projection matrix
         */
        decomposeProjectionMatrix: function () {},

        /**
         * Set camera projection matrix
         */
        setProjectionMatrix: function (projectionMatrix) {
            Matrix4.copy(this.projectionMatrix, projectionMatrix);
            Matrix4.invert(this.invProjectionMatrix, projectionMatrix);
            this.decomposeProjectionMatrix();
        },
        /**
         * Update projection matrix, called after update
         */
        updateProjectionMatrix: function () {},

        /**
         * Cast a picking ray from camera near plane to far plane
         * @method
         * @param {qtek.math.Vector2} ndc
         * @param {qtek.math.Ray} [out]
         * @return {qtek.math.Ray}
         */
        castRay: (function () {
            var v4 = vec4.create();
            return function (ndc, out) {
                var ray = out !== undefined ? out : new Ray();
                var x = ndc._array[0];
                var y = ndc._array[1];
                vec4.set(v4, x, y, -1, 1);
                vec4.transformMat4(v4, v4, this.invProjectionMatrix._array);
                vec4.transformMat4(v4, v4, this.worldTransform._array);
                vec3.scale(ray.origin._array, v4, 1 / v4[3]);

                vec4.set(v4, x, y, 1, 1);
                vec4.transformMat4(v4, v4, this.invProjectionMatrix._array);
                vec4.transformMat4(v4, v4, this.worldTransform._array);
                vec3.scale(v4, v4, 1 / v4[3]);
                vec3.sub(ray.direction._array, v4, ray.origin._array);

                vec3.normalize(ray.direction._array, ray.direction._array);
                ray.direction._dirty = true;
                ray.origin._dirty = true;

                return ray;
            };
        })()

        /**
         * @method
         * @name clone
         * @return {qtek.Camera}
         * @memberOf qtek.Camera.prototype
         */
    });

    module.exports = Camera;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Base = __webpack_require__(1);

    /**
     * @constructor qtek.Joint
     * @extends qtek.core.Base
     */
    var Joint = Base.extend(
    /** @lends qtek.Joint# */
    {
        // https://github.com/KhronosGroup/glTF/issues/193#issuecomment-29216576
        /**
         * Joint name
         * @type {string}
         */
        name: '',
        /**
         * Index of joint in the skeleton
         * @type {number}
         */
        index: -1,
        /**
         * Index of parent joint index, -1 if it is a root joint
         * @type {number}
         */
        parentIndex: -1,

        /**
         * Scene node attached to
         * @type {qtek.Node}
         */
        node: null,

        /**
         * Root scene node of the skeleton, which parent node is null or don't have a joint
         * @type {qtek.Node}
         */
        rootNode: null
    });

    module.exports = Joint;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO Resources like shader, texture, geometry reference management
// Trace and find out which shader, texture, geometry can be destroyed
//
// TODO prez skinning


    var Base = __webpack_require__(1);
    var glinfo = __webpack_require__(6);
    var glenum = __webpack_require__(2);
    var vendor = __webpack_require__(8);
    var BoundingBox = __webpack_require__(4);
    var Matrix4 = __webpack_require__(15);
    var shaderLibrary = __webpack_require__(18);
    var Material = __webpack_require__(10);
    var Vector2 = __webpack_require__(35);

    // Light header
    var Shader = __webpack_require__(5);
    Shader['import'](__webpack_require__(86));
    Shader['import'](__webpack_require__(37));

    var glMatrix = __webpack_require__(0);
    var mat4 = glMatrix.mat4;
    var vec3 = glMatrix.vec3;

    var mat4Create = mat4.create;

    var glid = 0;

    var errorShader = {};

    /**
     * @constructor qtek.Renderer
     */
    var Renderer = Base.extend(function () {
        return /** @lends qtek.Renderer# */ {

            /**
             * @type {HTMLCanvasElement}
             * @readonly
             */
            canvas: null,

            /**
             * Canvas width, set by resize method
             * @type {number}
             * @private
             */
            _width: 100,

            /**
             * Canvas width, set by resize method
             * @type {number}
             * @private
             */
            _height: 100,

            /**
             * Device pixel ratio, set by setDevicePixelRatio method
             * Specially for high defination display
             * @see http://www.khronos.org/webgl/wiki/HandlingHighDPI
             * @type {number}
             * @private
             */
            devicePixelRatio: window.devicePixelRatio || 1.0,

            /**
             * Clear color
             * @type {number[]}
             */
            clearColor: [0.0, 0.0, 0.0, 0.0],

            /**
             * Default:
             *     _gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT | _gl.STENCIL_BUFFER_BIT
             * @type {number}
             */
            clearBit: 17664,

            // Settings when getting context
            // http://www.khronos.org/registry/webgl/specs/latest/#2.4

            /**
             * If enable alpha, default true
             * @type {boolean}
             */
            alpha: true,
            /**
             * If enable depth buffer, default true
             * @type {boolean}
             */
            depth: true,
            /**
             * If enable stencil buffer, default false
             * @type {boolean}
             */
            stencil: false,
            /**
             * If enable antialias, default true
             * @type {boolean}
             */
            antialias: true,
            /**
             * If enable premultiplied alpha, default true
             * @type {boolean}
             */
            premultipliedAlpha: true,
            /**
             * If preserve drawing buffer, default false
             * @type {boolean}
             */
            preserveDrawingBuffer: false,
            /**
             * If throw context error, usually turned on in debug mode
             * @type {boolean}
             */
            throwError: true,
            /**
             * WebGL Context created from given canvas
             * @type {WebGLRenderingContext}
             */
            gl: null,
            /**
             * Renderer viewport, read-only, can be set by setViewport method
             * @type {Object}
             */
            viewport: {},

            // Set by FrameBuffer#bind
            __currentFrameBuffer: null,

            _viewportStack: [],
            _clearStack: [],

            _sceneRendering: null
        };
    }, function () {

        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
        }
        var canvas = this.canvas;
        try {
            var opts = {
                alpha: this.alpha,
                depth: this.depth,
                stencil: this.stencil,
                antialias: this.antialias,
                premultipliedAlpha: this.premultipliedAlpha,
                preserveDrawingBuffer: this.preserveDrawingBuffer
            };

            this.gl = canvas.getContext('webgl', opts)
                || canvas.getContext('experimental-webgl', opts);

            if (!this.gl) {
                throw new Error();
            }

            if (this.gl.__GLID__ == null) {
                // gl context is not created
                // Otherwise is the case mutiple renderer share the same gl context
                this.gl.__GLID__ = glid++;

                glinfo.initialize(this.gl);
            }

            this.resize();
        }
        catch(e) {
            throw 'Error creating WebGL Context ' + e;
        }
    },
    /** @lends qtek.Renderer.prototype. **/
    {
        /**
         * Resize the canvas
         * @param {number} width
         * @param {number} height
         */
        resize: function(width, height) {
            var canvas = this.canvas;
            // http://www.khronos.org/webgl/wiki/HandlingHighDPI
            // set the display size of the canvas.
            var dpr = this.devicePixelRatio;
            if (width != null) {
                canvas.style.width = width + 'px';
                canvas.style.height = height + 'px';
                // set the size of the drawingBuffer
                canvas.width = width * dpr;
                canvas.height = height * dpr;

                this._width = width;
                this._height = height;
            }
            else {
                this._width = canvas.width / dpr;
                this._height = canvas.height / dpr;
            }

            this.setViewport(0, 0, this._width, this._height);
        },

        /**
         * Get renderer width
         * @return {number}
         */
        getWidth: function () {
            return this._width;
        },

        /**
         * Get renderer height
         * @return {number}
         */
        getHeight: function () {
            return this._height;
        },

        /**
         * Get viewport aspect,
         */
        getViewportAspect: function () {
            var viewport = this.viewport;
            return viewport.width / viewport.height;
        },

        /**
         * Set devicePixelRatio
         * @param {number} devicePixelRatio
         */
        setDevicePixelRatio: function(devicePixelRatio) {
            this.devicePixelRatio = devicePixelRatio;
            this.resize(this._width, this._height);
        },

        /**
         * Get devicePixelRatio
         * @param {number} devicePixelRatio
         */
        getDevicePixelRatio: function () {
            return this.devicePixelRatio;
        },

        /**
         * Get WebGL extionsion
         * @return {object}
         */
        getExtension: function (name) {
            return glinfo.getExtension(this.gl, name);
        },

        /**
         * Set rendering viewport
         * @param {number|Object} x
         * @param {number} [y]
         * @param {number} [width]
         * @param {number} [height]
         * @param {number} [devicePixelRatio]
         *        Defaultly use the renderere devicePixelRatio
         *        It needs to be 1 when setViewport is called by frameBuffer
         *
         * @example
         *  setViewport(0,0,width,height,1)
         *  setViewport({
         *      x: 0,
         *      y: 0,
         *      width: width,
         *      height: height,
         *      devicePixelRatio: 1
         *  })
         */
        setViewport: function (x, y, width, height, dpr) {

            if (typeof x === 'object') {
                var obj = x;

                x = obj.x;
                y = obj.y;
                width = obj.width;
                height = obj.height;
                dpr = obj.devicePixelRatio;
            }
            dpr = dpr || this.devicePixelRatio;

            this.gl.viewport(
                x * dpr, y * dpr, width * dpr, height * dpr
            );
            // Use a fresh new object, not write property.
            this.viewport = {
                x: x,
                y: y,
                width: width,
                height: height,
                devicePixelRatio: dpr
            };
        },

        /**
         * Push current viewport into a stack
         */
        saveViewport: function () {
            this._viewportStack.push(this.viewport);
        },

        /**
         * Pop viewport from stack, restore in the renderer
         */
        restoreViewport: function () {
            if (this._viewportStack.length > 0) {
                this.setViewport(this._viewportStack.pop());
            }
        },

        /**
         * Push current clear into a stack
         */
        saveClear: function () {
            this._clearStack.push({
                clearBit: this.clearBit,
                clearColor: this.clearColor
            });
        },

        /**
         * Pop clear from stack, restore in the renderer
         */
        restoreClear: function () {
            if (this._clearStack.length > 0) {
                var opt = this._clearStack.pop();
                this.clearColor = opt.clearColor;
                this.clearBit = opt.clearBit;
            }
        },

        bindSceneRendering: function (scene) {
            this._sceneRendering = scene;
        },

        // Hook before and after render each object
        beforeRenderObject: function () {},
        afterRenderObject: function () {},
        /**
         * Render the scene in camera to the screen or binded offline framebuffer
         * @param  {qtek.Scene}       scene
         * @param  {qtek.Camera}      camera
         * @param  {boolean}     [notUpdateScene] If not call the scene.update methods in the rendering, default true
         * @param  {boolean}     [preZ]           If use preZ optimization, default false
         * @return {IRenderInfo}
         */
        render: function(scene, camera, notUpdateScene, preZ) {
            var _gl = this.gl;

            this._sceneRendering = scene;

            var clearColor = this.clearColor;

            if (this.clearBit) {

                // Must set depth and color mask true before clear
                _gl.colorMask(true, true, true, true);
                _gl.depthMask(true);
                var viewport = this.viewport;
                var needsScissor = false;
                var viewportDpr = viewport.devicePixelRatio;
                if (viewport.width !== this._width || viewport.height !== this._height
                    || (viewportDpr && viewportDpr !== this.devicePixelRatio)
                    || viewport.x || viewport.y
                ) {
                    needsScissor = true;
                    // http://stackoverflow.com/questions/11544608/how-to-clear-a-rectangle-area-in-webgl
                    // Only clear the viewport
                    _gl.enable(_gl.SCISSOR_TEST);
                    _gl.scissor(viewport.x * viewportDpr, viewport.y * viewportDpr, viewport.width * viewportDpr, viewport.height * viewportDpr);
                }
                _gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
                _gl.clear(this.clearBit);
                if (needsScissor) {
                    _gl.disable(_gl.SCISSOR_TEST);
                }
            }

            // If the scene have been updated in the prepass like shadow map
            // There is no need to update it again
            if (!notUpdateScene) {
                scene.update(false);
            }
            // Update if camera not mounted on the scene
            if (!camera.getScene()) {
                camera.update(true);
            }

            var opaqueQueue = scene.opaqueQueue;
            var transparentQueue = scene.transparentQueue;
            var sceneMaterial = scene.material;

            scene.trigger('beforerender', this, scene, camera);
            // Sort render queue
            // Calculate the object depth
            if (transparentQueue.length > 0) {
                var worldViewMat = mat4Create();
                var posViewSpace = vec3.create();
                for (var i = 0; i < transparentQueue.length; i++) {
                    var node = transparentQueue[i];
                    mat4.multiplyAffine(worldViewMat, camera.viewMatrix._array, node.worldTransform._array);
                    vec3.transformMat4(posViewSpace, node.position._array, worldViewMat);
                    node.__depth = posViewSpace[2];
                }
            }
            opaqueQueue.sort(this.opaqueSortFunc);
            transparentQueue.sort(this.transparentSortFunc);

            // Render Opaque queue
            scene.trigger('beforerender:opaque', this, opaqueQueue);

            // Reset the scene bounding box;
            scene.viewBoundingBoxLastFrame.min.set(Infinity, Infinity, Infinity);
            scene.viewBoundingBoxLastFrame.max.set(-Infinity, -Infinity, -Infinity);

            _gl.disable(_gl.BLEND);
            _gl.enable(_gl.DEPTH_TEST);
            var opaqueRenderInfo = this.renderQueue(opaqueQueue, camera, sceneMaterial, preZ);

            scene.trigger('afterrender:opaque', this, opaqueQueue, opaqueRenderInfo);
            scene.trigger('beforerender:transparent', this, transparentQueue);

            // Render Transparent Queue
            _gl.enable(_gl.BLEND);
            var transparentRenderInfo = this.renderQueue(transparentQueue, camera, sceneMaterial);

            scene.trigger('afterrender:transparent', this, transparentQueue, transparentRenderInfo);
            var renderInfo = {};
            for (var name in opaqueRenderInfo) {
                renderInfo[name] = opaqueRenderInfo[name] + transparentRenderInfo[name];
            }

            scene.trigger('afterrender', this, scene, camera, renderInfo);

            // Cleanup
            this._sceneRendering = null;
            return renderInfo;
        },

        resetRenderStatus: function () {
            this._currentShader = null;
        },

        ifRenderObject: function (obj) {
            return true;
        },

        /**
         * Render a single renderable list in camera in sequence
         * @param  {qtek.Renderable[]} queue       List of all renderables.
         *                                         Best to be sorted by Renderer.opaqueSortFunc or Renderer.transparentSortFunc
         * @param  {qtek.Camera}       camera
         * @param  {qtek.Material}     [globalMaterial] globalMaterial will override the material of each renderable
         * @param  {boolean}           [preZ]           If use preZ optimization, default false
         * @return {IRenderInfo}
         */
        renderQueue: function(queue, camera, globalMaterial, preZ) {
            var renderInfo = {
                triangleCount: 0,
                vertexCount: 0,
                drawCallCount: 0,
                meshCount: queue.length,
                renderedMeshCount: 0
            };

            // Some common builtin uniforms
            var viewport = this.viewport;
            var vDpr = viewport.devicePixelRatio;
            var viewportUniform = [
                viewport.x * vDpr, viewport.y * vDpr,
                viewport.width * vDpr, viewport.height * vDpr
            ];
            var windowDpr = this.devicePixelRatio;
            var windowSizeUniform = this.__currentFrameBuffer
                ? [this.__currentFrameBuffer.getTextureWidth(), this.__currentFrameBuffer.getTextureHeight()]
                : [this._width * windowDpr, this._height * windowDpr];
            // DEPRECATED
            var viewportSizeUniform = [
                viewportUniform[2], viewportUniform[3]
            ];
            var time = Date.now();

            // Calculate view and projection matrix
            mat4.copy(matrices.VIEW, camera.viewMatrix._array);
            mat4.copy(matrices.PROJECTION, camera.projectionMatrix._array);
            mat4.multiply(matrices.VIEWPROJECTION, camera.projectionMatrix._array, matrices.VIEW);
            mat4.copy(matrices.VIEWINVERSE, camera.worldTransform._array);
            mat4.invert(matrices.PROJECTIONINVERSE, matrices.PROJECTION);
            mat4.invert(matrices.VIEWPROJECTIONINVERSE, matrices.VIEWPROJECTION);

            var _gl = this.gl;
            var scene = this._sceneRendering;

            var prevMaterial;

            // Status
            var depthTest, depthMask;
            var culling, cullFace, frontFace;

            var culledRenderQueue;
            if (preZ) {
                var preZPassMaterial = this._prezMaterial || new Material({
                    shader: new Shader({
                        vertex: Shader.source('qtek.prez.vertex'),
                        fragment: Shader.source('qtek.prez.fragment')
                    })
                });
                this._prezMaterial = preZPassMaterial;
                var preZPassShader = preZPassMaterial.shader;

                culledRenderQueue = [];
                preZPassShader.bind(_gl);
                _gl.colorMask(false, false, false, false);
                _gl.depthMask(true);
                _gl.enable(_gl.DEPTH_TEST);
                for (var i = 0; i < queue.length; i++) {
                    var renderable = queue[i];
                    if (!this.ifRenderObject(renderable)) {
                        continue;
                    }

                    var worldM = renderable.worldTransform._array;
                    var geometry = renderable.geometry;

                    mat4.multiplyAffine(matrices.WORLDVIEW, matrices.VIEW , worldM);

                    if (geometry.boundingBox) {
                        if (this.isFrustumCulled(
                            renderable, scene, camera, matrices.WORLDVIEW, matrices.PROJECTION
                        )) {
                            continue;
                        }
                    }
                    if (renderable.skeleton) {  // FIXME  skinned mesh
                        continue;
                    }

                    mat4.multiply(matrices.WORLDVIEWPROJECTION, matrices.VIEWPROJECTION , worldM);

                    if (renderable.cullFace !== cullFace) {
                        cullFace = renderable.cullFace;
                        _gl.cullFace(cullFace);
                    }
                    if (renderable.frontFace !== frontFace) {
                        frontFace = renderable.frontFace;
                        _gl.frontFace(frontFace);
                    }
                    if (renderable.culling !== culling) {
                        culling = renderable.culling;
                        culling ? _gl.enable(_gl.CULL_FACE) : _gl.disable(_gl.CULL_FACE);
                    }

                    var semanticInfo = preZPassShader.matrixSemantics.WORLDVIEWPROJECTION;
                    preZPassShader.setUniform(_gl, semanticInfo.type, semanticInfo.symbol, matrices.WORLDVIEWPROJECTION);

                    // PENDING If invoke beforeRender hook
                    renderable.render(_gl, preZPassMaterial.shader);
                    culledRenderQueue.push(renderable);
                }
                _gl.depthFunc(_gl.LEQUAL);
                _gl.colorMask(true, true, true, true);
                _gl.depthMask(false);

                // Reset current shader.
                this._currentShader = null;
            }
            else {
                culledRenderQueue = queue;
                _gl.depthFunc(_gl.LESS);
            }

            culling = null;
            cullFace = null;
            frontFace = null;

            for (var i = 0; i < culledRenderQueue.length; i++) {
                var renderable = culledRenderQueue[i];
                if (!this.ifRenderObject(renderable)) {
                    continue;
                }

                var geometry = renderable.geometry;

                var worldM = renderable.worldTransform._array;
                // All matrices ralated to world matrix will be updated on demand;
                mat4.multiplyAffine(matrices.WORLDVIEW, matrices.VIEW , worldM);
                if (geometry.boundingBox && !preZ) {
                    if (this.isFrustumCulled(
                        renderable, scene, camera, matrices.WORLDVIEW, matrices.PROJECTION
                    )) {
                        continue;
                    }
                }

                var material = globalMaterial || renderable.material;
                // StandardMaterial needs updateShader method so shader can be created on demand.
                if (material !== prevMaterial) {
                    material.updateShader && material.updateShader(_gl);
                }

                var shader = material.shader;

                mat4.copy(matrices.WORLD, worldM);
                mat4.multiply(matrices.WORLDVIEWPROJECTION, matrices.VIEWPROJECTION , worldM);
                if (shader.matrixSemantics.WORLDINVERSE ||
                    shader.matrixSemantics.WORLDINVERSETRANSPOSE) {
                    mat4.invert(matrices.WORLDINVERSE, worldM);
                }
                if (shader.matrixSemantics.WORLDVIEWINVERSE ||
                    shader.matrixSemantics.WORLDVIEWINVERSETRANSPOSE) {
                    mat4.invert(matrices.WORLDVIEWINVERSE, matrices.WORLDVIEW);
                }
                if (shader.matrixSemantics.WORLDVIEWPROJECTIONINVERSE ||
                    shader.matrixSemantics.WORLDVIEWPROJECTIONINVERSETRANSPOSE) {
                    mat4.invert(matrices.WORLDVIEWPROJECTIONINVERSE, matrices.WORLDVIEWPROJECTION);
                }

                // FIXME Optimize for compositing.
                // var prevShader = this._sceneRendering ? null : this._currentShader;
                var prevShader = null;

                // Before render hook
                renderable.beforeRender(_gl);
                this.beforeRenderObject(renderable, prevMaterial, prevShader);

                var shaderChanged = !shader.isEqual(prevShader);
                if (shaderChanged) {
                    // Set lights number
                    if (scene && scene.isShaderLightNumberChanged(shader)) {
                        scene.setShaderLightNumber(shader);
                    }
                    var errMsg = shader.bind(_gl);
                    if (errMsg) {

                        if (errorShader[shader.__GUID__]) {
                            continue;
                        }
                        errorShader[shader.__GUID__] = true;

                        if (this.throwError) {
                            throw new Error(errMsg);
                        }
                        else {
                            this.trigger('error', errMsg);
                        }
                    }
                    // Set some common uniforms
                    shader.setUniformOfSemantic(_gl, 'VIEWPORT', viewportUniform);
                    shader.setUniformOfSemantic(_gl, 'WINDOW_SIZE', windowSizeUniform);
                    shader.setUniformOfSemantic(_gl, 'NEAR', camera.near);
                    shader.setUniformOfSemantic(_gl, 'FAR', camera.far);
                    shader.setUniformOfSemantic(_gl, 'DEVICEPIXELRATIO', vDpr);
                    shader.setUniformOfSemantic(_gl, 'TIME', time);
                    // DEPRECATED
                    shader.setUniformOfSemantic(_gl, 'VIEWPORT_SIZE', viewportSizeUniform);

                    // Set lights uniforms
                    // TODO needs optimized
                    if (scene) {
                        scene.setLightUniforms(shader, _gl);
                    }

                    // Save current used shader in the renderer
                    // ALWAYS USE RENDERER TO DRAW THE MESH
                    // this._currentShader = shader;
                }
                else {
                    shader = prevShader;
                }

                if (prevMaterial !== material) {
                    if (!preZ) {
                        if (material.depthTest !== depthTest) {
                            material.depthTest ?
                                _gl.enable(_gl.DEPTH_TEST) :
                                _gl.disable(_gl.DEPTH_TEST);
                            depthTest = material.depthTest;
                        }
                        if (material.depthMask !== depthMask) {
                            _gl.depthMask(material.depthMask);
                            depthMask = material.depthMask;
                        }
                    }
                    material.bind(_gl, shader, prevMaterial, prevShader);
                    prevMaterial = material;

                    // TODO cache blending
                    if (material.transparent) {
                        if (material.blend) {
                            material.blend(_gl);
                        }
                        else {    // Default blend function
                            _gl.blendEquationSeparate(_gl.FUNC_ADD, _gl.FUNC_ADD);
                            _gl.blendFuncSeparate(_gl.SRC_ALPHA, _gl.ONE_MINUS_SRC_ALPHA, _gl.ONE, _gl.ONE_MINUS_SRC_ALPHA);
                        }
                    }
                }

                var matrixSemanticKeys = shader.matrixSemanticKeys;
                for (var k = 0; k < matrixSemanticKeys.length; k++) {
                    var semantic = matrixSemanticKeys[k];
                    var semanticInfo = shader.matrixSemantics[semantic];
                    var matrix = matrices[semantic];
                    if (semanticInfo.isTranspose) {
                        var matrixNoTranspose = matrices[semanticInfo.semanticNoTranspose];
                        mat4.transpose(matrix, matrixNoTranspose);
                    }
                    shader.setUniform(_gl, semanticInfo.type, semanticInfo.symbol, matrix);
                }

                if (renderable.cullFace !== cullFace) {
                    cullFace = renderable.cullFace;
                    _gl.cullFace(cullFace);
                }
                if (renderable.frontFace !== frontFace) {
                    frontFace = renderable.frontFace;
                    _gl.frontFace(frontFace);
                }
                if (renderable.culling !== culling) {
                    culling = renderable.culling;
                    culling ? _gl.enable(_gl.CULL_FACE) : _gl.disable(_gl.CULL_FACE);
                }

                var objectRenderInfo = renderable.render(_gl, shader);

                if (objectRenderInfo) {
                    renderInfo.triangleCount += objectRenderInfo.triangleCount;
                    renderInfo.vertexCount += objectRenderInfo.vertexCount;
                    renderInfo.drawCallCount += objectRenderInfo.drawCallCount;
                    renderInfo.renderedMeshCount ++;
                }

                // After render hook
                this.afterRenderObject(renderable, objectRenderInfo);
                renderable.afterRender(_gl, objectRenderInfo);
            }

            return renderInfo;
        },

        /**
         * If an scene object is culled by camera frustum
         *
         * Object can be a renderable or a light
         *
         * @param {qtek.Node} Scene object
         * @param {qtek.Camera} camera
         * @param {Array.<number>} worldViewMat represented with array
         * @param {Array.<number>} projectionMat represented with array
         */
        isFrustumCulled: (function () {
            // Frustum culling
            // http://www.cse.chalmers.se/~uffe/vfc_bbox.pdf
            var cullingBoundingBox = new BoundingBox();
            var cullingMatrix = new Matrix4();
            return function(object, scene, camera, worldViewMat, projectionMat) {
                // Bounding box can be a property of object(like light) or renderable.geometry
                var geoBBox = object.boundingBox || object.geometry.boundingBox;
                cullingMatrix._array = worldViewMat;
                cullingBoundingBox.copy(geoBBox);
                cullingBoundingBox.applyTransform(cullingMatrix);

                // Passingly update the scene bounding box
                // FIXME exclude very large mesh like ground plane or terrain ?
                // FIXME Only rendererable which cast shadow ?

                // FIXME boundingBox becomes much larger after transformd.
                if (scene && object.isRenderable() && object.castShadow) {
                    scene.viewBoundingBoxLastFrame.union(cullingBoundingBox);
                }

                if (object.frustumCulling)  {
                    if (!cullingBoundingBox.intersectBoundingBox(camera.frustum.boundingBox)) {
                        return true;
                    }

                    cullingMatrix._array = projectionMat;
                    if (
                        cullingBoundingBox.max._array[2] > 0 &&
                        cullingBoundingBox.min._array[2] < 0
                    ) {
                        // Clip in the near plane
                        cullingBoundingBox.max._array[2] = -1e-20;
                    }

                    cullingBoundingBox.applyProjection(cullingMatrix);

                    var min = cullingBoundingBox.min._array;
                    var max = cullingBoundingBox.max._array;

                    if (
                        max[0] < -1 || min[0] > 1
                        || max[1] < -1 || min[1] > 1
                        || max[2] < -1 || min[2] > 1
                    ) {
                        return true;
                    }
                }

                return false;
            };
        })(),

        /**
         * Dispose given scene, including all geometris, textures and shaders in the scene
         * @param {qtek.Scene} scene
         */
        disposeScene: function(scene) {
            this.disposeNode(scene, true, true);
            scene.dispose();
        },

        /**
         * Dispose given node, including all geometries, textures and shaders attached on it or its descendant
         * @param {qtek.Node} node
         * @param {boolean} [disposeGeometry=false] If dispose the geometries used in the descendant mesh
         * @param {boolean} [disposeTexture=false] If dispose the textures used in the descendant mesh
         */
        disposeNode: function(root, disposeGeometry, disposeTexture) {
            var materials = {};
            var _gl = this.gl;
            // Dettached from parent
            if (root.getParent()) {
                root.getParent().remove(root);
            }
            root.traverse(function(node) {
                if (node.geometry && disposeGeometry) {
                    node.geometry.dispose(_gl);
                }
                if (node.material) {
                    materials[node.material.__GUID__] = node.material;
                }
                // Particle system and AmbientCubemap light need to dispose
                if (node.dispose) {
                    node.dispose(_gl);
                }
            });
            for (var guid in materials) {
                var mat = materials[guid];
                mat.dispose(_gl, disposeTexture);
            }
        },

        /**
         * Dispose given shader
         * @param {qtek.Shader} shader
         */
        disposeShader: function(shader) {
            shader.dispose(this.gl);
        },

        /**
         * Dispose given geometry
         * @param {qtek.Geometry} geometry
         */
        disposeGeometry: function(geometry) {
            geometry.dispose(this.gl);
        },

        /**
         * Dispose given texture
         * @param {qtek.Texture} texture
         */
        disposeTexture: function(texture) {
            texture.dispose(this.gl);
        },

        /**
         * Dispose given frame buffer
         * @param {qtek.FrameBuffer} frameBuffer
         */
        disposeFrameBuffer: function(frameBuffer) {
            frameBuffer.dispose(this.gl);
        },

        /**
         * Dispose renderer
         */
        dispose: function () {
            glinfo.dispose(this.gl);
        },

        /**
         * Convert screen coords to normalized device coordinates(NDC)
         * Screen coords can get from mouse event, it is positioned relative to canvas element
         * NDC can be used in ray casting with Camera.prototype.castRay methods
         *
         * @param  {number}       x
         * @param  {number}       y
         * @param  {qtek.math.Vector2} [out]
         * @return {qtek.math.Vector2}
         */
        screenToNDC: function(x, y, out) {
            if (!out) {
                out = new Vector2();
            }
            // Invert y;
            y = this._height - y;

            var viewport = this.viewport;
            var arr = out._array;
            arr[0] = (x - viewport.x) / viewport.width;
            arr[0] = arr[0] * 2 - 1;
            arr[1] = (y - viewport.y) / viewport.height;
            arr[1] = arr[1] * 2 - 1;

            return out;
        }
    });

    /**
     * Opaque renderables compare function
     * @param  {qtek.Renderable} x
     * @param  {qtek.Renderable} y
     * @return {boolean}
     * @static
     */
    Renderer.opaqueSortFunc = Renderer.prototype.opaqueSortFunc = function(x, y) {
        // Priority renderOrder -> shader -> material -> geometry
        if (x.renderOrder === y.renderOrder) {
            if (x.material.shader === y.material.shader) {
                if (x.material === y.material) {
                    return x.geometry.__GUID__ - y.geometry.__GUID__;
                }
                return x.material.__GUID__ - y.material.__GUID__;
            }
            return x.material.shader.__GUID__ - y.material.shader.__GUID__;
        }
        return x.renderOrder - y.renderOrder;
    };

    /**
     * Transparent renderables compare function
     * @param  {qtek.Renderable} a
     * @param  {qtek.Renderable} b
     * @return {boolean}
     * @static
     */
    Renderer.transparentSortFunc = Renderer.prototype.transparentSortFunc = function(x, y) {
        // Priority renderOrder -> depth -> shader -> material -> geometry

        if (x.renderOrder === y.renderOrder) {
            if (x.__depth === y.__depth) {
                if (x.material.shader === y.material.shader) {
                    if (x.material === y.material) {
                        return x.geometry.__GUID__ - y.geometry.__GUID__;
                    }
                    return x.material.__GUID__ - y.material.__GUID__;
                }
                return x.material.shader.__GUID__ - y.material.shader.__GUID__;
            }
            // Depth is negative
            // So farther object has smaller depth value
            return x.__depth - y.__depth;
        }
        return x.renderOrder - y.renderOrder;
    };

    // Temporary variables
    var matrices = {
        WORLD: mat4Create(),
        VIEW: mat4Create(),
        PROJECTION: mat4Create(),
        WORLDVIEW: mat4Create(),
        VIEWPROJECTION: mat4Create(),
        WORLDVIEWPROJECTION: mat4Create(),

        WORLDINVERSE: mat4Create(),
        VIEWINVERSE: mat4Create(),
        PROJECTIONINVERSE: mat4Create(),
        WORLDVIEWINVERSE: mat4Create(),
        VIEWPROJECTIONINVERSE: mat4Create(),
        WORLDVIEWPROJECTIONINVERSE: mat4Create(),

        WORLDTRANSPOSE: mat4Create(),
        VIEWTRANSPOSE: mat4Create(),
        PROJECTIONTRANSPOSE: mat4Create(),
        WORLDVIEWTRANSPOSE: mat4Create(),
        VIEWPROJECTIONTRANSPOSE: mat4Create(),
        WORLDVIEWPROJECTIONTRANSPOSE: mat4Create(),
        WORLDINVERSETRANSPOSE: mat4Create(),
        VIEWINVERSETRANSPOSE: mat4Create(),
        PROJECTIONINVERSETRANSPOSE: mat4Create(),
        WORLDVIEWINVERSETRANSPOSE: mat4Create(),
        VIEWPROJECTIONINVERSETRANSPOSE: mat4Create(),
        WORLDVIEWPROJECTIONINVERSETRANSPOSE: mat4Create()
    };

    Renderer.COLOR_BUFFER_BIT = glenum.COLOR_BUFFER_BIT;
    Renderer.DEPTH_BUFFER_BIT = glenum.DEPTH_BUFFER_BIT;
    Renderer.STENCIL_BUFFER_BIT = glenum.STENCIL_BUFFER_BIT;

    module.exports = Renderer;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Node = __webpack_require__(7);
    var Light = __webpack_require__(9);
    var BoundingBox = __webpack_require__(4);

    /**
     * @constructor qtek.Scene
     * @extends qtek.Node
     */
    var Scene = Node.extend(function () {
        return /** @lends qtek.Scene# */ {
            /**
             * Global material of scene
             * @type {Material}
             */
            material: null,

            /**
             * @type {boolean}
             */
            autoUpdate: true,

            /**
             * Opaque renderable list, it will be updated automatically
             * @type {Renderable[]}
             * @readonly
             */
            opaqueQueue: [],

            /**
             * Opaque renderable list, it will be updated automatically
             * @type {Renderable[]}
             * @readonly
             */
            transparentQueue: [],

            lights: [],


            /**
             * Scene bounding box in view space.
             * Used when camera needs to adujst the near and far plane automatically
             * so that the view frustum contains the visible objects as tightly as possible.
             * Notice:
             *  It is updated after rendering (in the step of frustum culling passingly). So may be not so accurate, but saves a lot of calculation
             *
             * @type {qtek.math.BoundingBox}
             */
            viewBoundingBoxLastFrame: new BoundingBox(),

            // Properties to save the light information in the scene
            // Will be set in the render function
            _lightUniforms: {},

            _lightNumber: {
                // groupId: {
                    // POINT_LIGHT: 0,
                    // DIRECTIONAL_LIGHT: 0,
                    // SPOT_LIGHT: 0,
                    // AMBIENT_LIGHT: 0,
                    // AMBIENT_SH_LIGHT: 0
                // }
            },

            _opaqueObjectCount: 0,
            _transparentObjectCount: 0,

            _nodeRepository: {},

        };
    }, function () {
        this._scene = this;
    },
    /** @lends qtek.Scene.prototype. */
    {
        /**
         * Add node to scene
         * @param {Node} node
         */
        addToScene: function (node) {
            if (node.name) {
                this._nodeRepository[node.name] = node;
            }
        },

        /**
         * Remove node from scene
         * @param {Node} node
         */
        removeFromScene: function (node) {
            if (node.name) {
                delete this._nodeRepository[node.name];
            }
        },

        /**
         * Get node by name
         * @param  {string} name
         * @return {Node}
         * @DEPRECATED
         */
        getNode: function (name) {
            return this._nodeRepository[name];
        },

        /**
         * Clone a new scene node recursively, including material, skeleton.
         * Shader and geometry instances will not been cloned
         * @param  {qtek.Node} node
         * @return {qtek.Node}
         */
        cloneNode: function (node) {
            var newNode = node.clone();
            var materialsMap = {};

            var cloneSkeleton = function (current, currentNew) {
                if (current.skeleton) {
                    currentNew.skeleton = current.skeleton.clone(node, newNode);
                    currentNew.joints = current.joints.slice();
                }
                if (current.material) {
                    materialsMap[current.material.__GUID__] = {
                        oldMat: current.material
                    };
                }
                for (var i = 0; i < current._children.length; i++) {
                    cloneSkeleton(current._children[i], currentNew._children[i]);
                }
            };

            cloneSkeleton(node, newNode);

            for (var guid in materialsMap) {
                materialsMap[guid].newMat = materialsMap[guid].oldMat.clone();
            }

            // Replace material
            newNode.traverse(function (current) {
                if (current.material) {
                    current.material = materialsMap[current.material.__GUID__].newMat;
                }
            });

            return newNode;
        },


        /**
         * Scene update
         * @param  {boolean} force
         * @param  {boolean} notUpdateLights
         *         Useful in deferred pipeline
         */
        update: function (force, notUpdateLights) {
            if (!(this.autoUpdate || force)) {
                return;
            }
            Node.prototype.update.call(this, force);

            var lights = this.lights;
            var sceneMaterialTransparent = this.material && this.material.transparent;

            this._opaqueObjectCount = 0;
            this._transparentObjectCount = 0;

            lights.length = 0;

            this._updateRenderQueue(this, sceneMaterialTransparent);

            this.opaqueQueue.length = this._opaqueObjectCount;
            this.transparentQueue.length = this._transparentObjectCount;

            // reset
            if (!notUpdateLights) {
                var lightNumber = this._lightNumber;
                // Reset light numbers
                for (var group in lightNumber) {
                    for (var type in lightNumber[group]) {
                        lightNumber[group][type] = 0;
                    }
                }
                for (var i = 0; i < lights.length; i++) {
                    var light = lights[i];
                    var group = light.group;
                    if (!lightNumber[group]) {
                        lightNumber[group] = {};
                    }
                    // User can use any type of light
                    lightNumber[group][light.type] = lightNumber[group][light.type] || 0;
                    lightNumber[group][light.type]++;
                }
                // PENDING Remove unused group?

                this._updateLightUniforms();
            }
        },

        // Traverse the scene and add the renderable
        // object to the render queue
        _updateRenderQueue: function (parent, sceneMaterialTransparent) {
            if (parent.invisible) {
                return;
            }

            for (var i = 0; i < parent._children.length; i++) {
                var child = parent._children[i];

                if (child instanceof Light) {
                    this.lights.push(child);
                }
                if (child.isRenderable()) {
                    if (child.material.transparent || sceneMaterialTransparent) {
                        this.transparentQueue[this._transparentObjectCount++] = child;
                    }
                    else {
                        this.opaqueQueue[this._opaqueObjectCount++] = child;
                    }
                }
                if (child._children.length > 0) {
                    this._updateRenderQueue(child);
                }
            }
        },

        _updateLightUniforms: function () {
            var lights = this.lights;
            // Put the light cast shadow before the light not cast shadow
            lights.sort(lightSortFunc);

            var lightUniforms = this._lightUniforms;
            for (var group in lightUniforms) {
                for (var symbol in lightUniforms[group]) {
                    lightUniforms[group][symbol].value.length = 0;
                }
            }
            for (var i = 0; i < lights.length; i++) {

                var light = lights[i];
                var group = light.group;

                for (var symbol in light.uniformTemplates) {

                    var uniformTpl = light.uniformTemplates[symbol];
                    if (!lightUniforms[group]) {
                        lightUniforms[group] = {};
                    }
                    if (!lightUniforms[group][symbol]) {
                        lightUniforms[group][symbol] = {
                            type: '',
                            value: []
                        };
                    }
                    var value = uniformTpl.value(light);
                    var lu = lightUniforms[group][symbol];
                    lu.type = uniformTpl.type + 'v';
                    switch (uniformTpl.type) {
                        case '1i':
                        case '1f':
                        case 't':
                            lu.value.push(value);
                            break;
                        case '2f':
                        case '3f':
                        case '4f':
                            for (var j =0; j < value.length; j++) {
                                lu.value.push(value[j]);
                            }
                            break;
                        default:
                            console.error('Unkown light uniform type ' + uniformTpl.type);
                    }
                }
            }
        },

        isShaderLightNumberChanged: function (shader) {
            var group = shader.lightGroup;
            // PENDING Performance
            for (var type in this._lightNumber[group]) {
                if (this._lightNumber[group][type] !== shader.lightNumber[type]) {
                    return true;
                }
            }
            for (var type in shader.lightNumber) {
                if (this._lightNumber[group][type] !== shader.lightNumber[type]) {
                    return true;
                }
            }
            return false;
        },

        setShaderLightNumber: function (shader) {
            var group = shader.lightGroup;
            for (var type in this._lightNumber[group]) {
                shader.lightNumber[type] = this._lightNumber[group][type];
            }
            shader.dirty();
        },

        setLightUniforms: function (shader, _gl) {
            var group = shader.lightGroup;
            for (var symbol in this._lightUniforms[group]) {
                var lu = this._lightUniforms[group][symbol];
                if (lu.type === 'tv') {
                    for (var i = 0; i < lu.value.length; i++) {
                        var texture = lu.value[i];
                        var slot = shader.currentTextureSlot();
                        var result = shader.setUniform(_gl, '1i', symbol, slot);
                        if (result) {
                            shader.useCurrentTextureSlot(_gl, texture);
                        }
                    }
                }
                else {
                    shader.setUniform(_gl, lu.type, symbol, lu.value);
                }
            }
        },

        /**
         * Dispose self, clear all the scene objects
         * But resources of gl like texuture, shader will not be disposed.
         * Mostly you should use disposeScene method in Renderer to do dispose.
         */
        dispose: function () {
            this.material = null;
            this.opaqueQueue = [];
            this.transparentQueue = [];

            this.lights = [];

            this._lightUniforms = {};

            this._lightNumber = {};
            this._nodeRepository = {};
        }
    });

    function lightSortFunc(a, b) {
        if (b.castShadow && !a.castShadow) {
            return true;
        }
    }

    module.exports = Scene;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Material = __webpack_require__(10);

    var Shader = __webpack_require__(5);
    // Import standard shader
    Shader['import'](__webpack_require__(38));

    var shaderLibrary = {};
    var shaderUsedCount = {};

    var TEXTURE_PROPERTIES = ['diffuseMap', 'normalMap', 'roughnessMap', 'metalnessMap', 'emissiveMap', 'environmentMap', 'brdfLookup', 'ssaoMap', 'aoMap'];
    var SIMPLE_PROPERTIES = ['color', 'emission', 'emissionIntensity', 'alpha', 'roughness', 'metalness', 'uvRepeat', 'uvOffset', 'aoIntensity'];
    var PROPERTIES_CHANGE_SHADER = ['jointCount', 'linear', 'encodeRGBM', 'decodeRGBM'];

    var OTHER_SHADER_KEYS = [
        'environmentMapPrefiltered',
        'linear',
        'encodeRGBM',
        'decodeRGBM',
        'parallaxCorrected'
    ];
    var SHADER_KEYS = TEXTURE_PROPERTIES.concat(OTHER_SHADER_KEYS);

    var KEY_OFFSETS = SHADER_KEYS.reduce(function (obj, name, idx) {
        obj[name] = 256 << idx;
        return obj;
    }, {});

    function makeKey (enabledMaps, jointCount, shaderDefines) {
        // jointCount from 0 to 255
        var key = jointCount;
        for (var i = 0; i < enabledMaps.length; i++) {
            key += KEY_OFFSETS[enabledMaps[i]];
        }
        for (var i = 0; i < OTHER_SHADER_KEYS.length; i++) {
            var propName = OTHER_SHADER_KEYS[i];
            if (shaderDefines[propName]) {
                key += KEY_OFFSETS[propName];
            }
        }

        return key;
    }

    function allocateShader (enabledMaps, jointCount, shaderDefines) {
        var key = makeKey(enabledMaps, jointCount, shaderDefines);
        var shader = shaderLibrary[key];

        if (!shader) {
            shader = new Shader({
                vertex: Shader.source('qtek.standard.vertex'),
                fragment: Shader.source('qtek.standard.fragment')
            });
            shader.enableTexture(enabledMaps);
            shader.define('fragment', 'USE_METALNESS');
            shader.define('fragment', 'USE_ROUGHNESS');
            if (jointCount) {
                shader.define('vertex', 'SKINNING');
                shader.define('vertex', 'JOINT_COUNT', jointCount);
            }
            if (shaderDefines.environmentMapPrefiltered) {
                shader.define('fragment', 'ENVIRONMENTMAP_PREFILTER');
            }
            if (shaderDefines.linear) {
                shader.define('fragment', 'SRGB_DECODE');
            }
            if (shaderDefines.encodeRGBM) {
                shader.define('fragment', 'RGBM_ENCODE');
            }
            if (shaderDefines.decodeRGBM) {
                shader.define('fragment', 'RGBM_DECODE');
            }
            if (shaderDefines.parallaxCorrected) {
                shader.define('fragment', 'PARALLAX_CORRECTED');
            }

            shaderLibrary[key] = shader;
            shaderUsedCount[key] = 0;
        }
        shaderUsedCount[key]++;

        shader.__key__ = key;

        return shader;
    }
    function releaseShader (shader, _gl) {
        var key = shader.__key__;
        if (shaderLibrary[key]) {
            shaderUsedCount[key]--;
            if (!shaderUsedCount[key]) {
                delete shaderLibrary[key];
                delete shaderUsedCount[key];

                if (_gl) {
                    // Since shader may not be used on any material. We need to dispose it
                    shader.dispose(_gl);
                }
            }
        }
    }

    var StandardMaterial = Material.extend(function () {

        return {

            /**
             * @type {Array.<number>}
             * @name color
             * @default [1, 1, 1]
             */
            color: [1, 1, 1],

            /**
             * @type {Array.<number>}
             * @name emission
             * @default [0, 0, 0]
             */
            emission: [0, 0, 0],

            /**
             * @type {number}
             * @name emissionIntensity
             * @default 0
             */
            emissionIntensity: 0,

            /**
             * @type {number}
             * @name roughness
             * @default 0.5
             */
            roughness: 0.5,

            /**
             * @type {number}
             * @name metalness
             * @default 0
             */
            metalness: 0,

            /**
             * @type {number}
             * @name alpha
             * @default 1
             */
            alpha: 1,


            /**
             * @type {qtek.Texture2D}
             * @name diffuseMap
             */

            /**
             * @type {qtek.Texture2D}
             * @name normalMap
             */

            /**
             * @type {qtek.Texture2D}
             * @name roughnessMap
             */

            /**
             * @type {qtek.Texture2D}
             * @name metalnessMap
             */
            /**
             * @type {qtek.Texture2D}
             * @name emissiveMap
             */

            /**
             * @type {qtek.TextureCube}
             * @name environmentMap
             */

            /**
             * @type {qtek.math.BoundingBox}
             * @name environmentBox
             */

            /**
             * BRDF Lookup is generated by qtek.util.cubemap.integrateBrdf
             * @type {qtek.Texture2D}
             * @name brdfLookup
             */

            /**
             * @type {qtek.Texture2D}
             * @name ssaoMap
             */

            /**
             * @type {qtek.Texture2D}
             * @name aoMap
             */

            /**
             * @type {Array.<number>}
             * @name uvRepeat
             * @default [1, 1]
             */
            uvRepeat: [1, 1],

            /**
             * @type {Array.<number>}
             * @name uvOffset
             * @default [0, 0]
             */
            uvOffset: [0, 0],

            /**
             * @type {number}
             * @default 1
             */
            aoIntensity: 1,

            /**
             * @type {number}
             * @name jointCount
             * @default 0
             */
            // FIXME Redundant with mesh
            jointCount: 0,

            /**
             * @type {boolean}
             * @name environmentMapPrefiltered
             */
            environmentMapPrefiltered: false,

            /**
             * @type {boolean}
             * @name linear
             */
            linear: false,

            /**
             * @type {boolean}
             * @name encodeRGBM
             */
            encodeRGBM: false,

            /**
             * @type {boolean}
             * @name decodeRGBM
             */
            decodeRGBM: false
        };
    }, {

        _doUpdateShader: function (gl) {
            var enabledTextures = TEXTURE_PROPERTIES.filter(function (name) {
                return !!this[name];
            }, this);
            if (this._shader) {
                releaseShader(this._shader, gl);
                this._shader.detached();
            }

            var shader = allocateShader(
                enabledTextures, this.jointCount || 0, {
                    environmentMapPrefiltered: this.environmentMapPrefiltered,
                    linear: this.linear,
                    encodeRGBM: this.encodeRGBM,
                    decodeRGBM: this.decodeRGBM,
                    parallaxCorrected: !!this._environmentBox
                }
            );
            var originalUniforms = this.uniforms;

            // Ignore if uniform can use in shader.
            this.uniforms = shader.createUniforms();
            this._shader = shader;

            var uniforms = this.uniforms;
            this._enabledUniforms = Object.keys(uniforms);

            // Keep uniform
            for (var symbol in originalUniforms) {
                if (uniforms[symbol]) {
                    uniforms[symbol].value = originalUniforms[symbol].value;
                }
            }

            shader.attached();

            this._shaderDirty = false;
        },

        updateShader: function (gl) {
            if (this._shaderDirty) {
                this._doUpdateShader(gl);
                this._shaderDirty = false;
            }
        },

        attachShader: function () {
            // Do nothing.
            // console.warn('StandardMaterial can\'t change shader');
        },

        dispose: function (gl, disposeTexture) {
            if (this._shader) {
                releaseShader(this._shader);
            }
            Material.prototype.dispose.call(gl, disposeTexture);
        },


        clone: function () {
            var material = new StandardMaterial({
                name: this.name
            });
            TEXTURE_PROPERTIES.forEach(function (propName) {
                if (this[propName]) {
                    material[propName] = this[propName];
                }
            }, this);
            SIMPLE_PROPERTIES.concat(PROPERTIES_CHANGE_SHADER).forEach(function (propName) {
                material[propName] = this[propName];
            }, this);
            return material;
        }
    });

    SIMPLE_PROPERTIES.forEach(function (propName) {
        Object.defineProperty(StandardMaterial.prototype, propName, {
            get: function () {
                return this.get(propName);
            },
            set: function (value) {
                var uniforms = this.uniforms = this.uniforms || {};
                uniforms[propName] = uniforms[propName] || {
                    value: null
                };
                this.setUniform(propName, value);
            }
        });
    });

    TEXTURE_PROPERTIES.forEach(function (propName) {
        Object.defineProperty(StandardMaterial.prototype, propName, {
            get: function () {
                return this.get(propName);
            },
            set: function (value) {
                var uniforms = this.uniforms = this.uniforms || {};
                uniforms[propName] = uniforms[propName] || {
                    value: null
                };

                var oldVal = this.get(propName);
                this.setUniform(propName, value);

                if (!oldVal !== !value) {
                    this._shaderDirty = true;
                }
            }
        });
    });

    PROPERTIES_CHANGE_SHADER.forEach(function (propName) {
        var privateKey = '_' + propName;
        Object.defineProperty(StandardMaterial.prototype, propName, {
            get: function () {
                return this[privateKey];
            },
            set: function (value) {
                var oldVal = this[privateKey];
                this[privateKey] = value;
                if (oldVal !== value) {
                    this._shaderDirty = true;
                }
            }
        });
    });

    Object.defineProperty(StandardMaterial.prototype, 'environmentBox', {
        get: function () {
            var envBox = this._environmentBox;
            if (envBox) {
                envBox.min.setArray(this.get('environmentBoxMin'));
                envBox.max.setArray(this.get('environmentBoxMax'));
            }
            return envBox;
        },

        set: function (value) {
            var oldVal = this._environmentBox;
            this._environmentBox = value;

            var uniforms = this.uniforms = this.uniforms || {};
            uniforms['environmentBoxMin'] = uniforms['environmentBoxMin'] || {
                value: null
            };
            uniforms['environmentBoxMax'] = uniforms['environmentBoxMax'] || {
                value: null
            };

            // TODO Can't detect operation like box.min = new Vector()
            if (value) {
                this.setUniform('environmentBoxMin', value.min._array);
                this.setUniform('environmentBoxMax', value.max._array);
            }

            if (oldVal !== value) {
                this._shaderDirty = true;
            }
        }
    });

    Object.defineProperty(StandardMaterial.prototype, 'shader', {
        get: function () {
            // PENDING
            if (!this._shader) {
                this._shaderDirty = true;
                this.updateShader();
            }
            return this._shader;
        },
        set: function () {
            console.warn('StandardMaterial can\'t change shader');
        }
    });

    module.exports = StandardMaterial;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Clip = __webpack_require__(16);

    var glMatrix = __webpack_require__(0);
    var quat = glMatrix.quat;
    var vec3 = glMatrix.vec3;

    function keyframeSort(a, b) {
        return a.time - b.time;
    }

    /**
     * @constructor
     * @alias qtek.animation.TransformClip
     * @extends qtek.animation.Clip
     *
     * @param {Object} [opts]
     * @param {string} [opts.name]
     * @param {Object} [opts.target]
     * @param {number} [opts.life]
     * @param {number} [opts.delay]
     * @param {number} [opts.gap]
     * @param {number} [opts.playbackRatio]
     * @param {boolean|number} [opts.loop] If loop is a number, it indicate the loop count of animation
     * @param {string|Function} [opts.easing]
     * @param {Function} [opts.onframe]
     * @param {Function} [opts.onfinish]
     * @param {Function} [opts.onrestart]
     * @param {object[]} [opts.keyFrames]
     */
    var TransformClip = function(opts) {

        opts = opts || {};

        Clip.call(this, opts);

        //[{
        //  time: //ms
        //  position:  // optional
        //  rotation:  // optional
        //  scale:     // optional
        //}]
        this.keyFrames = [];
        if (opts.keyFrames) {
            this.addKeyFrames(opts.keyFrames);
        }

        /**
         * @type {Float32Array}
         */
        this.position = vec3.create();
        /**
         * Rotation is represented by a quaternion
         * @type {Float32Array}
         */
        this.rotation = quat.create();
        /**
         * @type {Float32Array}
         */
        this.scale = vec3.fromValues(1, 1, 1);

        this._cacheKey = 0;
        this._cacheTime = 0;
    };

    TransformClip.prototype = Object.create(Clip.prototype);

    TransformClip.prototype.constructor = TransformClip;

    TransformClip.prototype.step = function(time) {

        var ret = Clip.prototype.step.call(this, time);

        if (ret !== 'finish') {
            this.setTime(this._elapsedTime);
        }

        return ret;
    };

    TransformClip.prototype.setTime = function(time) {
        this._interpolateField(time, 'position');
        this._interpolateField(time, 'rotation');
        this._interpolateField(time, 'scale');
    };
    /**
     * Add a key frame
     * @param {Object} kf
     */
    TransformClip.prototype.addKeyFrame = function(kf) {
        for (var i = 0; i < this.keyFrames.length - 1; i++) {
            var prevFrame = this.keyFrames[i];
            var nextFrame = this.keyFrames[i+1];
            if (prevFrame.time <= kf.time && nextFrame.time >= kf.time) {
                this.keyFrames.splice(i, 0, kf);
                return i;
            }
        }

        this.life = kf.time;
        this.keyFrames.push(kf);
    };

    /**
     * Add keyframes
     * @param {object[]} kfs
     */
    TransformClip.prototype.addKeyFrames = function(kfs) {
        for (var i = 0; i < kfs.length; i++) {
            this.keyFrames.push(kfs[i]);
        }

        this.keyFrames.sort(keyframeSort);

        this.life = this.keyFrames[this.keyFrames.length - 1].time;
    };

    TransformClip.prototype._interpolateField = function(time, fieldName) {
        var kfs = this.keyFrames;
        var len = kfs.length;
        var start;
        var end;

        if (!kfs.length) {
            return;
        }
        if (time < kfs[0].time || time > kfs[kfs.length-1].time) {
            return;
        }
        if (time < this._cacheTime) {
            var s = this._cacheKey >= len-1 ? len-1 : this._cacheKey+1;
            for (var i = s; i >= 0; i--) {
                if (kfs[i].time <= time && kfs[i][fieldName]) {
                    start = kfs[i];
                    this._cacheKey = i;
                    this._cacheTime = time;
                } else if (kfs[i][fieldName]) {
                    end = kfs[i];
                    break;
                }
            }
        } else {
            for (var i = this._cacheKey; i < len; i++) {
                if (kfs[i].time <= time && kfs[i][fieldName]) {
                    start = kfs[i];
                    this._cacheKey = i;
                    this._cacheTime = time;
                } else if (kfs[i][fieldName]) {
                    end = kfs[i];
                    break;
                }
            }
        }

        if (start && end) {
            var percent = (time-start.time) / (end.time-start.time);
            percent = Math.max(Math.min(percent, 1), 0);
            if (fieldName === 'rotation') {
                quat.slerp(this[fieldName], start[fieldName], end[fieldName], percent);
            } else {
                vec3.lerp(this[fieldName], start[fieldName], end[fieldName], percent);
            }
        } else {
            this._cacheKey = 0;
            this._cacheTime = 0;
        }
    };
    /**
     * 1D blending between two clips
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c1
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c2
     * @param  {number} w
     */
    TransformClip.prototype.blend1D = function(c1, c2, w) {
        vec3.lerp(this.position, c1.position, c2.position, w);
        vec3.lerp(this.scale, c1.scale, c2.scale, w);
        quat.slerp(this.rotation, c1.rotation, c2.rotation, w);
    };

    /**
     * 2D blending between three clips
     * @method
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c1
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c2
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c3
     * @param  {number} f
     * @param  {number} g
     */
    TransformClip.prototype.blend2D = (function() {
        var q1 = quat.create();
        var q2 = quat.create();
        return function(c1, c2, c3, f, g) {
            var a = 1 - f - g;

            this.position[0] = c1.position[0] * a + c2.position[0] * f + c3.position[0] * g;
            this.position[1] = c1.position[1] * a + c2.position[1] * f + c3.position[1] * g;
            this.position[2] = c1.position[2] * a + c2.position[2] * f + c3.position[2] * g;

            this.scale[0] = c1.scale[0] * a + c2.scale[0] * f + c3.scale[0] * g;
            this.scale[1] = c1.scale[1] * a + c2.scale[1] * f + c3.scale[1] * g;
            this.scale[2] = c1.scale[2] * a + c2.scale[2] * f + c3.scale[2] * g;

            // http://msdn.microsoft.com/en-us/library/windows/desktop/bb205403(v=vs.85).aspx
            // http://msdn.microsoft.com/en-us/library/windows/desktop/microsoft.directx_sdk.quaternion.xmquaternionbarycentric(v=vs.85).aspx
            var s = f + g;
            if (s === 0) {
                quat.copy(this.rotation, c1.rotation);
            } else {
                quat.slerp(q1, c1.rotation, c2.rotation, s);
                quat.slerp(q2, c1.rotation, c3.rotation, s);
                quat.slerp(this.rotation, q1, q2, g / s);
            }
        };
    })();

    /**
     * Additive blending between two clips
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c1
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c2
     */
    TransformClip.prototype.additiveBlend = function(c1, c2) {
        vec3.add(this.position, c1.position, c2.position);
        vec3.add(this.scale, c1.scale, c2.scale);
        quat.multiply(this.rotation, c2.rotation, c1.rotation);
    };

    /**
     * Subtractive blending between two clips
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c1
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c2
     */
    TransformClip.prototype.subtractiveBlend = function(c1, c2) {
        vec3.sub(this.position, c1.position, c2.position);
        vec3.sub(this.scale, c1.scale, c2.scale);
        quat.invert(this.rotation, c2.rotation);
        quat.multiply(this.rotation, this.rotation, c1.rotation);
    };

    /**
     * @param {number} startTime
     * @param {number} endTime
     * @param {boolean} isLoop
     */
    TransformClip.prototype.getSubClip = function(startTime, endTime) {
        // TODO
        console.warn('TODO');
    };

    /**
     * Clone a new TransformClip
     * @return {qtek.animation.TransformClip}
     */
    TransformClip.prototype.clone = function () {
        var clip = Clip.prototype.clone.call(this);
        clip.keyFrames = this.keyFrames;

        vec3.copy(clip.position, this.position);
        quat.copy(clip.rotation, this.rotation);
        vec3.copy(clip.scale, this.scale);

        return clip;
    };


    module.exports = TransformClip;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var StaticGeometry = __webpack_require__(11);
    var BoundingBox = __webpack_require__(4);

    /**
     * @constructor qtek.geometry.Plane
     * @extends qtek.StaticGeometry
     * @param {Object} [opt]
     * @param {number} [opt.widthSegments]
     * @param {number} [opt.heightSegments]
     */
    var Plane = StaticGeometry.extend(
    /** @lends qtek.geometry.Plane# */
    {
        /**
         * @type {number}
         */
        widthSegments: 1,
        /**
         * @type {number}
         */
        heightSegments: 1
    }, function() {
        this.build();
    },
    /** @lends qtek.geometry.Plane.prototype */
    {
        /**
         * Build plane geometry
         */
        build: function() {
            var heightSegments = this.heightSegments;
            var widthSegments = this.widthSegments;
            var attributes = this.attributes;
            var positions = [];
            var texcoords = [];
            var normals = [];
            var faces = [];

            for (var y = 0; y <= heightSegments; y++) {
                var t = y / heightSegments;
                for (var x = 0; x <= widthSegments; x++) {
                    var s = x / widthSegments;

                    positions.push([2 * s - 1, 2 * t - 1, 0]);
                    if (texcoords) {
                        texcoords.push([s, t]);
                    }
                    if (normals) {
                        normals.push([0, 0, 1]);
                    }
                    if (x < widthSegments && y < heightSegments) {
                        var i = x + y * (widthSegments + 1);
                        faces.push([i, i + 1, i + widthSegments + 1]);
                        faces.push([i + widthSegments + 1, i + 1, i + widthSegments + 2]);
                    }
                }
            }

            attributes.position.fromArray(positions);
            attributes.texcoord0.fromArray(texcoords);
            attributes.normal.fromArray(normals);

            this.initIndicesFromArray(faces);

            this.boundingBox = new BoundingBox();
            this.boundingBox.min.set(-1, -1, 0);
            this.boundingBox.max.set(1, 1, 0);
        }
    });

    module.exports = Plane;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Light = __webpack_require__(9);

    /**
     * @constructor qtek.light.Point
     * @extends qtek.Light
     */
    var PointLight = Light.extend(
    /** @lends qtek.light.Point# */
    {
        /**
         * @type {number}
         */
        range: 100,

        /**
         * @type {number}
         */
        castShadow: false
    }, {

        type: 'POINT_LIGHT',

        uniformTemplates: {
            pointLightPosition: {
                type: '3f',
                value: function(instance) {
                    return instance.getWorldPosition()._array;
                }
            },
            pointLightRange: {
                type: '1f',
                value: function(instance) {
                    return instance.range;
                }
            },
            pointLightColor: {
                type: '3f',
                value: function(instance) {
                    var color = instance.color,
                        intensity = instance.intensity;
                    return [ color[0]*intensity, color[1]*intensity, color[2]*intensity ];
                }
            }
        },
        /**
         * @return {qtek.light.Point}
         * @memberOf qtek.light.Point.prototype
         */
        clone: function() {
            var light = Light.prototype.clone.call(this);
            light.range = this.range;
            return light;
        }
    });

    module.exports = PointLight;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Light = __webpack_require__(9);
    var Vector3 = __webpack_require__(3);

    /**
     * @constructor qtek.light.Spot
     * @extends qtek.Light
     */
    var SpotLight = Light.extend(
    /**@lends qtek.light.Spot */
    {
        /**
         * @type {number}
         */
        range: 20,
        /**
         * @type {number}
         */
        umbraAngle: 30,
        /**
         * @type {number}
         */
        penumbraAngle: 45,
        /**
         * @type {number}
         */
        falloffFactor: 2.0,
        /**
         * @type {number}
         */
        shadowBias: 0.0002,
        /**
         * @type {number}
         */
        shadowSlopeScale: 2.0
    },{

        type: 'SPOT_LIGHT',

        uniformTemplates: {
            spotLightPosition: {
                type: '3f',
                value: function (instance) {
                    return instance.getWorldPosition()._array;
                }
            },
            spotLightRange: {
                type: '1f',
                value: function (instance) {
                    return instance.range;
                }
            },
            spotLightUmbraAngleCosine: {
                type: '1f',
                value: function (instance) {
                    return Math.cos(instance.umbraAngle * Math.PI / 180);
                }
            },
            spotLightPenumbraAngleCosine: {
                type: '1f',
                value: function (instance) {
                    return Math.cos(instance.penumbraAngle * Math.PI / 180);
                }
            },
            spotLightFalloffFactor: {
                type: '1f',
                value: function (instance) {
                    return instance.falloffFactor;
                }
            },
            spotLightDirection: {
                type: '3f',
                value: function (instance) {
                    instance.__dir = instance.__dir || new Vector3();
                    // Direction is target to eye
                    return instance.__dir.copy(instance.worldTransform.z).negate()._array;
                }
            },
            spotLightColor: {
                type: '3f',
                value: function (instance) {
                    var color = instance.color;
                    var intensity = instance.intensity;
                    return [color[0] * intensity, color[1] * intensity, color[2] * intensity];
                }
            }
        },
        /**
         * @return {qtek.light.Spot}
         * @memberOf qtek.light.Spot.prototype
         */
        clone: function () {
            var light = Light.prototype.clone.call(this);
            light.range = this.range;
            light.umbraAngle = this.umbraAngle;
            light.penumbraAngle = this.penumbraAngle;
            light.falloffFactor = this.falloffFactor;
            light.shadowBias = this.shadowBias;
            light.shadowSlopeScale = this.shadowSlopeScale;
            return light;
        }
    });

    module.exports = SpotLight;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Vector3 = __webpack_require__(3);
    var BoundingBox = __webpack_require__(4);
    var Plane = __webpack_require__(63);

    var glMatrix = __webpack_require__(0);
    var vec3 = glMatrix.vec3;

    var vec3Set = vec3.set;
    var vec3Copy = vec3.copy;
    var vec3TranformMat4 = vec3.transformMat4;
    var mathMin = Math.min;
    var mathMax = Math.max;
    /**
     * @constructor
     * @alias qtek.math.Frustum
     */
    var Frustum = function() {

        /**
         * Eight planes to enclose the frustum
         * @type {qtek.math.Plane[]}
         */
        this.planes = [];

        for (var i = 0; i < 6; i++) {
            this.planes.push(new Plane());
        }

        /**
         * Bounding box of frustum
         * @type {qtek.math.BoundingBox}
         */
        this.boundingBox = new BoundingBox();

        /**
         * Eight vertices of frustum
         * @type {Float32Array[]}
         */
        this.vertices = [];
        for (var i = 0; i < 8; i++) {
            this.vertices[i] = vec3.fromValues(0, 0, 0);
        }
    };

    Frustum.prototype = {

        // http://web.archive.org/web/20120531231005/http://crazyjoke.free.fr/doc/3D/plane%20extraction.pdf
        /**
         * Set frustum from a projection matrix
         * @param {qtek.math.Matrix4} projectionMatrix
         */
        setFromProjection: function(projectionMatrix) {

            var planes = this.planes;
            var m = projectionMatrix._array;
            var m0 = m[0], m1 = m[1], m2 = m[2], m3 = m[3];
            var m4 = m[4], m5 = m[5], m6 = m[6], m7 = m[7];
            var m8 = m[8], m9 = m[9], m10 = m[10], m11 = m[11];
            var m12 = m[12], m13 = m[13], m14 = m[14], m15 = m[15];

            // Update planes
            vec3Set(planes[0].normal._array, m3 - m0, m7 - m4, m11 - m8);
            planes[0].distance = -(m15 - m12);
            planes[0].normalize();

            vec3Set(planes[1].normal._array, m3 + m0, m7 + m4, m11 + m8);
            planes[1].distance = -(m15 + m12);
            planes[1].normalize();

            vec3Set(planes[2].normal._array, m3 + m1, m7 + m5, m11 + m9);
            planes[2].distance = -(m15 + m13);
            planes[2].normalize();

            vec3Set(planes[3].normal._array, m3 - m1, m7 - m5, m11 - m9);
            planes[3].distance = -(m15 - m13);
            planes[3].normalize();

            vec3Set(planes[4].normal._array, m3 - m2, m7 - m6, m11 - m10);
            planes[4].distance = -(m15 - m14);
            planes[4].normalize();

            vec3Set(planes[5].normal._array, m3 + m2, m7 + m6, m11 + m10);
            planes[5].distance = -(m15 + m14);
            planes[5].normalize();

            // Perspective projection
            var boundingBox = this.boundingBox;
            if (m15 === 0)  {
                var aspect = m5 / m0;
                var zNear = -m14 / (m10 - 1);
                var zFar = -m14 / (m10 + 1);
                var farY = -zFar / m5;
                var nearY = -zNear / m5;
                // Update bounding box
                boundingBox.min.set(-farY * aspect, -farY, zFar);
                boundingBox.max.set(farY * aspect, farY, zNear);
                // update vertices
                var vertices = this.vertices;
                //--- min z
                // min x
                vec3Set(vertices[0], -farY * aspect, -farY, zFar);
                vec3Set(vertices[1], -farY * aspect, farY, zFar);
                // max x
                vec3Set(vertices[2], farY * aspect, -farY, zFar);
                vec3Set(vertices[3], farY * aspect, farY, zFar);
                //-- max z
                vec3Set(vertices[4], -nearY * aspect, -nearY, zNear);
                vec3Set(vertices[5], -nearY * aspect, nearY, zNear);
                vec3Set(vertices[6], nearY * aspect, -nearY, zNear);
                vec3Set(vertices[7], nearY * aspect, nearY, zNear);
            }
            else { // Orthographic projection
                var left = (-1 - m12) / m0;
                var right = (1 - m12) / m0;
                var top = (1 - m13) / m5;
                var bottom = (-1 - m13) / m5;
                var near = (-1 - m14) / m10;
                var far = (1 - m14) / m10;

                boundingBox.min.set(left, bottom, far);
                boundingBox.max.set(right, top, near);

                var min = boundingBox.min._array;
                var max = boundingBox.max._array;
                var vertices = this.vertices;
                //--- min z
                // min x
                vec3Set(vertices[0], min[0], min[1], min[2]);
                vec3Set(vertices[1], min[0], max[1], min[2]);
                // max x
                vec3Set(vertices[2], max[0], min[1], min[2]);
                vec3Set(vertices[3], max[0], max[1], min[2]);
                //-- max z
                vec3Set(vertices[4], min[0], min[1], max[2]);
                vec3Set(vertices[5], min[0], max[1], max[2]);
                vec3Set(vertices[6], max[0], min[1], max[2]);
                vec3Set(vertices[7], max[0], max[1], max[2]);
            }
        },

        /**
         * Apply a affine transform matrix and set to the given bounding box
         * @method
         * @param {qtek.math.BoundingBox}
         * @param {qtek.math.Matrix4}
         * @return {qtek.math.BoundingBox}
         */
        getTransformedBoundingBox: (function() {

            var tmpVec3 = vec3.create();

            return function(bbox, matrix) {
                var vertices = this.vertices;

                var m4 = matrix._array;
                var min = bbox.min;
                var max = bbox.max;
                var minArr = min._array;
                var maxArr = max._array;
                var v = vertices[0];
                vec3TranformMat4(tmpVec3, v, m4);
                vec3Copy(minArr, tmpVec3);
                vec3Copy(maxArr, tmpVec3);

                for (var i = 1; i < 8; i++) {
                    v = vertices[i];
                    vec3TranformMat4(tmpVec3, v, m4);

                    minArr[0] = mathMin(tmpVec3[0], minArr[0]);
                    minArr[1] = mathMin(tmpVec3[1], minArr[1]);
                    minArr[2] = mathMin(tmpVec3[2], minArr[2]);

                    maxArr[0] = mathMax(tmpVec3[0], maxArr[0]);
                    maxArr[1] = mathMax(tmpVec3[1], maxArr[1]);
                    maxArr[2] = mathMax(tmpVec3[2], maxArr[2]);
                }

                min._dirty = true;
                max._dirty = true;

                return bbox;
            };
        }) ()
    };
    module.exports = Frustum;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var glMatrix = __webpack_require__(0);
    var vec2 = glMatrix.vec2;

    /**
     * @constructor
     * @alias qtek.math.Vector2
     * @param {number} x
     * @param {number} y
     */
    var Vector2 = function(x, y) {

        x = x || 0;
        y = y || 0;

        /**
         * Storage of Vector2, read and write of x, y will change the values in _array
         * All methods also operate on the _array instead of x, y components
         * @name _array
         * @type {Float32Array}
         */
        this._array = vec2.fromValues(x, y);

        /**
         * Dirty flag is used by the Node to determine
         * if the matrix is updated to latest
         * @name _dirty
         * @type {boolean}
         */
        this._dirty = true;
    };

    Vector2.prototype = {

        constructor: Vector2,

        /**
         * Add b to self
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        add: function(b) {
            vec2.add(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Set x and y components
         * @param  {number}  x
         * @param  {number}  y
         * @return {qtek.math.Vector2}
         */
        set: function(x, y) {
            this._array[0] = x;
            this._array[1] = y;
            this._dirty = true;
            return this;
        },

        /**
         * Set x and y components from array
         * @param  {Float32Array|number[]} arr
         * @return {qtek.math.Vector2}
         */
        setArray: function(arr) {
            this._array[0] = arr[0];
            this._array[1] = arr[1];

            this._dirty = true;
            return this;
        },

        /**
         * Clone a new Vector2
         * @return {qtek.math.Vector2}
         */
        clone: function() {
            return new Vector2(this.x, this.y);
        },

        /**
         * Copy x, y from b
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        copy: function(b) {
            vec2.copy(this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Cross product of self and b, written to a Vector3 out
         * @param  {qtek.math.Vector3} out
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        cross: function(out, b) {
            vec2.cross(out._array, this._array, b._array);
            out._dirty = true;
            return this;
        },

        /**
         * Alias for distance
         * @param  {qtek.math.Vector2} b
         * @return {number}
         */
        dist: function(b) {
            return vec2.dist(this._array, b._array);
        },

        /**
         * Distance between self and b
         * @param  {qtek.math.Vector2} b
         * @return {number}
         */
        distance: function(b) {
            return vec2.distance(this._array, b._array);
        },

        /**
         * Alias for divide
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        div: function(b) {
            vec2.div(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Divide self by b
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        divide: function(b) {
            vec2.divide(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Dot product of self and b
         * @param  {qtek.math.Vector2} b
         * @return {number}
         */
        dot: function(b) {
            return vec2.dot(this._array, b._array);
        },

        /**
         * Alias of length
         * @return {number}
         */
        len: function() {
            return vec2.len(this._array);
        },

        /**
         * Calculate the length
         * @return {number}
         */
        length: function() {
            return vec2.length(this._array);
        },

        /**
         * Linear interpolation between a and b
         * @param  {qtek.math.Vector2} a
         * @param  {qtek.math.Vector2} b
         * @param  {number}  t
         * @return {qtek.math.Vector2}
         */
        lerp: function(a, b, t) {
            vec2.lerp(this._array, a._array, b._array, t);
            this._dirty = true;
            return this;
        },

        /**
         * Minimum of self and b
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        min: function(b) {
            vec2.min(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Maximum of self and b
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        max: function(b) {
            vec2.max(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for multiply
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        mul: function(b) {
            vec2.mul(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Mutiply self and b
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        multiply: function(b) {
            vec2.multiply(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Negate self
         * @return {qtek.math.Vector2}
         */
        negate: function() {
            vec2.negate(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Normalize self
         * @return {qtek.math.Vector2}
         */
        normalize: function() {
            vec2.normalize(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Generate random x, y components with a given scale
         * @param  {number} scale
         * @return {qtek.math.Vector2}
         */
        random: function(scale) {
            vec2.random(this._array, scale);
            this._dirty = true;
            return this;
        },

        /**
         * Scale self
         * @param  {number}  scale
         * @return {qtek.math.Vector2}
         */
        scale: function(s) {
            vec2.scale(this._array, this._array, s);
            this._dirty = true;
            return this;
        },

        /**
         * Scale b and add to self
         * @param  {qtek.math.Vector2} b
         * @param  {number}  scale
         * @return {qtek.math.Vector2}
         */
        scaleAndAdd: function(b, s) {
            vec2.scaleAndAdd(this._array, this._array, b._array, s);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for squaredDistance
         * @param  {qtek.math.Vector2} b
         * @return {number}
         */
        sqrDist: function(b) {
            return vec2.sqrDist(this._array, b._array);
        },

        /**
         * Squared distance between self and b
         * @param  {qtek.math.Vector2} b
         * @return {number}
         */
        squaredDistance: function(b) {
            return vec2.squaredDistance(this._array, b._array);
        },

        /**
         * Alias for squaredLength
         * @return {number}
         */
        sqrLen: function() {
            return vec2.sqrLen(this._array);
        },

        /**
         * Squared length of self
         * @return {number}
         */
        squaredLength: function() {
            return vec2.squaredLength(this._array);
        },

        /**
         * Alias for subtract
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        sub: function(b) {
            vec2.sub(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Subtract b from self
         * @param  {qtek.math.Vector2} b
         * @return {qtek.math.Vector2}
         */
        subtract: function(b) {
            vec2.subtract(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transform self with a Matrix2 m
         * @param  {qtek.math.Matrix2} m
         * @return {qtek.math.Vector2}
         */
        transformMat2: function(m) {
            vec2.transformMat2(this._array, this._array, m._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transform self with a Matrix2d m
         * @param  {qtek.math.Matrix2d} m
         * @return {qtek.math.Vector2}
         */
        transformMat2d: function(m) {
            vec2.transformMat2d(this._array, this._array, m._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transform self with a Matrix3 m
         * @param  {qtek.math.Matrix3} m
         * @return {qtek.math.Vector2}
         */
        transformMat3: function(m) {
            vec2.transformMat3(this._array, this._array, m._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transform self with a Matrix4 m
         * @param  {qtek.math.Matrix4} m
         * @return {qtek.math.Vector2}
         */
        transformMat4: function(m) {
            vec2.transformMat4(this._array, this._array, m._array);
            this._dirty = true;
            return this;
        },

        toString: function() {
            return '[' + Array.prototype.join.call(this._array, ',') + ']';
        },

        toArray: function () {
            return Array.prototype.slice.call(this._array);
        }
    };

    // Getter and Setter
    if (Object.defineProperty) {

        var proto = Vector2.prototype;
        /**
         * @name x
         * @type {number}
         * @memberOf qtek.math.Vector2
         * @instance
         */
        Object.defineProperty(proto, 'x', {
            get: function () {
                return this._array[0];
            },
            set: function (value) {
                this._array[0] = value;
                this._dirty = true;
            }
        });

        /**
         * @name y
         * @type {number}
         * @memberOf qtek.math.Vector2
         * @instance
         */
        Object.defineProperty(proto, 'y', {
            get: function () {
                return this._array[1];
            },
            set: function (value) {
                this._array[1] = value;
                this._dirty = true;
            }
        });
    }

    // Supply methods that are not in place

    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.add = function(out, a, b) {
        vec2.add(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector2} out
     * @param  {number}  x
     * @param  {number}  y
     * @return {qtek.math.Vector2}
     */
    Vector2.set = function(out, x, y) {
        vec2.set(out._array, x, y);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.copy = function(out, b) {
        vec2.copy(out._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector3} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.cross = function(out, a, b) {
        vec2.cross(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {number}
     */
    Vector2.dist = function(a, b) {
        return vec2.distance(a._array, b._array);
    };
    /**
     * @method
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {number}
     */
    Vector2.distance = Vector2.dist;
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.div = function(out, a, b) {
        vec2.divide(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @method
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.divide = Vector2.div;
    /**
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {number}
     */
    Vector2.dot = function(a, b) {
        return vec2.dot(a._array, b._array);
    };

    /**
     * @param  {qtek.math.Vector2} a
     * @return {number}
     */
    Vector2.len = function(b) {
        return vec2.length(b._array);
    };

    // Vector2.length = Vector2.len;

    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @param  {number}  t
     * @return {qtek.math.Vector2}
     */
    Vector2.lerp = function(out, a, b, t) {
        vec2.lerp(out._array, a._array, b._array, t);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.min = function(out, a, b) {
        vec2.min(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.max = function(out, a, b) {
        vec2.max(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.mul = function(out, a, b) {
        vec2.multiply(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @method
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.multiply = Vector2.mul;
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @return {qtek.math.Vector2}
     */
    Vector2.negate = function(out, a) {
        vec2.negate(out._array, a._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @return {qtek.math.Vector2}
     */
    Vector2.normalize = function(out, a) {
        vec2.normalize(out._array, a._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {number}  scale
     * @return {qtek.math.Vector2}
     */
    Vector2.random = function(out, scale) {
        vec2.random(out._array, scale);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {number}  scale
     * @return {qtek.math.Vector2}
     */
    Vector2.scale = function(out, a, scale) {
        vec2.scale(out._array, a._array, scale);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @param  {number}  scale
     * @return {qtek.math.Vector2}
     */
    Vector2.scaleAndAdd = function(out, a, b, scale) {
        vec2.scaleAndAdd(out._array, a._array, b._array, scale);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {number}
     */
    Vector2.sqrDist = function(a, b) {
        return vec2.sqrDist(a._array, b._array);
    };
    /**
     * @method
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {number}
     */
    Vector2.squaredDistance = Vector2.sqrDist;

    /**
     * @param  {qtek.math.Vector2} a
     * @return {number}
     */
    Vector2.sqrLen = function(a) {
        return vec2.sqrLen(a._array);
    };
    /**
     * @method
     * @param  {qtek.math.Vector2} a
     * @return {number}
     */
    Vector2.squaredLength = Vector2.sqrLen;

    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.sub = function(out, a, b) {
        vec2.subtract(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @method
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Vector2} b
     * @return {qtek.math.Vector2}
     */
    Vector2.subtract = Vector2.sub;
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Matrix2} m
     * @return {qtek.math.Vector2}
     */
    Vector2.transformMat2 = function(out, a, m) {
        vec2.transformMat2(out._array, a._array, m._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2}  out
     * @param  {qtek.math.Vector2}  a
     * @param  {qtek.math.Matrix2d} m
     * @return {qtek.math.Vector2}
     */
    Vector2.transformMat2d = function(out, a, m) {
        vec2.transformMat2d(out._array, a._array, m._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {Matrix3} m
     * @return {qtek.math.Vector2}
     */
    Vector2.transformMat3 = function(out, a, m) {
        vec2.transformMat3(out._array, a._array, m._array);
        out._dirty = true;
        return out;
    };
    /**
     * @param  {qtek.math.Vector2} out
     * @param  {qtek.math.Vector2} a
     * @param  {qtek.math.Matrix4} m
     * @return {qtek.math.Vector2}
     */
    Vector2.transformMat4 = function(out, a, m) {
        vec2.transformMat4(out._array, a._array, m._array);
        out._dirty = true;
        return out;
    };

    module.exports = Vector2;



/***/ }),
/* 36 */
/***/ (function(module, exports) {



    var mathUtil = {};

    mathUtil.isPowerOfTwo = function (value) {
        return (value & (value - 1)) === 0;
    };

    mathUtil.nextPowerOfTwo = function (value) {
        value --;
        value |= value >> 1;
        value |= value >> 2;
        value |= value >> 4;
        value |= value >> 8;
        value |= value >> 16;
        value ++;

        return value;
    };

    mathUtil.nearestPowerOfTwo = function (value) {
        return Math.pow( 2, Math.round( Math.log( value ) / Math.LN2 ) );
    };

    module.exports = mathUtil;


/***/ }),
/* 37 */
/***/ (function(module, exports) {


module.exports = "@export qtek.prez.vertex\n\nuniform mat4 worldViewProjection : WORLDVIEWPROJECTION;\n\nattribute vec3 position : POSITION;\n\n#ifdef SKINNING\nattribute vec3 weight : WEIGHT;\nattribute vec4 joint : JOINT;\n\nuniform mat4 skinMatrix[JOINT_COUNT] : SKIN_MATRIX;\n#endif\n\nvoid main()\n{\n\n vec3 skinnedPosition = position;\n\n#ifdef SKINNING\n\n @import qtek.chunk.skin_matrix\n\n skinnedPosition = (skinMatrixWS * vec4(position, 1.0)).xyz;\n#endif\n\n gl_Position = worldViewProjection * vec4(skinnedPosition, 1.0);\n}\n\n@end\n\n\n@export qtek.prez.fragment\n\nvoid main()\n{\n gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n}\n\n@end";


/***/ }),
/* 38 */
/***/ (function(module, exports) {


module.exports = "\n\n@export qtek.standard.vertex\n\nuniform mat4 worldViewProjection : WORLDVIEWPROJECTION;\nuniform mat4 worldInverseTranspose : WORLDINVERSETRANSPOSE;\nuniform mat4 world : WORLD;\n\nuniform vec2 uvRepeat : [1.0, 1.0];\nuniform vec2 uvOffset : [0.0, 0.0];\n\nattribute vec3 position : POSITION;\nattribute vec2 texcoord : TEXCOORD_0;\n\n#if defined(AOMAP_ENABLED)\nattribute vec2 texcoord2 : TEXCOORD_1;\n#endif\n\nattribute vec3 normal : NORMAL;\nattribute vec4 tangent : TANGENT;\n\n#ifdef VERTEX_COLOR\nattribute vec4 color : COLOR;\n#endif\n\nattribute vec3 barycentric;\n\n#ifdef SKINNING\nattribute vec3 weight : WEIGHT;\nattribute vec4 joint : JOINT;\n\nuniform mat4 skinMatrix[JOINT_COUNT] : SKIN_MATRIX;\n#endif\n\nvarying vec2 v_Texcoord;\nvarying vec3 v_Normal;\nvarying vec3 v_WorldPosition;\nvarying vec3 v_Barycentric;\n\n#ifdef NORMALMAP_ENABLED\nvarying vec3 v_Tangent;\nvarying vec3 v_Bitangent;\n#endif\n\n#ifdef VERTEX_COLOR\nvarying vec4 v_Color;\n#endif\n\n\n#if defined(AOMAP_ENABLED)\nvarying vec2 v_Texcoord2;\n#endif\n\nvoid main()\n{\n\n vec3 skinnedPosition = position;\n vec3 skinnedNormal = normal;\n vec3 skinnedTangent = tangent.xyz;\n#ifdef SKINNING\n\n @import qtek.chunk.skin_matrix\n\n skinnedPosition = (skinMatrixWS * vec4(position, 1.0)).xyz;\n skinnedNormal = (skinMatrixWS * vec4(normal, 0.0)).xyz;\n skinnedTangent = (skinMatrixWS * vec4(tangent.xyz, 0.0)).xyz;\n#endif\n\n gl_Position = worldViewProjection * vec4(skinnedPosition, 1.0);\n\n v_Texcoord = texcoord * uvRepeat + uvOffset;\n v_WorldPosition = (world * vec4(skinnedPosition, 1.0)).xyz;\n v_Barycentric = barycentric;\n\n v_Normal = normalize((worldInverseTranspose * vec4(skinnedNormal, 0.0)).xyz);\n\n#ifdef NORMALMAP_ENABLED\n v_Tangent = normalize((worldInverseTranspose * vec4(skinnedTangent, 0.0)).xyz);\n v_Bitangent = normalize(cross(v_Normal, v_Tangent) * tangent.w);\n#endif\n\n#ifdef VERTEX_COLOR\n v_Color = color;\n#endif\n\n#if defined(AOMAP_ENABLED)\n v_Texcoord2 = texcoord2;\n#endif\n}\n\n@end\n\n\n@export qtek.standard.fragment\n\n#define PI 3.14159265358979\n#define ALPHA_TEST_THRESHOLD 0.5\n\n#define GLOSS_CHANEL 0\n#define ROUGHNESS_CHANEL 0\n#define METALNESS_CHANEL 1\n\nuniform mat4 viewInverse : VIEWINVERSE;\n\nvarying vec2 v_Texcoord;\nvarying vec3 v_Normal;\nvarying vec3 v_WorldPosition;\n\n#ifdef NORMALMAP_ENABLED\nvarying vec3 v_Tangent;\nvarying vec3 v_Bitangent;\nuniform sampler2D normalMap;\n#endif\n\n#ifdef DIFFUSEMAP_ENABLED\nuniform sampler2D diffuseMap;\n#endif\n\n#ifdef SPECULARMAP_ENABLED\nuniform sampler2D specularMap;\n#endif\n\n#ifdef USE_ROUGHNESS\nuniform float roughness : 0.5;\n #ifdef ROUGHNESSMAP_ENABLED\nuniform sampler2D roughnessMap;\n #endif\n#else\nuniform float glossiness: 0.5;\n #ifdef GLOSSMAP_ENABLED\nuniform sampler2D glossMap;\n #endif\n#endif\n\n#ifdef METALNESSMAP_ENABLED\nuniform sampler2D metalnessMap;\n#endif\n\n#ifdef ENVIRONMENTMAP_ENABLED\nuniform samplerCube environmentMap;\n\n #ifdef PARALLAX_CORRECTED\nuniform vec3 environmentBoxMin;\nuniform vec3 environmentBoxMax;\n #endif\n\n#endif\n\n#ifdef BRDFLOOKUP_ENABLED\nuniform sampler2D brdfLookup;\n#endif\n\n#ifdef EMISSIVEMAP_ENABLED\nuniform sampler2D emissiveMap;\n#endif\n\n#ifdef SSAOMAP_ENABLED\nuniform sampler2D ssaoMap;\nuniform vec4 viewport : VIEWPORT;\n#endif\n\n#ifdef AOMAP_ENABLED\nuniform sampler2D aoMap;\nuniform float aoIntensity;\nvarying vec2 v_Texcoord2;\n#endif\n\nuniform vec3 color : [1.0, 1.0, 1.0];\nuniform float alpha : 1.0;\n\n\n#ifdef USE_METALNESS\nuniform float metalness : 0.0;\n#else\nuniform vec3 specularColor : [0.1, 0.1, 0.1];\n#endif\n\nuniform vec3 emission : [0.0, 0.0, 0.0];\n\nuniform float emissionIntensity: 1;\n\nuniform float lineWidth : 0.0;\nuniform vec3 lineColor : [0.0, 0.0, 0.0];\nvarying vec3 v_Barycentric;\n\n#ifdef ENVIRONMENTMAP_PREFILTER\nuniform float maxMipmapLevel: 5;\n#endif\n\n#ifdef AMBIENT_LIGHT_COUNT\n@import qtek.header.ambient_light\n#endif\n\n#ifdef AMBIENT_SH_LIGHT_COUNT\n@import qtek.header.ambient_sh_light\n#endif\n\n#ifdef AMBIENT_CUBEMAP_LIGHT_COUNT\n@import qtek.header.ambient_cubemap_light\n#endif\n\n#ifdef POINT_LIGHT_COUNT\n@import qtek.header.point_light\n#endif\n#ifdef DIRECTIONAL_LIGHT_COUNT\n@import qtek.header.directional_light\n#endif\n#ifdef SPOT_LIGHT_COUNT\n@import qtek.header.spot_light\n#endif\n\n@import qtek.util.calculate_attenuation\n\n@import qtek.util.edge_factor\n\n@import qtek.util.rgbm\n\n@import qtek.util.srgb\n\n@import qtek.plugin.compute_shadow_map\n\n@import qtek.util.parallax_correct\n\n\nfloat G_Smith(float g, float ndv, float ndl)\n{\n float roughness = 1.0 - g;\n float k = roughness * roughness / 2.0;\n float G1V = ndv / (ndv * (1.0 - k) + k);\n float G1L = ndl / (ndl * (1.0 - k) + k);\n return G1L * G1V;\n}\nvec3 F_Schlick(float ndv, vec3 spec) {\n return spec + (1.0 - spec) * pow(1.0 - ndv, 5.0);\n}\n\nfloat D_Phong(float g, float ndh) {\n float a = pow(8192.0, g);\n return (a + 2.0) / 8.0 * pow(ndh, a);\n}\n\nfloat D_GGX(float g, float ndh) {\n float r = 1.0 - g;\n float a = r * r;\n float tmp = ndh * ndh * (a - 1.0) + 1.0;\n return a / (PI * tmp * tmp);\n}\n\n\nvoid main()\n{\n vec4 albedoColor = vec4(color, alpha);\n vec3 eyePos = viewInverse[3].xyz;\n vec3 V = normalize(eyePos - v_WorldPosition);\n\n#ifdef DIFFUSEMAP_ENABLED\n vec4 texel = texture2D(diffuseMap, v_Texcoord);\n #ifdef SRGB_DECODE\n texel = sRGBToLinear(texel);\n #endif\n albedoColor.rgb *= texel.rgb;\n #ifdef DIFFUSEMAP_ALPHA_ALPHA\n albedoColor.a *= texel.a;\n #endif\n\n#endif\n\n\n#ifdef USE_METALNESS\n float m = metalness;\n\n #ifdef METALNESSMAP_ENABLED\n float m2 = texture2D(metalnessMap, v_Texcoord)[METALNESS_CHANEL];\n m = clamp(m2 + (m - 0.5) * 2.0, 0.0, 1.0);\n #endif\n\n vec3 baseColor = albedoColor.rgb;\n albedoColor.rgb = baseColor * (1.0 - m);\n vec3 spec = mix(vec3(0.04), baseColor, m);\n#else\n vec3 spec = specularColor;\n#endif\n\n#ifdef USE_ROUGHNESS\n float g = 1.0 - roughness;\n #ifdef ROUGHNESSMAP_ENABLED\n float g2 = 1.0 - texture2D(roughnessMap, v_Texcoord)[ROUGHNESS_CHANEL];\n g = clamp(g2 + (g - 0.5) * 2.0, 0.0, 1.0);\n #endif\n#else\n float g = glossiness;\n #ifdef GLOSSMAP_ENABLED\n float g2 = texture2D(glossMap, v_Texcoord)[GLOSS_CHANEL];\n g = clamp(g2 + (g - 0.5) * 2.0, 0.0, 1.0);\n #endif\n#endif\n\n#ifdef SPECULARMAP_ENABLED\n spec *= texture2D(specularMap, v_Texcoord).rgb;\n#endif\n\n vec3 N = v_Normal;\n#ifdef NORMALMAP_ENABLED\n if (dot(v_Tangent, v_Tangent) > 0.0) {\n vec3 normalTexel = texture2D(normalMap, v_Texcoord).xyz;\n if (dot(normalTexel, normalTexel) > 0.0) { N = normalTexel * 2.0 - 1.0;\n mat3 tbn = mat3(v_Tangent, v_Bitangent, v_Normal);\n N = normalize(tbn * N);\n }\n }\n#endif\n\n vec3 diffuseTerm = vec3(0.0, 0.0, 0.0);\n vec3 specularTerm = vec3(0.0, 0.0, 0.0);\n\n float ndv = clamp(dot(N, V), 0.0, 1.0);\n vec3 fresnelTerm = F_Schlick(ndv, spec);\n\n#ifdef AMBIENT_LIGHT_COUNT\n for(int _idx_ = 0; _idx_ < AMBIENT_LIGHT_COUNT; _idx_++)\n {{\n diffuseTerm += ambientLightColor[_idx_];\n }}\n#endif\n\n#ifdef AMBIENT_SH_LIGHT_COUNT\n for(int _idx_ = 0; _idx_ < AMBIENT_SH_LIGHT_COUNT; _idx_++)\n {{\n diffuseTerm += calcAmbientSHLight(_idx_, N) * ambientSHLightColor[_idx_];\n }}\n#endif\n\n#ifdef POINT_LIGHT_COUNT\n#if defined(POINT_LIGHT_SHADOWMAP_COUNT)\n float shadowContribsPoint[POINT_LIGHT_COUNT];\n if(shadowEnabled)\n {\n computeShadowOfPointLights(v_WorldPosition, shadowContribsPoint);\n }\n#endif\n for(int _idx_ = 0; _idx_ < POINT_LIGHT_COUNT; _idx_++)\n {{\n\n vec3 lightPosition = pointLightPosition[_idx_];\n vec3 lc = pointLightColor[_idx_];\n float range = pointLightRange[_idx_];\n\n vec3 L = lightPosition - v_WorldPosition;\n\n float dist = length(L);\n float attenuation = lightAttenuation(dist, range);\n L /= dist;\n vec3 H = normalize(L + V);\n float ndl = clamp(dot(N, L), 0.0, 1.0);\n float ndh = clamp(dot(N, H), 0.0, 1.0);\n\n float shadowContrib = 1.0;\n#if defined(POINT_LIGHT_SHADOWMAP_COUNT)\n if(shadowEnabled)\n {\n shadowContrib = shadowContribsPoint[_idx_];\n }\n#endif\n\n vec3 li = lc * ndl * attenuation * shadowContrib;\n diffuseTerm += li;\n specularTerm += li * fresnelTerm * D_Phong(g, ndh);\n }}\n#endif\n\n#ifdef DIRECTIONAL_LIGHT_COUNT\n#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)\n float shadowContribsDir[DIRECTIONAL_LIGHT_COUNT];\n if(shadowEnabled)\n {\n computeShadowOfDirectionalLights(v_WorldPosition, shadowContribsDir);\n }\n#endif\n for(int _idx_ = 0; _idx_ < DIRECTIONAL_LIGHT_COUNT; _idx_++)\n {{\n\n vec3 L = -normalize(directionalLightDirection[_idx_]);\n vec3 lc = directionalLightColor[_idx_];\n\n vec3 H = normalize(L + V);\n float ndl = clamp(dot(N, L), 0.0, 1.0);\n float ndh = clamp(dot(N, H), 0.0, 1.0);\n\n float shadowContrib = 1.0;\n#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)\n if(shadowEnabled)\n {\n shadowContrib = shadowContribsDir[_idx_];\n }\n#endif\n\n vec3 li = lc * ndl * shadowContrib;\n\n diffuseTerm += li;\n specularTerm += li * fresnelTerm * D_Phong(g, ndh);\n }}\n#endif\n\n#ifdef SPOT_LIGHT_COUNT\n#if defined(SPOT_LIGHT_SHADOWMAP_COUNT)\n float shadowContribsSpot[SPOT_LIGHT_COUNT];\n if(shadowEnabled)\n {\n computeShadowOfSpotLights(v_WorldPosition, shadowContribsSpot);\n }\n#endif\n for(int i = 0; i < SPOT_LIGHT_COUNT; i++)\n {\n vec3 lightPosition = spotLightPosition[i];\n vec3 spotLightDirection = -normalize(spotLightDirection[i]);\n vec3 lc = spotLightColor[i];\n float range = spotLightRange[i];\n float a = spotLightUmbraAngleCosine[i];\n float b = spotLightPenumbraAngleCosine[i];\n float falloffFactor = spotLightFalloffFactor[i];\n\n vec3 L = lightPosition - v_WorldPosition;\n float dist = length(L);\n float attenuation = lightAttenuation(dist, range);\n\n L /= dist;\n float c = dot(spotLightDirection, L);\n\n float falloff;\n falloff = clamp((c - a) /( b - a), 0.0, 1.0);\n falloff = pow(falloff, falloffFactor);\n\n vec3 H = normalize(L + V);\n float ndl = clamp(dot(N, L), 0.0, 1.0);\n float ndh = clamp(dot(N, H), 0.0, 1.0);\n\n float shadowContrib = 1.0;\n#if defined(SPOT_LIGHT_SHADOWMAP_COUNT)\n if (shadowEnabled)\n {\n shadowContrib = shadowContribsSpot[i];\n }\n#endif\n\n vec3 li = lc * attenuation * (1.0 - falloff) * shadowContrib * ndl;\n\n diffuseTerm += li;\n specularTerm += li * fresnelTerm * D_Phong(g, ndh);\n }\n#endif\n\n vec4 outColor = albedoColor;\n outColor.rgb *= diffuseTerm;\n\n outColor.rgb += specularTerm;\n\n\n#ifdef AMBIENT_CUBEMAP_LIGHT_COUNT\n vec3 L = reflect(-V, N);\n float rough2 = clamp(1.0 - g, 0.0, 1.0);\n float bias2 = rough2 * 5.0;\n vec2 brdfParam2 = texture2D(ambientCubemapLightBRDFLookup[0], vec2(rough2, ndv)).xy;\n vec3 envWeight2 = spec * brdfParam2.x + brdfParam2.y;\n vec3 envTexel2;\n for(int _idx_ = 0; _idx_ < AMBIENT_CUBEMAP_LIGHT_COUNT; _idx_++)\n {{\n envTexel2 = RGBMDecode(textureCubeLodEXT(ambientCubemapLightCubemap[_idx_], L, bias2), 51.5);\n outColor.rgb += ambientCubemapLightColor[_idx_] * envTexel2 * envWeight2;\n }}\n#endif\n\n#ifdef ENVIRONMENTMAP_ENABLED\n\n vec3 envWeight = g * fresnelTerm;\n vec3 L = reflect(-V, N);\n\n #ifdef PARALLAX_CORRECTED\n L = parallaxCorrect(L, v_WorldPosition, environmentBoxMin, environmentBoxMax);\n #endif\n\n #ifdef ENVIRONMENTMAP_PREFILTER\n float rough = clamp(1.0 - g, 0.0, 1.0);\n float bias = rough * maxMipmapLevel;\n vec3 envTexel = decodeHDR(textureCubeLodEXT(environmentMap, L, bias)).rgb;\n\n #ifdef BRDFLOOKUP_ENABLED\n vec2 brdfParam = texture2D(brdfLookup, vec2(rough, ndv)).xy;\n envWeight = spec * brdfParam.x + brdfParam.y;\n #endif\n\n #else\n vec3 envTexel = textureCube(environmentMap, L).xyz;\n #endif\n\n outColor.rgb += envTexel * envWeight;\n#endif\n\n float aoFactor = 1.0;\n#ifdef SSAOMAP_ENABLED\n aoFactor = min(texture2D(ssaoMap, (gl_FragCoord.xy - viewport.xy) / viewport.zw).r, aoFactor);\n#endif\n\n#ifdef AOMAP_ENABLED\n aoFactor = min(1.0 - clamp((1.0 - texture2D(aoMap, v_Texcoord2).r) * aoIntensity, 0.0, 1.0), aoFactor);\n#endif\n\n outColor.rgb *= aoFactor;\n\n vec3 lEmission = emission;\n#ifdef EMISSIVEMAP_ENABLED\n lEmission *= texture2D(emissiveMap, v_Texcoord).rgb;\n#endif\n outColor.rgb += lEmission * emissionIntensity;\n\n#ifdef GAMMA_ENCODE\n outColor.rgb = pow(outColor.rgb, vec3(1 / 2.2));\n#endif\n\n if(lineWidth > 0.)\n {\n outColor.rgb = mix(lineColor, vec3(outColor.rgb), edgeFactor(lineWidth));\n }\n\n#ifdef ALPHA_TEST\n if (outColor.a < ALPHA_TEST_THRESHOLD) {\n discard;\n }\n#endif\n\n gl_FragColor = encodeHDR(outColor);\n}\n\n@end\n";


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var Renderer = __webpack_require__(27);
var PerspectiveCamera = __webpack_require__(22);
var ShadowMapPass = __webpack_require__(66);
var GLTFLoader = __webpack_require__(62);
var DirectionalLight = __webpack_require__(23);
var AmbientSHLight = __webpack_require__(61);
var Scene = __webpack_require__(28);
var Node = __webpack_require__(7);
var Vector3 = __webpack_require__(3);
var Animation = __webpack_require__(49);
var meshUtil = __webpack_require__(92);
var SphereGeo = __webpack_require__(60);
var CubeGeo = __webpack_require__(59);
var Mesh = __webpack_require__(14);
var Material = __webpack_require__(10);
var Shader = __webpack_require__(5);
var StaticGeometry = __webpack_require__(11);

var getBundingBoxWithSkinning = __webpack_require__(44);
var OrbitControl = __webpack_require__(43);
var HotspotManager = __webpack_require__(42);

function createSkeletonDebugScene(skeleton) {
    var scene = new Scene();
    var sphereGeo = new SphereGeo({
        radius: 0.1
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
        root: dom
    });
    this._cameraControl.setCamera(this._camera);
    this._cameraControl.init();

    this._hotspotManager = new HotspotManager({
        root: dom,
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

        // Debug
        // var mesh = new Mesh({
        //     geometry: new CubeGeo(),
        //     material: new Material({
        //         shader: new Shader({
        //             vertex: Shader.source('qtek.standard.vertex'),
        //             fragment: Shader.source('qtek.standard.fragment')
        //         })
        //     })
        // });
        // mesh.position.copy(center);
        // mesh.scale.copy(size).scale(0.5);
        // this._scene.add(mesh);
    }
};

/**
 * Load glTF model resource
 * @param {string} url model url
 * @param {Function} callback
 * @param {Object} [opts] 
 */
Viewer.prototype.loadModel = function (url, cb, opts) {

    opts = opts || {};

    var loader = new GLTFLoader({
        rootNode: new Node(),
        shaderName: 'qtek.' + this._shaderName,
        textureRootPath: opts.textureRootPath,
        bufferRootPath: opts.bufferRootPath
    });
    loader.load(url);

    loader.success(function (res) {
        var meshNeedsSplit = [];
        res.rootNode.traverse(function (mesh) {
            if (mesh.skeleton && mesh.skeleton.getClip(0)) {
                meshNeedsSplit.push(mesh);
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
            if (mesh.material) {
                mesh.material.shader.define('fragment', 'DIFFUSEMAP_ALPHA_ALPHA');
                mesh.material.shader.define('fragment', 'ALPHA_TEST');
                mesh.material.shader.define('fragment', 'ALPHA_TEST_THRESHOLD', 0.95);
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

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    Viewer: __webpack_require__(39)
};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

/**
 * Only implements needed gestures for mobile.
 */
var GestureMgr = function () {

    /**
     * @private
     * @type {Array.<Object>}
     */
    this._track = [];
};

GestureMgr.prototype = {

    constructor: GestureMgr,

    recognize: function (event, target, root) {
        this._doTrack(event, target, root);
        return this._recognize(event);
    },

    clear: function () {
        this._track.length = 0;
        return this;
    },

    _doTrack: function (event, target, root) {
        var touches = event.targetTouches;

        if (!touches) {
            return;
        }

        var trackItem = {
            points: [],
            touches: [],
            target: target,
            event: event
        };

        for (var i = 0, len = touches.length; i < len; i++) {
            var touch = touches[i];
            trackItem.points.push([touch.clientX, touch.clientY]);
            trackItem.touches.push(touch);
        }

        this._track.push(trackItem);
    },

    _recognize: function (event) {
        for (var eventName in recognizers) {
            if (recognizers.hasOwnProperty(eventName)) {
                var gestureInfo = recognizers[eventName](this._track, event);
                if (gestureInfo) {
                    return gestureInfo;
                }
            }
        }
    }
};

function dist(pointPair) {
    var dx = pointPair[1][0] - pointPair[0][0];
    var dy = pointPair[1][1] - pointPair[0][1];

    return Math.sqrt(dx * dx + dy * dy);
}

function center(pointPair) {
    return [
        (pointPair[0][0] + pointPair[1][0]) / 2,
        (pointPair[0][1] + pointPair[1][1]) / 2
    ];
}

var recognizers = {

    pinch: function (track, event) {
        var trackLen = track.length;

        if (!trackLen) {
            return;
        }

        var pinchEnd = (track[trackLen - 1] || {}).points;
        var pinchPre = (track[trackLen - 2] || {}).points || pinchEnd;

        if (pinchPre
            && pinchPre.length > 1
            && pinchEnd
            && pinchEnd.length > 1
        ) {
            var pinchScale = dist(pinchEnd) / dist(pinchPre);
            !isFinite(pinchScale) && (pinchScale = 1);

            event.pinchScale = pinchScale;

            var pinchCenter = center(pinchEnd);
            event.pinchX = pinchCenter[0];
            event.pinchY = pinchCenter[1];

            return {
                type: 'pinch',
                target: track[0].target,
                event: event
            };
        }
    }
};

module.exports = GestureMgr;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var Base = __webpack_require__(1);
var Vector4 = __webpack_require__(65);

var HotspotManger = Base.extend(function () {

    return {

        /**
         * @type {HTMLDomElement}
         */
        root: null,

        /**
         * @type {qtek.Renderer}
         */
        renderer: null,

        /**
         * @type {qtek.camera.Perspective}
         */
        camera: null,

        /**
         * @type {HTMLDomElement}
         * @private
         */
        _hotspotRoot: null,

        _hotspots: []
    };
}, function () {
    if (!this.root || !this.renderer || !this.camera) {
        throw new Error('Tip manager needs `root`,  `camera`, `renderer`');
    }

    var tipRoot = this._hotspotRoot = document.createElement('div');
    tipRoot.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;';
    this.root.appendChild(tipRoot);
}, {
    add: function (position, tipDom) {

        if (typeof tipDom === 'string') {
            var tipDom2 = document.createElement('div');
            tipDom2.innerHTML = tipDom;
            tipDom = tipDom2;
        }

        tipDom.classList.add('qmv-annotation');
        tipDom.style.position = 'absolute';

        this._hotspotRoot.appendChild(tipDom);

        this._hotspots.push({
            position: position,
            dom: tipDom
        });

        return tipDom;
    },

    remove: function (tipDom) {
        var idx = -1;
        for (var i = 0; i < this._hotspots.length; i++) {
            if (this._hotspots[i].dom === tipDom) {
                idx = i;
                break;
            }
        }
        if (idx >= 0) {
            this._hotspots.splice(idx, 1);
            this._hotspotRoot.removeChild(tipDom);
        }
    },

    update: function () {
        var pos = new Vector4();
        this._hotspots.forEach(function (hotspot) {
            var p = hotspot.position;
            pos.set(p[0], p[1], p[2], 1);
            pos.transformMat4(this.camera.viewMatrix);
            pos.transformMat4(this.camera.projectionMatrix);
            pos.scale(1 / pos.w);

            var x = (pos.x + 1.0) * 0.5 * this.renderer.getWidth();
            var y = (pos.y + 1.0) * 0.5 * this.renderer.getHeight();

            hotspot.dom.style.left = x + 'px';
            hotspot.dom.style.top = this.renderer.getHeight() - y + 'px';

            hotspot.onupdate && hotspot.onupdate(x, y);
        }, this);
    }
});

module.exports = HotspotManger;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Provide orbit control for 3D objects
 *
 * @module echarts-gl/util/OrbitControl
 * @author Yi Shen(http://github.com/pissang)
 */

// TODO Remove magic numbers on sensitivity
var Base = __webpack_require__(1);
var Vector2 = __webpack_require__(35);
var Vector3 = __webpack_require__(3);
var Quaternion = __webpack_require__(24);
var GestureMgr = __webpack_require__(41);

function firstNotNull() {
    for (var i = 0, len = arguments.length; i < len; i++) {
        if (arguments[i] != null) {
            return arguments[i];
        }
    }
}

/**
 * @alias module:echarts-x/util/OrbitControl
 */
var OrbitControl = Base.extend(function () {

    return {
        renderer: null,

        animation: null,

        /**
         * @type {HTMLDomElement}
         */
        root: null,
        /**
         * @type {qtek.math.Vector3}
         */
        _center: new Vector3(),

        /**
         * Minimum distance to the center
         * @type {number}
         * @default 0.5
         */
        minDistance: 2,

        /**
         * Maximum distance to the center
         * @type {number}
         * @default 2
         */
        maxDistance: 100,

        /**
         * Minimum alpha rotation
         */
        minAlpha: -90,

        /**
         * Maximum alpha rotation
         */
        maxAlpha: 90,

        /**
         * Minimum beta rotation
         */
        minBeta: -Infinity,
        /**
         * Maximum beta rotation
         */
        maxBeta: Infinity,

        /**
         * Start auto rotating after still for the given time
         */
        autoRotateAfterStill: 0,

        /**
         * Direction of autoRotate. cw or ccw when looking top down.
         */
        autoRotateDirection: 'cw',

        /**
         * Degree per second
         */
        autoRotateSpeed: 60,

        /**
         * Pan or rotate
         * @type {String}
         */
        _mode: 'rotate',

        /**
         * @param {number}
         */
        damping: 0.8,

        /**
         * @param {number}
         */
        rotateSensitivity: 1,

        /**
         * @param {number}
         */
        zoomSensitivity: 1,

        /**
         * @param {number}
         */
        panSensitivity: 1,


        /**
         * @type {qtek.Camera}
         */
        _camera: null,

        _needsUpdate: false,

        _rotating: false,

        // Rotation around yAxis
        _phi: 0,
        // Rotation around xAxis
        _theta: 0,

        _mouseX: 0,
        _mouseY: 0,

        _rotateVelocity: new Vector2(),

        _panVelocity: new Vector2(),

        _distance: 20,

        _zoomSpeed: 0,

        _stillTimeout: 0,

        _animators: [],

        _gestureMgr: new GestureMgr()
    };
}, function () {
    // Each OrbitControl has it's own handler
    this._mouseDownHandler = this._mouseDownHandler.bind(this);
    this._mouseWheelHandler = this._mouseWheelHandler.bind(this);
    this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
    this._mouseUpHandler = this._mouseUpHandler.bind(this);
    this._pinchHandler = this._pinchHandler.bind(this);
    this._update = this._update.bind(this);
}, {
    /**
     * Initialize.
     * Mouse event binding
     */
    init: function () {
        var dom = this.root;

        dom.addEventListener('touchstart', this._mouseDownHandler);

        dom.addEventListener('mousedown', this._mouseDownHandler);
        dom.addEventListener('mousewheel', this._mouseWheelHandler);

        this.animation.on('frame', this._update);
    },

    /**
     * Dispose.
     * Mouse event unbinding
     */
    dispose: function () {
        var dom = this.root;

        dom.removeEventListener('touchstart', this._mouseDownHandler);
        dom.removeEventListener('touchmove', this._mouseMoveHandler);
        dom.removeEventListener('touchend', this._mouseUpHandler);

        dom.removeEventListener('mousedown', this._mouseDownHandler);
        dom.removeEventListener('mousemove', this._mouseMoveHandler);
        dom.removeEventListener('mouseup', this._mouseUpHandler);
        dom.removeEventListener('mousewheel', this._mouseWheelHandler);

        this.animation.removeEventListener('frame', this._update);
        this.stopAllAnimation();
    },

    /**
     * Get distance
     * @return {number}
     */
    getDistance: function () {
        return this._distance;
    },

    /**
     * Set distance
     * @param {number} distance
     */
    setDistance: function (distance) {
        this._distance = distance;
        this._needsUpdate = true;
    },

    /**
     * Get alpha rotation
     * Alpha angle for top-down rotation. Positive to rotate to top.
     *
     * Which means camera rotation around x axis.
     */
    getAlpha: function () {
        return this._theta / Math.PI * 180;
    },

    /**
     * Get beta rotation
     * Beta angle for left-right rotation. Positive to rotate to right.
     *
     * Which means camera rotation around y axis.
     */
    getBeta: function () {
        return -this._phi / Math.PI * 180;
    },

    /**
     * Get control center
     * @return {Array.<number>}
     */
    getCenter: function () {
        return this._center.toArray();
    },

    /**
     * Set alpha rotation angle
     * @param {number} alpha
     */
    setAlpha: function (alpha) {
        alpha = Math.max(Math.min(this.maxAlpha, alpha), this.minAlpha);

        this._theta = alpha / 180 * Math.PI;
        this._needsUpdate = true;
    },

    /**
     * Set beta rotation angle
     * @param {number} beta
     */
    setBeta: function (beta) {
        beta = Math.max(Math.min(this.maxBeta, beta), this.minBeta);

        this._phi = -beta / 180 * Math.PI;
        this._needsUpdate = true;
    },

    /**
     * Set control center
     * @param {Array.<number>} center
     */
    setCenter: function (centerArr) {
        this._center.setArray(centerArr);
    },

    /**
     * @param {qtek.Camera} camera
     */
    setCamera: function (camera) {
        this._camera = camera;
        // this._decomposeTransform();

        this._needsUpdate = true;
    },

    /**
     * @return {qtek.Camera}
     */
    getCamera: function () {
        return this._camera;
    },


    setOption: function (opts) {
        opts = opts || {};

        ['autoRotate', 'autoRotateAfterStill',
            'autoRotateDirection', 'autoRotateSpeed',
            'damping',
            'minDistance', 'maxDistance',
            'minAlpha', 'maxAlpha', 'minBeta', 'maxBeta',
            'rotateSensitivity', 'zoomSensitivity', 'panSensitivity'
        ].forEach(function (key) {
            if (opts[key] != null) {
                this[key] = opts[key];
            }
        }, this);

        if (opts.distance != null) {
            this.setDistance(opts.distance);
        }

        if (opts.alpha != null) {
            this.setAlpha(opts.alpha);
        }
        if (opts.beta != null) {
            this.setBeta(opts.beta);
        }

        if (opts.center) {
            this.setCenter(opts.center);
        }
    },

    /**
     * @param {Object} opts
     * @param {number} opts.distance
     * @param {number} opts.alpha
     * @param {number} opts.beta
     * @param {number} [opts.duration=1000]
     * @param {number} [opts.easing='linear']
     */
    animateTo: function (opts) {
        var self = this;

        var obj = {};
        var target = {};
        if (opts.distance != null) {
            obj.distance = this.getDistance();
            target.distance = opts.distance;
        }
        if (opts.alpha != null) {
            obj.alpha = this.getAlpha();
            target.alpha = opts.alpha;
        }
        if (opts.beta != null) {
            obj.beta = this.getBeta();
            target.beta = opts.beta;
        }
        if (opts.center != null) {
            obj.center = this.getCenter();
            target.center = opts.center;
        }

        return this._addAnimator(
            animation.animate(obj)
                .when(opts.duration || 1000, target)
                .during(function () {
                    if (obj.alpha != null) {
                        self.setAlpha(obj.alpha);
                    }
                    if (obj.beta != null) {
                        self.setBeta(obj.beta);
                    }
                    if (obj.distance != null) {
                        self.setDistance(obj.distance);
                    }
                    if (obj.center != null) {
                        self.setCenter(obj.center);
                    }
                    self._needsUpdate = true;
                })
        ).start(opts.easing || 'linear');
    },

    /**
     * Stop all animation
     */
    stopAllAnimation: function () {
        for (var i = 0; i < this._animators.length; i++) {
            this._animators[i].stop();
        }
        this._animators.length = 0;
    },

    _isAnimating: function () {
        return this._animators.length > 0;
    },
    /**
     * Call update each frame
     * @param  {number} deltaTime Frame time
     */
    _update: function (deltaTime) {

        if (this._rotating) {
            var radian = (this.autoRotateDirection === 'cw' ? 1 : -1)
                 * this.autoRotateSpeed / 180 * Math.PI;
            this._phi -= radian * deltaTime / 1000;
            this._needsUpdate = true;
        }
        else if (this._rotateVelocity.len() > 0) {
            this._needsUpdate = true;
        }

        if (Math.abs(this._zoomSpeed) > 0.01 || this._panVelocity.len() > 0) {
            this._needsUpdate = true;
        }

        if (!this._needsUpdate) {
            return;
        }

        // Fixed deltaTime
        this._updateDistance(Math.min(deltaTime, 50));
        this._updatePan(Math.min(deltaTime, 50));

        this._updateRotate(Math.min(deltaTime, 50));

        this._updateTransform();

        this._camera.update();

        this.trigger('update');

        this._needsUpdate = false;
    },

    _updateRotate: function (deltaTime) {
        var velocity = this._rotateVelocity;
        this._phi = velocity.y * deltaTime / 20 + this._phi;
        this._theta = velocity.x * deltaTime / 20 + this._theta;

        this.setAlpha(this.getAlpha());
        this.setBeta(this.getBeta());

        this._vectorDamping(velocity, this.damping);
    },

    _updateDistance: function (deltaTime) {
        this._setDistance(this._distance + this._zoomSpeed * deltaTime / 20);
        this._zoomSpeed *= this.damping;
    },

    _setDistance: function (distance) {
        this._distance = Math.max(Math.min(distance, this.maxDistance), this.minDistance);
    },

    _updatePan: function (deltaTime) {

        // var velocity = this._panVelocity;
        // var len = this._distance;

        // var target = this._camera;
        // var yAxis = target.worldTransform.y;
        // var xAxis = target.worldTransform.x;

        // // PENDING
        // this._center
        //     .scaleAndAdd(xAxis, -velocity.x * len / 200)
        //     .scaleAndAdd(yAxis, -velocity.y * len / 200);

        // this._vectorDamping(velocity, 0);
    },

    _updateTransform: function () {
        var camera = this._camera;

        var dir = new Vector3();
        var theta = this._theta + Math.PI / 2;
        var phi = this._phi + Math.PI / 2;
        var r = Math.sin(theta);

        dir.x = r * Math.cos(phi);
        dir.y = -Math.cos(theta);
        dir.z = r * Math.sin(phi);

        camera.position.copy(this._center).scaleAndAdd(dir, this._distance);
        camera.rotation.identity()
            // First around y, then around x
            .rotateY(-this._phi)
            .rotateX(-this._theta);
    },

    _startCountingStill: function () {
        clearTimeout(this._stillTimeout);

        var time = this.autoRotateAfterStill;
        var self = this;
        if (!isNaN(time) && time > 0) {
            this._stillTimeout = setTimeout(function () {
                self._rotating = true;
            }, time * 1000);
        }
    },

    _vectorDamping: function (v, damping) {
        var speed = v.len();
        speed = speed * damping;
        if (speed < 1e-4) {
            speed = 0;
        }
        v.normalize().scale(speed);
    },

    _decomposeTransform: function () {
        if (!this._camera) {
            return;
        }

        // FIXME euler order......
        // FIXME alpha is not certain when beta is 90 or -90
        var euler = new Vector3();
        euler.eulerFromQuat(
            this._camera.rotation.normalize(), 'ZYX'
        );

        this._theta = -euler.x;
        this._phi = -euler.y;

        this.setBeta(this.getBeta());
        this.setAlpha(this.getAlpha());

        this._setDistance(this._camera.position.dist(this._center));
    },

    _mouseDownHandler: function (e) {
        if (this._isAnimating()) {
            return;
        }
        var x = e.clientX;
        var y = e.clientY;
        // Touch
        if (e.targetTouches) {
            var touch = e.targetTouches[0];
            x = touch.clientX;
            y = touch.clientY;

            this._mode = 'rotate';

            this._processGesture(e, 'start');
        }

        var dom = this.root;
        dom.addEventListener('touchmove', this._mouseMoveHandler);
        dom.addEventListener('touchend', this._mouseUpHandler);

        dom.addEventListener('mousemove', this._mouseMoveHandler);
        dom.addEventListener('mouseup', this._mouseUpHandler);

        if (e.button === 0) {
            this._mode = 'rotate';
        }
        else if (e.button === 1) {
            this._mode = 'pan';
        }

        // Reset rotate velocity
        this._rotateVelocity.set(0, 0);
        this._rotating = false;
        if (this.autoRotate) {
            this._startCountingStill();
        }

        this._mouseX = x;
        this._mouseY = y;
    },

    _mouseMoveHandler: function (e) {
        if (this._isAnimating()) {
            return;
        }
        var x = e.clientX;
        var y = e.clientY;

        var haveGesture;
        // Touch
        if (e.targetTouches) {
            var touch = e.targetTouches[0];
            x = touch.clientX;
            y = touch.clientY;

            haveGesture = this._processGesture(e, 'change');
        }

        if (!haveGesture) {
            if (this._mode === 'rotate') {
                this._rotateVelocity.y = (x - this._mouseX) / this.renderer.getHeight() * 2 * this.rotateSensitivity;
                this._rotateVelocity.x = (y - this._mouseY) / this.renderer.getWidth() * 2 * this.rotateSensitivity;
            }
            else if (this._mode === 'pan') {
                this._panVelocity.x = (x - this._mouseX) / this.renderer.getWidth() * this.panSensitivity * 400;
                this._panVelocity.y = (-y + this._mouseY) / this.renderer.getHeight() * this.panSensitivity * 400;
            }
        }

        this._mouseX = x;
        this._mouseY = y;

        e.preventDefault();
    },

    _mouseWheelHandler: function (e) {
        if (this._isAnimating()) {
            return;
        }
        var delta = e.wheelDelta // Webkit
                || -e.detail; // Firefox
        if (delta === 0) {
            return;
        }
        this._zoomHandler(e, delta > 0 ? -1 : 1);
    },

    _pinchHandler: function (e) {
        if (this._isAnimating()) {
            return;
        }
        this._zoomHandler(e, e.pinchScale > 1 ? -0.4 : 0.4);
    },

    _zoomHandler: function (e, delta) {

        var x = e.clientX;
        var y = e.clientY;
        var distance = Math.max(Math.min(
            this._distance - this.minDistance,
            this.maxDistance - this._distance
        ));
        this._zoomSpeed = delta * Math.max(distance / 40 * this.zoomSensitivity, 0.2);

        this._rotating = false;

        if (this.autoRotate && this._mode === 'rotate') {
            this._startCountingStill();
        }

        e.preventDefault();
    },

    _mouseUpHandler: function (event) {
        var dom = this.root;
        dom.removeEventListener('touchmove', this._mouseMoveHandler);
        dom.removeEventListener('touchend', this._mouseUpHandler);
        dom.removeEventListener('mousemove', this._mouseMoveHandler);
        dom.removeEventListener('mouseup', this._mouseUpHandler);

        this._processGesture(event, 'end');
    },

    _addAnimator: function (animator) {
        var animators = this._animators;
        animators.push(animator);
        animator.done(function () {
            var idx = animators.indexOf(animator);
            if (idx >= 0) {
                animators.splice(idx, 1);
            }
        });
        return animator;
    },


    _processGesture: function (event, stage) {
        var gestureMgr = this._gestureMgr;

        stage === 'start' && gestureMgr.clear();

        var gestureInfo = gestureMgr.recognize(
            event,
            null,
            this.root
        );

        stage === 'end' && gestureMgr.clear();

        // Do not do any preventDefault here. Upper application do that if necessary.
        if (gestureInfo) {
            var type = gestureInfo.type;
            event.gestureEvent = type;

            this._pinchHandler(gestureInfo.event);
        }

        return gestureInfo;
    }
});

/**
 * If auto rotate the target
 * @type {boolean}
 * @default false
 */
Object.defineProperty(OrbitControl.prototype, 'autoRotate', {
    get: function (val) {
        return this._autoRotate;
    },
    set: function (val) {
        this._autoRotate = val;
        this._rotating = val;
    }
});


module.exports = OrbitControl;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var BoundingBox = __webpack_require__(4);
var glmatrix = __webpack_require__(0);
var vec3 = glmatrix.vec3;
var mat4 = glmatrix.mat4;

function getBoundingBoxOfSkinningMesh(mesh, out) {
    var pos = [];
    var joint = [];
    var weight = [];
    var skinMatrices = [];
    var skinnedPos = [];
    var tmp = [];

    var geometry = mesh.geometry;
    var skinMatricesArray = mesh.skeleton.getSubSkinMatrices(mesh.__GUID__, mesh.joints);
    for (var i = 0; i < mesh.joints.length; i++) {
        skinMatrices[i] = skinMatrices[i] || [];
        for (var k = 0; k < 16; k++) {
            skinMatrices[i][k] = skinMatricesArray[i * 16 + k];
        }
    }
    
    var positionAttr = geometry.attributes.position;
    var weightAttr = geometry.attributes.weight;
    var jointAttr = geometry.attributes.joint;

    var min = [Infinity, Infinity, Infinity];
    var max = [-Infinity, -Infinity, -Infinity];

    var timeSamples = [0];
    var clip = mesh.skeleton.getClip(0);
    if (clip) {
        timeSamples.push(clip.life);
    }
    for (var t = 0; t < timeSamples.length; t++) {
        if (clip) {
            clip.setTime(timeSamples[t]);
            mesh.skeleton.setPose(0);
            for (var i = 0; i < geometry.vertexCount; i++) {
                positionAttr.get(i, pos);
                weightAttr.get(i, weight);
                jointAttr.get(i, joint);
                weight[3] = 1 - weight[0] - weight[1] - weight[2];

                vec3.set(skinnedPos, 0, 0, 0);
                for (var k = 0; k < 4; k++) {
                    if (joint[k] >= 0) {
                        vec3.transformMat4(tmp, pos, skinMatrices[joint[k]]);
                        vec3.scaleAndAdd(skinnedPos, skinnedPos, tmp, weight[k]);
                    }   
                }

                vec3.min(min, min, skinnedPos);
                vec3.max(max, max, skinnedPos);

            }
        }
    }
    out.min.setArray(min);
    out.max.setArray(max);
}

function getBoundingBoxWithSkinning(node, out) {
    out = out || new BoundingBox();

    var children = node.children();
    if (children.length === 0) {
        out.max.set(-Infinity, -Infinity, -Infinity);
        out.min.set(Infinity, Infinity, Infinity);
    }

    var tmpBBox = new BoundingBox();
    for (var i = 0; i < children.length; i++) {
        var child = children[i];
        getBoundingBoxWithSkinning(child, tmpBBox);
        child.updateLocalTransform();
        if (tmpBBox.isFinite()) {
            tmpBBox.applyTransform(child.localTransform);
        }
        if (i === 0) {
            out.copy(tmpBBox);
        }
        else {
            out.union(tmpBBox);
        }
    }

    if (node.geometry) {
        if (node.skeleton && node.joints && node.joints.length) {
            getBoundingBoxOfSkinningMesh(node, tmpBBox);
            out.union(tmpBBox);
        }
        else {
            out.union(node.geometry.boundingBox);
        }
    }
    return out;
}

module.exports = getBoundingBoxWithSkinning;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Base = __webpack_require__(1);
    var Texture = __webpack_require__(12);
    var TextureCube = __webpack_require__(20);
    var glinfo = __webpack_require__(6);
    var glenum = __webpack_require__(2);
    var Cache = __webpack_require__(17);

    var KEY_FRAMEBUFFER = 'framebuffer';
    var KEY_RENDERBUFFER = 'renderbuffer';
    var KEY_RENDERBUFFER_WIDTH = KEY_RENDERBUFFER + '_width';
    var KEY_RENDERBUFFER_HEIGHT = KEY_RENDERBUFFER + '_height';
    var KEY_RENDERBUFFER_ATTACHED = KEY_RENDERBUFFER + '_attached';
    var KEY_DEPTHTEXTURE_ATTACHED = 'depthtexture_attached';

    var GL_FRAMEBUFFER = glenum.FRAMEBUFFER;
    var GL_RENDERBUFFER = glenum.RENDERBUFFER;
    var GL_DEPTH_ATTACHMENT = glenum.DEPTH_ATTACHMENT;
    var GL_COLOR_ATTACHMENT0 = glenum.COLOR_ATTACHMENT0;
    /**
     * @constructor qtek.FrameBuffer
     * @extends qtek.core.Base
     */
    var FrameBuffer = Base.extend(
    /** @lends qtek.FrameBuffer# */
    {
        /**
         * If use depth buffer
         * @type {boolean}
         */
        depthBuffer: true,

        /**
         * @type {Object}
         */
        viewport: null,

        _width: 0,
        _height: 0,

        _textures: null,

        _boundRenderer: null,
    }, function () {
        // Use cache
        this._cache = new Cache();

        this._textures = {};
    },

    /**@lends qtek.FrameBuffer.prototype. */
    {
        /**
         * Get attached texture width
         * {number}
         */
        // FIXME Can't use before #bind
        getTextureWidth: function () {
            return this._width;
        },

        /**
         * Get attached texture height
         * {number}
         */
        getTextureHeight: function () {
            return this._height;
        },

        /**
         * Bind the framebuffer to given renderer before rendering
         * @param  {qtek.Renderer} renderer
         */
        bind: function (renderer) {

            if (renderer.__currentFrameBuffer) {
                // Already bound
                if (renderer.__currentFrameBuffer === this) {
                    return;
                }

                console.warn('Renderer already bound with another framebuffer. Unbind it first');
            }
            renderer.__currentFrameBuffer = this;

            var _gl = renderer.gl;

            _gl.bindFramebuffer(GL_FRAMEBUFFER, this._getFrameBufferGL(_gl));
            this._boundRenderer = renderer;
            var cache = this._cache;

            cache.put('viewport', renderer.viewport);

            var hasTextureAttached = false;
            var width;
            var height;
            for (var attachment in this._textures) {
                hasTextureAttached = true;
                var obj = this._textures[attachment];
                if (obj) {
                    // TODO Do width, height checking, make sure size are same
                    width = obj.texture.width;
                    height = obj.texture.height;
                    // Attach textures
                    this._doAttach(_gl, obj.texture, attachment, obj.target);
                }
            }

            this._width = width;
            this._height = height;

            if (!hasTextureAttached && this.depthBuffer) {
                console.error('Must attach texture before bind, or renderbuffer may have incorrect width and height.')
            }

            if (this.viewport) {
                renderer.setViewport(this.viewport);
            }
            else {
                renderer.setViewport(0, 0, width, height, 1);
            }

            var attachedTextures = cache.get('attached_textures');
            if (attachedTextures) {
                for (var attachment in attachedTextures) {
                    if (!this._textures[attachment]) {
                        var target = attachedTextures[attachment];
                        this._doDetach(_gl, attachment, target);
                    }
                }
            }
            if (!cache.get(KEY_DEPTHTEXTURE_ATTACHED) && this.depthBuffer) {
                // Create a new render buffer
                if (cache.miss(KEY_RENDERBUFFER)) {
                    cache.put(KEY_RENDERBUFFER, _gl.createRenderbuffer());
                }
                var renderbuffer = cache.get(KEY_RENDERBUFFER);

                if (width !== cache.get(KEY_RENDERBUFFER_WIDTH)
                     || height !== cache.get(KEY_RENDERBUFFER_HEIGHT)) {
                    _gl.bindRenderbuffer(GL_RENDERBUFFER, renderbuffer);
                    _gl.renderbufferStorage(GL_RENDERBUFFER, _gl.DEPTH_COMPONENT16, width, height);
                    cache.put(KEY_RENDERBUFFER_WIDTH, width);
                    cache.put(KEY_RENDERBUFFER_HEIGHT, height);
                    _gl.bindRenderbuffer(GL_RENDERBUFFER, null);
                }
                if (!cache.get(KEY_RENDERBUFFER_ATTACHED)) {
                    _gl.framebufferRenderbuffer(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_RENDERBUFFER, renderbuffer);
                    cache.put(KEY_RENDERBUFFER_ATTACHED, true);
                }
            }
        },

        /**
         * Unbind the frame buffer after rendering
         * @param  {qtek.Renderer} renderer
         */
        unbind: function (renderer) {
            // Remove status record on renderer
            renderer.__currentFrameBuffer = null;

            var _gl = renderer.gl;

            _gl.bindFramebuffer(GL_FRAMEBUFFER, null);
            this._boundRenderer = null;

            this._cache.use(_gl.__GLID__);
            var viewport = this._cache.get('viewport');
            // Reset viewport;
            if (viewport) {
                renderer.setViewport(viewport);
            }

            this.updateMipmap(_gl);
        },

        // Because the data of texture is changed over time,
        // Here update the mipmaps of texture each time after rendered;
        updateMipmap: function (_gl) {
            for (var attachment in this._textures) {
                var obj = this._textures[attachment];
                if (obj) {
                    var texture = obj.texture;
                    // FIXME some texture format can't generate mipmap
                    if (!texture.NPOT && texture.useMipmap
                        && texture.minFilter === Texture.LINEAR_MIPMAP_LINEAR) {
                        var target = texture instanceof TextureCube ? glenum.TEXTURE_CUBE_MAP : glenum.TEXTURE_2D;
                        _gl.bindTexture(target, texture.getWebGLTexture(_gl));
                        _gl.generateMipmap(target);
                        _gl.bindTexture(target, null);
                    }
                }
            }
        },

        /**
         * 0x8CD5, 36053, FRAMEBUFFER_COMPLETE
         * 0x8CD6, 36054, FRAMEBUFFER_INCOMPLETE_ATTACHMENT
         * 0x8CD7, 36055, FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT
         * 0x8CD9, 36057, FRAMEBUFFER_INCOMPLETE_DIMENSIONS
         * 0x8CDD, 36061, FRAMEBUFFER_UNSUPPORTED
         */
        checkStatus: function (_gl) {
            return _gl.checkFramebufferStatus(GL_FRAMEBUFFER);
        },

        _getFrameBufferGL: function (_gl) {
            var cache = this._cache;
            cache.use(_gl.__GLID__);

            if (cache.miss(KEY_FRAMEBUFFER)) {
                cache.put(KEY_FRAMEBUFFER, _gl.createFramebuffer());
            }

            return cache.get(KEY_FRAMEBUFFER);
        },

        /**
         * Attach a texture(RTT) to the framebuffer
         * @param  {qtek.Texture} texture
         * @param  {number} [attachment=gl.COLOR_ATTACHMENT0]
         * @param  {number} [target=gl.TEXTURE_2D]
         */
        attach: function (texture, attachment, target) {

            if (!texture.width) {
                throw new Error('The texture attached to color buffer is not a valid.');
            }
            // TODO width and height check

            // If the depth_texture extension is enabled, developers
            // Can attach a depth texture to the depth buffer
            // http://blog.tojicode.com/2012/07/using-webgldepthtexture.html
            attachment = attachment || GL_COLOR_ATTACHMENT0;
            target = target || glenum.TEXTURE_2D;

            var boundRenderer = this._boundRenderer;
            var _gl = boundRenderer && boundRenderer.gl;
            var attachedTextures;

            if (_gl) {
                var cache = this._cache;
                cache.use(_gl.__GLID__);
                attachedTextures = cache.get('attached_textures');
            }

            // Check if texture attached
            var previous = this._textures[attachment];
            if (previous && previous.target === target
                && previous.texture === texture
                && (attachedTextures && attachedTextures[attachment] != null)
            ) {
                return;
            }

            var canAttach = true;
            if (_gl) {
                canAttach = this._doAttach(_gl, texture, attachment, target);
                // Set viewport again incase attached to different size textures.
                if (!this.viewport) {
                    boundRenderer.setViewport(0, 0, texture.width, texture.height, 1);
                }
            }

            if (canAttach) {
                this._textures[attachment] = this._textures[attachment] || {};
                this._textures[attachment].texture = texture;
                this._textures[attachment].target = target;
            }
        },

        _doAttach: function (_gl, texture, attachment, target) {

            // Make sure texture is always updated
            // Because texture width or height may be changed and in this we can't be notified
            // FIXME awkward;
            var webglTexture = texture.getWebGLTexture(_gl);
            // Assume cache has been used.
            var attachedTextures = this._cache.get('attached_textures');
            if (attachedTextures && attachedTextures[attachment]) {
                var obj = attachedTextures[attachment];
                // Check if texture and target not changed
                if (obj.texture === texture && obj.target === target) {
                    return;
                }
            }
            attachment = +attachment;

            var canAttach = true;
            if (attachment === GL_DEPTH_ATTACHMENT || attachment === glenum.DEPTH_STENCIL_ATTACHMENT) {
                var extension = glinfo.getExtension(_gl, 'WEBGL_depth_texture');

                if (!extension) {
                    console.error('Depth texture is not supported by the browser');
                    canAttach = false;
                }
                if (texture.format !== glenum.DEPTH_COMPONENT
                    && texture.format !== glenum.DEPTH_STENCIL
                ) {
                    console.error('The texture attached to depth buffer is not a valid.');
                    canAttach = false;
                }

                // Dispose render buffer created previous
                if (canAttach) {
                    var renderbuffer = this._cache.get(KEY_RENDERBUFFER);
                    if (renderbuffer) {
                        _gl.framebufferRenderbuffer(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_RENDERBUFFER, null);
                        _gl.deleteRenderbuffer(renderbuffer);
                        this._cache.put(KEY_RENDERBUFFER, false);
                    }

                    this._cache.put(KEY_RENDERBUFFER_ATTACHED, false);
                    this._cache.put(KEY_DEPTHTEXTURE_ATTACHED, true);
                }
            }

            // Mipmap level can only be 0
            _gl.framebufferTexture2D(GL_FRAMEBUFFER, attachment, target, webglTexture, 0);

            if (!attachedTextures) {
                attachedTextures = {};
                this._cache.put('attached_textures', attachedTextures);
            }
            attachedTextures[attachment] = attachedTextures[attachment] || {};
            attachedTextures[attachment].texture = texture;
            attachedTextures[attachment].target = target;

            return canAttach;
        },

        _doDetach: function (_gl, attachment, target) {
            // Detach a texture from framebuffer
            // https://github.com/KhronosGroup/WebGL/blob/master/conformance-suites/1.0.0/conformance/framebuffer-test.html#L145
            _gl.framebufferTexture2D(GL_FRAMEBUFFER, attachment, target, null, 0);

            // Assume cache has been used.
            var attachedTextures = this._cache.get('attached_textures');
            if (attachedTextures && attachedTextures[attachment]) {
                attachedTextures[attachment] = null;
            }

            if (attachment === GL_DEPTH_ATTACHMENT || attachment === glenum.DEPTH_STENCIL_ATTACHMENT) {
                this._cache.put(KEY_DEPTHTEXTURE_ATTACHED, false);
            }
        },

        /**
         * Detach a texture
         * @param  {number} [attachment=gl.COLOR_ATTACHMENT0]
         * @param  {number} [target=gl.TEXTURE_2D]
         */
        detach: function (attachment, target) {
            // TODO depth extension check ?
            this._textures[attachment] = null;
            if (this._boundRenderer) {
                var gl = this._boundRenderer.gl;
                var cache = this._cache;
                cache.use(gl.__GLID__);
                this._doDetach(gl, attachment, target);
            }
        },
        /**
         * Dispose
         * @param  {WebGLRenderingContext} _gl
         */
        dispose: function (_gl) {

            var cache = this._cache;

            cache.use(_gl.__GLID__);

            var renderBuffer = cache.get(KEY_RENDERBUFFER);
            if (renderBuffer) {
                _gl.deleteRenderbuffer(renderBuffer);
            }
            var frameBuffer = cache.get(KEY_FRAMEBUFFER);
            if (frameBuffer) {
                _gl.deleteFramebuffer(frameBuffer);
            }
            cache.deleteContext(_gl.__GLID__);

            // Clear cache for reusing
            this._textures = {};

        }
    });

    FrameBuffer.DEPTH_ATTACHMENT = GL_DEPTH_ATTACHMENT;
    FrameBuffer.COLOR_ATTACHMENT0 = GL_COLOR_ATTACHMENT0;
    FrameBuffer.STENCIL_ATTACHMENT = glenum.STENCIL_ATTACHMENT;
    FrameBuffer.DEPTH_STENCIL_ATTACHMENT = glenum.DEPTH_STENCIL_ATTACHMENT;

    module.exports = FrameBuffer;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Base = __webpack_require__(1);
    var glenum = __webpack_require__(2);
    var Cache = __webpack_require__(17);
    var vendor = __webpack_require__(8);

    function getArrayCtorByType (type) {
        var ArrayConstructor;
        switch(type) {
            case 'byte':
                ArrayConstructor = vendor.Int8Array;
                break;
            case 'ubyte':
                ArrayConstructor = vendor.Uint8Array;
                break;
            case 'short':
                ArrayConstructor = vendor.Int16Array;
                break;
            case 'ushort':
                ArrayConstructor = vendor.Uint16Array;
                break;
            default:
                ArrayConstructor = vendor.Float32Array;
                break;
        }
        return ArrayConstructor;
    }


    function Attribute(name, type, size, semantic) {
        this.name = name;
        this.type = type;
        this.size = size;
        if (semantic) {
            this.semantic = semantic;
        }
    }
    Attribute.prototype.clone = function(copyValue) {
        var ret = new this.constructor(this.name, this.type, this.size, this.semantic);
        // FIXME
        if (copyValue) {
            console.warn('todo');
        }
        return ret;
    };


    /**
     * Attribute for static geometry
     */
    function StaticAttribute (name, type, size, semantic) {
        Attribute.call(this, name, type, size, semantic);
        this.value = null;

        // Init getter setter
        switch (size) {
            case 1:
                this.get = function (idx) {
                    return this.value[idx];
                };
                this.set = function (idx, value) {
                    this.value[idx] = value;
                };
                // Copy from source to target
                this.copy = function (target, source) {
                    this.value[target] = this.value[target];
                };
                break;
            case 2:
                this.get = function (idx, out) {
                    var arr = this.value;
                    out[0] = arr[idx * 2];
                    out[1] = arr[idx * 2 + 1];
                    return out;
                };
                this.set = function (idx, val) {
                    var arr = this.value;
                    arr[idx * 2] = val[0];
                    arr[idx * 2 + 1] = val[1];
                };
                this.copy = function (target, source) {
                    var arr = this.value;
                    source *= 2;
                    target *= 2;
                    arr[target] = arr[source];
                    arr[target + 1] = arr[source + 1];
                };
                break;
            case 3:
                this.get = function (idx, out) {
                    var idx3 = idx * 3;
                    var arr = this.value;
                    out[0] = arr[idx3];
                    out[1] = arr[idx3 + 1];
                    out[2] = arr[idx3 + 2];
                    return out;
                };
                this.set = function (idx, val) {
                    var idx3 = idx * 3;
                    var arr = this.value;
                    arr[idx3] = val[0];
                    arr[idx3 + 1] = val[1];
                    arr[idx3 + 2] = val[2];
                };
                this.copy = function (target, source) {
                    var arr = this.value;
                    source *= 3;
                    target *= 3;
                    arr[target] = arr[source];
                    arr[target + 1] = arr[source + 1];
                    arr[target + 2] = arr[source + 2];
                };
                break;
            case 4:
                this.get = function (idx, out) {
                    var arr = this.value;
                    var idx4 = idx * 4;
                    out[0] = arr[idx4];
                    out[1] = arr[idx4 + 1];
                    out[2] = arr[idx4 + 2];
                    out[3] = arr[idx4 + 3];
                    return out;
                };
                this.set = function (idx, val) {
                    var arr = this.value;
                    var idx4 = idx * 4;
                    arr[idx4] = val[0];
                    arr[idx4 + 1] = val[1];
                    arr[idx4 + 2] = val[2];
                    arr[idx4 + 3] = val[3];
                };
                this.copy = function (target, source) {
                    var arr = this.value;
                    source *= 4;
                    target *= 4;
                    // copyWithin is extremely slow
                    arr[target] = arr[source];
                    arr[target + 1] = arr[source + 1];
                    arr[target + 2] = arr[source + 2];
                    arr[target + 3] = arr[source + 3];
                };
        }
    }

    StaticAttribute.prototype.constructor = new Attribute();

    StaticAttribute.prototype.init = function (nVertex) {
        if (!this.value || this.value.length != nVertex * this.size) {
            var ArrayConstructor = getArrayCtorByType(this.type);
            this.value = new ArrayConstructor(nVertex * this.size);
        }
    };

    StaticAttribute.prototype.fromArray = function (array) {
        var ArrayConstructor = getArrayCtorByType(this.type);
        var value;
        // Convert 2d array to flat
        if (array[0] && (array[0].length)) {
            var n = 0;
            var size = this.size;
            value = new ArrayConstructor(array.length * size);
            for (var i = 0; i < array.length; i++) {
                for (var j = 0; j < size; j++) {
                    value[n++] = array[i][j];
                }
            }
        }
        else {
            value = new ArrayConstructor(array);
        }
        this.value = value;
    };

    function AttributeBuffer(name, type, buffer, size, semantic) {
        this.name = name;
        this.type = type;
        this.buffer = buffer;
        this.size = size;
        this.semantic = semantic;

        // To be set in mesh
        // symbol in the shader
        this.symbol = '';

        // Needs remove flag
        this.needsRemove = false;
    }

    function IndicesBuffer(buffer) {
        this.buffer = buffer;
        this.count = 0;
    }

    function notImplementedWarn() {
        console.warn('Geometry doesn\'t implement this method, use StaticGeometry instead');
    }

    /**
     * @constructor qtek.Geometry
     * @extends qtek.core.Base
     */
    var Geometry = Base.extend(
    /** @lends qtek.Geometry# */
    {
        /**
         * @type {qtek.math.BoundingBox}
         */
        boundingBox : null,

        /**
         * Vertex attributes
         * @type {Object}
         */
        attributes : {},

        indices : null,

        /**
         * Is vertices data dynamically updated
         * @type {boolean}
         */
        dynamic: false,

    }, function() {
        // Use cache
        this._cache = new Cache();

        this._attributeList = Object.keys(this.attributes);
    },
    /** @lends qtek.Geometry.prototype */
    {
        /**
         * User defined ray picking algorithm instead of default
         * triangle ray intersection
         * x, y are NDC.
         * (x, y, renderer, camera, renderable, out) => boolean
         * @type {Function}
         */
        pickByRay: null,

        /**
         * User defined picking algorithm instead of default
         * triangle ray intersection
         * (ray: qtek.math.Ray, renderable: qtek.Renderable, out: Array) => boolean
         * @type {Function}
         */
        pick: null,

        /**
         * Main attribute will be used to count vertex number
         * @type {string}
         */
        mainAttribute: 'position',
        /**
         * Mark attributes in geometry is dirty
         * @method
         */
        dirty: notImplementedWarn,
        /**
         * Create a new attribute
         * @method
         * @param {string} name
         * @param {string} type
         * @param {number} size
         * @param {string} [semantic]
         */
        createAttribute: notImplementedWarn,
        /**
         * Remove attribute
         * @method
         * @param {string} name
         */
        removeAttribute: notImplementedWarn,

        /**
         * @method
         * @param {number} idx
         * @param {Array.<number>} out
         * @return {Array.<number>}
         */
        getTriangleIndices: notImplementedWarn,

        /**
         * @method
         * @param {number} idx
         * @param {Array.<number>} face
         */
        setTriangleIndices: notImplementedWarn,
        /**
         * @method
         * @return {boolean}
         */
        isUseIndices: notImplementedWarn,

        getEnabledAttributes: notImplementedWarn,
        getBufferChunks: notImplementedWarn,

        /**
         * @method
         */
        generateVertexNormals: notImplementedWarn,
        /**
         * @method
         */
        generateFaceNormals: notImplementedWarn,
        /**
         * @method
         * @return {boolean}
         */
        isUniqueVertex: notImplementedWarn,
        /**
         * @method
         */
        generateUniqueVertex: notImplementedWarn,
        /**
         * @method
         */
        generateTangents: notImplementedWarn,
        /**
         * @method
         */
        generateBarycentric: notImplementedWarn,
        /**
         * @method
         * @param {qtek.math.Matrix4} matrix
         */
        applyTransform: notImplementedWarn,
        /**
         * @method
         * @param {WebGLRenderingContext} [gl]
         */
        dispose: notImplementedWarn
    });

    Geometry.STATIC_DRAW = glenum.STATIC_DRAW;
    Geometry.DYNAMIC_DRAW = glenum.DYNAMIC_DRAW;
    Geometry.STREAM_DRAW = glenum.STREAM_DRAW;

    Geometry.AttributeBuffer = AttributeBuffer;
    Geometry.IndicesBuffer = IndicesBuffer;
    Geometry.Attribute = Attribute;
    Geometry.StaticAttribute = StaticAttribute;

    module.exports = Geometry;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Node = __webpack_require__(7);
    var glenum = __webpack_require__(2);
    var glinfo = __webpack_require__(6);

    // Cache
    var prevDrawID = 0;
    var prevDrawIndicesBuffer = null;
    var prevDrawIsUseIndices = true;

    var currentDrawID;

    var RenderInfo = function() {
        this.triangleCount = 0;
        this.vertexCount = 0;
        this.drawCallCount = 0;
    };

    function VertexArrayObject(
        availableAttributes,
        availableAttributeSymbols,
        indicesBuffer
    ) {
        this.availableAttributes = availableAttributes;
        this.availableAttributeSymbols = availableAttributeSymbols;
        this.indicesBuffer = indicesBuffer;

        this.vao = null;
    }
    /**
     * @constructor qtek.Renderable
     * @extends qtek.Node
     */
    var Renderable = Node.extend(
    /** @lends qtek.Renderable# */
    {
        /**
         * @type {qtek.Material}
         */
        material: null,

        /**
         * @type {qtek.Geometry}
         */
        geometry: null,

        /**
         * @type {number}
         */
        mode: glenum.TRIANGLES,

        _drawCache: null,

        _renderInfo: null
    }, function() {
        this._drawCache = {};
        this._renderInfo = new RenderInfo();
    },
    /** @lends qtek.Renderable.prototype */
    {

        /**
         * Render order, Nodes with smaller value renders before nodes with larger values.
         * @type {Number}
         */
        renderOrder: 0,
        /**
         * Used when mode is LINES, LINE_STRIP or LINE_LOOP
         * @type {number}
         */
        lineWidth: 1,

        /**
         * @type {boolean}
         */
        culling: true,
        /**
         * @type {number}
         */
        cullFace: glenum.BACK,
        /**
         * @type {number}
         */
        frontFace: glenum.CCW,

        /**
         * Software frustum culling
         * @type {boolean}
         */
        frustumCulling: true,
        /**
         * @type {boolean}
         */
        receiveShadow: true,
        /**
         * @type {boolean}
         */
        castShadow: true,
        /**
         * @type {boolean}
         */
        ignorePicking: false,

        /**
         * @return {boolean}
         */
        isRenderable: function() {
            return this.geometry && this.material && !this.invisible
                && this.geometry.vertexCount > 0;
        },

        /**
         * Before render hook
         * @type {Function}
         * @memberOf qtek.Renderable
         */
        beforeRender: function (_gl) {},

        /**
         * Before render hook
         * @type {Function}
         * @memberOf qtek.Renderable
         */
        afterRender: function (_gl, renderStat) {},

        getBoundingBox: function (filter, out) {
            out = Node.prototype.getBoundingBox.call(this, filter, out);
            if (this.geometry && this.geometry.boundingBox) {
                out.union(this.geometry.boundingBox);
            }

            return out;
        },

        /**
         * @param  {WebGLRenderingContext} _gl
         * @param  {qtek.Shader} [shader] May use shader of other material if shader code are same
         * @return {Object}
         */
        render: function (_gl, shader) {
            // May use shader of other material if shader code are same
            var shader = shader || this.material.shader;
            var geometry = this.geometry;

            var glDrawMode = this.mode;

            var nVertex = geometry.vertexCount;
            var isUseIndices = geometry.isUseIndices();

            var uintExt = glinfo.getExtension(_gl, 'OES_element_index_uint');
            var useUintExt = uintExt && nVertex > 0xffff;
            var indicesType = useUintExt ? _gl.UNSIGNED_INT : _gl.UNSIGNED_SHORT;

            var vaoExt = glinfo.getExtension(_gl, 'OES_vertex_array_object');
            // var vaoExt = null;

            var isStatic = !geometry.dynamic;

            var renderInfo = this._renderInfo;
            renderInfo.vertexCount = nVertex;
            renderInfo.triangleCount = 0;
            renderInfo.drawCallCount = 0;
            // Draw each chunk
            var drawHashChanged = false;
            // Hash with shader id in case previous material has less attributes than next material
            currentDrawID = _gl.__GLID__ + '-' + geometry.__GUID__ + '-' + shader.__GUID__;

            if (currentDrawID !== prevDrawID) {
                drawHashChanged = true;
            }
            else {
                // The cache will be invalid in the following cases
                // 1. Geometry is splitted to multiple chunks
                // 2. VAO is enabled and is binded to null after render
                // 3. Geometry needs update
                if (
                    ((nVertex > 0xffff && !uintExt) && isUseIndices)
                 || (vaoExt && isStatic)
                 || geometry._cache.isDirty()
                ) {
                    drawHashChanged = true;
                }
            }
            prevDrawID = currentDrawID;

            if (!drawHashChanged) {
                // Direct draw
                if (prevDrawIsUseIndices) {
                    _gl.drawElements(glDrawMode, prevDrawIndicesBuffer.count, indicesType, 0);
                    renderInfo.triangleCount = prevDrawIndicesBuffer.count / 3;
                }
                else {
                    // FIXME Use vertex number in buffer
                    // vertexCount may get the wrong value when geometry forget to mark dirty after update
                    _gl.drawArrays(glDrawMode, 0, nVertex);
                }
                renderInfo.drawCallCount = 1;
            }
            else {
                // Use the cache of static geometry
                var vaoList = this._drawCache[currentDrawID];
                if (!vaoList) {
                    var chunks = geometry.getBufferChunks(_gl);
                    if (!chunks) {  // Empty mesh
                        return;
                    }
                    vaoList = [];
                    for (var c = 0; c < chunks.length; c++) {
                        var chunk = chunks[c];
                        var attributeBuffers = chunk.attributeBuffers;
                        var indicesBuffer = chunk.indicesBuffer;

                        var availableAttributes = [];
                        var availableAttributeSymbols = [];
                        for (var a = 0; a < attributeBuffers.length; a++) {
                            var attributeBufferInfo = attributeBuffers[a];
                            var name = attributeBufferInfo.name;
                            var semantic = attributeBufferInfo.semantic;
                            var symbol;
                            if (semantic) {
                                var semanticInfo = shader.attribSemantics[semantic];
                                symbol = semanticInfo && semanticInfo.symbol;
                            }
                            else {
                                symbol = name;
                            }
                            if (symbol && shader.attributeTemplates[symbol]) {
                                availableAttributes.push(attributeBufferInfo);
                                availableAttributeSymbols.push(symbol);
                            }
                        }

                        var vao = new VertexArrayObject(
                            availableAttributes,
                            availableAttributeSymbols,
                            indicesBuffer
                        );
                        vaoList.push(vao);
                    }
                    if (isStatic) {
                        this._drawCache[currentDrawID] = vaoList;
                    }
                }

                for (var i = 0; i < vaoList.length; i++) {
                    var vao = vaoList[i];
                    var needsBindAttributes = true;

                    // Create vertex object array cost a lot
                    // So we don't use it on the dynamic object
                    if (vaoExt && isStatic) {
                        // Use vertex array object
                        // http://blog.tojicode.com/2012/10/oesvertexarrayobject-extension.html
                        if (vao.vao == null) {
                            vao.vao = vaoExt.createVertexArrayOES();
                        }
                        else {
                            needsBindAttributes = false;
                        }
                        vaoExt.bindVertexArrayOES(vao.vao);
                    }

                    var availableAttributes = vao.availableAttributes;
                    var indicesBuffer = vao.indicesBuffer;

                    if (needsBindAttributes) {
                        var locationList = shader.enableAttributes(_gl, vao.availableAttributeSymbols, (vaoExt && isStatic && vao.vao));
                        // Setting attributes;
                        for (var a = 0; a < availableAttributes.length; a++) {
                            var location = locationList[a];
                            if (location === -1) {
                                continue;
                            }
                            var attributeBufferInfo = availableAttributes[a];
                            var buffer = attributeBufferInfo.buffer;
                            var size = attributeBufferInfo.size;
                            var glType;
                            switch (attributeBufferInfo.type) {
                                case 'float':
                                    glType = _gl.FLOAT;
                                    break;
                                case 'byte':
                                    glType = _gl.BYTE;
                                    break;
                                case 'ubyte':
                                    glType = _gl.UNSIGNED_BYTE;
                                    break;
                                case 'short':
                                    glType = _gl.SHORT;
                                    break;
                                case 'ushort':
                                    glType = _gl.UNSIGNED_SHORT;
                                    break;
                                default:
                                    glType = _gl.FLOAT;
                                    break;
                            }

                            _gl.bindBuffer(_gl.ARRAY_BUFFER, buffer);
                            _gl.vertexAttribPointer(location, size, glType, false, 0, 0);
                        }
                    }
                    if (
                        glDrawMode == glenum.LINES ||
                        glDrawMode == glenum.LINE_STRIP ||
                        glDrawMode == glenum.LINE_LOOP
                    ) {
                        _gl.lineWidth(this.lineWidth);
                    }

                    prevDrawIndicesBuffer = indicesBuffer;
                    prevDrawIsUseIndices = geometry.isUseIndices();
                    // Do drawing
                    if (prevDrawIsUseIndices) {
                        if (needsBindAttributes) {
                            _gl.bindBuffer(_gl.ELEMENT_ARRAY_BUFFER, indicesBuffer.buffer);
                        }
                        _gl.drawElements(glDrawMode, indicesBuffer.count, indicesType, 0);
                        renderInfo.triangleCount += indicesBuffer.count / 3;
                    } else {
                        _gl.drawArrays(glDrawMode, 0, nVertex);
                    }

                    if (vaoExt && isStatic) {
                        vaoExt.bindVertexArrayOES(null);
                    }

                    renderInfo.drawCallCount++;
                }
            }

            return renderInfo;
        },

        /**
         * Clone a new renderable
         * @method
         * @return {qtek.Renderable}
         */
        clone: (function() {
            var properties = [
                'castShadow', 'receiveShadow',
                'mode', 'culling', 'cullFace', 'frontFace',
                'frustumCulling'
            ];
            return function() {
                var renderable = Node.prototype.clone.call(this);

                renderable.geometry = this.geometry;
                renderable.material = this.material;

                for (var i = 0; i < properties.length; i++) {
                    var name = properties[i];
                    // Try not to overwrite the prototype property
                    if (renderable[name] !== this[name]) {
                        renderable[name] = this[name];
                    }
                }

                return renderable;
            };
        })()
    });

    Renderable.beforeFrame = function() {
        prevDrawID = 0;
    };

    // Enums
    Renderable.POINTS = glenum.POINTS;
    Renderable.LINES = glenum.LINES;
    Renderable.LINE_LOOP = glenum.LINE_LOOP;
    Renderable.LINE_STRIP = glenum.LINE_STRIP;
    Renderable.TRIANGLES = glenum.TRIANGLES;
    Renderable.TRIANGLE_STRIP = glenum.TRIANGLE_STRIP;
    Renderable.TRIANGLE_FAN = glenum.TRIANGLE_FAN;

    Renderable.BACK = glenum.BACK;
    Renderable.FRONT = glenum.FRONT;
    Renderable.FRONT_AND_BACK = glenum.FRONT_AND_BACK;
    Renderable.CW = glenum.CW;
    Renderable.CCW = glenum.CCW;

    Renderable.RenderInfo = RenderInfo;

    module.exports = Renderable;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Base = __webpack_require__(1);
    var Joint = __webpack_require__(26);

    var glMatrix = __webpack_require__(0);
    var quat = glMatrix.quat;
    var vec3 = glMatrix.vec3;
    var mat4 = glMatrix.mat4;

    /**
     * @constructor qtek.Skeleton
     */
    var Skeleton = Base.extend(function() {
        return /** @lends qtek.Skeleton# */{

            /**
             * Relative root node that not affect transform of joint.
             * @type {qtek.Node}
             */
            relativeRootNode: null,
            /**
             * @type {string}
             */
            name: '',

            /**
             * root joints
             * @type {Array.<qtek.Joint>}
             */
            roots: [],

            /**
             * joints
             * @type {Array.<qtek.Joint>}
             */
            joints: [],

            _clips: [],

            // Matrix to joint space (relative to root joint)
            _invBindPoseMatricesArray: null,

            // Use subarray instead of copy back each time computing matrix
            // http://jsperf.com/subarray-vs-copy-for-array-transform/5
            _jointMatricesSubArrays: [],

            // jointMatrix * currentPoseMatrix
            // worldTransform is relative to the root bone
            // still in model space not world space
            _skinMatricesArray: null,

            _skinMatricesSubArrays: [],

            _subSkinMatricesArray: {}
        };
    },
    /** @lends qtek.Skeleton.prototype */
    {
        /**
         * Update joints hierarchy
         */
        updateHierarchy: function() {
            this.roots = [];
            var joints = this.joints;
            for (var i = 0; i < joints.length; i++) {
                var joint = joints[i];
                if (joint.parentIndex >= 0) {
                    var parent = joints[joint.parentIndex].node;
                    parent.add(joint.node);
                }
                else {
                    this.roots.push(joint);
                }
            }
        },

        /**
         * Add a skinning clip and create a map between clip and skeleton
         * @param {qtek.animation.SkinningClip} clip
         * @param {Object} [mapRule] Map between joint name in skeleton and joint name in clip
         */
        addClip: function(clip, mapRule) {
            // Clip have been exists in
            for (var i = 0; i < this._clips.length; i++) {
                if (this._clips[i].clip === clip) {
                    return;
                }
            }
            // Map the joint index in skeleton to joint pose index in clip
            var maps = [];
            for (var i = 0; i < this.joints.length; i++) {
                maps[i] = -1;
            }
            // Create avatar
            for (var i = 0; i < clip.jointClips.length; i++) {
                for (var j = 0; j < this.joints.length; j++) {
                    var joint = this.joints[j];
                    var jointPose = clip.jointClips[i];
                    var jointName = joint.name;
                    if (mapRule) {
                        jointName = mapRule[jointName];
                    }
                    if (jointPose.name === jointName) {
                        maps[j] = i;
                        break;
                    }
                }
            }

            this._clips.push({
                maps: maps,
                clip: clip
            });

            return this._clips.length - 1;
        },

        /**
         * @param {qtek.animation.SkinningClip} clip
         */
        removeClip: function(clip) {
            var idx = -1;
            for (var i = 0; i < this._clips.length; i++) {
                if (this._clips[i].clip === clip) {
                    idx = i;
                    break;
                }
            }
            if (idx > 0) {
                this._clips.splice(idx, 1);
            }
        },
        /**
         * Remove all clips
         */
        removeClipsAll: function() {
            this._clips = [];
        },

        /**
         * Get clip by index
         * @param  {number} index
         */
        getClip: function(index) {
            if (this._clips[index]) {
                return this._clips[index].clip;
            }
        },

        /**
         * @return {number}
         */
        getClipNumber: function() {
            return this._clips.length;
        },

        /**
         * Calculate joint matrices from node transform
         * @method
         */
        updateJointMatrices: (function() {

            var m4 = mat4.create();

            return function() {
                for (var i = 0; i < this.roots.length; i++) {
                    this.roots[i].node.update(true);
                }
                this._invBindPoseMatricesArray = new Float32Array(this.joints.length * 16);
                this._skinMatricesArray = new Float32Array(this.joints.length * 16);

                for (var i = 0; i < this.joints.length; i++) {
                    var joint = this.joints[i];
                    // Joint space is relative to root, if have
                    // !!Parent node and joint node must all be updated
                    if (this.relativeRootNode) {
                        mat4.invert(m4, this.relativeRootNode.worldTransform._array);
                        mat4.multiply(
                            m4,
                            m4,
                            joint.node.worldTransform._array
                        );
                        mat4.invert(m4, m4);
                    }
                    else {
                        mat4.copy(m4, joint.node.worldTransform._array);
                        mat4.invert(m4, m4);
                    }

                    var offset = i * 16;
                    for (var j = 0; j < 16; j++) {
                        this._invBindPoseMatricesArray[offset + j] = m4[j];
                    }
                }

                this.updateMatricesSubArrays();
            };
        })(),

        updateMatricesSubArrays: function() {
            for (var i = 0; i < this.joints.length; i++) {
                this._jointMatricesSubArrays[i] = this._invBindPoseMatricesArray.subarray(i * 16, (i+1) * 16);
                this._skinMatricesSubArrays[i] = this._skinMatricesArray.subarray(i * 16, (i+1) * 16);
            }
        },

        /**
         * Update skinning matrices
         */
        update: (function() {
            var m4 = mat4.create();
            return function() {
                for (var i = 0; i < this.roots.length; i++) {
                    this.roots[i].node.update(true);
                }

                for (var i = 0; i < this.joints.length; i++) {
                    var joint = this.joints[i];
                    mat4.multiply(
                        this._skinMatricesSubArrays[i],
                        joint.node.worldTransform._array,
                        this._jointMatricesSubArrays[i]
                    );

                    // Joint space is relative to root, if have
                    if (this.relativeRootNode) {
                        mat4.invert(m4, this.relativeRootNode.worldTransform._array);
                        mat4.multiply(
                            this._skinMatricesSubArrays[i],
                            m4,
                            this._skinMatricesSubArrays[i]
                        );
                    }
                }
            };
        })(),

        getSubSkinMatrices: function(meshId, joints) {
            var subArray = this._subSkinMatricesArray[meshId];
            if (!subArray) {
                subArray
                    = this._subSkinMatricesArray[meshId]
                    = new Float32Array(joints.length * 16);
            }
            var cursor = 0;
            for (var i = 0; i < joints.length; i++) {
                var idx = joints[i];
                for (var j = 0; j < 16; j++) {
                    subArray[cursor++] = this._skinMatricesArray[idx * 16 + j];
                }
            }
            return subArray;
        },

        /**
         * Set pose and update skinning matrices
         * @param {number} clipIndex
         */
        setPose: function(clipIndex) {
            if (this._clips[clipIndex]) {
                var clip = this._clips[clipIndex].clip;
                var maps = this._clips[clipIndex].maps;

                for (var i = 0; i < this.joints.length; i++) {
                    var joint = this.joints[i];
                    if (maps[i] === -1) {
                        continue;
                    }
                    var pose = clip.jointClips[maps[i]];

                    // Not update if there is no data.
                    // PENDING If sync pose.position, pose.rotation, pose.scale
                    if (pose.channels.position) {
                        vec3.copy(joint.node.position._array, pose.position);
                    }
                    if (pose.channels.rotation) {
                        quat.copy(joint.node.rotation._array, pose.rotation);
                    }
                    if (pose.channels.scale) {
                        vec3.copy(joint.node.scale._array, pose.scale);
                    }

                    joint.node.position._dirty = true;
                    joint.node.rotation._dirty = true;
                    joint.node.scale._dirty = true;
                }
            }
            this.update();
        },

        clone: function (rootNode, newRootNode) {
            var skeleton = new Skeleton();
            skeleton.name = this.name;

            for (var i = 0; i < this.joints.length; i++) {
                var newJoint = new Joint();
                newJoint.name = this.joints[i].name;
                newJoint.index = this.joints[i].index;
                newJoint.parentIndex = this.joints[i].parentIndex;

                var path = this.joints[i].node.getPath(rootNode);
                var rootNodePath = this.joints[i].rootNode.getPath(rootNode);

                if (path != null && rootNodePath != null) {
                    newJoint.node = newRootNode.queryNode(path);
                    newJoint.rootNode = newRootNode.queryNode(rootNodePath);
                }
                else {
                    // PENDING
                    console.warn('Something wrong in clone, may be the skeleton root nodes is not mounted on the cloned root node.')
                }
                skeleton.joints.push(newJoint);
            }
            for (var i = 0; i < this.roots.length; i++) {
                skeleton.roots.push(skeleton.joints[this.roots[i].index]);
            }

            if (this._invBindPoseMatricesArray) {
                var len = this._invBindPoseMatricesArray.length;
                skeleton._invBindPoseMatricesArray = new Float32Array(len);
                for (var i = 0; i < len; i++) {
                    skeleton._invBindPoseMatricesArray[i] = this._invBindPoseMatricesArray[i];
                }

                skeleton._skinMatricesArray = new Float32Array(len);

                skeleton.updateMatricesSubArrays();
            }

            skeleton.update();

            return skeleton;
        }
    });

    module.exports = Skeleton;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Base = __webpack_require__(1);
    var Animator = __webpack_require__(50);

    var requestAnimationFrame = window.requestAnimationFrame
                                || window.msRequestAnimationFrame
                                || window.mozRequestAnimationFrame
                                || window.webkitRequestAnimationFrame
                                || function (func){ setTimeout(func, 16); };

    /**
     * Animation is global timeline that schedule all clips. each frame animation will set the time of clips to current and update the states of clips
     * @constructor qtek.animation.Animation
     * @extends qtek.core.Base
     *
     * @example
     *     var animation = new qtek.animation.Animation();
     *     var node = new qtek.Node();
     *     animation.animate(node.position)
     *         .when(1000, {
     *             x: 500,
     *             y: 500
     *         })
     *         .when(2000, {
     *             x: 100,
     *             y: 100
     *         })
     *         .when(3000, {
     *             z: 10
     *         })
     *         .start('spline');
     */
    var Animation = Base.extend(function () {
        return /** @lends qtek.animation.Animation# */{
            /**
             * stage is an object with render method, each frame if there exists any animating clips, stage.render will be called
             * @type {Object}
             */
            stage: null,

            _clips: [],

            _running: false,

            _time: 0,

            _paused: false,

            _pausedTime: 0
        };
    },
    /** @lends qtek.animation.Animation.prototype */
    {

        /**
         * Add animator
         * @param {qtek.animate.Animator} animator
         */
        addAnimator: function (animator) {
            animator.animation = this;
            var clips = animator.getClips();
            for (var i = 0; i < clips.length; i++) {
                this.addClip(clips[i]);
            }
        },

        /**
         * @param {qtek.animation.Clip} clip
         */
        addClip: function (clip) {
            if (this._clips.indexOf(clip) < 0) {
                this._clips.push(clip);
            }
        },

        /**
         * @param  {qtek.animation.Clip} clip
         */
        removeClip: function (clip) {
            var idx = this._clips.indexOf(clip);
            if (idx >= 0) {
                this._clips.splice(idx, 1);
            }
        },

        /**
         * Remove animator
         * @param {qtek.animate.Animator} animator
         */
        removeAnimator: function (animator) {
            var clips = animator.getClips();
            for (var i = 0; i < clips.length; i++) {
                this.removeClip(clips[i]);
            }
            animator.animation = null;
        },

        _update: function () {

            var time = new Date().getTime() - this._pausedTime;
            var delta = time - this._time;
            var clips = this._clips;
            var len = clips.length;

            var deferredEvents = [];
            var deferredClips = [];
            for (var i = 0; i < len; i++) {
                var clip = clips[i];
                var e = clip.step(time);
                // Throw out the events need to be called after
                // stage.render, like finish
                if (e) {
                    deferredEvents.push(e);
                    deferredClips.push(clip);
                }
            }

            // Remove the finished clip
            for (var i = 0; i < len;) {
                if (clips[i]._needsRemove) {
                    clips[i] = clips[len-1];
                    clips.pop();
                    len--;
                } else {
                    i++;
                }
            }

            len = deferredEvents.length;
            for (var i = 0; i < len; i++) {
                deferredClips[i].fire(deferredEvents[i]);
            }

            this._time = time;

            this.trigger('frame', delta);

            if (this.stage && this.stage.render) {
                this.stage.render();
            }
        },
        /**
         * Start running animation
         */
        start: function () {
            var self = this;

            this._running = true;
            this._time = new Date().getTime();

            this._pausedTime = 0;

            function step() {
                if (self._running) {

                    requestAnimationFrame(step);

                    self._update();
                }
            }

            requestAnimationFrame(step);

        },
        /**
         * Stop running animation
         */
        stop: function () {
            this._running = false;
        },

        /**
         * Pause
         */
        pause: function () {
            if (!this._paused) {
                this._pauseStart = new Date().getTime();
                this._paused = true;
            }
        },

        /**
         * Resume
         */
        resume: function () {
            if (this._paused) {
                this._pausedTime += (new Date().getTime()) - this._pauseStart;
                this._paused = false;
            }
        },

        /**
         * Remove all clips
         */
        removeClipsAll: function () {
            this._clips = [];
        },
        /**
         * Create a animator
         * @param  {Object} target
         * @param  {Object} [options]
         * @param  {boolean} [options.loop]
         * @param  {Function} [options.getter]
         * @param  {Function} [options.setter]
         * @param  {Function} [options.interpolater]
         * @return {qtek.animation.Animator}
         */
        animate: function (target, options) {
            options = options || {};
            var animator = new Animator(
                target,
                options.loop,
                options.getter,
                options.setter,
                options.interpolater
            );
            animator.animation = this;
            return animator;
        }
    });

    module.exports = Animation;



/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * @module echarts/animation/Animator
 */


    var Clip = __webpack_require__(16);

    var arraySlice = Array.prototype.slice;

    function defaultGetter(target, key) {
        return target[key];
    }
    function defaultSetter(target, key, value) {
        target[key] = value;
    }

    function interpolateNumber(p0, p1, percent) {
        return (p1 - p0) * percent + p0;
    }

    function interpolateArray(p0, p1, percent, out, arrDim) {
        var len = p0.length;
        if (arrDim == 1) {
            for (var i = 0; i < len; i++) {
                out[i] = interpolateNumber(p0[i], p1[i], percent);
            }
        } else {
            var len2 = p0[0].length;
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < len2; j++) {
                    out[i][j] = interpolateNumber(
                        p0[i][j], p1[i][j], percent
                    );
                }
            }
        }
    }

    function isArrayLike(data) {
        if (typeof(data) == 'undefined') {
            return false;
        } else if (typeof(data) == 'string') {
            return false;
        } else {
            return typeof(data.length) == 'number';
        }
    }

    function cloneValue(value) {
        if (isArrayLike(value)) {
            var len = value.length;
            if (isArrayLike(value[0])) {
                var ret = [];
                for (var i = 0; i < len; i++) {
                    ret.push(arraySlice.call(value[i]));
                }
                return ret;
            } else {
                return arraySlice.call(value);
            }
        } else {
            return value;
        }
    }

    function catmullRomInterpolateArray(
        p0, p1, p2, p3, t, t2, t3, out, arrDim
    ) {
        var len = p0.length;
        if (arrDim == 1) {
            for (var i = 0; i < len; i++) {
                out[i] = catmullRomInterpolate(
                    p0[i], p1[i], p2[i], p3[i], t, t2, t3
                );
            }
        } else {
            var len2 = p0[0].length;
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < len2; j++) {
                    out[i][j] = catmullRomInterpolate(
                        p0[i][j], p1[i][j], p2[i][j], p3[i][j],
                        t, t2, t3
                    );
                }
            }
        }
    }

    function catmullRomInterpolate(p0, p1, p2, p3, t, t2, t3) {
        var v0 = (p2 - p0) * 0.5;
        var v1 = (p3 - p1) * 0.5;
        return (2 * (p1 - p2) + v0 + v1) * t3
                + (- 3 * (p1 - p2) - 2 * v0 - v1) * t2
                + v0 * t + p1;
    }

    // arr0 is source array, arr1 is target array.
    // Do some preprocess to avoid error happened when interpolating from arr0 to arr1
    function fillArr(arr0, arr1, arrDim) {
        var arr0Len = arr0.length;
        var arr1Len = arr1.length;
        if (arr0Len !== arr1Len) {
            // FIXME Not work for TypedArray
            var isPreviousLarger = arr0Len > arr1Len;
            if (isPreviousLarger) {
                // Cut the previous
                arr0.length = arr1Len;
            }
            else {
                // Fill the previous
                for (var i = arr0Len; i < arr1Len; i++) {
                    arr0.push(
                        arrDim === 1 ? arr1[i] : arraySlice.call(arr1[i])
                    );
                }
            }
        }
        // Handling NaN value
        var len2 = arr0[0] && arr0[0].length;
        for (var i = 0; i < arr0.length; i++) {
            if (arrDim === 1) {
                if (isNaN(arr0[i])) {
                    arr0[i] = arr1[i];
                }
            }
            else {
                for (var j = 0; j < len2; j++) {
                    if (isNaN(arr0[i][j])) {
                        arr0[i][j] = arr1[i][j];
                    }
                }
            }
        }
    }

    /**
     * @param  {Array} arr0
     * @param  {Array} arr1
     * @param  {number} arrDim
     * @return {boolean}
     */
    function isArraySame(arr0, arr1, arrDim) {
        if (arr0 === arr1) {
            return true;
        }
        var len = arr0.length;
        if (len !== arr1.length) {
            return false;
        }
        if (arrDim === 1) {
            for (var i = 0; i < len; i++) {
                if (arr0[i] !== arr1[i]) {
                    return false;
                }
            }
        }
        else {
            var len2 = arr0[0].length;
            for (var i = 0; i < len; i++) {
                for (var j = 0; j < len2; j++) {
                    if (arr0[i][j] !== arr1[i][j]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    function createTrackClip(animator, easing, oneTrackDone, keyframes, propName, interpolater) {
        var getter = animator._getter;
        var setter = animator._setter;
        var useSpline = easing === 'spline';

        var trackLen = keyframes.length;
        if (!trackLen) {
            return;
        }
        // Guess data type
        var firstVal = keyframes[0].value;
        var isValueArray = isArrayLike(firstVal);

        // For vertices morphing
        var arrDim = (
                isValueArray
                && isArrayLike(firstVal[0])
            )
            ? 2 : 1;
        // Sort keyframe as ascending
        keyframes.sort(function(a, b) {
            return a.time - b.time;
        });

        var trackMaxTime = keyframes[trackLen - 1].time;
        // Percents of each keyframe
        var kfPercents = [];
        // Value of each keyframe
        var kfValues = [];

        var prevValue = keyframes[0].value;
        var isAllValueEqual = true;
        for (var i = 0; i < trackLen; i++) {
            kfPercents.push(keyframes[i].time / trackMaxTime);

            // Assume value is a color when it is a string
            var value = keyframes[i].value;

            // Check if value is equal, deep check if value is array
            if (!((isValueArray && isArraySame(value, prevValue, arrDim))
                || (!isValueArray && value === prevValue))) {
                isAllValueEqual = false;
            }
            prevValue = value;

            kfValues.push(value);
        }
        if (isAllValueEqual) {
            return;
        }

        var lastValue = kfValues[trackLen - 1];
        // Polyfill array and NaN value
        for (var i = 0; i < trackLen - 1; i++) {
            if (isValueArray) {
                fillArr(kfValues[i], lastValue, arrDim);
            }
            else {
                if (isNaN(kfValues[i]) && !isNaN(lastValue)) {
                    kfValues[i] = lastValue;
                }
            }
        }
        isValueArray && fillArr(getter(animator._target, propName), lastValue, arrDim);

        // Cache the key of last frame to speed up when
        // animation playback is sequency
        var cacheKey = 0;
        var cachePercent = 0;
        var start;
        var i, w;
        var p0, p1, p2, p3;

        var onframe = function(target, percent) {
            // Find the range keyframes
            // kf1-----kf2---------current--------kf3
            // find kf2(i) and kf3(i+1) and do interpolation
            if (percent < cachePercent) {
                // Start from next key
                start = Math.min(cacheKey + 1, trackLen - 1);
                for (i = start; i >= 0; i--) {
                    if (kfPercents[i] <= percent) {
                        break;
                    }
                }
                i = Math.min(i, trackLen-2);
            } else {
                for (i = cacheKey; i < trackLen; i++) {
                    if (kfPercents[i] > percent) {
                        break;
                    }
                }
                i = Math.min(i-1, trackLen-2);
            }
            cacheKey = i;
            cachePercent = percent;

            var range = (kfPercents[i+1] - kfPercents[i]);
            if (range === 0) {
                return;
            } else {
                w = (percent - kfPercents[i]) / range;
            }
            if (useSpline) {
                p1 = kfValues[i];
                p0 = kfValues[i === 0 ? i : i - 1];
                p2 = kfValues[i > trackLen - 2 ? trackLen - 1 : i + 1];
                p3 = kfValues[i > trackLen - 3 ? trackLen - 1 : i + 2];
                if (interpolater) {
                    setter(
                        target,
                        propName,
                        interpolater(
                            getter(target, propName),
                            p0, p1, p2, p3, w
                        )
                    );
                } else if (isValueArray) {
                    catmullRomInterpolateArray(
                        p0, p1, p2, p3, w, w*w, w*w*w,
                        getter(target, propName),
                        arrDim
                    );
                } else {
                    setter(
                        target,
                        propName,
                        catmullRomInterpolate(p0, p1, p2, p3, w, w*w, w*w*w)
                    );
                }
            } else {
                if (interpolater) {
                    setter(
                        target,
                        propName,
                        interpolater(
                            getter(target, propName),
                            kfValues[i],
                            kfValues[i + 1],
                            w
                        )
                    );
                }
                else if (isValueArray) {
                    interpolateArray(
                        kfValues[i], kfValues[i+1], w,
                        getter(target, propName),
                        arrDim
                    );
                } else {
                    setter(
                        target,
                        propName,
                        interpolateNumber(kfValues[i], kfValues[i+1], w)
                    );
                }
            }
        };

        var clip = new Clip({
            target: animator._target,
            life: trackMaxTime,
            loop: animator._loop,
            delay: animator._delay,
            onframe: onframe,
            onfinish: oneTrackDone
        });

        if (easing && easing !== 'spline') {
            clip.setEasing(easing);
        }

        return clip;
    }

    /**
     * @description Animator object can only be created by Animation.prototype.animate method.
     * After created, we can use {@link qtek.animation.Animator#when} to add all keyframes and {@link qtek.animation.Animator#start} it.
     * Clips will be automatically created and added to the animation instance which created this deferred object.
     *
     * @constructor qtek.animation.Animator
     *
     * @param {Object} target
     * @param {boolean} loop
     * @param {Function} getter
     * @param {Function} setter
     * @param {Function} interpolater
     */
    function Animator(target, loop, getter, setter, interpolater) {
        this._tracks = {};
        this._target = target;

        this._loop = loop || false;

        this._getter = getter || defaultGetter;
        this._setter = setter || defaultSetter;

        this._interpolater = interpolater || null;

        this._delay = 0;

        this._doneList = [];

        this._onframeList = [];

        this._clipList = [];
    }

    Animator.prototype = {

        constructor: Animator,

        /**
         * @param  {number} time Keyframe time using millisecond
         * @param  {Object} props A key-value object. Value can be number, 1d and 2d array
         * @return {qtek.animation.Animator}
         * @memberOf qtek.animation.Animator.prototype
         */
        when: function (time, props) {
            for (var propName in props) {
                if (!this._tracks[propName]) {
                    this._tracks[propName] = [];
                    // If time is 0
                    //  Then props is given initialize value
                    // Else
                    //  Initialize value from current prop value
                    if (time !== 0) {
                        this._tracks[propName].push({
                            time: 0,
                            value: cloneValue(
                                this._getter(this._target, propName)
                            )
                        });
                    }
                }
                this._tracks[propName].push({
                    time: parseInt(time),
                    value: props[propName]
                });
            }
            return this;
        },
        /**
         * callback when running animation
         * @param  {Function} callback callback have two args, animating target and current percent
         * @return {qtek.animation.Animator}
         * @memberOf qtek.animation.Animator.prototype
         */
        during: function (callback) {
            this._onframeList.push(callback);
            return this;
        },

        _doneCallback: function () {
            // Clear all tracks
            this._tracks = {};
            // Clear all clips
            this._clipList.length = 0;

            var doneList = this._doneList;
            var len = doneList.length;
            for (var i = 0; i < len; i++) {
                doneList[i].call(this);
            }
        },
        /**
         * Start the animation
         * @param  {string|function} easing
         * @return {qtek.animation.Animator}
         * @memberOf qtek.animation.Animator.prototype
         */
        start: function (easing) {

            var self = this;
            var clipCount = 0;

            var oneTrackDone = function() {
                clipCount--;
                if (clipCount === 0) {
                    self._doneCallback();
                }
            };

            var lastClip;
            for (var propName in this._tracks) {
                var clip = createTrackClip(
                    this, easing, oneTrackDone,
                    this._tracks[propName], propName, self._interpolater
                );
                if (clip) {
                    this._clipList.push(clip);
                    clipCount++;

                    // If start after added to animation
                    if (this.animation) {
                        this.animation.addClip(clip);
                    }

                    lastClip = clip;
                }
            }

            // Add during callback on the last clip
            if (lastClip) {
                var oldOnFrame = lastClip.onframe;
                lastClip.onframe = function (target, percent) {
                    oldOnFrame(target, percent);

                    for (var i = 0; i < self._onframeList.length; i++) {
                        self._onframeList[i](target, percent);
                    }
                };
            }

            if (!clipCount) {
                this._doneCallback();
            }
            return this;
        },

        /**
         * Stop the animation
         * @memberOf qtek.animation.Animator.prototype
         */
        stop: function () {
            for (var i = 0; i < this._clipList.length; i++) {
                var clip = this._clipList[i];
                this.animation.removeClip(clip);
            }
            this._clipList = [];
        },
        /**
         * Delay given milliseconds
         * @param  {number} time
         * @return {qtek.animation.Animator}
         * @memberOf qtek.animation.Animator.prototype
         */
        delay: function (time){
            this._delay = time;
            return this;
        },
        /**
         * Callback after animation finished
         * @param {Function} func
         * @return {qtek.animation.Animator}
         * @memberOf qtek.animation.Animator.prototype
         */
        done: function (func) {
            if (func) {
                this._doneList.push(func);
            }
            return this;
        },
        /**
         * Get all clips created in start method.
         * @return {qtek.animation.Clip[]}
         * @memberOf qtek.animation.Animator.prototype
         */
        getClips: function () {
            return this._clipList;
        }
    };

    module.exports = Animator;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Sampler clip is especially for the animation sampler in glTF
// Use Typed Array can reduce a lot of heap memory
//
// TODO Sync target transform


    var Clip = __webpack_require__(16);
    var TransformClip = __webpack_require__(30);

    var glMatrix = __webpack_require__(0);
    var quat = glMatrix.quat;
    var vec3 = glMatrix.vec3;

    // lerp function with offset in large array
    function vec3lerp(out, a, b, t, oa, ob) {
        var ax = a[oa];
        var ay = a[oa + 1];
        var az = a[oa + 2];
        out[0] = ax + t * (b[ob] - ax);
        out[1] = ay + t * (b[ob + 1] - ay);
        out[2] = az + t * (b[ob + 2] - az);

        return out;
    }

    function quatSlerp(out, a, b, t, oa, ob) {
        // benchmarks:
        //    http://jsperf.com/quaternion-slerp-implementations

        var ax = a[0 + oa], ay = a[1 + oa], az = a[2 + oa], aw = a[3 + oa],
            bx = b[0 + ob], by = b[1 + ob], bz = b[2 + ob], bw = b[3 + ob];

        var omega, cosom, sinom, scale0, scale1;

        // calc cosine
        cosom = ax * bx + ay * by + az * bz + aw * bw;
        // adjust signs (if necessary)
        if (cosom < 0.0) {
            cosom = -cosom;
            bx = - bx;
            by = - by;
            bz = - bz;
            bw = - bw;
        }
        // calculate coefficients
        if ((1.0 - cosom) > 0.000001) {
            // standard case (slerp)
            omega  = Math.acos(cosom);
            sinom  = Math.sin(omega);
            scale0 = Math.sin((1.0 - t) * omega) / sinom;
            scale1 = Math.sin(t * omega) / sinom;
        }
        else {
            // 'from' and 'to' quaternions are very close
            //  ... so we can do a linear interpolation
            scale0 = 1.0 - t;
            scale1 = t;
        }
        // calculate final values
        out[0] = scale0 * ax + scale1 * bx;
        out[1] = scale0 * ay + scale1 * by;
        out[2] = scale0 * az + scale1 * bz;
        out[3] = scale0 * aw + scale1 * bw;

        return out;
    }

    /**
     * @constructor
     * @alias qtek.animation.SamplerClip
     * @extends qtek.animation.Clip
     *
     * @param {Object} [opts]
     * @param {string} [opts.name]
     * @param {Object} [opts.target]
     * @param {number} [opts.life]
     * @param {number} [opts.delay]
     * @param {number} [opts.gap]
     * @param {number} [opts.playbackRatio]
     * @param {boolean|number} [opts.loop] If loop is a number, it indicate the loop count of animation
     * @param {string|Function} [opts.easing]
     * @param {Function} [opts.onframe]
     * @param {Function} [opts.onfinish]
     * @param {Function} [opts.onrestart]
     */
    var SamplerClip = function(opts) {

        opts = opts || {};

        Clip.call(this, opts);

        /**
         * @type {Float32Array}
         */
        this.position = vec3.create();
        /**
         * Rotation is represented by a quaternion
         * @type {Float32Array}
         */
        this.rotation = quat.create();
        /**
         * @type {Float32Array}
         */
        this.scale = vec3.fromValues(1, 1, 1);

        this.channels = {
            time: null,
            position: null,
            rotation: null,
            scale: null
        };

        this._cacheKey = 0;
        this._cacheTime = 0;
    };

    SamplerClip.prototype = Object.create(Clip.prototype);

    SamplerClip.prototype.constructor = SamplerClip;

    SamplerClip.prototype.step = function (time) {

        var ret = Clip.prototype.step.call(this, time);

        if (ret !== 'finish') {
            this.setTime(this._elapsedTime);
        }

        return ret;
    };

    SamplerClip.prototype.setTime = function (time) {
        if (!this.channels.time) {
            return;
        }
        var channels = this.channels;
        var len = channels.time.length;
        var key = -1;
        if (time < this._cacheTime) {
            var s = Math.min(len - 2, this._cacheKey);
            for (var i = s; i >= 0; i--) {
                if (channels.time[i - 1] <= time && channels.time[i] > time) {
                    key = i - 1;
                    break;
                }
            }
        } else {
            for (var i = this._cacheKey; i < len-1; i++) {
                if (channels.time[i] <= time && channels.time[i + 1] > time) {
                    key = i;
                    break;
                }
            }
        }

        if (key > -1) {
            this._cacheKey = key;
            this._cacheTime = time;
            var start = key;
            var end = key + 1;
            var startTime = channels.time[start];
            var endTime = channels.time[end];
            var percent = (time - startTime) / (endTime - startTime);

            if (channels.rotation) {
                quatSlerp(this.rotation, channels.rotation, channels.rotation, percent, start * 4, end * 4);
            }
            if (channels.position) {
                vec3lerp(this.position, channels.position, channels.position, percent, start * 3, end * 3);
            }
            if (channels.scale) {
                vec3lerp(this.scale, channels.scale, channels.scale, percent, start * 3, end * 3);
            }
        }
        // Loop handling
        if (key == len - 2) {
            this._cacheKey = 0;
            this._cacheTime = 0;
        }
    };

    /**
     * @param {number} startTime
     * @param {number} endTime
     * @return {qtek.animation.SamplerClip}
     */
    SamplerClip.prototype.getSubClip = function(startTime, endTime) {

        var subClip = new SamplerClip({
            name: this.name
        });
        var minTime = this.channels.time[0];
        startTime = Math.min(Math.max(startTime, minTime), this.life);
        endTime = Math.min(Math.max(endTime, minTime), this.life);

        var rangeStart = this._findRange(startTime);
        var rangeEnd = this._findRange(endTime);

        var count = rangeEnd[0] - rangeStart[0] + 1;
        if (rangeStart[1] === 0 && rangeEnd[1] === 0) {
            count -= 1;
        }
        if (this.channels.rotation) {
            subClip.channels.rotation = new Float32Array(count * 4);
        }
        if (this.channels.position) {
            subClip.channels.position = new Float32Array(count * 3);
        }
        if (this.channels.scale) {
            subClip.channels.scale = new Float32Array(count * 3);
        }
        if (this.channels.time) {
            subClip.channels.time = new Float32Array(count);
        }
        // Clip at the start
        this.setTime(startTime);
        for (var i = 0; i < 3; i++) {
            subClip.channels.rotation[i] = this.rotation[i];
            subClip.channels.position[i] = this.position[i];
            subClip.channels.scale[i] = this.scale[i];
        }
        subClip.channels.time[0] = 0;
        subClip.channels.rotation[3] = this.rotation[3];

        for (var i = 1; i < count-1; i++) {
            var i2;
            for (var j = 0; j < 3; j++) {
                i2 = rangeStart[0] + i;
                subClip.channels.rotation[i * 4 + j] = this.channels.rotation[i2 * 4 + j];
                subClip.channels.position[i * 3 + j] = this.channels.position[i2 * 3 + j];
                subClip.channels.scale[i * 3 + j] = this.channels.scale[i2 * 3 + j];
            }
            subClip.channels.time[i] = this.channels.time[i2] - startTime;
            subClip.channels.rotation[i * 4 + 3] = this.channels.rotation[i2 * 4 + 3];
        }
        // Clip at the end
        this.setTime(endTime);
        for (var i = 0; i < 3; i++) {
            subClip.channels.rotation[(count - 1) * 4 + i] = this.rotation[i];
            subClip.channels.position[(count - 1) * 3 + i] = this.position[i];
            subClip.channels.scale[(count - 1) * 3 + i] = this.scale[i];
        }
        subClip.channels.time[(count - 1)] = endTime - startTime;
        subClip.channels.rotation[(count - 1) * 4 + 3] = this.rotation[3];

        // TODO set back ?
        subClip.life = endTime - startTime;
        return subClip;
    };

    SamplerClip.prototype._findRange = function(time) {
        var channels = this.channels;
        var len = channels.time.length;
        var start = -1;
        for (var i = 0; i < len - 1; i++) {
            if (channels.time[i] <= time && channels.time[i+1] > time) {
                start = i;
            }
        }
        var percent = 0;
        if (start >= 0) {
            var startTime = channels.time[start];
            var endTime = channels.time[start+1];
            var percent = (time-startTime) / (endTime-startTime);
        }
        // Percent [0, 1)
        return [start, percent];
    };

    /**
     * 1D blending between two clips
     * @method
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c1
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c2
     * @param  {number} w
     */
    SamplerClip.prototype.blend1D = TransformClip.prototype.blend1D;
    /**
     * 2D blending between three clips
     * @method
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c1
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c2
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c3
     * @param  {number} f
     * @param  {number} g
     */
    SamplerClip.prototype.blend2D = TransformClip.prototype.blend2D;
    /**
     * Additive blending between two clips
     * @method
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c1
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c2
     */
    SamplerClip.prototype.additiveBlend = TransformClip.prototype.additiveBlend;
    /**
     * Subtractive blending between two clips
     * @method
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c1
     * @param  {qtek.animation.SamplerClip|qtek.animation.TransformClip} c2
     */
    SamplerClip.prototype.subtractiveBlend = TransformClip.prototype.subtractiveBlend;

    /**
     * Clone a new SamplerClip
     * @return {qtek.animation.SamplerClip}
     */
    SamplerClip.prototype.clone = function () {
        var clip = Clip.prototype.clone.call(this);
        clip.channels = {
            time: this.channels.time || null,
            position: this.channels.position || null,
            rotation: this.channels.rotation || null,
            scale: this.channels.scale || null
        };
        vec3.copy(clip.position, this.position);
        quat.copy(clip.rotation, this.rotation);
        vec3.copy(clip.scale, this.scale);

        return clip;

    };

    module.exports = SamplerClip;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Clip = __webpack_require__(16);

    var TransformClip = __webpack_require__(30);

    var glMatrix = __webpack_require__(0);
    var quat = glMatrix.quat;
    var vec3 = glMatrix.vec3;

    /**
     * @constructor
     * @alias qtek.animation.SkinningClip
     *
     * @extends qtek.animation.Clip
     * @param {Object} [opts]
     * @param {string} [opts.name]
     * @param {Object} [opts.target]
     * @param {number} [opts.life]
     * @param {number} [opts.delay]
     * @param {number} [opts.gap]
     * @param {number} [opts.playbackRatio]
     * @param {boolean|number} [opts.loop] If loop is a number, it indicate the loop count of animation
     * @param {string|function} [opts.easing]
     * @param {function} [opts.onframe]
     * @param {function} [opts.onfinish]
     * @param {function} [opts.onrestart]
     */
    var SkinningClip = function(opts) {

        opts = opts || {};

        Clip.call(this, opts);

        this.jointClips = [];

        this.life = 0;
        if (opts.jointClips && opts.jointClips.length > 0) {
            for (var j = 0; j < opts.jointClips.length; j++) {
                var jointPoseCfg = opts.jointClips[j];
                var jointClip = new TransformClip({
                    keyFrames: jointPoseCfg.keyFrames
                });
                jointClip.name = jointPoseCfg.name || '';
                this.jointClips[j] = jointClip;

                this.life = Math.max(jointClip.life, this.life);
            }
        }
    };

    SkinningClip.prototype = Object.create(Clip.prototype);

    SkinningClip.prototype.constructor = SkinningClip;

    SkinningClip.prototype.step = function(time) {

        var ret = Clip.prototype.step.call(this, time);

        if (ret !== 'finish') {
            this.setTime(this._elapsedTime);
        }

        return ret;
    };

    SkinningClip.prototype.setTime = function(time) {
        for (var i = 0; i < this.jointClips.length; i++) {
            this.jointClips[i].setTime(time);
        }
    };

    /**
     * @param {qtek.animation.TransformClip|qtek.animation.SamplerClip} jointClip
     */
    SkinningClip.prototype.addJointClip = function(jointClip) {
        this.jointClips.push(jointClip);
        this.life = Math.max(jointClip.life, this.life);
    };

    /**
     * @param {qtek.animation.TransformClip|qtek.animation.SamplerClip} jointClip
     */
    SkinningClip.prototype.removeJointClip = function(jointClip) {
        this.jointClips.splice(this.jointClips.indexOf(jointClip), 1);
    };

    /**
     * @param {number} startTime
     * @param {number} endTime
     * @param {boolean} isLoop
     * @return {qtek.animation.SkinningClip}
     */
    SkinningClip.prototype.getSubClip = function(startTime, endTime, isLoop) {
        var subClip = new SkinningClip({
            name: this.name
        });

        for (var i = 0; i < this.jointClips.length; i++) {
            var subJointClip = this.jointClips[i].getSubClip(startTime, endTime);
            subClip.addJointClip(subJointClip);
        }

        if (isLoop !== undefined) {
            subClip.setLoop(isLoop);
        }

        return subClip;
    };

    /**
     * 1d blending between two skinning clips
     * @param  {qtek.animation.SkinningClip} clip1
     * @param  {qtek.animation.SkinningClip} clip2
     * @param  {number} w
     */
    SkinningClip.prototype.blend1D = function(clip1, clip2, w) {
        for (var i = 0; i < this.jointClips.length; i++) {
            var c1 = clip1.jointClips[i];
            var c2 = clip2.jointClips[i];
            var tClip = this.jointClips[i];

            tClip.blend1D(c1, c2, w);
        }
    };

    /**
     * Additive blending between two skinning clips
     * @param  {qtek.animation.SkinningClip} clip1
     * @param  {qtek.animation.SkinningClip} clip2
     */
    SkinningClip.prototype.additiveBlend = function(clip1, clip2) {
        for (var i = 0; i < this.jointClips.length; i++) {
            var c1 = clip1.jointClips[i];
            var c2 = clip2.jointClips[i];
            var tClip = this.jointClips[i];

            tClip.additiveBlend(c1, c2);
        }
    };

    /**
     * Subtractive blending between two skinning clips
     * @param  {qtek.animation.SkinningClip} clip1
     * @param  {qtek.animation.SkinningClip} clip2
     */
    SkinningClip.prototype.subtractiveBlend = function(clip1, clip2) {
        for (var i = 0; i < this.jointClips.length; i++) {
            var c1 = clip1.jointClips[i];
            var c2 = clip2.jointClips[i];
            var tClip = this.jointClips[i];

            tClip.subtractiveBlend(c1, c2);
        }
    };

    /**
     * 2D blending between three skinning clips
     * @param  {qtek.animation.SkinningClip} clip1
     * @param  {qtek.animation.SkinningClip} clip2
     * @param  {qtek.animation.SkinningClip} clip3
     * @param  {number} f
     * @param  {number} g
     */
    SkinningClip.prototype.blend2D = function(clip1, clip2, clip3, f, g) {
        for (var i = 0; i < this.jointClips.length; i++) {
            var c1 = clip1.jointClips[i];
            var c2 = clip2.jointClips[i];
            var c3 = clip3.jointClips[i];
            var tClip = this.jointClips[i];

            tClip.blend2D(c1, c2, c3, f, g);
        }
    };

    /**
     * Copy SRT of all joints clips from another SkinningClip
     * @param  {qtek.animation.SkinningClip} clip
     */
    SkinningClip.prototype.copy = function(clip) {
        for (var i = 0; i < this.jointClips.length; i++) {
            var sClip = clip.jointClips[i];
            var tClip = this.jointClips[i];

            vec3.copy(tClip.position, sClip.position);
            vec3.copy(tClip.scale, sClip.scale);
            quat.copy(tClip.rotation, sClip.rotation);
        }
    };

    SkinningClip.prototype.clone = function () {
        var clip = Clip.prototype.clone.call(this);
        for (var i = 0; i < this.jointClips.length; i++) {
            clip.addJointClip(this.jointClips[i].clone());
        }
        return clip;
    };

    module.exports = SkinningClip;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

// 缓动函数来自 https://github.com/sole/tween.js/blob/master/src/Tween.js


    /**
     * @namespace qtek.animation.easing
     */
    var easing = {
        /**
         * @alias qtek.animation.easing.linear
         * @param {number} k
         * @return {number}
         */
        linear: function(k) {
            return k;
        },
        /**
         * @alias qtek.animation.easing.quadraticIn
         * @param {number} k
         * @return {number}
         */
        quadraticIn: function(k) {
            return k * k;
        },
        /**
         * @alias qtek.animation.easing.quadraticOut
         * @param {number} k
         * @return {number}
         */
        quadraticOut: function(k) {
            return k * (2 - k);
        },
        /**
         * @alias qtek.animation.easing.quadraticInOut
         * @param {number} k
         * @return {number}
         */
        quadraticInOut: function(k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k;
            }
            return - 0.5 * (--k * (k - 2) - 1);
        },
        /**
         * @alias qtek.animation.easing.cubicIn
         * @param {number} k
         * @return {number}
         */
        cubicIn: function(k) {
            return k * k * k;
        },
        /**
         * @alias qtek.animation.easing.cubicOut
         * @param {number} k
         * @return {number}
         */
        cubicOut: function(k) {
            return --k * k * k + 1;
        },
        /**
         * @alias qtek.animation.easing.cubicInOut
         * @param {number} k
         * @return {number}
         */
        cubicInOut: function(k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k;
            }
            return 0.5 * ((k -= 2) * k * k + 2);
        },
        /**
         * @alias qtek.animation.easing.quarticIn
         * @param {number} k
         * @return {number}
         */
        quarticIn: function(k) {
            return k * k * k * k;
        },
        /**
         * @alias qtek.animation.easing.quarticOut
         * @param {number} k
         * @return {number}
         */
        quarticOut: function(k) {
            return 1 - (--k * k * k * k);
        },
        /**
         * @alias qtek.animation.easing.quarticInOut
         * @param {number} k
         * @return {number}
         */
        quarticInOut: function(k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k * k;
            }
            return - 0.5 * ((k -= 2) * k * k * k - 2);
        },
        /**
         * @alias qtek.animation.easing.quinticIn
         * @param {number} k
         * @return {number}
         */
        quinticIn: function(k) {
            return k * k * k * k * k;
        },
        /**
         * @alias qtek.animation.easing.quinticOut
         * @param {number} k
         * @return {number}
         */
        quinticOut: function(k) {
            return --k * k * k * k * k + 1;
        },
        /**
         * @alias qtek.animation.easing.quinticInOut
         * @param {number} k
         * @return {number}
         */
        quinticInOut: function(k) {
            if ((k *= 2) < 1) {
                return 0.5 * k * k * k * k * k;
            }
            return 0.5 * ((k -= 2) * k * k * k * k + 2);
        },
        /**
         * @alias qtek.animation.easing.sinusoidalIn
         * @param {number} k
         * @return {number}
         */
        sinusoidalIn: function(k) {
            return 1 - Math.cos(k * Math.PI / 2);
        },
        /**
         * @alias qtek.animation.easing.sinusoidalOut
         * @param {number} k
         * @return {number}
         */
        sinusoidalOut: function(k) {
            return Math.sin(k * Math.PI / 2);
        },
        /**
         * @alias qtek.animation.easing.sinusoidalInOut
         * @param {number} k
         * @return {number}
         */
        sinusoidalInOut: function(k) {
            return 0.5 * (1 - Math.cos(Math.PI * k));
        },
        /**
         * @alias qtek.animation.easing.exponentialIn
         * @param {number} k
         * @return {number}
         */
        exponentialIn: function(k) {
            return k === 0 ? 0 : Math.pow(1024, k - 1);
        },
        /**
         * @alias qtek.animation.easing.exponentialOut
         * @param {number} k
         * @return {number}
         */
        exponentialOut: function(k) {
            return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);
        },
        /**
         * @alias qtek.animation.easing.exponentialInOut
         * @param {number} k
         * @return {number}
         */
        exponentialInOut: function(k) {
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            if ((k *= 2) < 1) {
                return 0.5 * Math.pow(1024, k - 1);
            }
            return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);
        },
        /**
         * @alias qtek.animation.easing.circularIn
         * @param {number} k
         * @return {number}
         */
        circularIn: function(k) {
            return 1 - Math.sqrt(1 - k * k);
        },
        /**
         * @alias qtek.animation.easing.circularOut
         * @param {number} k
         * @return {number}
         */
        circularOut: function(k) {
            return Math.sqrt(1 - (--k * k));
        },
        /**
         * @alias qtek.animation.easing.circularInOut
         * @param {number} k
         * @return {number}
         */
        circularInOut: function(k) {
            if ((k *= 2) < 1) {
                return - 0.5 * (Math.sqrt(1 - k * k) - 1);
            }
            return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
        },
        /**
         * @alias qtek.animation.easing.elasticIn
         * @param {number} k
         * @return {number}
         */
        elasticIn: function(k) {
            var s, a = 0.1, p = 0.4;
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            if (!a || a < 1) {
                a = 1; s = p / 4;
            }else{
                s = p * Math.asin(1 / a) / (2 * Math.PI);
            }
            return - (a * Math.pow(2, 10 * (k -= 1)) *
                        Math.sin((k - s) * (2 * Math.PI) / p));
        },
        /**
         * @alias qtek.animation.easing.elasticOut
         * @param {number} k
         * @return {number}
         */
        elasticOut: function(k) {
            var s, a = 0.1, p = 0.4;
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            if (!a || a < 1) {
                a = 1; s = p / 4;
            }
            else{
                s = p * Math.asin(1 / a) / (2 * Math.PI);
            }
            return (a * Math.pow(2, - 10 * k) *
                    Math.sin((k - s) * (2 * Math.PI) / p) + 1);
        },
        /**
         * @alias qtek.animation.easing.elasticInOut
         * @param {number} k
         * @return {number}
         */
        elasticInOut: function(k) {
            var s, a = 0.1, p = 0.4;
            if (k === 0) {
                return 0;
            }
            if (k === 1) {
                return 1;
            }
            if (!a || a < 1) {
                a = 1; s = p / 4;
            }
            else{
                s = p * Math.asin(1 / a) / (2 * Math.PI);
            }
            if ((k *= 2) < 1) {
                return - 0.5 * (a * Math.pow(2, 10 * (k -= 1))
                    * Math.sin((k - s) * (2 * Math.PI) / p));
            }
            return a * Math.pow(2, -10 * (k -= 1))
                    * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;

        },
        /**
         * @alias qtek.animation.easing.backIn
         * @param {number} k
         * @return {number}
         */
        backIn: function(k) {
            var s = 1.70158;
            return k * k * ((s + 1) * k - s);
        },
        /**
         * @alias qtek.animation.easing.backOut
         * @param {number} k
         * @return {number}
         */
        backOut: function(k) {
            var s = 1.70158;
            return --k * k * ((s + 1) * k + s) + 1;
        },
        /**
         * @alias qtek.animation.easing.backInOut
         * @param {number} k
         * @return {number}
         */
        backInOut: function(k) {
            var s = 1.70158 * 1.525;
            if ((k *= 2) < 1) {
                return 0.5 * (k * k * ((s + 1) * k - s));
            }
            return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
        },
        /**
         * @alias qtek.animation.easing.bounceIn
         * @param {number} k
         * @return {number}
         */
        bounceIn: function(k) {
            return 1 - easing.bounceOut(1 - k);
        },
        /**
         * @alias qtek.animation.easing.bounceOut
         * @param {number} k
         * @return {number}
         */
        bounceOut: function(k) {
            if (k < (1 / 2.75)) {
                return 7.5625 * k * k;
            }
            else if (k < (2 / 2.75)) {
                return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
            } else if (k < (2.5 / 2.75)) {
                return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
            } else {
                return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
            }
        },
        /**
         * @alias qtek.animation.easing.bounceInOut
         * @param {number} k
         * @return {number}
         */
        bounceInOut: function(k) {
            if (k < 0.5) {
                return easing.bounceIn(k * 2) * 0.5;
            }
            return easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
        }
    };

    module.exports = easing;




/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Base = __webpack_require__(1);
    var OrthoCamera = __webpack_require__(21);
    var Plane = __webpack_require__(31);
    var Shader = __webpack_require__(5);
    var Material = __webpack_require__(10);
    var Mesh = __webpack_require__(14);
    var glinfo = __webpack_require__(6);
    var glenum = __webpack_require__(2);

    Shader['import'](__webpack_require__(83));

    var planeGeo = new Plane();
    var mesh = new Mesh({
        geometry: planeGeo,
        frustumCulling: false
    });
    var camera = new OrthoCamera();

    /**
     * @constructor qtek.compositor.Pass
     * @extends qtek.core.Base
     */
    var Pass = Base.extend(function () {
        return /** @lends qtek.compositor.Pass# */ {
            /**
             * Fragment shader string
             * @type {string}
             */
            // PENDING shader or fragment ?
            fragment : '',

            /**
             * @type {Object}
             */
            outputs : null,

            /**
             * @type {qtek.Material}
             */
            material : null,

            /**
             * @type {Boolean}
             */
            blendWithPrevious: false,

            /**
             * @type {Boolean}
             */
            clearColor: false,

            /**
             * @type {Boolean}
             */
            clearDepth: true
        };
    }, function() {

        var shader = new Shader({
            vertex : Shader.source('qtek.compositor.vertex'),
            fragment : this.fragment
        });
        var material = new Material({
            shader : shader
        });
        shader.enableTexturesAll();

        this.material = material;

    },
    /** @lends qtek.compositor.Pass.prototype */
    {
        /**
         * @param {string} name
         * @param {} value
         */
        setUniform : function(name, value) {
            var uniform = this.material.uniforms[name];
            if (uniform) {
                uniform.value = value;
            }
        },
        /**
         * @param  {string} name
         * @return {}
         */
        getUniform : function(name) {
            var uniform = this.material.uniforms[name];
            if (uniform) {
                return uniform.value;
            }
        },
        /**
         * @param  {qtek.Texture} texture
         * @param  {number} attachment
         */
        attachOutput : function(texture, attachment) {
            if (!this.outputs) {
                this.outputs = {};
            }
            attachment = attachment || glenum.COLOR_ATTACHMENT0;
            this.outputs[attachment] = texture;
        },
        /**
         * @param  {qtek.Texture} texture
         */
        detachOutput : function(texture) {
            for (var attachment in this.outputs) {
                if (this.outputs[attachment] === texture) {
                    this.outputs[attachment] = null;
                }
            }
        },

        bind : function(renderer, frameBuffer) {

            if (this.outputs) {
                for (var attachment in this.outputs) {
                    var texture = this.outputs[attachment];
                    if (texture) {
                        frameBuffer.attach(texture, attachment);
                    }
                }
            }

            if (frameBuffer) {
                frameBuffer.bind(renderer);
            }
        },

        unbind : function(renderer, frameBuffer) {
            frameBuffer.unbind(renderer);
        },
        /**
         * @param  {qtek.Renderer} renderer
         * @param  {qtek.FrameBuffer} [frameBuffer]
         */
        render : function(renderer, frameBuffer) {

            var _gl = renderer.gl;

            if (frameBuffer) {
                this.bind(renderer, frameBuffer);
                // MRT Support in chrome
                // https://www.khronos.org/registry/webgl/sdk/tests/conformance/extensions/ext-draw-buffers.html
                var ext = glinfo.getExtension(_gl, 'EXT_draw_buffers');
                if (ext && this.outputs) {
                    var bufs = [];
                    for (var attachment in this.outputs) {
                        attachment = +attachment;
                        if (attachment >= _gl.COLOR_ATTACHMENT0 && attachment <= _gl.COLOR_ATTACHMENT0 + 8) {
                            bufs.push(attachment);
                        }
                    }
                    ext.drawBuffersEXT(bufs);
                }
            }

            this.trigger('beforerender', this, renderer);

            // FIXME Don't clear in each pass in default, let the color overwrite the buffer
            // FIXME pixels may be discard
            var clearBit = this.clearDepth ? _gl.DEPTH_BUFFER_BIT : 0;
            _gl.depthMask(true);
            if (this.clearColor) {
                clearBit = clearBit | _gl.COLOR_BUFFER_BIT;
                _gl.colorMask(true, true, true, true);
                var cc = this.clearColor;
                if (cc instanceof Array) {
                    _gl.clearColor(cc[0], cc[1], cc[2], cc[3]);
                }
            }
            _gl.clear(clearBit);

            if (this.blendWithPrevious) {
                // Blend with previous rendered scene in the final output
                // FIXME Configure blend.
                // FIXME It will cause screen blink？
                _gl.enable(_gl.BLEND);
                this.material.transparent = true;
            }
            else {
                _gl.disable(_gl.BLEND);
                this.material.transparent = false;
            }

            this.renderQuad(renderer);

            this.trigger('afterrender', this, renderer);

            if (frameBuffer) {
                this.unbind(renderer, frameBuffer);
            }
        },

        /**
         * Simply do quad rendering
         */
        renderQuad: function (renderer) {
            mesh.material = this.material;
            renderer.renderQueue([mesh], camera);
        },

        /**
         * @param  {WebGLRenderingContext} _gl
         */
        dispose: function (gl) {
            this.material.dispose(gl);
        }
    });

    module.exports = Pass;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Texture2D = __webpack_require__(19);
    var glenum = __webpack_require__(2);
    var util = __webpack_require__(13);

    var TexturePool = function () {

        this._pool = {};

        this._allocatedTextures = [];
    };

    TexturePool.prototype = {

        constructor: TexturePool,

        get: function (parameters) {
            var key = generateKey(parameters);
            if (!this._pool.hasOwnProperty(key)) {
                this._pool[key] = [];
            }
            var list = this._pool[key];
            if (!list.length) {
                var texture = new Texture2D(parameters);
                this._allocatedTextures.push(texture);
                return texture;
            }
            return list.pop();
        },

        put: function (texture) {
            var key = generateKey(texture);
            if (!this._pool.hasOwnProperty(key)) {
                this._pool[key] = [];
            }
            var list = this._pool[key];
            list.push(texture);
        },

        clear: function (gl) {
            for (var i = 0; i < this._allocatedTextures.length; i++) {
                this._allocatedTextures[i].dispose(gl);
            }
            this._pool = {};
            this._allocatedTextures = [];
        }
    };

    var defaultParams = {
        width: 512,
        height: 512,
        type: glenum.UNSIGNED_BYTE,
        format: glenum.RGBA,
        wrapS: glenum.CLAMP_TO_EDGE,
        wrapT: glenum.CLAMP_TO_EDGE,
        minFilter: glenum.LINEAR_MIPMAP_LINEAR,
        magFilter: glenum.LINEAR,
        useMipmap: true,
        anisotropic: 1,
        flipY: true,
        unpackAlignment: 4,
        premultiplyAlpha: false
    };

    var defaultParamPropList = Object.keys(defaultParams);

    function generateKey(parameters) {
        util.defaultsWithPropList(parameters, defaultParams, defaultParamPropList);
        fallBack(parameters);

        var key = '';
        for (var i = 0; i < defaultParamPropList.length; i++) {
            var name = defaultParamPropList[i];
            var chunk = parameters[name].toString();
            key += chunk;
        }
        return key;
    }

    function fallBack(target) {

        var IPOT = isPowerOfTwo(target.width, target.height);

        if (target.format === glenum.DEPTH_COMPONENT) {
            target.useMipmap = false;
        }

        if (!IPOT || !target.useMipmap) {
            if (target.minFilter == glenum.NEAREST_MIPMAP_NEAREST ||
                target.minFilter == glenum.NEAREST_MIPMAP_LINEAR) {
                target.minFilter = glenum.NEAREST;
            } else if (
                target.minFilter == glenum.LINEAR_MIPMAP_LINEAR ||
                target.minFilter == glenum.LINEAR_MIPMAP_NEAREST
            ) {
                target.minFilter = glenum.LINEAR;
            }

            target.wrapS = glenum.CLAMP_TO_EDGE;
            target.wrapT = glenum.CLAMP_TO_EDGE;
        }
    }

    function isPowerOfTwo(width, height) {
        return (width & (width-1)) === 0 &&
                (height & (height-1)) === 0;
    }

    module.exports = TexturePool;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    /**
     * Extend a sub class from base class
     * @param {object|Function} makeDefaultOpt default option of this sub class, method of the sub can use this.xxx to access this option
     * @param {Function} [initialize] Initialize after the sub class is instantiated
     * @param {Object} [proto] Prototype methods/properties of the sub class
     * @memberOf qtek.core.mixin.extend
     * @return {Function}
     */
    function derive(makeDefaultOpt, initialize/*optional*/, proto/*optional*/) {

        if (typeof initialize == 'object') {
            proto = initialize;
            initialize = null;
        }

        var _super = this;

        var propList;
        if (!(makeDefaultOpt instanceof Function)) {
            // Optimize the property iterate if it have been fixed
            propList = [];
            for (var propName in makeDefaultOpt) {
                if (makeDefaultOpt.hasOwnProperty(propName)) {
                    propList.push(propName);
                }
            }
        }

        var sub = function(options) {

            // call super constructor
            _super.apply(this, arguments);

            if (makeDefaultOpt instanceof Function) {
                // Invoke makeDefaultOpt each time if it is a function, So we can make sure each
                // property in the object will not be shared by mutiple instances
                extend(this, makeDefaultOpt.call(this, options));
            }
            else {
                extendWithPropList(this, makeDefaultOpt, propList);
            }

            if (this.constructor === sub) {
                // Initialize function will be called in the order of inherit
                var initializers = sub.__initializers__;
                for (var i = 0; i < initializers.length; i++) {
                    initializers[i].apply(this, arguments);
                }
            }
        };
        // save super constructor
        sub.__super__ = _super;
        // Initialize function will be called after all the super constructor is called
        if (!_super.__initializers__) {
            sub.__initializers__ = [];
        } else {
            sub.__initializers__ = _super.__initializers__.slice();
        }
        if (initialize) {
            sub.__initializers__.push(initialize);
        }

        var Ctor = function() {};
        Ctor.prototype = _super.prototype;
        sub.prototype = new Ctor();
        sub.prototype.constructor = sub;
        extend(sub.prototype, proto);

        // extend the derive method as a static method;
        sub.extend = _super.extend;

        // DEPCRATED
        sub.derive = _super.extend;

        return sub;
    }

    function extend(target, source) {
        if (!source) {
            return;
        }
        for (var name in source) {
            if (source.hasOwnProperty(name)) {
                target[name] = source[name];
            }
        }
    }

    function extendWithPropList(target, source, propList) {
        for (var i = 0; i < propList.length; i++) {
            var propName = propList[i];
            target[propName] = source[propName];
        }
    }

    /**
     * @alias qtek.core.mixin.extend
     * @mixin
     */
    module.exports = {

        extend: derive,

        // DEPCRATED
        derive: derive
    };


/***/ }),
/* 57 */
/***/ (function(module, exports) {



    function Handler(action, context) {
        this.action = action;
        this.context = context;
    }
    /**
     * @mixin
     * @alias qtek.core.mixin.notifier
     */
    var notifier = {
        /**
         * Trigger event
         * @param  {string} name
         */
        trigger: function(name) {
            if (!this.hasOwnProperty('__handlers__')) {
                return;
            }
            if (!this.__handlers__.hasOwnProperty(name)) {
                return;
            }

            var hdls = this.__handlers__[name];
            var l = hdls.length, i = -1, args = arguments;
            // Optimize advise from backbone
            switch (args.length) {
                case 1:
                    while (++i < l) {
                        hdls[i].action.call(hdls[i].context);
                    }
                    return;
                case 2:
                    while (++i < l) {
                        hdls[i].action.call(hdls[i].context, args[1]);
                    }
                    return;
                case 3:
                    while (++i < l) {
                        hdls[i].action.call(hdls[i].context, args[1], args[2]);
                    }
                    return;
                case 4:
                    while (++i < l) {
                        hdls[i].action.call(hdls[i].context, args[1], args[2], args[3]);
                    }
                    return;
                case 5:
                    while (++i < l) {
                        hdls[i].action.call(hdls[i].context, args[1], args[2], args[3], args[4]);
                    }
                    return;
                default:
                    while (++i < l) {
                        hdls[i].action.apply(hdls[i].context, Array.prototype.slice.call(args, 1));
                    }
                    return;
            }
        },
        /**
         * Register event handler
         * @param  {string} name
         * @param  {Function} action
         * @param  {Object} [context]
         * @chainable
         */
        on: function(name, action, context) {
            if (!name || !action) {
                return;
            }
            var handlers = this.__handlers__ || (this.__handlers__={});
            if (!handlers[name]) {
                handlers[name] = [];
            }
            else {
                if (this.has(name, action)) {
                    return;
                }
            }
            var handler = new Handler(action, context || this);
            handlers[name].push(handler);

            return this;
        },

        /**
         * Register event, event will only be triggered once and then removed
         * @param  {string} name
         * @param  {Function} action
         * @param  {Object} [context]
         * @chainable
         */
        once: function(name, action, context) {
            if (!name || !action) {
                return;
            }
            var self = this;
            function wrapper() {
                self.off(name, wrapper);
                action.apply(this, arguments);
            }
            return this.on(name, wrapper, context);
        },

        /**
         * Alias of once('before' + name)
         * @param  {string} name
         * @param  {Function} action
         * @param  {Object} [context]
         * @chainable
         */
        before: function(name, action, context) {
            if (!name || !action) {
                return;
            }
            name = 'before' + name;
            return this.on(name, action, context);
        },

        /**
         * Alias of once('after' + name)
         * @param  {string} name
         * @param  {Function} action
         * @param  {Object} [context]
         * @chainable
         */
        after: function(name, action, context) {
            if (!name || !action) {
                return;
            }
            name = 'after' + name;
            return this.on(name, action, context);
        },

        /**
         * Alias of on('success')
         * @param  {Function} action
         * @param  {Object} [context]
         * @chainable
         */
        success: function(action, context) {
            return this.once('success', action, context);
        },

        /**
         * Alias of on('error')
         * @param  {Function} action
         * @param  {Object} [context]
         * @chainable
         */
        error: function(action, context) {
            return this.once('error', action, context);
        },

        /**
         * Alias of on('success')
         * @param  {Function} action
         * @param  {Object} [context]
         * @chainable
         */
        off: function(name, action) {

            var handlers = this.__handlers__ || (this.__handlers__={});

            if (!action) {
                handlers[name] = [];
                return;
            }
            if (handlers[name]) {
                var hdls = handlers[name];
                var retains = [];
                for (var i = 0; i < hdls.length; i++) {
                    if (action && hdls[i].action !== action) {
                        retains.push(hdls[i]);
                    }
                }
                handlers[name] = retains;
            }

            return this;
        },

        /**
         * If registered the event handler
         * @param  {string}  name
         * @param  {Function}  action
         * @return {boolean}
         */
        has: function(name, action) {
            var handlers = this.__handlers__;

            if (! handlers ||
                ! handlers[name]) {
                return false;
            }
            var hdls = handlers[name];
            for (var i = 0; i < hdls.length; i++) {
                if (hdls[i].action === action) {
                    return true;
                }
            }
        }
    };

    module.exports = notifier;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    function get(options) {

        var xhr = new XMLHttpRequest();

        xhr.open('get', options.url);
        // With response type set browser can get and put binary data
        // https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest/Sending_and_Receiving_Binary_Data
        // Default is text, and it can be set
        // arraybuffer, blob, document, json, text
        xhr.responseType = options.responseType || 'text';

        if (options.onprogress) {
            //https://developer.mozilla.org/en-US/docs/DOM/XMLHttpRequest/Using_XMLHttpRequest
            xhr.onprogress = function(e) {
                if (e.lengthComputable) {
                    var percent = e.loaded / e.total;
                    options.onprogress(percent, e.loaded, e.total);
                } else {
                    options.onprogress(null);
                }
            };
        }
        xhr.onload = function(e) {
            options.onload && options.onload(xhr.response);
        };
        if (options.onerror) {
            xhr.onerror = options.onerror;
        }
        xhr.send(null);
    }

    module.exports = {
        get : get
    };


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var StaticGeometry = __webpack_require__(11);
    var Plane = __webpack_require__(31);
    var Matrix4 = __webpack_require__(15);
    var Vector3 = __webpack_require__(3);
    var BoundingBox = __webpack_require__(4);
    var vendor = __webpack_require__(8);

    var planeMatrix = new Matrix4();

    /**
     * @constructor qtek.geometry.Cube
     * @extends qtek.StaticGeometry
     * @param {Object} [opt]
     * @param {number} [opt.widthSegments]
     * @param {number} [opt.heightSegments]
     * @param {number} [opt.depthSegments]
     * @param {boolean} [opt.inside]
     */
    var Cube = StaticGeometry.extend(
    /**@lends qtek.geometry.Cube# */
    {
        /**
         * @type {number}
         */
        widthSegments: 1,
        /**
         * @type {number}
         */
        heightSegments: 1,
        /**
         * @type {number}
         */
        depthSegments: 1,
        /**
         * @type {boolean}
         */
        inside: false
    }, function() {
        this.build();
    },
    /** @lends qtek.geometry.Cube.prototype */
    {
        /**
         * Build cube geometry
         */
        build: function() {

            var planes = {
                'px': createPlane('px', this.depthSegments, this.heightSegments),
                'nx': createPlane('nx', this.depthSegments, this.heightSegments),
                'py': createPlane('py', this.widthSegments, this.depthSegments),
                'ny': createPlane('ny', this.widthSegments, this.depthSegments),
                'pz': createPlane('pz', this.widthSegments, this.heightSegments),
                'nz': createPlane('nz', this.widthSegments, this.heightSegments),
            };

            var attrList = ['position', 'texcoord0', 'normal'];
            var vertexNumber = 0;
            var faceNumber = 0;
            for (var pos in planes) {
                vertexNumber += planes[pos].vertexCount;
                faceNumber += planes[pos].indices.length;
            }
            for (var k = 0; k < attrList.length; k++) {
                this.attributes[attrList[k]].init(vertexNumber);
            }
            this.indices = new vendor.Uint16Array(faceNumber);
            var faceOffset = 0;
            var vertexOffset = 0;
            for (var pos in planes) {
                var plane = planes[pos];
                for (var k = 0; k < attrList.length; k++) {
                    var attrName = attrList[k];
                    var attrArray = plane.attributes[attrName].value;
                    var attrSize = plane.attributes[attrName].size;
                    var isNormal = attrName === 'normal';
                    for (var i = 0; i < attrArray.length; i++) {
                        var value = attrArray[i];
                        if (this.inside && isNormal) {
                            value = -value;
                        }
                        this.attributes[attrName].value[i + attrSize * vertexOffset] = value;
                    }
                }
                for (var i = 0; i < plane.indices.length; i++) {
                    this.indices[i + faceOffset] = vertexOffset + plane.indices[i];
                }
                faceOffset += plane.indices.length;
                vertexOffset += plane.vertexCount;
            }

            this.boundingBox = new BoundingBox();
            this.boundingBox.max.set(1, 1, 1);
            this.boundingBox.min.set(-1, -1, -1);
        }
    });

    function createPlane(pos, widthSegments, heightSegments) {

        planeMatrix.identity();

        var plane = new Plane({
            widthSegments: widthSegments,
            heightSegments: heightSegments
        });

        switch(pos) {
            case 'px':
                Matrix4.translate(planeMatrix, planeMatrix, Vector3.POSITIVE_X);
                Matrix4.rotateY(planeMatrix, planeMatrix, Math.PI / 2);
                break;
            case 'nx':
                Matrix4.translate(planeMatrix, planeMatrix, Vector3.NEGATIVE_X);
                Matrix4.rotateY(planeMatrix, planeMatrix, -Math.PI / 2);
                break;
            case 'py':
                Matrix4.translate(planeMatrix, planeMatrix, Vector3.POSITIVE_Y);
                Matrix4.rotateX(planeMatrix, planeMatrix, -Math.PI / 2);
                break;
            case 'ny':
                Matrix4.translate(planeMatrix, planeMatrix, Vector3.NEGATIVE_Y);
                Matrix4.rotateX(planeMatrix, planeMatrix, Math.PI / 2);
                break;
            case 'pz':
                Matrix4.translate(planeMatrix, planeMatrix, Vector3.POSITIVE_Z);
                break;
            case 'nz':
                Matrix4.translate(planeMatrix, planeMatrix, Vector3.NEGATIVE_Z);
                Matrix4.rotateY(planeMatrix, planeMatrix, Math.PI);
                break;
        }
        plane.applyTransform(planeMatrix);
        return plane;
    }

    module.exports = Cube;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var StaticGeometry = __webpack_require__(11);
    var glMatrix = __webpack_require__(0);
    var vec3 = glMatrix.vec3;
    var vec2 = glMatrix.vec2;
    var BoundingBox = __webpack_require__(4);

    /**
     * @constructor qtek.geometry.Sphere
     * @extends qtek.StaticGeometry
     * @param {Object} [opt]
     * @param {number} [widthSegments]
     * @param {number} [heightSegments]
     * @param {number} [phiStart]
     * @param {number} [phiLength]
     * @param {number} [thetaStart]
     * @param {number} [thetaLength]
     * @param {number} [radius]
     */
    var Sphere = StaticGeometry.extend(
    /** @lends qtek.geometry.Sphere# */
    {
        /**
         * @type {number}
         */
        widthSegments: 20,
        /**
         * @type {number}
         */
        heightSegments: 20,

        /**
         * @type {number}
         */
        phiStart: 0,
        /**
         * @type {number}
         */
        phiLength: Math.PI * 2,

        /**
         * @type {number}
         */
        thetaStart: 0,
        /**
         * @type {number}
         */
        thetaLength: Math.PI,

        /**
         * @type {number}
         */
        radius: 1

    }, function() {
        this.build();
    },
    /** @lends qtek.geometry.Sphere.prototype */
    {
        /**
         * Build sphere geometry
         */
        build: function() {
            var heightSegments = this.heightSegments;
            var widthSegments = this.widthSegments;

            var positionAttr = this.attributes.position;
            var texcoordAttr = this.attributes.texcoord0;
            var normalAttr = this.attributes.normal;

            var vertexCount = (widthSegments + 1) * (heightSegments + 1);
            positionAttr.init(vertexCount);
            texcoordAttr.init(vertexCount);
            normalAttr.init(vertexCount);

            var IndicesCtor = vertexCount > 0xffff ? Uint32Array : Uint16Array;
            var indices = this.indices = new IndicesCtor(widthSegments * heightSegments * 6);

            var x, y, z,
                u, v,
                i, j;

            var radius = this.radius;
            var phiStart = this.phiStart;
            var phiLength = this.phiLength;
            var thetaStart = this.thetaStart;
            var thetaLength = this.thetaLength;
            var radius = this.radius;

            var pos = [];
            var uv = [];
            var offset = 0;
            var divider = 1 / radius;
            for (j = 0; j <= heightSegments; j ++) {
                for (i = 0; i <= widthSegments; i ++) {
                    u = i / widthSegments;
                    v = j / heightSegments;

                    // X axis is inverted so texture can be mapped from left to right
                    x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                    y = radius * Math.cos(thetaStart + v * thetaLength);
                    z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);

                    pos[0] = x; pos[1] = y; pos[2] = z;
                    uv[0] = u; uv[1] = v;
                    positionAttr.set(offset, pos);
                    texcoordAttr.set(offset, uv);
                    pos[0] *= divider;
                    pos[1] *= divider;
                    pos[2] *= divider;
                    normalAttr.set(offset, pos);
                    offset++;
                }
            }

            var i1, i2, i3, i4;

            var len = widthSegments + 1;

            var n = 0;
            for (j = 0; j < heightSegments; j ++) {
                for (i = 0; i < widthSegments; i ++) {
                    i2 = j * len + i;
                    i1 = (j * len + i + 1);
                    i4 = (j + 1) * len + i + 1;
                    i3 = (j + 1) * len + i;

                    indices[n++] = i1;
                    indices[n++] = i2;
                    indices[n++] = i4;

                    indices[n++] = i2;
                    indices[n++] = i3;
                    indices[n++] = i4;
                }
            }

            this.boundingBox = new BoundingBox();
            this.boundingBox.max.set(radius, radius, radius);
            this.boundingBox.min.set(-radius, -radius, -radius);
        }
    });

    module.exports = Sphere;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Light = __webpack_require__(9);
    var vendor = __webpack_require__(8);

    /**
     * Spherical Harmonic Ambient Light
     * @constructor qtek.light.AmbientSH
     * @extends qtek.Light
     */
    var AmbientSHLight = Light.extend({

        castShadow: false,


        /**
         * Spherical Harmonic Coefficients
         * @type {Array.<number>}
         */
        coefficients: [],

    }, function () {
        this._coefficientsTmpArr = new vendor.Float32Array(9 * 3);
    }, {

        type: 'AMBIENT_SH_LIGHT',

        uniformTemplates: {
            ambientSHLightColor: {
                type: '3f',
                value: function (instance) {
                    var color = instance.color;
                    var intensity = instance.intensity;
                    return [color[0] * intensity, color[1] * intensity, color[2] * intensity];
                }
            },

            ambientSHLightCoefficients: {
                type: '3f',
                value: function (instance) {
                    var coefficientsTmpArr = instance._coefficientsTmpArr;
                    for (var i = 0; i < instance.coefficients.length; i++) {
                        coefficientsTmpArr[i] = instance.coefficients[i];
                    }
                    return coefficientsTmpArr;
                }
            }
        }
        /**
         * @method
         * @name clone
         * @return {qtek.light.Ambient}
         * @memberOf qtek.light.Ambient.prototype
         */
    });

    module.exports = AmbientSHLight;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * glTF Loader
 * Specification https://github.com/KhronosGroup/glTF/blob/master/specification/README.md
 *
 * TODO https://github.com/KhronosGroup/glTF/issues/298
 */


    var Base = __webpack_require__(1);
    var request = __webpack_require__(58);
    var util = __webpack_require__(13);
    var vendor = __webpack_require__(8);

    var Scene = __webpack_require__(28);
    var Shader = __webpack_require__(5);
    var Material = __webpack_require__(10);
    var StandardMaterial = __webpack_require__(29);
    var Mesh = __webpack_require__(14);
    var Node = __webpack_require__(7);
    var Texture = __webpack_require__(12);
    var Texture2D = __webpack_require__(19);
    var TextureCube = __webpack_require__(20);
    var shaderLibrary = __webpack_require__(18);
    var Skeleton = __webpack_require__(48);
    var Joint = __webpack_require__(26);
    var PerspectiveCamera = __webpack_require__(22);
    var OrthographicCamera = __webpack_require__(21);
    var PointLight = __webpack_require__(32);
    var SpotLight = __webpack_require__(33);
    var DirectionalLight = __webpack_require__(23);
    var glenum = __webpack_require__(2);

    var Vector3 = __webpack_require__(3);
    var Quaternion = __webpack_require__(24);
    var BoundingBox = __webpack_require__(4);

    var SamplerClip = __webpack_require__(51);
    var SkinningClip = __webpack_require__(52);

    var StaticGeometry = __webpack_require__(11);

    var glMatrix = __webpack_require__(0);
    var quat = glMatrix.quat;

    // Import builtin shader
    __webpack_require__(67);

    var semanticAttributeMap = {
        'NORMAL': 'normal',
        'POSITION': 'position',
        'TEXCOORD_0': 'texcoord0',
        'TEXCOORD_1': 'texcoord1',
        'WEIGHT': 'weight',
        'JOINT': 'joint',
        'COLOR': 'color'
    };


    /**
     * @typedef {Object} qtek.loader.GLTF.IResult
     * @property {qtek.Scene} scene
     * @property {qtek.Node} rootNode
     * @property {Object.<string, qtek.Camera>} cameras
     * @property {Object.<string, qtek.Texture>} textures
     * @property {Object.<string, qtek.Material>} materials
     * @property {Object.<string, qtek.Skeleton>} skeletons
     * @property {Object.<string, qtek.Mesh>} meshes
     * @property {qtek.animation.SkinningClip} clip
     */

    /**
     * @constructor qtek.loader.GLTF
     * @extends qtek.core.Base
     */
    var GLTFLoader = Base.extend(
    /** @lends qtek.loader.GLTF# */
    {
        /**
         * @type {qtek.Node}
         */
        rootNode: null,
        /**
         * @type {string}
         */
        rootPath: null,

        /**
         * @type {string}
         */
        textureRootPath: null,

        /**
         * @type {string}
         */
        bufferRootPath: null,

        /**
         * @type {string}
         */
        shaderName: 'qtek.standard',

        /**
         * @type {string}
         */
        useStandardMaterial: false,

        /**
         * @type {boolean}
         */
        includeCamera: true,

        /**
         * @type {boolean}
         */
        includeLight: true,

        /**
         * @type {boolean}
         */
        includeAnimation: true,
        /**
         * @type {boolean}
         */
        includeMesh: true,
        /**
         * @type {boolean}
         */
        includeTexture: true
    },

    /** @lends qtek.loader.GLTF.prototype */
    {
        /**
         * @param  {string} url
         */
        load: function (url) {
            var self = this;

            if (this.rootPath == null) {
                this.rootPath = url.slice(0, url.lastIndexOf('/'));
            }

            request.get({
                url: url,
                onprogress: function (percent, loaded, total) {
                    self.trigger('progress', percent, loaded, total);
                },
                onerror: function (e) {
                    self.trigger('error', e);
                },
                responseType: 'text',
                onload: function (data) {
                    self.parse(JSON.parse(data));
                }
            });
        },

        /**
         * @param {Object} json
         * @return {qtek.loader.GLTF.IResult}
         */
        parse: function (json) {
            var self = this;
            var loading = 0;

            var lib = {
                buffers: {},
                materials: {},
                textures: {},
                meshes: {},
                joints: {},
                skeletons: {},
                cameras: {},
                nodes: {}
            };
            // Mount on the root node if given
            var rootNode = this.rootNode || new Scene();
            // Load buffers
            util.each(json.buffers, function (bufferInfo, name) {
                loading++;
                var path = bufferInfo.uri;

                // DEPRECATED compatible with older version(< 1.0)
                // https://github.com/KhronosGroup/glTF/wiki/glTF-0.8-to-1.0-Guide
                if (path == null) {
                    path = bufferInfo.path;
                }
                self._loadBuffer(path, function (buffer) {
                    lib.buffers[name] = buffer;
                    loading--;
                    if (loading === 0) {
                        afterLoadBuffer();
                    }
                }, function () {
                    loading--;
                    if (loading === 0) {
                        afterLoadBuffer();
                    }
                });
            });

            function afterLoadBuffer() {
                if (self.includeMesh) {
                    if (self.includeTexture) {
                        self._parseTextures(json, lib);
                    }
                    self._parseMaterials(json, lib);
                    self._parseMeshes(json, lib);
                }
                self._parseNodes(json, lib);

                var sceneInfo = json.scenes[json.scene];
                for (var i = 0; i < sceneInfo.nodes.length; i++) {
                    var node = lib.nodes[sceneInfo.nodes[i]];
                    node.update();
                    rootNode.add(node);
                }

                if (self.includeMesh) {
                    self._parseSkins(json, lib);
                }

                var clips = {};
                var skinningClip;
                if (self.includeAnimation) {
                    clips = self._parseAnimations(json, lib);
                    if (Object.keys(clips).length) {
                        skinningClip = new SkinningClip();
                        // Default loop the skinning animation
                        skinningClip.setLoop(true);
                        for (var targetId in clips) {
                            skinningClip.addJointClip(clips[targetId]);
                        }

                        for (var name in lib.skeletons) {
                            lib.skeletons[name].addClip(skinningClip);
                            lib.skeletons[name].relativeRootNode = rootNode;
                        }
                    }
                }

                self.trigger('success', {
                    scene: self.rootNode ? null : rootNode,
                    rootNode: self.rootNode ? rootNode : null,
                    cameras: lib.cameras,
                    textures: lib.textures,
                    materials: lib.materials,
                    skeletons: lib.skeletons,
                    meshes: lib.meshes,
                    clips: lib.clips,
                    // Main skinning clip
                    // TODO Skinning clip used for multiple skeleton ?
                    // TODO Some clip for individual node animations.
                    clip: skinningClip
                });
            }

            return {
                scene: self.rootNode ? null : rootNode,
                rootNode: self.rootNode ? rootNode : null,
                cameras: lib.cameras,
                textures: lib.textures,
                materials: lib.materials,
                skeletons: lib.skeletons,
                meshes: lib.meshes,
                clip: null
            };
        },

        _loadBuffer: function (path, onsuccess, onerror) {
            var rootPath = this.bufferRootPath;
            if (rootPath == null) {
                rootPath = this.rootPath;
            }
            if (rootPath) {
                path = rootPath + '/' + path;
            }
            request.get({
                url: path,
                responseType: 'arraybuffer',
                onload: function (buffer) {
                    onsuccess && onsuccess(buffer);
                },
                onerror: function (buffer) {
                    onerror && onerror(buffer);
                }
            });
        },

        // https://github.com/KhronosGroup/glTF/issues/100
        // https://github.com/KhronosGroup/glTF/issues/193
        _parseSkins: function (json, lib) {

            // Create skeletons and joints
            var haveInvBindMatrices = false;
            for (var name in json.skins) {
                var skinInfo = json.skins[name];
                var skeleton = new Skeleton({
                    name: name
                });
                for (var i = 0; i < skinInfo.joints.length; i++) {
                    var jointId = skinInfo.joints[i];
                    var joint = new Joint({
                        name: jointId,
                        index: skeleton.joints.length
                    });
                    skeleton.joints.push(joint);
                }
                if (skinInfo.inverseBindMatrices) {
                    haveInvBindMatrices = true;
                    var IBMInfo = skinInfo.inverseBindMatrices;
                    var bufferViewName = IBMInfo.bufferView;
                    var bufferViewInfo = json.bufferViews[bufferViewName];
                    var buffer = lib.buffers[bufferViewInfo.buffer];

                    var offset = IBMInfo.byteOffset + bufferViewInfo.byteOffset;
                    var size = IBMInfo.count * 16;

                    var array = new vendor.Float32Array(buffer, offset, size);

                    skeleton._invBindPoseMatricesArray = array;
                    skeleton._skinMatricesArray = new vendor.Float32Array(array.length);
                }
                lib.skeletons[name] = skeleton;
            }

            var bindNodeToJoint = function (jointsMap, nodeName, parentIndex, rootNode) {
                var node = lib.nodes[nodeName];
                var nodeInfo = json.nodes[nodeName];
                var joint = jointsMap[nodeInfo.jointId];
                if (joint) {
                    // throw new Error('Joint bind to ' + nodeInfo.name + ' doesn\'t exist in skin');
                    joint.node = node;
                    joint.parentIndex = parentIndex;
                    joint.rootNode = rootNode;
                    parentIndex = joint.index;
                }
                else {
                    // Some root node may be a simple transform joint, without deformation data.
                    // Which is, no vertex is attached to the joint
                    // PENDING
                    joint = new Joint({
                        node: node,
                        rootNode: rootNode,
                        parentIndex: parentIndex
                    });
                }

                for (var i = 0; i < nodeInfo.children.length; i++) {
                    bindNodeToJoint(jointsMap, nodeInfo.children[i], parentIndex, rootNode);
                }

                return joint;
            };

            var getJointIndex = function (joint) {
                return joint.index;
            };

            var instanceSkins = {};

            for (var name in json.nodes) {

                var nodeInfo = json.nodes[name];

                if (nodeInfo.instanceSkin) {
                    var skinName = nodeInfo.instanceSkin.skin;
                    var skeleton = lib.skeletons[skinName];
                    instanceSkins[skinName] = skeleton;

                    var node = lib.nodes[name];
                    var jointIndices = skeleton.joints.map(getJointIndex);
                    if (node instanceof Mesh) {
                        node.skeleton = skeleton;
                        node.joints = jointIndices;
                        var material = node.material;
                        if (material instanceof StandardMaterial) {
                            material.jointCount = jointIndices.length;
                        }
                        else {
                            material.shader = material.shader.clone();
                            material.shader.define('vertex', 'SKINNING');
                            material.shader.define('vertex', 'JOINT_COUNT', jointIndices.length);
                        }
                    }
                    else {
                        // Mesh have multiple primitives
                        for (var i = 0; i < node._children.length; i++) {
                            var child = node._children[i];
                            if (child.skeleton) {
                                child.skeleton = skeleton;
                                child.joints = jointIndices;
                                var material = child.material;
                                if (material instanceof StandardMaterial) {
                                    material.jointCount = jointIndices.length;
                                }
                                else {
                                    material.shader = material.shader.clone();
                                    material.shader.define('vertex', 'SKINNING');
                                    material.shader.define('vertex', 'JOINT_COUNT', jointIndices.length);
                                }
                            }
                        }
                    }

                    var jointsMap = {};
                    for (var i = 0; i < skeleton.joints.length; i++) {
                        var joint = skeleton.joints[i];
                        jointsMap[joint.name] = joint;
                    }
                    // Build up hierarchy from root nodes
                    var rootNodes = nodeInfo.instanceSkin.skeletons;
                    for (i = 0; i < rootNodes.length; i++) {
                        var rootNode = lib.nodes[rootNodes[i]];
                        var rootJoint = bindNodeToJoint(jointsMap, rootNodes[i], -1, rootNode);
                        // Root joint may not in the skeleton
                        if (rootJoint) {
                            skeleton.roots.push(rootJoint);
                        }
                    }
                }
            }

            for (var name in instanceSkins) {
                var skeleton = instanceSkins[name];
                if (haveInvBindMatrices) {
                    skeleton.updateMatricesSubArrays();
                }
                else {
                    skeleton.updateJointMatrices();
                }
                skeleton.update();
            }
        },

        _parseTextures: function (json, lib) {
            var rootPath = this.textureRootPath;
            if (rootPath == null) {
                rootPath = this.rootPath;
            }
            util.each(json.textures, function (textureInfo, name){
                var samplerInfo = json.samplers[textureInfo.sampler];
                var parameters = {};
                ['wrapS', 'wrapT', 'magFilter', 'minFilter']
                .forEach(function (name) {
                    var value = samplerInfo[name];
                    if (value != null) {
                        if (typeof(value) === 'string') {
                            // DEPRECATED, sampler parameter now use gl enum instead of string
                            value = glenum[value];
                        }
                        parameters[name] = value;
                    }
                });

                var target = textureInfo.target;
                var format = textureInfo.format;
                if (typeof(target) === 'string') {
                    // DEPRECATED
                    target = glenum[target];
                    format = glenum[format];
                }
                parameters.format = format;

                if (target === glenum.TEXTURE_2D) {
                    var texture = new Texture2D(parameters);
                    var imageInfo = json.images[textureInfo.source];
                    texture.load(util.relative2absolute(imageInfo.path, rootPath));
                    lib.textures[name] = texture;
                }
                else if(target === glenum.TEXTURE_CUBE_MAP) {
                    // TODO
                }
            }, this);
        },

        // Only phong material is support yet
        // TODO support custom material
        _parseMaterials: function (json, lib) {
            var techniques = {};
            // Parse techniques
            for (var name in json.techniques) {
                var techniqueInfo = json.techniques[name];

                // DEPRECATED compatible with older version(< 1.0)
                // There are no passes in techniques now
                // https://github.com/KhronosGroup/glTF/wiki/glTF-0.8-to-1.0-Guide
                if (techniqueInfo.passes) {
                    techniques[name] = techniqueInfo.passes[techniqueInfo.pass];
                }
                else {
                    techniques[name] = techniqueInfo;
                }
            }
            for (var name in json.materials) {
                var materialInfo = json.materials[name];

                // DEPRECATED compatible with older version(< 1.0)
                // There no instanceTechnique in material now.
                // https://github.com/KhronosGroup/glTF/wiki/glTF-0.8-to-1.0-Guide
                if (materialInfo.instanceTechnique) {
                    for (var key in materialInfo.instanceTechnique) {
                        materialInfo[key] = materialInfo.instanceTechnique[key];
                    }
                    materialInfo.instanceTechnique = null;
                }
                var technique = techniques[materialInfo.technique];
                var uniforms = {};

                uniforms = materialInfo.values;
                for (var symbol in uniforms) {
                    var value = uniforms[symbol];
                    // TODO: texture judgement should be more robust
                    if (typeof(value) === 'string') {
                        if (lib.textures[value]) {
                            uniforms[symbol] = lib.textures[value];
                        }
                        else {
                            uniforms[symbol] = null;
                        }
                    }
                }
                var enabledTextures = [];
                if (uniforms['diffuse'] instanceof Texture2D) {
                    enabledTextures.push('diffuseMap');
                }
                if (uniforms['normalMap'] instanceof Texture2D) {
                    enabledTextures.push('normalMap');
                }
                var material;
                var isStandardMaterial = this.useStandardMaterial;
                if (isStandardMaterial) {
                    material = new StandardMaterial({
                        name: materialInfo.name
                    });
                }
                else {
                    material = new Material({
                        name: materialInfo.name,
                        shader: shaderLibrary.get(this.shaderName, enabledTextures)
                    });
                }
                if (technique.states.depthMask != null) {
                    material.depthMask = technique.states.depthMask;
                }
                if (technique.states.depthTestEnable != null) {
                    material.depthTest = technique.states.depthTestEnable;
                }
                material.cullFace = technique.states.cullFaceEnable || false;
                if (technique.states.blendEnable) {
                    material.transparent = true;
                    // TODO blend Func and blend Equation
                }

                var diffuseProp = uniforms['diffuse'];
                if (diffuseProp) {
                    // Color
                    if (diffuseProp instanceof Array) {
                        if (isStandardMaterial) {
                            material.color = diffuseProp.slice(0, 3);
                        }
                        else {
                            material.set('color', diffuseProp.slice(0, 3));
                        }
                    }
                    else { // Texture
                        if (isStandardMaterial) {
                            material.diffuseMap = diffuseProp;
                        }
                        else {
                            material.set('diffuseMap', diffuseProp);
                        }
                    }
                }
                if (uniforms['normalMap'] != null) {
                    if (isStandardMaterial) {
                        material.normalMap = uniforms['normalMap'];
                    }
                    else {
                        material.set('normalMap', uniforms['normalMap']);
                    }
                }
                if (uniforms['emission'] != null) {
                    material.set('emission', uniforms['emission'].slice(0, 3));
                }
                if (uniforms['shininess'] != null) {
                    var glossiness = Math.log(uniforms['shininess']) / Math.log(8192);
                    // Uniform glossiness
                    material.set('glossiness', glossiness);
                    material.set('roughness', 1 - glossiness);
                    material.set('shininess', uniforms['shininess']);
                }
                else {
                    material.set('glossiness', 0.5);
                    material.set('shininess', 0.5);
                }
                if (uniforms['specular'] != null) {
                    material.set('specularColor', uniforms['specular'].slice(0, 3));
                }
                if (uniforms['transparency'] != null) {
                    material.set('alpha', uniforms['transparency']);
                }

                lib.materials[name] = material;
            }
        },

        _parseMeshes: function (json, lib) {
            var self = this;

            var meshKeys = Object.keys(json.meshes);
            for (var nn = 0; nn < meshKeys.length; nn++) {
                var name = meshKeys[nn];
                var meshInfo = json.meshes[name];

                lib.meshes[name] = [];
                // Geometry
                for (var pp = 0; pp < meshInfo.primitives.length; pp++) {
                    var primitiveInfo = meshInfo.primitives[pp];
                    var geometry = new StaticGeometry({
                        boundingBox: new BoundingBox()
                    });
                    // Parse attributes
                    var semantics = Object.keys(primitiveInfo.attributes);
                    for (var ss = 0; ss < semantics.length; ss++) {
                        var semantic = semantics[ss];
                        var accessorName = primitiveInfo.attributes[semantic];
                        var attributeInfo = json.accessors[accessorName];
                        var attributeName = semanticAttributeMap[semantic];
                        if (!attributeName) {
                            continue;
                        }
                        var componentType = attributeInfo.componentType;
                        // DEPRECATED compatible with older version(< 1.0)
                        if (componentType == null) {
                            var attributeType = attributeInfo.type;
                            switch(attributeType) {
                                case 0x8B50:     // FLOAT_VEC2
                                    size = 2;
                                    ArrayCtor = vendor.Float32Array;
                                    break;
                                case 0x8B51:     // FLOAT_VEC3
                                    size = 3;
                                    ArrayCtor = vendor.Float32Array;
                                    break;
                                case 0x8B52:     // FLOAT_VEC4
                                    size = 4;
                                    ArrayCtor = vendor.Float32Array;
                                    break;
                                case 0x1406:     // FLOAT
                                    size = 1;
                                    ArrayCtor = vendor.Float32Array;
                                    break;
                                default:
                                    console.warn('Attribute type ' + attributeInfo.type + ' not support yet');
                                    break;
                            }
                        }
                        else {
                            var attributeType = attributeInfo.type;
                            ArrayCtor = ({
                                5120: vendor.Int8Array,
                                5121: vendor.Uint8Array,
                                5122: vendor.Int16Array,
                                5123: vendor.Uint16Array,
                                5126: vendor.Float32Array
                            })[componentType] || vendor.Float32Array;

                            size = ({
                                SCALAR: 1,
                                VEC2: 2,
                                VEC3: 3,
                                VEC4: 4,
                                MAT2: 4,
                                MAT3: 9,
                                MAT4: 16
                            })[attributeType];
                        }

                        var bufferViewInfo = json.bufferViews[attributeInfo.bufferView];
                        var buffer = lib.buffers[bufferViewInfo.buffer];
                        var byteOffset = bufferViewInfo.byteOffset + attributeInfo.byteOffset;

                        var size;
                        var ArrayCtor;
                        var attributeArray = new ArrayCtor(buffer, byteOffset, attributeInfo.count * size);
                        if (semantic === 'WEIGHT' && size === 4) {
                            // Weight data in QTEK has only 3 component, the last component can be evaluated since it is normalized
                            var weightArray = new ArrayCtor(attributeInfo.count * 3);
                            for (var i = 0; i < attributeInfo.count; i++) {
                                weightArray[i * 3] = attributeArray[i * 4];
                                weightArray[i * 3 + 1] = attributeArray[i * 4 + 1];
                                weightArray[i * 3 + 2] = attributeArray[i * 4 + 2];
                            }
                            geometry.attributes[attributeName].value = weightArray;
                        }
                        else {
                            geometry.attributes[attributeName].value = attributeArray;
                        }
                        if (semantic === 'POSITION') {
                            // Bounding Box
                            var min = attributeInfo.min;
                            var max = attributeInfo.max;
                            if (min) {
                                geometry.boundingBox.min.set(min[0], min[1], min[2]);
                            }
                            if (max) {
                                geometry.boundingBox.max.set(max[0], max[1], max[2]);
                            }
                        }
                    }

                    // Parse indices
                    var indicesInfo = json.accessors[primitiveInfo.indices];

                    var bufferViewInfo = json.bufferViews[indicesInfo.bufferView];
                    var buffer = lib.buffers[bufferViewInfo.buffer];
                    var byteOffset = bufferViewInfo.byteOffset + indicesInfo.byteOffset;

                    // index uint
                    if (indicesInfo.componentType === 0x1405) { // UNSIGNED_INT
                        geometry.indices = new vendor.Uint32Array(buffer, byteOffset, indicesInfo.count);
                    }
                    else { // UNSIGNED_SHORT, 0x1403
                        geometry.indices = new vendor.Uint16Array(buffer, byteOffset, indicesInfo.count);
                    }

                    var material = lib.materials[primitiveInfo.material];
                    //Collada export from blender may not have default material
                    if (!material) {
                        material = new Material({
                            shader: shaderLibrary.get(self.shaderName)
                        });
                    }
                    var mesh = new Mesh({
                        geometry: geometry,
                        material: material
                    });
                    if (material.shader.isTextureEnabled('normalMap')) {
                        if (!mesh.geometry.attributes.tangent.value) {
                            mesh.geometry.generateTangents();
                        }
                    }

                    if (meshInfo.name) {
                        if (meshInfo.primitives.length > 1) {
                            mesh.name = [meshInfo.name, pp].join('-');
                        }
                        else {
                            // PENDING name or meshInfo.name ?
                            mesh.name = meshInfo.name;
                        }
                    }

                    lib.meshes[name].push(mesh);
                }
            }
        },

        _parseNodes: function (json, lib) {

            for (var name in json.nodes) {
                var nodeInfo = json.nodes[name];
                var node;
                if (nodeInfo.camera && this.includeCamera) {
                    var cameraInfo = json.cameras[nodeInfo.camera];

                    if (cameraInfo.projection === 'perspective') {
                        node = new PerspectiveCamera({
                            name: nodeInfo.name,
                            aspect: cameraInfo.aspect_ratio,
                            fov: cameraInfo.xfov,
                            far: cameraInfo.zfar,
                            near: cameraInfo.znear
                        });
                    }
                    else {
                        // TODO
                        node = new OrthographicCamera();
                        console.warn('TODO:Orthographic camera');
                    }
                    node.setName(nodeInfo.name);
                    lib.cameras[nodeInfo.name] = node;
                }
                else if (nodeInfo.lights && this.includeLight) {
                    var lights = [];
                    for (var i = 0; i < nodeInfo.lights.length; i++) {
                        var lightInfo = json.lights[nodeInfo.lights[i]];
                        var light = this._parseLight(lightInfo);
                        if (light) {
                            lights.push(light);
                        }
                    }
                    if (lights.length == 1) {
                        // Replace the node with light
                        node = lights[0];
                        node.setName(nodeInfo.name);
                    }
                    else {
                        node = new Node();
                        node.setName(nodeInfo.name);
                        for (var i = 0; i < lights.length; i++) {
                            node.add(lights[i]);
                        }
                    }
                }
                else if ((nodeInfo.meshes || nodeInfo.instanceSkin) && this.includeMesh) {
                    // TODO one node have multiple meshes ?
                    var meshKey;
                    if (nodeInfo.meshes) {
                        meshKey = nodeInfo.meshes[0];
                    }
                    else {
                        meshKey = nodeInfo.instanceSkin.sources[0];
                    }
                    if (meshKey) {
                        var primitives = lib.meshes[meshKey];
                        if (primitives) {
                            if (primitives.length === 1) {
                                // Replace the node with mesh directly
                                node = primitives[0];
                                node.setName(nodeInfo.name);
                            }
                            else {
                                node = new Node();
                                node.setName(nodeInfo.name);
                                for (var j = 0; j < primitives.length; j++) {
                                    if (nodeInfo.instanceSkin) {
                                        primitives[j].skeleton = nodeInfo.instanceSkin.skin;
                                    }
                                    node.add(primitives[j]);
                                }
                            }
                        }
                    }
                }
                else {
                    node = new Node();
                    node.setName(nodeInfo.name);
                }
                if (nodeInfo.matrix) {
                    node.localTransform.setArray(nodeInfo.matrix);
                    node.decomposeLocalTransform();
                }
                else {
                    if (nodeInfo.translation) {
                        node.position.setArray(nodeInfo.translation);
                    }
                    if (nodeInfo.rotation) {
                        // glTF use axis angle in rotation
                        // https://github.com/KhronosGroup/glTF/issues/144
                        // quat.setAxisAngle(node.rotation._array, nodeInfo.rotation.slice(0, 3), nodeInfo.rotation[3]);
                        // node.rotation._dirty = true;

                        // https://github.com/KhronosGroup/glTF/wiki/glTF-0.8-to-1.0-Guide
                        // From 1.0 rotation use quaternion instead
                        node.rotation.setArray(nodeInfo.rotation);
                    }
                    if (nodeInfo.scale) {
                        node.scale.setArray(nodeInfo.scale);
                    }
                }

                lib.nodes[name] = node;
            }

            // Build hierarchy
            for (var name in json.nodes) {
                var nodeInfo = json.nodes[name];
                var node = lib.nodes[name];
                if (nodeInfo.children) {
                    for (var i = 0; i < nodeInfo.children.length; i++) {
                        var childName = nodeInfo.children[i];
                        var child = lib.nodes[childName];
                        node.add(child);
                    }
                }
            }
         },

        _parseLight: function (lightInfo) {
            // TODO Light parameters
            switch(lightInfo.type) {
                case 'point':
                    var light = new PointLight({
                        name: lightInfo.id,
                        color: lightInfo.point.color,
                    });
                    break;
                case 'spot':
                    var light = new SpotLight({
                        name: lightInfo.id,
                        color: lightInfo.spot.color
                    });
                    break;
                case 'directional':
                    var light = new DirectionalLight({
                        name: lightInfo.id,
                        color: lightInfo.directional.color
                    });
                    break;
                default:
                    console.warn('Light ' + lightInfo.type + ' not support yet');
            }

            return light;
        },

        _parseAnimations: function (json, lib) {
            // TODO Only support nodes animation now

            var nodeAnimationClips = lib.clips = {};

            var quatTmp = quat.create();

            for (var animName in json.animations) {
                var animationInfo = json.animations[animName];
                var parameters = {};

                for (var paramName in animationInfo.parameters) {
                    var accessorName = animationInfo.parameters[paramName];
                    var accessorInfo = json.accessors[accessorName];

                    var bufferViewInfo = json.bufferViews[accessorInfo.bufferView];
                    var buffer = lib.buffers[bufferViewInfo.buffer];
                    var byteOffset = bufferViewInfo.byteOffset + accessorInfo.byteOffset;
                    switch(accessorInfo.type) {
                        case 0x8B50:     // FLOAT_VEC2
                            var size = 2;
                            break;
                        case 0x8B51:     // FLOAT_VEC3
                            var size = 3;
                            break;
                        case 0x8B52:     // FLOAT_VEC4
                            var size = 4;
                            break;
                        case 0x1406:     // FLOAT
                            var size = 1;
                            break;
                    }
                    parameters[paramName] = new vendor.Float32Array(buffer, byteOffset, size * accessorInfo.count);
                }

                if (!parameters.TIME || !animationInfo.channels.length) {
                    continue;
                }

                // Use the first channels target
                var targetId = animationInfo.channels[0].target.id;
                var targetNode = lib.nodes[targetId];

                // glTF use axis angle in rotation, convert to quaternion
                // https://github.com/KhronosGroup/glTF/issues/144
                var rotationArr = parameters.rotation;
                if (rotationArr) {
                    for (var i = 0; i < parameters.TIME.length; i++) {
                        parameters.TIME[i] *= 1000;
                        var offset = i * 4;
                        if (rotationArr) {
                            quatTmp[0] = rotationArr[offset];
                            quatTmp[1] = rotationArr[offset + 1];
                            quatTmp[2] = rotationArr[offset + 2];
                            quat.setAxisAngle(quatTmp, quatTmp, rotationArr[offset + 3]);
                            parameters.rotation[offset] = quatTmp[0];
                            parameters.rotation[offset + 1] = quatTmp[1];
                            parameters.rotation[offset + 2] = quatTmp[2];
                            parameters.rotation[offset + 3] = quatTmp[3];
                        }
                    }
                }

                // TODO
                // if (nodeAnimationClips[targetId]) {
                //     continue;
                // }
                nodeAnimationClips[targetId] = new SamplerClip({
                    name: targetNode.name,
                    target: targetNode
                });
                var nodeAnimationClip = nodeAnimationClips[targetId];
                nodeAnimationClip.channels.time = parameters.TIME;
                nodeAnimationClip.channels.rotation = parameters.rotation || null;
                nodeAnimationClip.channels.position = parameters.translation || null;
                nodeAnimationClip.channels.scale = parameters.scale || null;
                nodeAnimationClip.life = parameters.TIME[parameters.TIME.length - 1];
            }

            return nodeAnimationClips;
        }
    });

    module.exports = GLTFLoader;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Vector3 = __webpack_require__(3);
    var glMatrix = __webpack_require__(0);
    var vec3 = glMatrix.vec3;
    var mat4 = glMatrix.mat4;
    var vec4 = glMatrix.vec4;

    /**
     * @constructor
     * @alias qtek.math.Plane
     * @param {qtek.math.Vector3} [normal]
     * @param {number} [distance]
     */
    var Plane = function(normal, distance) {
        /**
         * Normal of the plane
         * @type {qtek.math.Vector3}
         */
        this.normal = normal || new Vector3(0, 1, 0);

        /**
         * Constant of the plane equation, used as distance to the origin
         * @type {number}
         */
        this.distance = distance || 0;
    };

    Plane.prototype = {

        constructor: Plane,

        /**
         * Distance from given point to plane
         * @param  {qtek.math.Vector3} point
         * @return {number}
         */
        distanceToPoint: function(point) {
            return vec3.dot(point._array, this.normal._array) - this.distance;
        },

        /**
         * Calculate the projection on the plane of point
         * @param  {qtek.math.Vector3} point
         * @param  {qtek.math.Vector3} out
         * @return {qtek.math.Vector3}
         */
        projectPoint: function(point, out) {
            if (!out) {
                out = new Vector3();
            }
            var d = this.distanceToPoint(point);
            vec3.scaleAndAdd(out._array, point._array, this.normal._array, -d);
            out._dirty = true;
            return out;
        },

        /**
         * Normalize the plane's normal and calculate distance
         */
        normalize: function() {
            var invLen = 1 / vec3.len(this.normal._array);
            vec3.scale(this.normal._array, invLen);
            this.distance *= invLen;
        },

        /**
         * If the plane intersect a frustum
         * @param  {qtek.math.Frustum} Frustum
         * @return {boolean}
         */
        intersectFrustum: function(frustum) {
            // Check if all coords of frustum is on plane all under plane
            var coords = frustum.vertices;
            var normal = this.normal._array;
            var onPlane = vec3.dot(coords[0]._array, normal) > this.distance;
            for (var i = 1; i < 8; i++) {
                if ((vec3.dot(coords[i]._array, normal) > this.distance) != onPlane) {
                    return true;
                } 
            }
        },

        /**
         * Calculate the intersection point between plane and a given line
         * @method
         * @param {qtek.math.Vector3} start start point of line
         * @param {qtek.math.Vector3} end end point of line
         * @param {qtek.math.Vector3} [out]
         * @return {qtek.math.Vector3}
         */
        intersectLine: (function() {
            var rd = vec3.create();
            return function(start, end, out) {
                var d0 = this.distanceToPoint(start);
                var d1 = this.distanceToPoint(end);
                if ((d0 > 0 && d1 > 0) || (d0 < 0 && d1 < 0)) {
                    return null;
                }
                // Ray intersection
                var pn = this.normal._array;
                var d = this.distance;
                var ro = start._array;
                // direction
                vec3.sub(rd, end._array, start._array);
                vec3.normalize(rd, rd);

                var divider = vec3.dot(pn, rd);
                // ray is parallel to the plane
                if (divider === 0) {
                    return null;
                }
                if (!out) {
                    out = new Vector3();
                }
                var t = (vec3.dot(pn, ro) - d) / divider;
                vec3.scaleAndAdd(out._array, ro, rd, -t);
                out._dirty = true;
                return out;
            };
        })(),

        /**
         * Apply an affine transform matrix to plane
         * @method
         * @return {qtek.math.Matrix4}
         */
        applyTransform: (function() {
            var inverseTranspose = mat4.create();
            var normalv4 = vec4.create();
            var pointv4 = vec4.create();
            pointv4[3] = 1;
            return function(m4) {
                m4 = m4._array;
                // Transform point on plane
                vec3.scale(pointv4, this.normal._array, this.distance);
                vec4.transformMat4(pointv4, pointv4, m4);
                this.distance = vec3.dot(pointv4, this.normal._array);
                // Transform plane normal
                mat4.invert(inverseTranspose, m4);
                mat4.transpose(inverseTranspose, inverseTranspose);
                normalv4[3] = 0;
                vec3.copy(normalv4, this.normal._array);
                vec4.transformMat4(normalv4, normalv4, inverseTranspose);
                vec3.copy(this.normal._array, normalv4);
            };
        })(),

        /**
         * Copy from another plane
         * @param  {qtek.math.Vector3} plane
         */
        copy: function(plane) {
            vec3.copy(this.normal._array, plane.normal._array);
            this.normal._dirty = true;
            this.distance = plane.distance;
        },

        /**
         * Clone a new plane
         * @return {qtek.math.Plane}
         */
        clone: function() {
            var plane = new Plane();
            plane.copy(this);
            return plane;
        }
    };

    module.exports = Plane;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var Vector3 = __webpack_require__(3);
    var glMatrix = __webpack_require__(0);
    var vec3 = glMatrix.vec3;

    var EPSILON = 1e-5;

    /**
     * @constructor
     * @alias qtek.math.Ray
     * @param {qtek.math.Vector3} [origin]
     * @param {qtek.math.Vector3} [direction]
     */
    var Ray = function (origin, direction) {
        /**
         * @type {qtek.math.Vector3}
         */
        this.origin = origin || new Vector3();
        /**
         * @type {qtek.math.Vector3}
         */
        this.direction = direction || new Vector3();
    };

    Ray.prototype = {

        constructor: Ray,

        // http://www.siggraph.org/education/materials/HyperGraph/raytrace/rayplane_intersection.htm
        /**
         * Calculate intersection point between ray and a give plane
         * @param  {qtek.math.Plane} plane
         * @param  {qtek.math.Vector3} [out]
         * @return {qtek.math.Vector3}
         */
        intersectPlane: function (plane, out) {
            var pn = plane.normal._array;
            var d = plane.distance;
            var ro = this.origin._array;
            var rd = this.direction._array;

            var divider = vec3.dot(pn, rd);
            // ray is parallel to the plane
            if (divider === 0) {
                return null;
            }
            if (!out) {
                out = new Vector3();
            }
            var t = (vec3.dot(pn, ro) - d) / divider;
            vec3.scaleAndAdd(out._array, ro, rd, -t);
            out._dirty = true;
            return out;
        },

        /**
         * Mirror the ray against plane
         * @param  {qtek.math.Plane} plane
         */
        mirrorAgainstPlane: function (plane) {
            // Distance to plane
            var d = vec3.dot(plane.normal._array, this.direction._array);
            vec3.scaleAndAdd(this.direction._array, this.direction._array, plane.normal._array, -d * 2);
            this.direction._dirty = true;
        },

        distanceToPoint: (function () {
            var v = vec3.create();
            return function (point) {
                vec3.sub(v, point, this.origin._array);
                // Distance from projection point to origin
                var b = vec3.dot(v, this.direction._array);
                if (b < 0) {
                    return vec3.distance(this.origin._array, point);
                }
                // Squared distance from center to origin
                var c2 = vec3.lenSquared(v);
                // Squared distance from center to projection point
                return Math.sqrt(c2 - b * b);
            };
        })(),

        /**
         * Calculate intersection point between ray and sphere
         * @param  {qtek.math.Vector3} center
         * @param  {number} radius
         * @param  {qtek.math.Vector3} out
         * @return {qtek.math.Vector3}
         */
        intersectSphere: (function () {
            var v = vec3.create();
            return function (center, radius, out) {
                var origin = this.origin._array;
                var direction = this.direction._array;
                center = center._array;
                vec3.sub(v, center, origin);
                // Distance from projection point to origin
                var b = vec3.dot(v, direction);
                // Squared distance from center to origin
                var c2 = vec3.squaredLength(v);
                // Squared distance from center to projection point
                var d2 = c2 - b * b;

                var r2 = radius * radius;
                // No intersection
                if (d2 > r2) {
                    return;
                }

                var a = Math.sqrt(r2 - d2);
                // First intersect point
                var t0 = b - a;
                // Second intersect point
                var t1 = b + a;

                if (!out) {
                    out = new Vector3();
                }
                if (t0 < 0) {
                    if (t1 < 0) {
                        return null;
                    }
                    else {
                        vec3.scaleAndAdd(out._array, origin, direction, t1);
                        return out;
                    }
                }
                else {
                    vec3.scaleAndAdd(out._array, origin, direction, t0);
                    return out;
                }
            };
        })(),

        // http://www.scratchapixel.com/lessons/3d-basic-lessons/lesson-7-intersecting-simple-shapes/ray-box-intersection/
        /**
         * Calculate intersection point between ray and bounding box
         * @param {qtek.math.BoundingBox} bbox
         * @param {qtek.math.Vector3}
         * @return {qtek.math.Vector3}
         */
        intersectBoundingBox: function (bbox, out) {
            var dir = this.direction._array;
            var origin = this.origin._array;
            var min = bbox.min._array;
            var max = bbox.max._array;

            var invdirx = 1 / dir[0];
            var invdiry = 1 / dir[1];
            var invdirz = 1 / dir[2];

            var tmin, tmax, tymin, tymax, tzmin, tzmax;
            if (invdirx >= 0) {
                tmin = (min[0] - origin[0]) * invdirx;
                tmax = (max[0] - origin[0]) * invdirx;
            }
            else {
                tmax = (min[0] - origin[0]) * invdirx;
                tmin = (max[0] - origin[0]) * invdirx;
            }
            if (invdiry >= 0) {
                tymin = (min[1] - origin[1]) * invdiry;
                tymax = (max[1] - origin[1]) * invdiry;
            }
            else {
                tymax = (min[1] - origin[1]) * invdiry;
                tymin = (max[1] - origin[1]) * invdiry;
            }

            if ((tmin > tymax) || (tymin > tmax)) {
                return null;
            }

            if (tymin > tmin || tmin !== tmin) {
                tmin = tymin;
            }
            if (tymax < tmax || tmax !== tmax) {
                tmax = tymax;
            }

            if (invdirz >= 0) {
                tzmin = (min[2] - origin[2]) * invdirz;
                tzmax = (max[2] - origin[2]) * invdirz;
            }
            else {
                tzmax = (min[2] - origin[2]) * invdirz;
                tzmin = (max[2] - origin[2]) * invdirz;
            }

            if ((tmin > tzmax) || (tzmin > tmax)) {
                return null;
            }

            if (tzmin > tmin || tmin !== tmin) {
                tmin = tzmin;
            }
            if (tzmax < tmax || tmax !== tmax) {
                tmax = tzmax;
            }
            if (tmax < 0) {
                return null;
            }

            var t = tmin >= 0 ? tmin : tmax;

            if (!out) {
                out = new Vector3();
            }
            vec3.scaleAndAdd(out._array, origin, dir, t);
            return out;
        },

        // http://en.wikipedia.org/wiki/M%C3%B6ller%E2%80%93Trumbore_intersection_algorithm
        /**
         * Calculate intersection point between ray and three triangle vertices
         * @param {qtek.math.Vector3} a
         * @param {qtek.math.Vector3} b
         * @param {qtek.math.Vector3} c
         * @param {boolean}           singleSided, CW triangle will be ignored
         * @param {qtek.math.Vector3} [out]
         * @param {qtek.math.Vector3} [barycenteric] barycentric coords
         * @return {qtek.math.Vector3}
         */
        intersectTriangle: (function () {

            var eBA = vec3.create();
            var eCA = vec3.create();
            var AO = vec3.create();
            var vCross = vec3.create();

            return function (a, b, c, singleSided, out, barycenteric) {
                var dir = this.direction._array;
                var origin = this.origin._array;
                a = a._array;
                b = b._array;
                c = c._array;

                vec3.sub(eBA, b, a);
                vec3.sub(eCA, c, a);

                vec3.cross(vCross, eCA, dir);

                var det = vec3.dot(eBA, vCross);

                if (singleSided) {
                    if (det > -EPSILON) {
                        return null;
                    }
                }
                else {
                    if (det > -EPSILON && det < EPSILON) {
                        return null;
                    }
                }

                vec3.sub(AO, origin, a);
                var u = vec3.dot(vCross, AO) / det;
                if (u < 0 || u > 1) {
                    return null;
                }

                vec3.cross(vCross, eBA, AO);
                var v = vec3.dot(dir, vCross) / det;

                if (v < 0 || v > 1 || (u + v > 1)) {
                    return null;
                }

                vec3.cross(vCross, eBA, eCA);
                var t = -vec3.dot(AO, vCross) / det;

                if (t < 0) {
                    return null;
                }

                if (!out) {
                    out = new Vector3();
                }
                if (barycenteric) {
                    Vector3.set(barycenteric, (1 - u - v), u, v);
                }
                vec3.scaleAndAdd(out._array, origin, dir, t);

                return out;
            };
        })(),

        /**
         * Apply an affine transform matrix to the ray
         * @return {qtek.math.Matrix4} matrix
         */
        applyTransform: function (matrix) {
            Vector3.add(this.direction, this.direction, this.origin);
            Vector3.transformMat4(this.origin, this.origin, matrix);
            Vector3.transformMat4(this.direction, this.direction, matrix);

            Vector3.sub(this.direction, this.direction, this.origin);
            Vector3.normalize(this.direction, this.direction);
        },

        /**
         * Copy values from another ray
         * @param {qtek.math.Ray} ray
         */
        copy: function (ray) {
            Vector3.copy(this.origin, ray.origin);
            Vector3.copy(this.direction, ray.direction);
        },

        /**
         * Clone a new ray
         * @return {qtek.math.Ray}
         */
        clone: function () {
            var ray = new Ray();
            ray.copy(this);
            return ray;
        }
    };

    module.exports = Ray;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    var glMatrix = __webpack_require__(0);
    var vec4 = glMatrix.vec4;

    /**
     * @constructor
     * @alias qtek.math.Vector4
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} w
     */
    var Vector4 = function(x, y, z, w) {

        x = x || 0;
        y = y || 0;
        z = z || 0;
        w = w || 0;

        /**
         * Storage of Vector4, read and write of x, y, z, w will change the values in _array
         * All methods also operate on the _array instead of x, y, z, w components
         * @name _array
         * @type {Float32Array}
         */
        this._array = vec4.fromValues(x, y, z, w);

        /**
         * Dirty flag is used by the Node to determine
         * if the matrix is updated to latest
         * @name _dirty
         * @type {boolean}
         */
        this._dirty = true;
    };

    Vector4.prototype = {

        constructor: Vector4,

        /**
         * Add b to self
         * @param  {qtek.math.Vector4} b
         * @return {qtek.math.Vector4}
         */
        add: function(b) {
            vec4.add(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Set x, y and z components
         * @param  {number}  x
         * @param  {number}  y
         * @param  {number}  z
         * @param  {number}  w
         * @return {qtek.math.Vector4}
         */
        set: function(x, y, z, w) {
            this._array[0] = x;
            this._array[1] = y;
            this._array[2] = z;
            this._array[3] = w;
            this._dirty = true;
            return this;
        },

        /**
         * Set x, y, z and w components from array
         * @param  {Float32Array|number[]} arr
         * @return {qtek.math.Vector4}
         */
        setArray: function(arr) {
            this._array[0] = arr[0];
            this._array[1] = arr[1];
            this._array[2] = arr[2];
            this._array[3] = arr[3];

            this._dirty = true;
            return this;
        },

        /**
         * Clone a new Vector4
         * @return {qtek.math.Vector4}
         */
        clone: function() {
            return new Vector4(this.x, this.y, this.z, this.w);
        },

        /**
         * Copy from b
         * @param  {qtek.math.Vector4} b
         * @return {qtek.math.Vector4}
         */
        copy: function(b) {
            vec4.copy(this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for distance
         * @param  {qtek.math.Vector4} b
         * @return {number}
         */
        dist: function(b) {
            return vec4.dist(this._array, b._array);
        },

        /**
         * Distance between self and b
         * @param  {qtek.math.Vector4} b
         * @return {number}
         */
        distance: function(b) {
            return vec4.distance(this._array, b._array);
        },

        /**
         * Alias for divide
         * @param  {qtek.math.Vector4} b
         * @return {qtek.math.Vector4}
         */
        div: function(b) {
            vec4.div(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Divide self by b
         * @param  {qtek.math.Vector4} b
         * @return {qtek.math.Vector4}
         */
        divide: function(b) {
            vec4.divide(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Dot product of self and b
         * @param  {qtek.math.Vector4} b
         * @return {number}
         */
        dot: function(b) {
            return vec4.dot(this._array, b._array);
        },

        /**
         * Alias of length
         * @return {number}
         */
        len: function() {
            return vec4.len(this._array);
        },

        /**
         * Calculate the length
         * @return {number}
         */
        length: function() {
            return vec4.length(this._array);
        },
        /**
         * Linear interpolation between a and b
         * @param  {qtek.math.Vector4} a
         * @param  {qtek.math.Vector4} b
         * @param  {number}  t
         * @return {qtek.math.Vector4}
         */
        lerp: function(a, b, t) {
            vec4.lerp(this._array, a._array, b._array, t);
            this._dirty = true;
            return this;
        },

        /**
         * Minimum of self and b
         * @param  {qtek.math.Vector4} b
         * @return {qtek.math.Vector4}
         */
        min: function(b) {
            vec4.min(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Maximum of self and b
         * @param  {qtek.math.Vector4} b
         * @return {qtek.math.Vector4}
         */
        max: function(b) {
            vec4.max(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for multiply
         * @param  {qtek.math.Vector4} b
         * @return {qtek.math.Vector4}
         */
        mul: function(b) {
            vec4.mul(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Mutiply self and b
         * @param  {qtek.math.Vector4} b
         * @return {qtek.math.Vector4}
         */
        multiply: function(b) {
            vec4.multiply(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Negate self
         * @return {qtek.math.Vector4}
         */
        negate: function() {
            vec4.negate(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Normalize self
         * @return {qtek.math.Vector4}
         */
        normalize: function() {
            vec4.normalize(this._array, this._array);
            this._dirty = true;
            return this;
        },

        /**
         * Generate random x, y, z, w components with a given scale
         * @param  {number} scale
         * @return {qtek.math.Vector4}
         */
        random: function(scale) {
            vec4.random(this._array, scale);
            this._dirty = true;
            return this;
        },

        /**
         * Scale self
         * @param  {number}  scale
         * @return {qtek.math.Vector4}
         */
        scale: function(s) {
            vec4.scale(this._array, this._array, s);
            this._dirty = true;
            return this;
        },
        /**
         * Scale b and add to self
         * @param  {qtek.math.Vector4} b
         * @param  {number}  scale
         * @return {qtek.math.Vector4}
         */
        scaleAndAdd: function(b, s) {
            vec4.scaleAndAdd(this._array, this._array, b._array, s);
            this._dirty = true;
            return this;
        },

        /**
         * Alias for squaredDistance
         * @param  {qtek.math.Vector4} b
         * @return {number}
         */
        sqrDist: function(b) {
            return vec4.sqrDist(this._array, b._array);
        },

        /**
         * Squared distance between self and b
         * @param  {qtek.math.Vector4} b
         * @return {number}
         */
        squaredDistance: function(b) {
            return vec4.squaredDistance(this._array, b._array);
        },

        /**
         * Alias for squaredLength
         * @return {number}
         */
        sqrLen: function() {
            return vec4.sqrLen(this._array);
        },

        /**
         * Squared length of self
         * @return {number}
         */
        squaredLength: function() {
            return vec4.squaredLength(this._array);
        },

        /**
         * Alias for subtract
         * @param  {qtek.math.Vector4} b
         * @return {qtek.math.Vector4}
         */
        sub: function(b) {
            vec4.sub(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Subtract b from self
         * @param  {qtek.math.Vector4} b
         * @return {qtek.math.Vector4}
         */
        subtract: function(b) {
            vec4.subtract(this._array, this._array, b._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transform self with a Matrix4 m
         * @param  {qtek.math.Matrix4} m
         * @return {qtek.math.Vector4}
         */
        transformMat4: function(m) {
            vec4.transformMat4(this._array, this._array, m._array);
            this._dirty = true;
            return this;
        },

        /**
         * Transform self with a Quaternion q
         * @param  {qtek.math.Quaternion} q
         * @return {qtek.math.Vector4}
         */
        transformQuat: function(q) {
            vec4.transformQuat(this._array, this._array, q._array);
            this._dirty = true;
            return this;
        },

        toString: function() {
            return '[' + Array.prototype.join.call(this._array, ',') + ']';
        },

        toArray: function () {
            return Array.prototype.slice.call(this._array);
        }
    };

    var defineProperty = Object.defineProperty;
    // Getter and Setter
    if (defineProperty) {

        var proto = Vector4.prototype;
        /**
         * @name x
         * @type {number}
         * @memberOf qtek.math.Vector4
         * @instance
         */
        defineProperty(proto, 'x', {
            get: function () {
                return this._array[0];
            },
            set: function (value) {
                this._array[0] = value;
                this._dirty = true;
            }
        });

        /**
         * @name y
         * @type {number}
         * @memberOf qtek.math.Vector4
         * @instance
         */
        defineProperty(proto, 'y', {
            get: function () {
                return this._array[1];
            },
            set: function (value) {
                this._array[1] = value;
                this._dirty = true;
            }
        });

        /**
         * @name z
         * @type {number}
         * @memberOf qtek.math.Vector4
         * @instance
         */
        defineProperty(proto, 'z', {
            get: function () {
                return this._array[2];
            },
            set: function (value) {
                this._array[2] = value;
                this._dirty = true;
            }
        });

        /**
         * @name w
         * @type {number}
         * @memberOf qtek.math.Vector4
         * @instance
         */
        defineProperty(proto, 'w', {
            get: function () {
                return this._array[3];
            },
            set: function (value) {
                this._array[3] = value;
                this._dirty = true;
            }
        });
    }

    // Supply methods that are not in place

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @return {qtek.math.Vector4}
     */
    Vector4.add = function(out, a, b) {
        vec4.add(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {number}  x
     * @param  {number}  y
     * @param  {number}  z
     * @return {qtek.math.Vector4}
     */
    Vector4.set = function(out, x, y, z, w) {
        vec4.set(out._array, x, y, z, w);
        out._dirty = true;
    };

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} b
     * @return {qtek.math.Vector4}
     */
    Vector4.copy = function(out, b) {
        vec4.copy(out._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @return {number}
     */
    Vector4.dist = function(a, b) {
        return vec4.distance(a._array, b._array);
    };

    /**
     * @method
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @return {number}
     */
    Vector4.distance = Vector4.dist;

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @return {qtek.math.Vector4}
     */
    Vector4.div = function(out, a, b) {
        vec4.divide(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @method
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @return {qtek.math.Vector4}
     */
    Vector4.divide = Vector4.div;

    /**
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @return {number}
     */
    Vector4.dot = function(a, b) {
        return vec4.dot(a._array, b._array);
    };

    /**
     * @param  {qtek.math.Vector4} a
     * @return {number}
     */
    Vector4.len = function(b) {
        return vec4.length(b._array);
    };

    // Vector4.length = Vector4.len;

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @param  {number}  t
     * @return {qtek.math.Vector4}
     */
    Vector4.lerp = function(out, a, b, t) {
        vec4.lerp(out._array, a._array, b._array, t);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @return {qtek.math.Vector4}
     */
    Vector4.min = function(out, a, b) {
        vec4.min(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @return {qtek.math.Vector4}
     */
    Vector4.max = function(out, a, b) {
        vec4.max(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @return {qtek.math.Vector4}
     */
    Vector4.mul = function(out, a, b) {
        vec4.multiply(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };

    /**
     * @method
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @return {qtek.math.Vector4}
     */
    Vector4.multiply = Vector4.mul;

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @return {qtek.math.Vector4}
     */
    Vector4.negate = function(out, a) {
        vec4.negate(out._array, a._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @return {qtek.math.Vector4}
     */
    Vector4.normalize = function(out, a) {
        vec4.normalize(out._array, a._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {number}  scale
     * @return {qtek.math.Vector4}
     */
    Vector4.random = function(out, scale) {
        vec4.random(out._array, scale);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @param  {number}  scale
     * @return {qtek.math.Vector4}
     */
    Vector4.scale = function(out, a, scale) {
        vec4.scale(out._array, a._array, scale);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @param  {number}  scale
     * @return {qtek.math.Vector4}
     */
    Vector4.scaleAndAdd = function(out, a, b, scale) {
        vec4.scaleAndAdd(out._array, a._array, b._array, scale);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @return {number}
     */
    Vector4.sqrDist = function(a, b) {
        return vec4.sqrDist(a._array, b._array);
    };

    /**
     * @method
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @return {number}
     */
    Vector4.squaredDistance = Vector4.sqrDist;

    /**
     * @param  {qtek.math.Vector4} a
     * @return {number}
     */
    Vector4.sqrLen = function(a) {
        return vec4.sqrLen(a._array);
    };
    /**
     * @method
     * @param  {qtek.math.Vector4} a
     * @return {number}
     */
    Vector4.squaredLength = Vector4.sqrLen;

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @return {qtek.math.Vector4}
     */
    Vector4.sub = function(out, a, b) {
        vec4.subtract(out._array, a._array, b._array);
        out._dirty = true;
        return out;
    };
    /**
     * @method
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Vector4} b
     * @return {qtek.math.Vector4}
     */
    Vector4.subtract = Vector4.sub;

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Matrix4} m
     * @return {qtek.math.Vector4}
     */
    Vector4.transformMat4 = function(out, a, m) {
        vec4.transformMat4(out._array, a._array, m._array);
        out._dirty = true;
        return out;
    };

    /**
     * @param  {qtek.math.Vector4} out
     * @param  {qtek.math.Vector4} a
     * @param  {qtek.math.Quaternion} q
     * @return {qtek.math.Vector4}
     */
    Vector4.transformQuat = function(out, a, q) {
        vec4.transformQuat(out._array, a._array, q._array);
        out._dirty = true;
        return out;
    };

    module.exports = Vector4;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {



    var Base = __webpack_require__(1);
    var glenum = __webpack_require__(2);
    var Vector3 = __webpack_require__(3);
    var BoundingBox = __webpack_require__(4);
    var Frustum = __webpack_require__(34);
    var Matrix4 = __webpack_require__(15);
    var Renderer = __webpack_require__(27);
    var Shader = __webpack_require__(5);
    var Light = __webpack_require__(9);
    var Mesh = __webpack_require__(14);
    var SpotLight = __webpack_require__(33);
    var DirectionalLight = __webpack_require__(23);
    var PointLight = __webpack_require__(32);
    var shaderLibrary = __webpack_require__(18);
    var Material = __webpack_require__(10);
    var FrameBuffer = __webpack_require__(45);
    var Texture = __webpack_require__(12);
    var Texture2D = __webpack_require__(19);
    var TextureCube = __webpack_require__(20);
    var PerspectiveCamera = __webpack_require__(22);
    var OrthoCamera = __webpack_require__(21);

    var Pass = __webpack_require__(54);
    var TexturePool = __webpack_require__(55);

    var glMatrix = __webpack_require__(0);
    var mat4 = glMatrix.mat4;
    var vec3 = glMatrix.vec3;

    var targets = ['px', 'nx', 'py', 'ny', 'pz', 'nz'];

    Shader['import'](__webpack_require__(88));

    /**
     * Pass rendering shadow map.
     *
     * @constructor qtek.prePass.ShadowMap
     * @extends qtek.core.Base
     * @example
     *     var shadowMapPass = new qtek.prePass.ShadowMap({
     *         softShadow: qtek.prePass.ShadowMap.VSM
     *     });
     *     ...
     *     animation.on('frame', function (frameTime) {
     *         shadowMapPass.render(renderer, scene, camera);
     *         renderer.render(scene, camera);
     *     });
     */
    var ShadowMapPass = Base.extend(function () {
        return /** @lends qtek.prePass.ShadowMap# */ {
            /**
             * Soft shadow technique.
             * Can be {@link qtek.prePass.ShadowMap.PCF} or {@link qtek.prePass.ShadowMap.VSM}
             * @type {number}
             */
            softShadow: ShadowMapPass.PCF,

            /**
             * Soft shadow blur size
             * @type {number}
             */
            shadowBlur: 1.0,

            lightFrustumBias: 2,

            kernelPCF: new Float32Array([
                1, 0,
                1, 1,
                -1, 1,
                0, 1,
                -1, 0,
                -1, -1,
                1, -1,
                0, -1
            ]),

            _frameBuffer: new FrameBuffer(),

            _textures: {},
            _shadowMapNumber: {
                'POINT_LIGHT': 0,
                'DIRECTIONAL_LIGHT': 0,
                'SPOT_LIGHT': 0
            },

            _meshMaterials: {},
            _depthMaterials: {},
            _depthShaders: {},
            _distanceMaterials: {},

            _opaqueCasters: [],
            _receivers: [],
            _lightsCastShadow: [],

            _lightCameras: {},

            _texturePool: new TexturePool()
        };
    }, function () {
        // Gaussian filter pass for VSM
        this._gaussianPassH = new Pass({
            fragment: Shader.source('qtek.compositor.gaussian_blur')
        });
        this._gaussianPassV = new Pass({
            fragment: Shader.source('qtek.compositor.gaussian_blur')
        });
        this._gaussianPassH.setUniform('blurSize', this.shadowBlur);
        this._gaussianPassH.setUniform('blurDir', 0.0);
        this._gaussianPassV.setUniform('blurSize', this.shadowBlur);
        this._gaussianPassV.setUniform('blurDir', 1.0);

        this._outputDepthPass = new Pass({
            fragment: Shader.source('qtek.sm.debug_depth')
        });
    }, {
        /**
         * Render scene to shadow textures
         * @param  {qtek.Renderer} renderer
         * @param  {qtek.Scene} scene
         * @param  {qtek.Camera} sceneCamera
         * @param  {boolean} [notUpdateScene=false]
         * @memberOf qtek.prePass.ShadowMap.prototype
         */
        render: function (renderer, scene, sceneCamera, notUpdateScene) {
            this.trigger('beforerender', this, renderer, scene, sceneCamera);
            this._renderShadowPass(renderer, scene, sceneCamera, notUpdateScene);
            this.trigger('afterrender', this, renderer, scene, sceneCamera);
        },

        /**
         * Debug rendering of shadow textures
         * @param  {qtek.Renderer} renderer
         * @param  {number} size
         * @memberOf qtek.prePass.ShadowMap.prototype
         */
        renderDebug: function (renderer, size) {
            renderer.saveClear();
            var viewport = renderer.viewport;
            var x = 0, y = 0;
            var width = size || viewport.width / 4;
            var height = width;
            if (this.softShadow === ShadowMapPass.VSM) {
                this._outputDepthPass.material.shader.define('fragment', 'USE_VSM');
            }
            else {
                this._outputDepthPass.material.shader.undefine('fragment', 'USE_VSM');
            }
            for (var name in this._textures) {
                var texture = this._textures[name];
                renderer.setViewport(x, y, width * texture.width / texture.height, height);
                this._outputDepthPass.setUniform('depthMap', texture);
                this._outputDepthPass.render(renderer);
                x += width * texture.width / texture.height;
            }
            renderer.setViewport(viewport);
            renderer.restoreClear();
        },

        _bindDepthMaterial: function (casters, bias, slopeScale) {
            for (var i = 0; i < casters.length; i++) {
                var mesh = casters[i];
                var isShadowTransparent = mesh.material.shadowTransparentMap instanceof Texture2D;
                var transparentMap = mesh.material.shadowTransparentMap;
                var nJoints = mesh.joints && mesh.joints.length;
                var matHashKey;
                var shaderHashKey;
                if (isShadowTransparent) {
                    matHashKey = nJoints + '-' + transparentMap.__GUID__;
                    shaderHashKey = nJoints + 's';
                }
                else {
                    matHashKey = nJoints;
                    shaderHashKey = nJoints;
                }
                // Use custom shadow depth material
                var depthMaterial = mesh.shadowDepthMaterial || this._depthMaterials[matHashKey];
                var depthShader = mesh.shadowDepthMaterial ? mesh.shadowDepthMaterial.shader : this._depthShaders[shaderHashKey];

                if (mesh.material !== depthMaterial) {  // Not binded yet
                    if (!depthShader) {
                        depthShader = new Shader({
                            vertex: Shader.source('qtek.sm.depth.vertex'),
                            fragment: Shader.source('qtek.sm.depth.fragment')
                        });
                        if (nJoints > 0) {
                            depthShader.define('vertex', 'SKINNING');
                            depthShader.define('vertex', 'JOINT_COUNT', nJoints);
                        }
                        if (isShadowTransparent) {
                            depthShader.define('both', 'SHADOW_TRANSPARENT');
                        }
                        this._depthShaders[shaderHashKey] = depthShader;
                    }
                    if (!depthMaterial) {
                        // Skinned mesh
                        depthMaterial = new Material({
                            shader: depthShader
                        });
                        this._depthMaterials[matHashKey] = depthMaterial;
                    }

                    mesh.material = depthMaterial;

                    if (this.softShadow === ShadowMapPass.VSM) {
                        depthShader.define('fragment', 'USE_VSM');
                    }
                    else {
                        depthShader.undefine('fragment', 'USE_VSM');
                    }

                    depthMaterial.setUniform('bias', bias);
                    depthMaterial.setUniform('slopeScale', slopeScale);
                    if (isShadowTransparent) {
                        depthMaterial.set('shadowTransparentMap', transparentMap);
                    }
                }
            }
        },

        _bindDistanceMaterial: function (casters, light) {
            var lightPosition = light.getWorldPosition()._array;
            for (var i = 0; i < casters.length; i++) {
                var mesh = casters[i];
                var nJoints = mesh.joints && mesh.joints.length;
                var distanceMaterial = this._distanceMaterials[nJoints];
                if (mesh.material !== distanceMaterial) {
                    if (!distanceMaterial) {
                        // Skinned mesh
                        distanceMaterial = new Material({
                            shader: new Shader({
                                vertex: Shader.source('qtek.sm.distance.vertex'),
                                fragment: Shader.source('qtek.sm.distance.fragment')
                            })
                        });
                        if (nJoints > 0) {
                            distanceMaterial.shader.define('vertex', 'SKINNING');
                            distanceMaterial.shader.define('vertex', 'JOINT_COUNT', nJoints);
                        }
                        this._distanceMaterials[nJoints] = distanceMaterial;
                    }
                    mesh.material = distanceMaterial;

                    if (this.softShadow === ShadowMapPass.VSM) {
                        distanceMaterial.shader.define('fragment', 'USE_VSM');
                    }
                    else {
                        distanceMaterial.shader.undefine('fragment', 'USE_VSM');
                    }
                }

                distanceMaterial.set('lightPosition', lightPosition);
                distanceMaterial.set('range', light.range);
            }
        },

        saveMaterial: function (casters) {
            for (var i = 0; i < casters.length; i++) {
                var mesh = casters[i];
                this._meshMaterials[mesh.__GUID__] = mesh.material;
            }
        },

        restoreMaterial: function (casters) {
            for (var i = 0; i < casters.length; i++) {
                var mesh = casters[i];
                var material = this._meshMaterials[mesh.__GUID__];
                // In case restoreMaterial when no shadowMap is rendered
                if (material) {
                    mesh.material = material;
                }
            }
        },

        _updateCasterAndReceiver: function (mesh) {
            if (mesh.castShadow) {
                this._opaqueCasters.push(mesh);
            }
            if (mesh.receiveShadow) {
                this._receivers.push(mesh);
                mesh.material.set('shadowEnabled', 1);

                mesh.material.set('pcfKernel', this.kernelPCF);
            }
            else {
                mesh.material.set('shadowEnabled', 0);
            }

            var shader = mesh.material.shader;
            if (this.softShadow === ShadowMapPass.VSM) {
                shader.define('fragment', 'USE_VSM');
                shader.undefine('fragment', 'PCF_KERNEL_SIZE');
            }
            else {
                shader.undefine('fragment', 'USE_VSM');
                var kernelPCF = this.kernelPCF;
                if (kernelPCF && kernelPCF.length) {
                    shader.define('fragment', 'PCF_KERNEL_SIZE', kernelPCF.length / 2);
                }
                else {
                    shader.undefine('fragment', 'PCF_KERNEL_SIZE');
                }
            }
        },

        _update: function (scene) {
            for (var i = 0; i < scene.opaqueQueue.length; i++) {
                this._updateCasterAndReceiver(scene.opaqueQueue[i]);
            }
            for (var i = 0; i < scene.transparentQueue.length; i++) {
                // TODO Transparent object receive shadow will be very slow
                // in stealth demo, still not find the reason
                this._updateCasterAndReceiver(scene.transparentQueue[i]);
            }
            for (var i = 0; i < scene.lights.length; i++) {
                var light = scene.lights[i];
                if (light.castShadow) {
                    this._lightsCastShadow.push(light);
                }
            }
        },

        _renderShadowPass: function (renderer, scene, sceneCamera, notUpdateScene) {
            // reset
            for (var name in this._shadowMapNumber) {
                this._shadowMapNumber[name] = 0;
            }
            this._lightsCastShadow.length = 0;
            this._opaqueCasters.length = 0;
            this._receivers.length = 0;

            var _gl = renderer.gl;

            if (!notUpdateScene) {
                scene.update();
            }

            this._update(scene);

            if (!this._lightsCastShadow.length) {
                return;
            }

            _gl.enable(_gl.DEPTH_TEST);
            _gl.depthMask(true);
            _gl.disable(_gl.BLEND);

            // Clear with high-z, so the part not rendered will not been shadowed
            // TODO
            // TODO restore
            _gl.clearColor(1.0, 1.0, 1.0, 1.0);

            // Shadow uniforms
            var spotLightShadowMaps = [];
            var spotLightMatrices = [];
            var directionalLightShadowMaps = [];
            var directionalLightMatrices = [];
            var shadowCascadeClips = [];
            var pointLightShadowMaps = [];

            this.saveMaterial(this._opaqueCasters);

            var dirLightHasCascade;
            // Create textures for shadow map
            for (var i = 0; i < this._lightsCastShadow.length; i++) {
                var light = this._lightsCastShadow[i];
                if (light instanceof DirectionalLight) {

                    if (dirLightHasCascade) {
                        console.warn('Only one dire light supported with shadow cascade');
                        continue;
                    }
                    if (light.shadowCascade > 1) {
                        dirLightHasCascade = light;

                        if (light.shadowCascade > 4) {
                            console.warn('Support at most 4 cascade');
                            continue;
                        }
                    }

                    this.renderDirectionalLightShadow(
                        renderer,
                        scene,
                        sceneCamera,
                        light,
                        this._opaqueCasters,
                        shadowCascadeClips,
                        directionalLightMatrices,
                        directionalLightShadowMaps
                    );
                }
                else if (light instanceof SpotLight) {
                    this.renderSpotLightShadow(
                        renderer,
                        light,
                        this._opaqueCasters,
                        spotLightMatrices,
                        spotLightShadowMaps
                    );
                }
                else if (light instanceof PointLight) {
                    this.renderPointLightShadow(
                        renderer,
                        light,
                        this._opaqueCasters,
                        pointLightShadowMaps
                    );
                }

                this._shadowMapNumber[light.type]++;
            }
            this.restoreMaterial(this._opaqueCasters);

            var shadowCascadeClipsNear = shadowCascadeClips.slice();
            var shadowCascadeClipsFar = shadowCascadeClips.slice();
            shadowCascadeClipsNear.pop();
            shadowCascadeClipsFar.shift();

            // Iterate from far to near
            shadowCascadeClipsNear.reverse();
            shadowCascadeClipsFar.reverse();
            // directionalLightShadowMaps.reverse();
            directionalLightMatrices.reverse();

            function getSize(texture) {
                return texture.height;
            }
            var spotLightShadowMapSizes = spotLightShadowMaps.map(getSize);
            var directionalLightShadowMapSizes = directionalLightShadowMaps.map(getSize);

            var shadowDefineUpdatedShader = {};

            for (var i = 0; i < this._receivers.length; i++) {
                var mesh = this._receivers[i];
                var material = mesh.material;

                var shader = material.shader;

                if (!shadowDefineUpdatedShader[shader.__GUID__]) {
                    var shaderNeedsUpdate = false;
                    for (var lightType in this._shadowMapNumber) {
                        var number = this._shadowMapNumber[lightType];
                        var key = lightType + '_SHADOWMAP_COUNT';

                        if (shader.fragmentDefines[key] !== number && number > 0) {
                            shader.fragmentDefines[key] = number;
                            shaderNeedsUpdate = true;
                        }
                    }
                    if (shaderNeedsUpdate) {
                        shader.dirty();
                    }
                    if (dirLightHasCascade) {
                        shader.define('fragment', 'SHADOW_CASCADE', dirLightHasCascade.shadowCascade);
                    }
                    else {
                        shader.undefine('fragment', 'SHADOW_CASCADE');
                    }
                    shadowDefineUpdatedShader[shader.__GUID__] = true;
                }

                if (spotLightShadowMaps.length > 0) {
                    material.setUniform('spotLightShadowMaps', spotLightShadowMaps);
                    material.setUniform('spotLightMatrices', spotLightMatrices);
                    material.setUniform('spotLightShadowMapSizes', spotLightShadowMapSizes);
                }
                if (directionalLightShadowMaps.length > 0) {
                    material.setUniform('directionalLightShadowMaps', directionalLightShadowMaps);
                    if (dirLightHasCascade) {
                        material.setUniform('shadowCascadeClipsNear', shadowCascadeClipsNear);
                        material.setUniform('shadowCascadeClipsFar', shadowCascadeClipsFar);
                    }
                    material.setUniform('directionalLightMatrices', directionalLightMatrices);
                    material.setUniform('directionalLightShadowMapSizes', directionalLightShadowMapSizes);
                }
                if (pointLightShadowMaps.length > 0) {
                    material.setUniform('pointLightShadowMaps', pointLightShadowMaps);
                }
            }
        },

        renderDirectionalLightShadow: (function () {

            var splitFrustum = new Frustum();
            var splitProjMatrix = new Matrix4();
            var cropBBox = new BoundingBox();
            var cropMatrix = new Matrix4();
            var lightViewMatrix = new Matrix4();
            var lightViewProjMatrix = new Matrix4();
            var lightProjMatrix = new Matrix4();

            return function (renderer, scene, sceneCamera, light, casters, shadowCascadeClips, directionalLightMatrices, directionalLightShadowMaps) {

                var shadowBias = light.shadowBias;
                this._bindDepthMaterial(casters, shadowBias, light.shadowSlopeScale);

                casters.sort(Renderer.opaqueSortFunc);

                // Considering moving speed since the bounding box is from last frame
                // TODO: add a bias
                var clippedFar = Math.min(-scene.viewBoundingBoxLastFrame.min.z, sceneCamera.far);
                var clippedNear = Math.max(-scene.viewBoundingBoxLastFrame.max.z, sceneCamera.near);

                var lightCamera = this._getDirectionalLightCamera(light, scene, sceneCamera);

                var lvpMat4Arr = lightViewProjMatrix._array;
                lightProjMatrix.copy(lightCamera.projectionMatrix);
                mat4.invert(lightViewMatrix._array, lightCamera.worldTransform._array);
                mat4.multiply(lightViewMatrix._array, lightViewMatrix._array, sceneCamera.worldTransform._array);
                mat4.multiply(lvpMat4Arr, lightProjMatrix._array, lightViewMatrix._array);

                var clipPlanes = [];
                var isPerspective = sceneCamera instanceof PerspectiveCamera;

                var scaleZ = (sceneCamera.near + sceneCamera.far) / (sceneCamera.near - sceneCamera.far);
                var offsetZ = 2 * sceneCamera.near * sceneCamera.far / (sceneCamera.near - sceneCamera.far);
                for (var i = 0; i <= light.shadowCascade; i++) {
                    var clog = clippedNear * Math.pow(clippedFar / clippedNear, i / light.shadowCascade);
                    var cuni = clippedNear + (clippedFar - clippedNear) * i / light.shadowCascade;
                    var c = clog * light.cascadeSplitLogFactor + cuni * (1 - light.cascadeSplitLogFactor);
                    clipPlanes.push(c);
                    shadowCascadeClips.push(-(-c * scaleZ + offsetZ) / -c);
                }
                var texture = this._getTexture(light, light.shadowCascade);
                directionalLightShadowMaps.push(texture);

                var viewport = renderer.viewport;

                var _gl = renderer.gl;
                this._frameBuffer.attach(texture);
                this._frameBuffer.bind(renderer);
                _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);

                for (var i = 0; i < light.shadowCascade; i++) {
                    // Get the splitted frustum
                    var nearPlane = clipPlanes[i];
                    var farPlane = clipPlanes[i+1];
                    if (isPerspective) {
                        mat4.perspective(splitProjMatrix._array, sceneCamera.fov / 180 * Math.PI, sceneCamera.aspect, nearPlane, farPlane);
                    }
                    else {
                        mat4.ortho(
                            splitProjMatrix._array,
                            sceneCamera.left, sceneCamera.right, sceneCamera.bottom, sceneCamera.top,
                            nearPlane, farPlane
                        );
                    }
                    splitFrustum.setFromProjection(splitProjMatrix);
                    splitFrustum.getTransformedBoundingBox(cropBBox, lightViewMatrix);
                    cropBBox.applyProjection(lightProjMatrix);
                    var _min = cropBBox.min._array;
                    var _max = cropBBox.max._array;
                    cropMatrix.ortho(_min[0], _max[0], _min[1], _max[1], 1, -1);
                    lightCamera.projectionMatrix.multiplyLeft(cropMatrix);

                    var shadowSize = light.shadowResolution || 512;

                    // Reversed, left to right => far to near
                    renderer.setViewport((light.shadowCascade - i - 1) * shadowSize, 0, shadowSize, shadowSize, 1);

                    // Set bias seperately for each cascade
                    // TODO Simply divide 1.5 ?
                    for (var key in this._depthMaterials) {
                        this._depthMaterials[key].set('shadowBias', shadowBias);
                    }

                    renderer.renderQueue(casters, lightCamera);

                    // Filter for VSM
                    if (this.softShadow === ShadowMapPass.VSM) {
                        this._gaussianFilter(renderer, texture, texture.width);
                    }

                    var matrix = new Matrix4();
                    matrix.copy(lightCamera.worldTransform)
                        .invert()
                        .multiplyLeft(lightCamera.projectionMatrix);

                    directionalLightMatrices.push(matrix._array);

                    lightCamera.projectionMatrix.copy(lightProjMatrix);
                }

                this._frameBuffer.unbind(renderer);

                renderer.setViewport(viewport);
            };
        })(),

        renderSpotLightShadow: function (renderer, light, casters, spotLightMatrices, spotLightShadowMaps) {

            this._bindDepthMaterial(casters, light.shadowBias, light.shadowSlopeScale);
            casters.sort(Renderer.opaqueSortFunc);

            var texture = this._getTexture(light);
            var camera = this._getSpotLightCamera(light);
            var _gl = renderer.gl;

            this._frameBuffer.attach(texture);
            this._frameBuffer.bind(renderer);

            _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);

            renderer.renderQueue(casters, camera);

            this._frameBuffer.unbind(renderer);

            // Filter for VSM
            if (this.softShadow === ShadowMapPass.VSM) {
                this._gaussianFilter(renderer, texture, texture.width);
            }

            var matrix = new Matrix4();
            matrix.copy(camera.worldTransform)
                .invert()
                .multiplyLeft(camera.projectionMatrix);

            spotLightShadowMaps.push(texture);
            spotLightMatrices.push(matrix._array);
        },

        renderPointLightShadow: function (renderer, light, casters, pointLightShadowMaps) {
            var texture = this._getTexture(light);
            var _gl = renderer.gl;
            pointLightShadowMaps.push(texture);

            this._bindDistanceMaterial(casters, light);
            for (var i = 0; i < 6; i++) {
                var target = targets[i];
                var camera = this._getPointLightCamera(light, target);

                this._frameBuffer.attach(texture, _gl.COLOR_ATTACHMENT0, _gl.TEXTURE_CUBE_MAP_POSITIVE_X + i);
                this._frameBuffer.bind(renderer);
                _gl.clear(_gl.COLOR_BUFFER_BIT | _gl.DEPTH_BUFFER_BIT);

                renderer.renderQueue(casters, camera);
            }
                this._frameBuffer.unbind(renderer);
        },

        _gaussianFilter: function (renderer, texture, size) {
            var parameter = {
                width: size,
                height: size,
                type: Texture.FLOAT
            };
            var _gl = renderer.gl;
            var tmpTexture = this._texturePool.get(parameter);

            this._frameBuffer.attach(tmpTexture);
            this._frameBuffer.bind(renderer);
            this._gaussianPassH.setUniform('texture', texture);
            this._gaussianPassH.setUniform('textureWidth', size);
            this._gaussianPassH.render(renderer);

            this._frameBuffer.attach(texture);
            this._gaussianPassV.setUniform('texture', tmpTexture);
            this._gaussianPassV.setUniform('textureHeight', size);
            this._gaussianPassV.render(renderer);
            this._frameBuffer.unbind(renderer);

            this._texturePool.put(tmpTexture);
        },

        _getTexture: function (light, cascade) {
            var key = light.__GUID__;
            var texture = this._textures[key];
            var resolution = light.shadowResolution || 512;
            cascade = cascade || 1;
            if (!texture) {
                if (light instanceof PointLight) {
                    texture = new TextureCube();
                }
                else {
                    texture = new Texture2D();
                }
                // At most 4 cascade
                // TODO share with height ?
                texture.width = resolution * cascade;
                texture.height = resolution;
                if (this.softShadow === ShadowMapPass.VSM) {
                    texture.type = Texture.FLOAT;
                    texture.anisotropic = 4;
                }
                else {
                    texture.minFilter = glenum.NEAREST;
                    texture.magFilter = glenum.NEAREST;
                    texture.useMipmap = false;
                }
                this._textures[key] = texture;
            }

            return texture;
        },

        _getPointLightCamera: function (light, target) {
            if (!this._lightCameras.point) {
                this._lightCameras.point = {
                    px: new PerspectiveCamera(),
                    nx: new PerspectiveCamera(),
                    py: new PerspectiveCamera(),
                    ny: new PerspectiveCamera(),
                    pz: new PerspectiveCamera(),
                    nz: new PerspectiveCamera()
                };
            }
            var camera = this._lightCameras.point[target];

            camera.far = light.range;
            camera.fov = 90;
            camera.position.set(0, 0, 0);
            switch (target) {
                case 'px':
                    camera.lookAt(Vector3.POSITIVE_X, Vector3.NEGATIVE_Y);
                    break;
                case 'nx':
                    camera.lookAt(Vector3.NEGATIVE_X, Vector3.NEGATIVE_Y);
                    break;
                case 'py':
                    camera.lookAt(Vector3.POSITIVE_Y, Vector3.POSITIVE_Z);
                    break;
                case 'ny':
                    camera.lookAt(Vector3.NEGATIVE_Y, Vector3.NEGATIVE_Z);
                    break;
                case 'pz':
                    camera.lookAt(Vector3.POSITIVE_Z, Vector3.NEGATIVE_Y);
                    break;
                case 'nz':
                    camera.lookAt(Vector3.NEGATIVE_Z, Vector3.NEGATIVE_Y);
                    break;
            }
            light.getWorldPosition(camera.position);
            camera.update();

            return camera;
        },

        _getDirectionalLightCamera: (function () {
            var lightViewMatrix = new Matrix4();
            var sceneViewBoundingBox = new BoundingBox();
            var lightViewBBox = new BoundingBox();
            // Camera of directional light will be adjusted
            // to contain the view frustum and scene bounding box as tightly as possible
            return function (light, scene, sceneCamera) {
                if (!this._lightCameras.directional) {
                    this._lightCameras.directional = new OrthoCamera();
                }
                var camera = this._lightCameras.directional;

                sceneViewBoundingBox.copy(scene.viewBoundingBoxLastFrame);
                sceneViewBoundingBox.intersection(sceneCamera.frustum.boundingBox);
                // Move to the center of frustum(in world space)
                camera.position
                    .copy(sceneViewBoundingBox.min)
                    .add(sceneViewBoundingBox.max)
                    .scale(0.5)
                    .transformMat4(sceneCamera.worldTransform);
                camera.rotation.copy(light.rotation);
                camera.scale.copy(light.scale);
                camera.updateWorldTransform();

                // Transform to light view space
                lightViewMatrix
                    .copy(camera.worldTransform)
                    .invert()
                    .multiply(sceneCamera.worldTransform);

                // FIXME boundingBox becomes much larger after transformd.
                lightViewBBox.copy(sceneViewBoundingBox).applyTransform(lightViewMatrix);
                var min = lightViewBBox.min._array;
                var max = lightViewBBox.max._array;

                // Move camera to adjust the near to 0
                // TODO: some scene object cast shadow in view will also be culled
                // add a bias?
                camera.position.scaleAndAdd(camera.worldTransform.z, max[2] + this.lightFrustumBias);
                camera.near = 0;
                camera.far = -min[2] + max[2] + this.lightFrustumBias;
                camera.left = min[0] - this.lightFrustumBias;
                camera.right = max[0] + this.lightFrustumBias;
                camera.top = max[1] + this.lightFrustumBias;
                camera.bottom = min[1] - this.lightFrustumBias;
                camera.update(true);

                return camera;
            };
        })(),

        _getSpotLightCamera: function (light) {
            if (!this._lightCameras.spot) {
                this._lightCameras.spot = new PerspectiveCamera();
            }
            var camera = this._lightCameras.spot;
            // Update properties
            camera.fov = light.penumbraAngle * 2;
            camera.far = light.range;
            camera.worldTransform.copy(light.worldTransform);
            camera.updateProjectionMatrix();
            mat4.invert(camera.viewMatrix._array, camera.worldTransform._array);

            return camera;
        },

        /**
         * @param  {qtek.Renderer|WebGLRenderingContext} [renderer]
         * @memberOf qtek.prePass.ShadowMap.prototype
         */
        // PENDING Renderer or WebGLRenderingContext
        dispose: function (renderer) {
            var _gl = renderer.gl || renderer;

            for (var guid in this._depthMaterials) {
                var mat = this._depthMaterials[guid];
                mat.dispose(_gl);
            }
            for (var guid in this._distanceMaterials) {
                var mat = this._distanceMaterials[guid];
                mat.dispose(_gl);
            }

            if (this._frameBuffer) {
                this._frameBuffer.dispose(_gl);
            }

            for (var name in this._textures) {
                this._textures[name].dispose(_gl);
            }

            this._texturePool.clear(renderer.gl);

            this._depthMaterials = {};
            this._distanceMaterials = {};
            this._textures = {};
            this._lightCameras = {};
            this._shadowMapNumber = {
                'POINT_LIGHT': 0,
                'DIRECTIONAL_LIGHT': 0,
                'SPOT_LIGHT': 0
            };
            this._meshMaterials = {};

            for (var i = 0; i < this._receivers.length; i++) {
                var mesh = this._receivers[i];
                // Mesh may be disposed
                if (mesh.material && mesh.material.shader) {
                    var material = mesh.material;
                    var shader = material.shader;
                    shader.undefine('fragment', 'POINT_LIGHT_SHADOW_COUNT');
                    shader.undefine('fragment', 'DIRECTIONAL_LIGHT_SHADOW_COUNT');
                    shader.undefine('fragment', 'AMBIENT_LIGHT_SHADOW_COUNT');
                    material.set('shadowEnabled', 0);
                }
            }

            this._opaqueCasters = [];
            this._receivers = [];
            this._lightsCastShadow = [];
        }
    });

    /**
     * @name qtek.prePass.ShadowMap.VSM
     * @type {number}
     */
    ShadowMapPass.VSM = 1;

    /**
     * @name qtek.prePass.ShadowMap.PCF
     * @type {number}
     */
    ShadowMapPass.PCF = 2;

    module.exports = ShadowMapPass;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {



    var library = __webpack_require__(18);
    var Shader = __webpack_require__(5);


    Shader['import'](__webpack_require__(90));

    // Some build in shaders
    Shader['import'](__webpack_require__(68));
    Shader['import'](__webpack_require__(87));
    Shader['import'](__webpack_require__(38));
    Shader['import'](__webpack_require__(91));
    Shader['import'](__webpack_require__(89));
    Shader['import'](__webpack_require__(37));

    library.template('qtek.basic', Shader.source('qtek.basic.vertex'), Shader.source('qtek.basic.fragment'));
    library.template('qtek.lambert', Shader.source('qtek.lambert.vertex'), Shader.source('qtek.lambert.fragment'));
    library.template('qtek.wireframe', Shader.source('qtek.wireframe.vertex'), Shader.source('qtek.wireframe.fragment'));
    library.template('qtek.skybox', Shader.source('qtek.skybox.vertex'), Shader.source('qtek.skybox.fragment'));
    library.template('qtek.prez', Shader.source('qtek.prez.vertex'), Shader.source('qtek.prez.fragment'));
    library.template('qtek.standard', Shader.source('qtek.standard.vertex'), Shader.source('qtek.standard.fragment'));

    // Some build in shaders
    Shader['import'](__webpack_require__(72));
    Shader['import'](__webpack_require__(70));
    Shader['import'](__webpack_require__(79));
    Shader['import'](__webpack_require__(80));
    Shader['import'](__webpack_require__(84));
    Shader['import'](__webpack_require__(81));
    Shader['import'](__webpack_require__(71));
    Shader['import'](__webpack_require__(74));
    Shader['import'](__webpack_require__(82));
    Shader['import'](__webpack_require__(77));
    Shader['import'](__webpack_require__(73));
    Shader['import'](__webpack_require__(78));
    Shader['import'](__webpack_require__(69));

    Shader['import'](__webpack_require__(75));
    Shader['import'](__webpack_require__(76));



/***/ }),
/* 68 */
/***/ (function(module, exports) {


module.exports = "@export qtek.basic.vertex\n\nuniform mat4 worldViewProjection : WORLDVIEWPROJECTION;\n\nuniform vec2 uvRepeat : [1.0, 1.0];\nuniform vec2 uvOffset : [0.0, 0.0];\n\nattribute vec2 texcoord : TEXCOORD_0;\nattribute vec3 position : POSITION;\n\nattribute vec3 barycentric;\n\n#ifdef SKINNING\nattribute vec3 weight : WEIGHT;\nattribute vec4 joint : JOINT;\n\nuniform mat4 skinMatrix[JOINT_COUNT] : SKIN_MATRIX;\n#endif\n\nvarying vec2 v_Texcoord;\nvarying vec3 v_Barycentric;\n\nvoid main()\n{\n vec3 skinnedPosition = position;\n\n#ifdef SKINNING\n @import qtek.chunk.skin_matrix\n\n skinnedPosition = (skinMatrixWS * vec4(position, 1.0)).xyz;\n#endif\n\n v_Texcoord = texcoord * uvRepeat + uvOffset;\n v_Barycentric = barycentric;\n\n gl_Position = worldViewProjection * vec4(skinnedPosition, 1.0);\n}\n\n@end\n\n\n\n\n@export qtek.basic.fragment\n\n#define ALPHA_TEST_THRESHOLD 0.5\n\nvarying vec2 v_Texcoord;\nuniform sampler2D diffuseMap;\nuniform vec3 color : [1.0, 1.0, 1.0];\nuniform vec3 emission : [0.0, 0.0, 0.0];\nuniform float alpha : 1.0;\n\nuniform float lineWidth : 0.0;\nuniform vec3 lineColor : [0.0, 0.0, 0.0];\nvarying vec3 v_Barycentric;\n\n@import qtek.util.edge_factor\n\n@import qtek.util.rgbm\n\n@import qtek.util.srgb\n\nvoid main()\n{\n\n#ifdef RENDER_TEXCOORD\n gl_FragColor = vec4(v_Texcoord, 1.0, 1.0);\n return;\n#endif\n\n gl_FragColor = vec4(color, alpha);\n\n#ifdef DIFFUSEMAP_ENABLED\n vec4 tex = decodeHDR(texture2D(diffuseMap, v_Texcoord));\n\n#ifdef SRGB_DECODE\n tex = sRGBToLinear(tex);\n#endif\n\n#if defined(DIFFUSEMAP_ALPHA_ALPHA)\n gl_FragColor.a = tex.a;\n#endif\n\n gl_FragColor.rgb *= tex.rgb;\n#endif\n\n gl_FragColor.rgb += emission;\n if( lineWidth > 0.01)\n {\n gl_FragColor.rgb = gl_FragColor.rgb * mix(lineColor, vec3(1.0), edgeFactor(lineWidth));\n }\n\n#ifdef GAMMA_ENCODE\n gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(1 / 2.2));\n#endif\n\n#ifdef ALPHA_TEST\n if (gl_FragColor.a < ALPHA_TEST_THRESHOLD) {\n discard;\n }\n#endif\n\n gl_FragColor = encodeHDR(gl_FragColor);\n\n}\n\n@end";


/***/ }),
/* 69 */
/***/ (function(module, exports) {


module.exports = "@export qtek.compositor.blend\n#ifdef TEXTURE1_ENABLED\nuniform sampler2D texture1;\nuniform float weight1 : 1.0;\n#endif\n#ifdef TEXTURE2_ENABLED\nuniform sampler2D texture2;\nuniform float weight2 : 1.0;\n#endif\n#ifdef TEXTURE3_ENABLED\nuniform sampler2D texture3;\nuniform float weight3 : 1.0;\n#endif\n#ifdef TEXTURE4_ENABLED\nuniform sampler2D texture4;\nuniform float weight4 : 1.0;\n#endif\n#ifdef TEXTURE5_ENABLED\nuniform sampler2D texture5;\nuniform float weight5 : 1.0;\n#endif\n#ifdef TEXTURE6_ENABLED\nuniform sampler2D texture6;\nuniform float weight6 : 1.0;\n#endif\n\nvarying vec2 v_Texcoord;\n\n@import qtek.util.rgbm\n\nvoid main()\n{\n vec4 tex = vec4(0.0);\n#ifdef TEXTURE1_ENABLED\n tex += decodeHDR(texture2D(texture1, v_Texcoord)) * weight1;\n#endif\n#ifdef TEXTURE2_ENABLED\n tex += decodeHDR(texture2D(texture2, v_Texcoord)) * weight2;\n#endif\n#ifdef TEXTURE3_ENABLED\n tex += decodeHDR(texture2D(texture3, v_Texcoord)) * weight3;\n#endif\n#ifdef TEXTURE4_ENABLED\n tex += decodeHDR(texture2D(texture4, v_Texcoord)) * weight4;\n#endif\n#ifdef TEXTURE5_ENABLED\n tex += decodeHDR(texture2D(texture5, v_Texcoord)) * weight5;\n#endif\n#ifdef TEXTURE6_ENABLED\n tex += decodeHDR(texture2D(texture6, v_Texcoord)) * weight6;\n#endif\n\n gl_FragColor = encodeHDR(tex);\n}\n@end";


/***/ }),
/* 70 */
/***/ (function(module, exports) {


module.exports = "@export qtek.compositor.kernel.gaussian_9\nfloat gaussianKernel[9];\ngaussianKernel[0] = 0.07;\ngaussianKernel[1] = 0.09;\ngaussianKernel[2] = 0.12;\ngaussianKernel[3] = 0.14;\ngaussianKernel[4] = 0.16;\ngaussianKernel[5] = 0.14;\ngaussianKernel[6] = 0.12;\ngaussianKernel[7] = 0.09;\ngaussianKernel[8] = 0.07;\n@end\n\n@export qtek.compositor.kernel.gaussian_13\n\nfloat gaussianKernel[13];\n\ngaussianKernel[0] = 0.02;\ngaussianKernel[1] = 0.03;\ngaussianKernel[2] = 0.06;\ngaussianKernel[3] = 0.08;\ngaussianKernel[4] = 0.11;\ngaussianKernel[5] = 0.13;\ngaussianKernel[6] = 0.14;\ngaussianKernel[7] = 0.13;\ngaussianKernel[8] = 0.11;\ngaussianKernel[9] = 0.08;\ngaussianKernel[10] = 0.06;\ngaussianKernel[11] = 0.03;\ngaussianKernel[12] = 0.02;\n\n@end\n\n\n@export qtek.compositor.gaussian_blur\n\nuniform sampler2D texture; varying vec2 v_Texcoord;\n\nuniform float blurSize : 2.0;\nuniform vec2 textureSize : [512.0, 512.0];\nuniform float blurDir : 0.0;\n\n@import qtek.util.rgbm\n@import qtek.util.clamp_sample\n\nvoid main (void)\n{\n @import qtek.compositor.kernel.gaussian_9\n\n vec2 off = blurSize / textureSize;\n off *= vec2(1.0 - blurDir, blurDir);\n\n vec4 sum = vec4(0.0);\n float weightAll = 0.0;\n\n for (int i = 0; i < 9; i++) {\n float w = gaussianKernel[i];\n vec4 texel = decodeHDR(clampSample(texture, v_Texcoord + float(i - 4) * off));\n sum += texel * w;\n weightAll += w;\n }\n gl_FragColor = encodeHDR(sum / max(weightAll, 0.01));\n}\n\n@end\n";


/***/ }),
/* 71 */
/***/ (function(module, exports) {


module.exports = "@export qtek.compositor.bright\n\nuniform sampler2D texture;\n\nuniform float threshold : 1;\nuniform float scale : 1.0;\n\nuniform vec2 textureSize: [512, 512];\n\nvarying vec2 v_Texcoord;\n\nconst vec3 lumWeight = vec3(0.2125, 0.7154, 0.0721);\n\n@import qtek.util.rgbm\n\n\nvec4 median(vec4 a, vec4 b, vec4 c)\n{\n return a + b + c - min(min(a, b), c) - max(max(a, b), c);\n}\n\nvoid main()\n{\n vec4 texel = decodeHDR(texture2D(texture, v_Texcoord));\n\n#ifdef ANTI_FLICKER\n vec3 d = 1.0 / textureSize.xyx * vec3(1.0, 1.0, 0.0);\n\n vec4 s1 = decodeHDR(texture2D(texture, v_Texcoord - d.xz));\n vec4 s2 = decodeHDR(texture2D(texture, v_Texcoord + d.xz));\n vec4 s3 = decodeHDR(texture2D(texture, v_Texcoord - d.zy));\n vec4 s4 = decodeHDR(texture2D(texture, v_Texcoord + d.zy));\n texel = median(median(texel, s1, s2), s3, s4);\n\n#endif\n\n float lum = dot(texel.rgb , lumWeight);\n vec4 color;\n if (lum > threshold && texel.a > 0.0)\n {\n color = vec4(texel.rgb * scale, texel.a * scale);\n }\n else\n {\n color = vec4(0.0);\n }\n\n gl_FragColor = encodeHDR(color);\n}\n@end\n";


/***/ }),
/* 72 */
/***/ (function(module, exports) {


module.exports = "@export qtek.compositor.coloradjust\n\nvarying vec2 v_Texcoord;\nuniform sampler2D texture;\n\nuniform float brightness : 0.0;\nuniform float contrast : 1.0;\nuniform float exposure : 0.0;\nuniform float gamma : 1.0;\nuniform float saturation : 1.0;\n\nconst vec3 w = vec3(0.2125, 0.7154, 0.0721);\n\nvoid main()\n{\n vec4 tex = texture2D( texture, v_Texcoord);\n\n vec3 color = clamp(tex.rgb + vec3(brightness), 0.0, 1.0);\n color = clamp( (color-vec3(0.5))*contrast+vec3(0.5), 0.0, 1.0);\n color = clamp( color * pow(2.0, exposure), 0.0, 1.0);\n color = clamp( pow(color, vec3(gamma)), 0.0, 1.0);\n float luminance = dot( color, w );\n color = mix(vec3(luminance), color, saturation);\n\n gl_FragColor = vec4(color, tex.a);\n}\n\n@end\n\n@export qtek.compositor.brightness\nvarying vec2 v_Texcoord;\nuniform sampler2D texture;\n\nuniform float brightness : 0.0;\n\nvoid main()\n{\n vec4 tex = texture2D( texture, v_Texcoord);\n vec3 color = tex.rgb + vec3(brightness);\n gl_FragColor = vec4(color, tex.a);\n}\n@end\n\n@export qtek.compositor.contrast\nvarying vec2 v_Texcoord;\nuniform sampler2D texture;\n\nuniform float contrast : 1.0;\n\nvoid main()\n{\n vec4 tex = texture2D( texture, v_Texcoord);\n vec3 color = (tex.rgb-vec3(0.5))*contrast+vec3(0.5);\n gl_FragColor = vec4(color, tex.a);\n}\n@end\n\n@export qtek.compositor.exposure\nvarying vec2 v_Texcoord;\nuniform sampler2D texture;\n\nuniform float exposure : 0.0;\n\nvoid main()\n{\n vec4 tex = texture2D(texture, v_Texcoord);\n vec3 color = tex.rgb * pow(2.0, exposure);\n gl_FragColor = vec4(color, tex.a);\n}\n@end\n\n@export qtek.compositor.gamma\nvarying vec2 v_Texcoord;\nuniform sampler2D texture;\n\nuniform float gamma : 1.0;\n\nvoid main()\n{\n vec4 tex = texture2D(texture, v_Texcoord);\n vec3 color = pow(tex.rgb, vec3(gamma));\n gl_FragColor = vec4(color, tex.a);\n}\n@end\n\n@export qtek.compositor.saturation\nvarying vec2 v_Texcoord;\nuniform sampler2D texture;\n\nuniform float saturation : 1.0;\n\nconst vec3 w = vec3(0.2125, 0.7154, 0.0721);\n\nvoid main()\n{\n vec4 tex = texture2D(texture, v_Texcoord);\n vec3 color = tex.rgb;\n float luminance = dot(color, w);\n color = mix(vec3(luminance), color, saturation);\n gl_FragColor = vec4(color, tex.a);\n}\n@end";


/***/ }),
/* 73 */
/***/ (function(module, exports) {


module.exports = "@export qtek.compositor.dof.coc\n\nuniform sampler2D depth;\n\nuniform float zNear: 0.1;\nuniform float zFar: 2000;\n\nuniform float focalDist: 3;\nuniform float focalRange: 1;\nuniform float focalLength: 30;\nuniform float fstop: 2.8;\n\nvarying vec2 v_Texcoord;\n\n@import qtek.util.encode_float\n\nvoid main()\n{\n float z = texture2D(depth, v_Texcoord).r * 2.0 - 1.0;\n\n float dist = 2.0 * zNear * zFar / (zFar + zNear - z * (zFar - zNear));\n\n float aperture = focalLength / fstop;\n\n float coc;\n\n float uppper = focalDist + focalRange;\n float lower = focalDist - focalRange;\n if (dist <= uppper && dist >= lower) {\n coc = 0.5;\n }\n else {\n float focalAdjusted = dist > uppper ? uppper : lower;\n\n coc = abs(aperture * (focalLength * (dist - focalAdjusted)) / (dist * (focalAdjusted - focalLength)));\n coc = clamp(coc, 0.0, 0.4) / 0.4000001;\n\n if (dist < lower) {\n coc = -coc;\n }\n coc = coc * 0.5 + 0.5;\n }\n\n gl_FragColor = encodeFloat(coc);\n}\n\n@end\n\n@export qtek.compositor.dof.premultiply\n\nuniform sampler2D texture;\nuniform sampler2D coc;\nvarying vec2 v_Texcoord;\n\n@import qtek.util.rgbm\n\n@import qtek.util.decode_float\n\nvoid main() {\n float fCoc = max(abs(decodeFloat(texture2D(coc, v_Texcoord)) * 2.0 - 1.0), 0.1);\n gl_FragColor = encodeHDR(\n vec4(decodeHDR(texture2D(texture, v_Texcoord)).rgb * fCoc, 1.0)\n );\n}\n@end\n\n\n@export qtek.compositor.dof.min_coc\nuniform sampler2D coc;\nvarying vec2 v_Texcoord;\nuniform vec2 textureSize : [512.0, 512.0];\n\n@import qtek.util.float\n\nvoid main()\n{\n vec4 d = vec4(-1.0, -1.0, 1.0, 1.0) / textureSize.xyxy;\n\n float fCoc = decodeFloat(texture2D(coc, v_Texcoord + d.xy));\n fCoc = min(fCoc, decodeFloat(texture2D(coc, v_Texcoord + d.zy)));\n fCoc = min(fCoc, decodeFloat(texture2D(coc, v_Texcoord + d.xw)));\n fCoc = min(fCoc, decodeFloat(texture2D(coc, v_Texcoord + d.zw)));\n\n gl_FragColor = encodeFloat(fCoc);\n}\n\n@end\n\n\n@export qtek.compositor.dof.max_coc\nuniform sampler2D coc;\nvarying vec2 v_Texcoord;\nuniform vec2 textureSize : [512.0, 512.0];\n\n@import qtek.util.float\n\nvoid main()\n{\n\n vec4 d = vec4(-1.0, -1.0, 1.0, 1.0) / textureSize.xyxy;\n\n float fCoc = decodeFloat(texture2D(coc, v_Texcoord + d.xy));\n fCoc = max(fCoc, decodeFloat(texture2D(coc, v_Texcoord + d.zy)));\n fCoc = max(fCoc, decodeFloat(texture2D(coc, v_Texcoord + d.xw)));\n fCoc = max(fCoc, decodeFloat(texture2D(coc, v_Texcoord + d.zw)));\n\n gl_FragColor = encodeFloat(fCoc);\n}\n\n@end\n\n\n\n\n@export qtek.compositor.dof.coc_upsample\n\n#define HIGH_QUALITY\n\nuniform sampler2D coc;\nuniform vec2 textureSize : [512, 512];\n\nuniform float sampleScale: 0.5;\n\nvarying vec2 v_Texcoord;\n\n@import qtek.util.float\n\nvoid main()\n{\n\n#ifdef HIGH_QUALITY\n vec4 d = vec4(1.0, 1.0, -1.0, 0.0) / textureSize.xyxy * sampleScale;\n\n float s;\n s = decodeFloat(texture2D(coc, v_Texcoord - d.xy));\n s += decodeFloat(texture2D(coc, v_Texcoord - d.wy)) * 2.0;\n s += decodeFloat(texture2D(coc, v_Texcoord - d.zy));\n\n s += decodeFloat(texture2D(coc, v_Texcoord + d.zw)) * 2.0;\n s += decodeFloat(texture2D(coc, v_Texcoord )) * 4.0;\n s += decodeFloat(texture2D(coc, v_Texcoord + d.xw)) * 2.0;\n\n s += decodeFloat(texture2D(coc, v_Texcoord + d.zy));\n s += decodeFloat(texture2D(coc, v_Texcoord + d.wy)) * 2.0;\n s += decodeFloat(texture2D(coc, v_Texcoord + d.xy));\n\n gl_FragColor = encodeFloat(s / 16.0);\n#else\n vec4 d = vec4(-1.0, -1.0, +1.0, +1.0) / textureSize.xyxy;\n\n float s;\n s = decodeFloat(texture2D(coc, v_Texcoord + d.xy));\n s += decodeFloat(texture2D(coc, v_Texcoord + d.zy));\n s += decodeFloat(texture2D(coc, v_Texcoord + d.xw));\n s += decodeFloat(texture2D(coc, v_Texcoord + d.zw));\n\n gl_FragColor = encodeFloat(s / 4.0);\n#endif\n}\n\n@end\n\n\n\n@export qtek.compositor.dof.upsample\n\n#define HIGH_QUALITY\n\nuniform sampler2D coc;\nuniform sampler2D texture;\nuniform vec2 textureSize : [512, 512];\n\nuniform float sampleScale: 0.5;\n\nvarying vec2 v_Texcoord;\n\n\n@import qtek.util.rgbm\n\n@import qtek.util.decode_float\n\nfloat tap(vec2 uv, inout vec4 color, float baseWeight) {\n float weight = abs(decodeFloat(texture2D(coc, uv)) * 2.0 - 1.0) * baseWeight;\n color += decodeHDR(texture2D(texture, uv)) * weight;\n return weight;\n}\n\nvoid main()\n{\n#ifdef HIGH_QUALITY\n vec4 d = vec4(1.0, 1.0, -1.0, 0.0) / textureSize.xyxy * sampleScale;\n\n vec4 color = vec4(0.0);\n float baseWeight = 1.0 / 16.0;\n float w = tap(v_Texcoord - d.xy, color, baseWeight);\n w += tap(v_Texcoord - d.wy, color, baseWeight * 2.0);\n w += tap(v_Texcoord - d.zy, color, baseWeight);\n\n w += tap(v_Texcoord + d.zw, color, baseWeight * 2.0);\n w += tap(v_Texcoord , color, baseWeight * 4.0);\n w += tap(v_Texcoord + d.xw, color, baseWeight * 2.0);\n\n w += tap(v_Texcoord + d.zy, color, baseWeight);\n w += tap(v_Texcoord + d.wy, color, baseWeight * 2.0);\n w += tap(v_Texcoord + d.xy, color, baseWeight);\n\n gl_FragColor = encodeHDR(color / w);\n#else\n vec4 d = vec4(-1.0, -1.0, +1.0, +1.0) / textureSize.xyxy;\n\n vec4 color = vec4(0.0);\n float baseWeight = 1.0 / 4.0;\n float w = tap(v_Texcoord + d.xy, color, baseWeight);\n w += tap(v_Texcoord + d.zy, color, baseWeight);\n w += tap(v_Texcoord + d.xw, color, baseWeight);\n w += tap(v_Texcoord + d.zw, color, baseWeight);\n\n gl_FragColor = encodeHDR(color / w);\n#endif\n}\n\n@end\n\n\n\n@export qtek.compositor.dof.downsample\n\nuniform sampler2D texture;\nuniform sampler2D coc;\nuniform vec2 textureSize : [512, 512];\n\nvarying vec2 v_Texcoord;\n\n@import qtek.util.rgbm\n\n@import qtek.util.decode_float\n\nfloat tap(vec2 uv, inout vec4 color) {\n float weight = abs(decodeFloat(texture2D(coc, uv)) * 2.0 - 1.0) * 0.25;\n color += decodeHDR(texture2D(texture, uv)) * weight;\n return weight;\n}\n\nvoid main()\n{\n vec4 d = vec4(-1.0, -1.0, 1.0, 1.0) / textureSize.xyxy;\n\n vec4 color = vec4(0.0);\n float weight = tap(v_Texcoord + d.xy, color);\n weight += tap(v_Texcoord + d.zy, color);\n weight += tap(v_Texcoord + d.xw, color);\n weight += tap(v_Texcoord + d.zw, color);\n color /= weight;\n\n gl_FragColor = encodeHDR(color);\n}\n\n@end\n\n\n\n@export qtek.compositor.dof.hexagonal_blur_frag\n\n@import qtek.util.float\n\n\nvec4 doBlur(sampler2D targetTexture, vec2 offset) {\n#ifdef BLUR_COC\n float cocSum = 0.0;\n#else\n vec4 color = vec4(0.0);\n#endif\n\n float weightSum = 0.0;\n float kernelWeight = 1.0 / float(KERNEL_SIZE);\n\n for (int i = 0; i < KERNEL_SIZE; i++) {\n vec2 coord = v_Texcoord + offset * float(i);\n\n float w = kernelWeight;\n#ifdef BLUR_COC\n float fCoc = decodeFloat(texture2D(targetTexture, coord)) * 2.0 - 1.0;\n cocSum += clamp(fCoc, -1.0, 0.0) * w;\n#else\n float fCoc = decodeFloat(texture2D(coc, coord)) * 2.0 - 1.0;\n vec4 texel = texture2D(targetTexture, coord);\n #if !defined(BLUR_NEARFIELD)\n w *= abs(fCoc);\n #endif\n color += decodeHDR(texel) * w;\n#endif\n\n weightSum += w;\n }\n#ifdef BLUR_COC\n return encodeFloat(clamp(cocSum / weightSum, -1.0, 0.0) * 0.5 + 0.5);\n#else\n return color / weightSum;\n#endif\n}\n\n@end\n\n\n@export qtek.compositor.dof.hexagonal_blur_1\n\n#define KERNEL_SIZE 5\n\nuniform sampler2D texture;\nuniform sampler2D coc;\nvarying vec2 v_Texcoord;\n\nuniform float blurSize : 1.0;\n\nuniform vec2 textureSize : [512.0, 512.0];\n\n@import qtek.util.rgbm\n\n@import qtek.compositor.dof.hexagonal_blur_frag\n\nvoid main()\n{\n vec2 offset = blurSize / textureSize;\n\n#if !defined(BLUR_NEARFIELD) && !defined(BLUR_COC)\n offset *= abs(decodeFloat(texture2D(coc, v_Texcoord)) * 2.0 - 1.0);\n#endif\n\n gl_FragColor = doBlur(texture, vec2(0.0, offset.y));\n#if !defined(BLUR_COC)\n gl_FragColor = encodeHDR(gl_FragColor);\n#endif\n}\n\n@end\n\n@export qtek.compositor.dof.hexagonal_blur_2\n\n#define KERNEL_SIZE 5\n\nuniform sampler2D texture;\nuniform sampler2D coc;\nvarying vec2 v_Texcoord;\n\nuniform float blurSize : 1.0;\n\nuniform vec2 textureSize : [512.0, 512.0];\n\n@import qtek.util.rgbm\n\n@import qtek.compositor.dof.hexagonal_blur_frag\n\nvoid main()\n{\n vec2 offset = blurSize / textureSize;\n#if !defined(BLUR_NEARFIELD) && !defined(BLUR_COC)\n offset *= abs(decodeFloat(texture2D(coc, v_Texcoord)) * 2.0 - 1.0);\n#endif\n\n offset.y /= 2.0;\n\n gl_FragColor = doBlur(texture, -offset);\n#if !defined(BLUR_COC)\n gl_FragColor = encodeHDR(gl_FragColor);\n#endif\n}\n@end\n\n@export qtek.compositor.dof.hexagonal_blur_3\n\n#define KERNEL_SIZE 5\n\nuniform sampler2D texture1;\nuniform sampler2D texture2;\nuniform sampler2D coc;\n\nvarying vec2 v_Texcoord;\n\nuniform float blurSize : 1.0;\n\nuniform vec2 textureSize : [512.0, 512.0];\n\n@import qtek.util.rgbm\n\n@import qtek.compositor.dof.hexagonal_blur_frag\n\nvoid main()\n{\n vec2 offset = blurSize / textureSize;\n\n#if !defined(BLUR_NEARFIELD) && !defined(BLUR_COC)\n offset *= abs(decodeFloat(texture2D(coc, v_Texcoord)) * 2.0 - 1.0);\n#endif\n\n offset.y /= 2.0;\n vec2 vDownRight = vec2(offset.x, -offset.y);\n\n vec4 texel1 = doBlur(texture1, -offset);\n vec4 texel2 = doBlur(texture1, vDownRight);\n vec4 texel3 = doBlur(texture2, vDownRight);\n\n#ifdef BLUR_COC\n float coc1 = decodeFloat(texel1) * 2.0 - 1.0;\n float coc2 = decodeFloat(texel2) * 2.0 - 1.0;\n float coc3 = decodeFloat(texel3) * 2.0 - 1.0;\n gl_FragColor = encodeFloat(\n ((coc1 + coc2 + coc3) / 3.0) * 0.5 + 0.5\n );\n\n#else\n vec4 color = (texel1 + texel2 + texel3) / 3.0;\n gl_FragColor = encodeHDR(color);\n#endif\n}\n\n@end\n\n@export qtek.compositor.dof.composite\n\n#define DEBUG 0\n\nuniform sampler2D original;\nuniform sampler2D blurred;\nuniform sampler2D nearfield;\nuniform sampler2D coc;\nuniform sampler2D nearcoc;\nvarying vec2 v_Texcoord;\n\n@import qtek.util.rgbm\n@import qtek.util.float\n\nvoid main()\n{\n vec4 blurredColor = decodeHDR(texture2D(blurred, v_Texcoord));\n vec4 originalColor = decodeHDR(texture2D(original, v_Texcoord));\n\n float fCoc = decodeFloat(texture2D(coc, v_Texcoord));\n\n fCoc = abs(fCoc * 2.0 - 1.0);\n\n float weight = smoothstep(0.0, 1.0, fCoc);\n \n#ifdef NEARFIELD_ENABLED\n vec4 nearfieldColor = decodeHDR(texture2D(nearfield, v_Texcoord));\n float fNearCoc = decodeFloat(texture2D(nearcoc, v_Texcoord));\n fNearCoc = abs(fNearCoc * 2.0 - 1.0);\n\n gl_FragColor = encodeHDR(\n mix(\n nearfieldColor, mix(originalColor, blurredColor, weight),\n pow(1.0 - fNearCoc, 4.0)\n )\n );\n#else\n gl_FragColor = encodeHDR(mix(originalColor, blurredColor, weight));\n#endif\n\n#if DEBUG == 1\n gl_FragColor = vec4(vec3(fCoc), 1.0);\n#elif DEBUG == 2\n gl_FragColor = vec4(vec3(fNearCoc), 1.0);\n#elif DEBUG == 3\n gl_FragColor = encodeHDR(blurredColor);\n#elif DEBUG == 4\n gl_FragColor = encodeHDR(nearfieldColor);\n#endif\n}\n\n@end";


/***/ }),
/* 74 */
/***/ (function(module, exports) {


module.exports = "@export qtek.compositor.downsample\n\nuniform sampler2D texture;\nuniform vec2 textureSize : [512, 512];\n\nvarying vec2 v_Texcoord;\n\n@import qtek.util.rgbm\nfloat brightness(vec3 c)\n{\n return max(max(c.r, c.g), c.b);\n}\n\n@import qtek.util.clamp_sample\n\nvoid main()\n{\n vec4 d = vec4(-1.0, -1.0, 1.0, 1.0) / textureSize.xyxy;\n\n#ifdef ANTI_FLICKER\n vec3 s1 = decodeHDR(clampSample(texture, v_Texcoord + d.xy)).rgb;\n vec3 s2 = decodeHDR(clampSample(texture, v_Texcoord + d.zy)).rgb;\n vec3 s3 = decodeHDR(clampSample(texture, v_Texcoord + d.xw)).rgb;\n vec3 s4 = decodeHDR(clampSample(texture, v_Texcoord + d.zw)).rgb;\n\n float s1w = 1.0 / (brightness(s1) + 1.0);\n float s2w = 1.0 / (brightness(s2) + 1.0);\n float s3w = 1.0 / (brightness(s3) + 1.0);\n float s4w = 1.0 / (brightness(s4) + 1.0);\n float oneDivideSum = 1.0 / (s1w + s2w + s3w + s4w);\n\n vec4 color = vec4(\n (s1 * s1w + s2 * s2w + s3 * s3w + s4 * s4w) * oneDivideSum,\n 1.0\n );\n#else\n vec4 color = decodeHDR(clampSample(texture, v_Texcoord + d.xy));\n color += decodeHDR(clampSample(texture, v_Texcoord + d.zy));\n color += decodeHDR(clampSample(texture, v_Texcoord + d.xw));\n color += decodeHDR(clampSample(texture, v_Texcoord + d.zw));\n color *= 0.25;\n#endif\n\n gl_FragColor = encodeHDR(color);\n}\n\n@end";


/***/ }),
/* 75 */
/***/ (function(module, exports) {


module.exports = "@export qtek.compositor.fxaa\n\nuniform sampler2D texture;\nuniform vec4 viewport : VIEWPORT;\n\nvarying vec2 v_Texcoord;\n\n#define FXAA_REDUCE_MIN (1.0/128.0)\n#define FXAA_REDUCE_MUL (1.0/8.0)\n#define FXAA_SPAN_MAX 8.0\n\n@import qtek.util.rgbm\n\nvoid main()\n{\n vec2 resolution = 1.0 / viewport.zw;\n vec3 rgbNW = decodeHDR( texture2D( texture, ( gl_FragCoord.xy + vec2( -1.0, -1.0 ) ) * resolution ) ).xyz;\n vec3 rgbNE = decodeHDR( texture2D( texture, ( gl_FragCoord.xy + vec2( 1.0, -1.0 ) ) * resolution ) ).xyz;\n vec3 rgbSW = decodeHDR( texture2D( texture, ( gl_FragCoord.xy + vec2( -1.0, 1.0 ) ) * resolution ) ).xyz;\n vec3 rgbSE = decodeHDR( texture2D( texture, ( gl_FragCoord.xy + vec2( 1.0, 1.0 ) ) * resolution ) ).xyz;\n vec4 rgbaM = decodeHDR( texture2D( texture, gl_FragCoord.xy * resolution ) );\n vec3 rgbM = rgbaM.xyz;\n float opacity = rgbaM.w;\n\n vec3 luma = vec3( 0.299, 0.587, 0.114 );\n\n float lumaNW = dot( rgbNW, luma );\n float lumaNE = dot( rgbNE, luma );\n float lumaSW = dot( rgbSW, luma );\n float lumaSE = dot( rgbSE, luma );\n float lumaM = dot( rgbM, luma );\n float lumaMin = min( lumaM, min( min( lumaNW, lumaNE ), min( lumaSW, lumaSE ) ) );\n float lumaMax = max( lumaM, max( max( lumaNW, lumaNE) , max( lumaSW, lumaSE ) ) );\n\n vec2 dir;\n dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));\n dir.y = ((lumaNW + lumaSW) - (lumaNE + lumaSE));\n\n float dirReduce = max( ( lumaNW + lumaNE + lumaSW + lumaSE ) * ( 0.25 * FXAA_REDUCE_MUL ), FXAA_REDUCE_MIN );\n\n float rcpDirMin = 1.0 / ( min( abs( dir.x ), abs( dir.y ) ) + dirReduce );\n dir = min( vec2( FXAA_SPAN_MAX, FXAA_SPAN_MAX),\n max( vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),\n dir * rcpDirMin)) * resolution;\n\n vec3 rgbA = decodeHDR( texture2D( texture, gl_FragCoord.xy * resolution + dir * ( 1.0 / 3.0 - 0.5 ) ) ).xyz;\n rgbA += decodeHDR( texture2D( texture, gl_FragCoord.xy * resolution + dir * ( 2.0 / 3.0 - 0.5 ) ) ).xyz;\n rgbA *= 0.5;\n\n vec3 rgbB = decodeHDR( texture2D( texture, gl_FragCoord.xy * resolution + dir * -0.5 ) ).xyz;\n rgbB += decodeHDR( texture2D( texture, gl_FragCoord.xy * resolution + dir * 0.5 ) ).xyz;\n rgbB *= 0.25;\n rgbB += rgbA * 0.5;\n\n float lumaB = dot( rgbB, luma );\n\n if ( ( lumaB < lumaMin ) || ( lumaB > lumaMax ) )\n {\n gl_FragColor = vec4( rgbA, opacity );\n\n }\n else {\n\n gl_FragColor = vec4( rgbB, opacity );\n\n }\n}\n\n@end";


/***/ }),
/* 76 */
/***/ (function(module, exports) {


module.exports = "@export qtek.compositor.fxaa3\n\nuniform sampler2D texture;\nuniform vec4 viewport : VIEWPORT;\n\nuniform float subpixel: 0.75;\nuniform float edgeThreshold: 0.125;\nuniform float edgeThresholdMin: 0.0625;\n\n\nvarying vec2 v_Texcoord;\n\n@import qtek.util.rgbm\n\nfloat FxaaLuma(vec4 rgba) { return rgba.y; }\nvec4 FxaaPixelShader(\n vec2 pos\n ,sampler2D tex\n ,vec2 fxaaQualityRcpFrame\n ,float fxaaQualitySubpix\n ,float fxaaQualityEdgeThreshold\n ,float fxaaQualityEdgeThresholdMin\n) {\n vec2 posM;\n posM.x = pos.x;\n posM.y = pos.y;\n vec4 rgbyM = decodeHDR(texture2D(texture, posM, 0.0));\n float lumaS = FxaaLuma(decodeHDR(texture2D(texture, posM + (vec2( 0.0, 1.0) * fxaaQualityRcpFrame.xy), 0.0)));\n float lumaE = FxaaLuma(decodeHDR(texture2D(texture, posM + (vec2( 1.0, 0.0) * fxaaQualityRcpFrame.xy), 0.0)));\n float lumaN = FxaaLuma(decodeHDR(texture2D(texture, posM + (vec2( 0.0,-1.0) * fxaaQualityRcpFrame.xy), 0.0)));\n float lumaW = FxaaLuma(decodeHDR(texture2D(texture, posM + (vec2(-1.0, 0.0) * fxaaQualityRcpFrame.xy), 0.0)));\n\n float maxSM = max(lumaS, rgbyM.y);\n float minSM = min(lumaS, rgbyM.y);\n float maxESM = max(lumaE, maxSM);\n float minESM = min(lumaE, minSM);\n float maxWN = max(lumaN, lumaW);\n float minWN = min(lumaN, lumaW);\n float rangeMax = max(maxWN, maxESM);\n float rangeMin = min(minWN, minESM);\n float rangeMaxScaled = rangeMax * fxaaQualityEdgeThreshold;\n float range = rangeMax - rangeMin;\n float rangeMaxClamped = max(fxaaQualityEdgeThresholdMin, rangeMaxScaled);\n bool earlyExit = range < rangeMaxClamped;\n if(earlyExit) return rgbyM;\n float lumaNW = FxaaLuma(decodeHDR(texture2D(texture, posM + (vec2(-1.0,-1.0) * fxaaQualityRcpFrame.xy), 0.0)));\n float lumaSE = FxaaLuma(decodeHDR(texture2D(texture, posM + (vec2( 1.0, 1.0) * fxaaQualityRcpFrame.xy), 0.0)));\n float lumaNE = FxaaLuma(decodeHDR(texture2D(texture, posM + (vec2( 1.0,-1.0) * fxaaQualityRcpFrame.xy), 0.0)));\n float lumaSW = FxaaLuma(decodeHDR(texture2D(texture, posM + (vec2(-1.0, 1.0) * fxaaQualityRcpFrame.xy), 0.0)));\n\n float lumaNS = lumaN + lumaS;\n float lumaWE = lumaW + lumaE;\n float subpixRcpRange = 1.0/range;\n float subpixNSWE = lumaNS + lumaWE;\n float edgeHorz1 = (-2.0 * rgbyM.y) + lumaNS;\n float edgeVert1 = (-2.0 * rgbyM.y) + lumaWE;\n float lumaNESE = lumaNE + lumaSE;\n float lumaNWNE = lumaNW + lumaNE;\n float edgeHorz2 = (-2.0 * lumaE) + lumaNESE;\n float edgeVert2 = (-2.0 * lumaN) + lumaNWNE;\n float lumaNWSW = lumaNW + lumaSW;\n float lumaSWSE = lumaSW + lumaSE;\n float edgeHorz4 = (abs(edgeHorz1) * 2.0) + abs(edgeHorz2);\n float edgeVert4 = (abs(edgeVert1) * 2.0) + abs(edgeVert2);\n float edgeHorz3 = (-2.0 * lumaW) + lumaNWSW;\n float edgeVert3 = (-2.0 * lumaS) + lumaSWSE;\n float edgeHorz = abs(edgeHorz3) + edgeHorz4;\n float edgeVert = abs(edgeVert3) + edgeVert4;\n float subpixNWSWNESE = lumaNWSW + lumaNESE;\n float lengthSign = fxaaQualityRcpFrame.x;\n bool horzSpan = edgeHorz >= edgeVert;\n float subpixA = subpixNSWE * 2.0 + subpixNWSWNESE;\n if(!horzSpan) lumaN = lumaW;\n if(!horzSpan) lumaS = lumaE;\n if(horzSpan) lengthSign = fxaaQualityRcpFrame.y;\n float subpixB = (subpixA * (1.0/12.0)) - rgbyM.y;\n float gradientN = lumaN - rgbyM.y;\n float gradientS = lumaS - rgbyM.y;\n float lumaNN = lumaN + rgbyM.y;\n float lumaSS = lumaS + rgbyM.y;\n bool pairN = abs(gradientN) >= abs(gradientS);\n float gradient = max(abs(gradientN), abs(gradientS));\n if(pairN) lengthSign = -lengthSign;\n float subpixC = clamp(abs(subpixB) * subpixRcpRange, 0.0, 1.0);\n vec2 posB;\n posB.x = posM.x;\n posB.y = posM.y;\n vec2 offNP;\n offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;\n offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;\n if(!horzSpan) posB.x += lengthSign * 0.5;\n if( horzSpan) posB.y += lengthSign * 0.5;\n vec2 posN;\n posN.x = posB.x - offNP.x * 1.0;\n posN.y = posB.y - offNP.y * 1.0;\n vec2 posP;\n posP.x = posB.x + offNP.x * 1.0;\n posP.y = posB.y + offNP.y * 1.0;\n float subpixD = ((-2.0)*subpixC) + 3.0;\n float lumaEndN = FxaaLuma(decodeHDR(texture2D(texture, posN, 0.0)));\n float subpixE = subpixC * subpixC;\n float lumaEndP = FxaaLuma(decodeHDR(texture2D(texture, posP, 0.0)));\n if(!pairN) lumaNN = lumaSS;\n float gradientScaled = gradient * 1.0/4.0;\n float lumaMM = rgbyM.y - lumaNN * 0.5;\n float subpixF = subpixD * subpixE;\n bool lumaMLTZero = lumaMM < 0.0;\n lumaEndN -= lumaNN * 0.5;\n lumaEndP -= lumaNN * 0.5;\n bool doneN = abs(lumaEndN) >= gradientScaled;\n bool doneP = abs(lumaEndP) >= gradientScaled;\n if(!doneN) posN.x -= offNP.x * 1.5;\n if(!doneN) posN.y -= offNP.y * 1.5;\n bool doneNP = (!doneN) || (!doneP);\n if(!doneP) posP.x += offNP.x * 1.5;\n if(!doneP) posP.y += offNP.y * 1.5;\n if(doneNP) {\n if(!doneN) lumaEndN = FxaaLuma(decodeHDR(texture2D(texture, posN.xy, 0.0)));\n if(!doneP) lumaEndP = FxaaLuma(decodeHDR(texture2D(texture, posP.xy, 0.0)));\n if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;\n if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;\n doneN = abs(lumaEndN) >= gradientScaled;\n doneP = abs(lumaEndP) >= gradientScaled;\n if(!doneN) posN.x -= offNP.x * 2.0;\n if(!doneN) posN.y -= offNP.y * 2.0;\n doneNP = (!doneN) || (!doneP);\n if(!doneP) posP.x += offNP.x * 2.0;\n if(!doneP) posP.y += offNP.y * 2.0;\n\n if(doneNP) {\n if(!doneN) lumaEndN = FxaaLuma(decodeHDR(texture2D(texture, posN.xy, 0.0)));\n if(!doneP) lumaEndP = FxaaLuma(decodeHDR(texture2D(texture, posP.xy, 0.0)));\n if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;\n if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;\n doneN = abs(lumaEndN) >= gradientScaled;\n doneP = abs(lumaEndP) >= gradientScaled;\n if(!doneN) posN.x -= offNP.x * 4.0;\n if(!doneN) posN.y -= offNP.y * 4.0;\n doneNP = (!doneN) || (!doneP);\n if(!doneP) posP.x += offNP.x * 4.0;\n if(!doneP) posP.y += offNP.y * 4.0;\n\n if(doneNP) {\n if(!doneN) lumaEndN = FxaaLuma(decodeHDR(texture2D(texture, posN.xy, 0.0)));\n if(!doneP) lumaEndP = FxaaLuma(decodeHDR(texture2D(texture, posP.xy, 0.0)));\n if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;\n if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;\n doneN = abs(lumaEndN) >= gradientScaled;\n doneP = abs(lumaEndP) >= gradientScaled;\n if(!doneN) posN.x -= offNP.x * 12.0;\n if(!doneN) posN.y -= offNP.y * 12.0;\n doneNP = (!doneN) || (!doneP);\n if(!doneP) posP.x += offNP.x * 12.0;\n if(!doneP) posP.y += offNP.y * 12.0;\n }\n }\n }\n float dstN = posM.x - posN.x;\n float dstP = posP.x - posM.x;\n if(!horzSpan) dstN = posM.y - posN.y;\n if(!horzSpan) dstP = posP.y - posM.y;\n bool goodSpanN = (lumaEndN < 0.0) != lumaMLTZero;\n float spanLength = (dstP + dstN);\n bool goodSpanP = (lumaEndP < 0.0) != lumaMLTZero;\n float spanLengthRcp = 1.0/spanLength;\n bool directionN = dstN < dstP;\n float dst = min(dstN, dstP);\n bool goodSpan = directionN ? goodSpanN : goodSpanP;\n float subpixG = subpixF * subpixF;\n float pixelOffset = (dst * (-spanLengthRcp)) + 0.5;\n float subpixH = subpixG * fxaaQualitySubpix;\n float pixelOffsetGood = goodSpan ? pixelOffset : 0.0;\n float pixelOffsetSubpix = max(pixelOffsetGood, subpixH);\n if(!horzSpan) posM.x += pixelOffsetSubpix * lengthSign;\n if( horzSpan) posM.y += pixelOffsetSubpix * lengthSign;\n return vec4(decodeHDR(texture2D(texture, posM, 0.0)).xyz, rgbyM.y);\n\n}\n\nvoid main()\n{\n vec4 color = FxaaPixelShader(\n v_Texcoord,\n texture,\n vec2(1.0) / viewport.zw,\n subpixel,\n edgeThreshold,\n edgeThresholdMin\n );\n gl_FragColor = vec4(color.rgb, 1.0);\n}\n@end";


/***/ }),
/* 77 */
/***/ (function(module, exports) {


module.exports = "@export qtek.compositor.hdr.composite\n\nuniform sampler2D texture;\n#ifdef BLOOM_ENABLED\nuniform sampler2D bloom;\n#endif\n#ifdef LENSFLARE_ENABLED\nuniform sampler2D lensflare;\nuniform sampler2D lensdirt;\n#endif\n\n#ifdef LUM_ENABLED\nuniform sampler2D lum;\n#endif\n\n#ifdef LUT_ENABLED\nuniform sampler2D lut;\n#endif\n\n#ifdef COLOR_CORRECTION\nuniform float brightness : 0.0;\nuniform float contrast : 1.0;\nuniform float saturation : 1.0;\n#endif\n\n#ifdef VIGNETTE\nuniform float vignetteDarkness: 1.0;\nuniform float vignetteOffset: 1.0;\n#endif\n\nuniform float exposure : 1.0;\nuniform float bloomIntensity : 0.25;\nuniform float lensflareIntensity : 1;\n\nvarying vec2 v_Texcoord;\n\n\n@import qtek.util.srgb\n\n\n\n\nvec3 ACESToneMapping(vec3 color)\n{\n const float A = 2.51;\n const float B = 0.03;\n const float C = 2.43;\n const float D = 0.59;\n const float E = 0.14;\n return (color * (A * color + B)) / (color * (C * color + D) + E);\n}\n\nfloat eyeAdaption(float fLum)\n{\n return mix(0.2, fLum, 0.5);\n}\n\n#ifdef LUT_ENABLED\nvec3 lutTransform(vec3 color) {\n float blueColor = color.b * 63.0;\n\n vec2 quad1;\n quad1.y = floor(floor(blueColor) / 8.0);\n quad1.x = floor(blueColor) - (quad1.y * 8.0);\n\n vec2 quad2;\n quad2.y = floor(ceil(blueColor) / 8.0);\n quad2.x = ceil(blueColor) - (quad2.y * 8.0);\n\n vec2 texPos1;\n texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.r);\n texPos1.y = (quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.g);\n\n vec2 texPos2;\n texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.r);\n texPos2.y = (quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * color.g);\n\n vec4 newColor1 = texture2D(lut, texPos1);\n vec4 newColor2 = texture2D(lut, texPos2);\n\n vec4 newColor = mix(newColor1, newColor2, fract(blueColor));\n return newColor.rgb;\n}\n#endif\n\n@import qtek.util.rgbm\n\nvoid main()\n{\n vec4 texel = vec4(0.0);\n vec4 originalTexel = vec4(0.0);\n#ifdef TEXTURE_ENABLED\n texel = decodeHDR(texture2D(texture, v_Texcoord));\n originalTexel = texel;\n#endif\n\n#ifdef BLOOM_ENABLED\n vec4 bloomTexel = decodeHDR(texture2D(bloom, v_Texcoord));\n texel.rgb += bloomTexel.rgb * bloomIntensity;\n texel.a += bloomTexel.a * bloomIntensity;\n#endif\n\n#ifdef LENSFLARE_ENABLED\n texel += decodeHDR(texture2D(lensflare, v_Texcoord)) * texture2D(lensdirt, v_Texcoord) * lensflareIntensity;\n#endif\n\n texel.a = min(texel.a, 1.0);\n\n#ifdef LUM_ENABLED\n float fLum = texture2D(lum, vec2(0.5, 0.5)).r;\n float adaptedLumDest = 3.0 / (max(0.1, 1.0 + 10.0*eyeAdaption(fLum)));\n float exposureBias = adaptedLumDest * exposure;\n#else\n float exposureBias = exposure;\n#endif\n texel.rgb *= exposureBias;\n\n texel.rgb = ACESToneMapping(texel.rgb);\n texel = linearTosRGB(texel);\n\n#ifdef LUT_ENABLED\n texel.rgb = lutTransform(clamp(texel.rgb,vec3(0.0),vec3(1.0)));\n#endif\n\n#ifdef COLOR_CORRECTION\n texel.rgb = clamp(texel.rgb + vec3(brightness), 0.0, 1.0);\n texel.rgb = clamp((texel.rgb - vec3(0.5))*contrast+vec3(0.5), 0.0, 1.0);\n float lum = dot(texel.rgb, vec3(0.2125, 0.7154, 0.0721));\n texel.rgb = mix(vec3(lum), texel.rgb, saturation);\n#endif\n\n#ifdef VIGNETTE\n vec2 uv = (v_Texcoord - vec2(0.5)) * vec2(vignetteOffset);\n texel.rgb = mix(texel.rgb, vec3(1.0 - vignetteDarkness), dot(uv, uv));\n#endif\n\n gl_FragColor = encodeHDR(texel);\n\n#ifdef DEBUG\n #if DEBUG == 1\n gl_FragColor = encodeHDR(decodeHDR(texture2D(texture, v_Texcoord)));\n #elif DEBUG == 2\n gl_FragColor = encodeHDR(decodeHDR(texture2D(bloom, v_Texcoord)) * bloomIntensity);\n #elif DEBUG == 3\n gl_FragColor = encodeHDR(decodeHDR(texture2D(lensflare, v_Texcoord) * lensflareIntensity));\n #endif\n#endif\n\n if (originalTexel.a <= 0.01) {\n gl_FragColor.a = dot(gl_FragColor.rgb, vec3(0.2125, 0.7154, 0.0721));\n }\n #ifdef PREMULTIPLY_ALPHA\n gl_FragColor.rgb *= gl_FragColor.a;\n#endif\n}\n\n@end";


/***/ }),
/* 78 */
/***/ (function(module, exports) {


module.exports = "@export qtek.compositor.lensflare\n\n#define SAMPLE_NUMBER 8\n\nuniform sampler2D texture;\nuniform sampler2D lenscolor;\n\nuniform vec2 textureSize : [512, 512];\n\nuniform float dispersal : 0.3;\nuniform float haloWidth : 0.4;\nuniform float distortion : 1.0;\n\nvarying vec2 v_Texcoord;\n\n@import qtek.util.rgbm\n\nvec4 textureDistorted(\n in vec2 texcoord,\n in vec2 direction,\n in vec3 distortion\n) {\n return vec4(\n decodeHDR(texture2D(texture, texcoord + direction * distortion.r)).r,\n decodeHDR(texture2D(texture, texcoord + direction * distortion.g)).g,\n decodeHDR(texture2D(texture, texcoord + direction * distortion.b)).b,\n 1.0\n );\n}\n\nvoid main()\n{\n vec2 texcoord = -v_Texcoord + vec2(1.0); vec2 textureOffset = 1.0 / textureSize;\n\n vec2 ghostVec = (vec2(0.5) - texcoord) * dispersal;\n vec2 haloVec = normalize(ghostVec) * haloWidth;\n\n vec3 distortion = vec3(-textureOffset.x * distortion, 0.0, textureOffset.x * distortion);\n vec4 result = vec4(0.0);\n for (int i = 0; i < SAMPLE_NUMBER; i++)\n {\n vec2 offset = fract(texcoord + ghostVec * float(i));\n\n float weight = length(vec2(0.5) - offset) / length(vec2(0.5));\n weight = pow(1.0 - weight, 10.0);\n\n result += textureDistorted(offset, normalize(ghostVec), distortion) * weight;\n }\n\n result *= texture2D(lenscolor, vec2(length(vec2(0.5) - texcoord)) / length(vec2(0.5)));\n float weight = length(vec2(0.5) - fract(texcoord + haloVec)) / length(vec2(0.5));\n weight = pow(1.0 - weight, 10.0);\n vec2 offset = fract(texcoord + haloVec);\n result += textureDistorted(offset, normalize(ghostVec), distortion) * weight;\n\n gl_FragColor = result;\n}\n@end";


/***/ }),
/* 79 */
/***/ (function(module, exports) {


module.exports = "@export qtek.compositor.hdr.log_lum\n\nvarying vec2 v_Texcoord;\n\nuniform sampler2D texture;\n\nconst vec3 w = vec3(0.2125, 0.7154, 0.0721);\n\n@import qtek.util.rgbm\n\nvoid main()\n{\n vec4 tex = decodeHDR(texture2D(texture, v_Texcoord));\n float luminance = dot(tex.rgb, w);\n luminance = log(luminance + 0.001);\n\n gl_FragColor = encodeHDR(vec4(vec3(luminance), 1.0));\n}\n\n@end\n\n@export qtek.compositor.hdr.lum_adaption\nvarying vec2 v_Texcoord;\n\nuniform sampler2D adaptedLum;\nuniform sampler2D currentLum;\n\nuniform float frameTime : 0.02;\n\n@import qtek.util.rgbm\n\nvoid main()\n{\n float fAdaptedLum = decodeHDR(texture2D(adaptedLum, vec2(0.5, 0.5))).r;\n float fCurrentLum = exp(encodeHDR(texture2D(currentLum, vec2(0.5, 0.5))).r);\n\n fAdaptedLum += (fCurrentLum - fAdaptedLum) * (1.0 - pow(0.98, 30.0 * frameTime));\n gl_FragColor = encodeHDR(vec4(vec3(fAdaptedLum), 1.0));\n}\n@end\n\n@export qtek.compositor.lum\n\nvarying vec2 v_Texcoord;\n\nuniform sampler2D texture;\n\nconst vec3 w = vec3(0.2125, 0.7154, 0.0721);\n\nvoid main()\n{\n vec4 tex = texture2D( texture, v_Texcoord );\n float luminance = dot(tex.rgb, w);\n\n gl_FragColor = vec4(vec3(luminance), 1.0);\n}\n\n@end";


/***/ }),
/* 80 */
/***/ (function(module, exports) {


module.exports = "\n@export qtek.compositor.lut\n\nvarying vec2 v_Texcoord;\n\nuniform sampler2D texture;\nuniform sampler2D lookup;\n\nvoid main()\n{\n\n vec4 tex = texture2D(texture, v_Texcoord);\n\n float blueColor = tex.b * 63.0;\n\n vec2 quad1;\n quad1.y = floor(floor(blueColor) / 8.0);\n quad1.x = floor(blueColor) - (quad1.y * 8.0);\n\n vec2 quad2;\n quad2.y = floor(ceil(blueColor) / 8.0);\n quad2.x = ceil(blueColor) - (quad2.y * 8.0);\n\n vec2 texPos1;\n texPos1.x = (quad1.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * tex.r);\n texPos1.y = (quad1.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * tex.g);\n\n vec2 texPos2;\n texPos2.x = (quad2.x * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * tex.r);\n texPos2.y = (quad2.y * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * tex.g);\n\n vec4 newColor1 = texture2D(lookup, texPos1);\n vec4 newColor2 = texture2D(lookup, texPos2);\n\n vec4 newColor = mix(newColor1, newColor2, fract(blueColor));\n gl_FragColor = vec4(newColor.rgb, tex.w);\n}\n\n@end";


/***/ }),
/* 81 */
/***/ (function(module, exports) {


module.exports = "@export qtek.compositor.output\n\n#define OUTPUT_ALPHA\n\nvarying vec2 v_Texcoord;\n\nuniform sampler2D texture;\n\n@import qtek.util.rgbm\n\nvoid main()\n{\n vec4 tex = decodeHDR(texture2D(texture, v_Texcoord));\n\n gl_FragColor.rgb = tex.rgb;\n\n#ifdef OUTPUT_ALPHA\n gl_FragColor.a = tex.a;\n#else\n gl_FragColor.a = 1.0;\n#endif\n\n gl_FragColor = encodeHDR(gl_FragColor);\n\n #ifdef PREMULTIPLY_ALPHA\n gl_FragColor.rgb *= gl_FragColor.a;\n#endif\n}\n\n@end";


/***/ }),
/* 82 */
/***/ (function(module, exports) {


module.exports = "\n@export qtek.compositor.upsample\n\n#define HIGH_QUALITY\n\nuniform sampler2D texture;\nuniform vec2 textureSize : [512, 512];\n\nuniform float sampleScale: 0.5;\n\nvarying vec2 v_Texcoord;\n\n@import qtek.util.rgbm\n\n@import qtek.util.clamp_sample\n\nvoid main()\n{\n\n#ifdef HIGH_QUALITY\n vec4 d = vec4(1.0, 1.0, -1.0, 0.0) / textureSize.xyxy * sampleScale;\n\n vec4 s;\n s = decodeHDR(clampSample(texture, v_Texcoord - d.xy));\n s += decodeHDR(clampSample(texture, v_Texcoord - d.wy)) * 2.0;\n s += decodeHDR(clampSample(texture, v_Texcoord - d.zy));\n\n s += decodeHDR(clampSample(texture, v_Texcoord + d.zw)) * 2.0;\n s += decodeHDR(clampSample(texture, v_Texcoord )) * 4.0;\n s += decodeHDR(clampSample(texture, v_Texcoord + d.xw)) * 2.0;\n\n s += decodeHDR(clampSample(texture, v_Texcoord + d.zy));\n s += decodeHDR(clampSample(texture, v_Texcoord + d.wy)) * 2.0;\n s += decodeHDR(clampSample(texture, v_Texcoord + d.xy));\n\n gl_FragColor = encodeHDR(s / 16.0);\n#else\n vec4 d = vec4(-1.0, -1.0, +1.0, +1.0) / textureSize.xyxy;\n\n vec4 s;\n s = decodeHDR(clampSample(texture, v_Texcoord + d.xy));\n s += decodeHDR(clampSample(texture, v_Texcoord + d.zy));\n s += decodeHDR(clampSample(texture, v_Texcoord + d.xw));\n s += decodeHDR(clampSample(texture, v_Texcoord + d.zw));\n\n gl_FragColor = encodeHDR(s / 4.0);\n#endif\n}\n\n@end";


/***/ }),
/* 83 */
/***/ (function(module, exports) {


module.exports = "\n@export qtek.compositor.vertex\n\nuniform mat4 worldViewProjection : WORLDVIEWPROJECTION;\n\nattribute vec3 position : POSITION;\nattribute vec2 texcoord : TEXCOORD_0;\n\nvarying vec2 v_Texcoord;\n\nvoid main()\n{\n v_Texcoord = texcoord;\n gl_Position = worldViewProjection * vec4(position, 1.0);\n}\n\n@end";


/***/ }),
/* 84 */
/***/ (function(module, exports) {


module.exports = "@export qtek.compositor.vignette\n\n#define OUTPUT_ALPHA\n\nvarying vec2 v_Texcoord;\n\nuniform sampler2D texture;\n\nuniform float darkness: 1;\nuniform float offset: 1;\n\n@import qtek.util.rgbm\n\nvoid main()\n{\n vec4 texel = decodeHDR(texture2D(texture, v_Texcoord));\n\n gl_FragColor.rgb = texel.rgb;\n\n vec2 uv = (v_Texcoord - vec2(0.5)) * vec2(offset);\n\n gl_FragColor = encodeHDR(vec4(mix(texel.rgb, vec3(1.0 - darkness), dot(uv, uv)), texel.a));\n}\n\n@end";


/***/ }),
/* 85 */
/***/ (function(module, exports) {


module.exports = "vec3 calcAmbientSHLight(int idx, vec3 N) {\n int offset = 9 * idx;\n\n return ambientSHLightCoefficients[0]\n + ambientSHLightCoefficients[1] * N.x\n + ambientSHLightCoefficients[2] * N.y\n + ambientSHLightCoefficients[3] * N.z\n + ambientSHLightCoefficients[4] * N.x * N.z\n + ambientSHLightCoefficients[5] * N.z * N.y\n + ambientSHLightCoefficients[6] * N.y * N.x\n + ambientSHLightCoefficients[7] * (3.0 * N.z * N.z - 1.0)\n + ambientSHLightCoefficients[8] * (N.x * N.x - N.y * N.y);\n}";


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {


    var uniformVec3Prefix = 'uniform vec3 ';
    var uniformFloatPrefix = 'uniform float ';
    var exportHeaderPrefix = '@export qtek.header.';
    var exportEnd = '@end';
    var unconfigurable = ':unconfigurable;';
    module.exports = [
        exportHeaderPrefix + 'directional_light',
        uniformVec3Prefix + 'directionalLightDirection[DIRECTIONAL_LIGHT_COUNT]' + unconfigurable,
        uniformVec3Prefix + 'directionalLightColor[DIRECTIONAL_LIGHT_COUNT]' + unconfigurable,
        exportEnd,

        exportHeaderPrefix + 'ambient_light',
        uniformVec3Prefix + 'ambientLightColor[AMBIENT_LIGHT_COUNT]' + unconfigurable,
        exportEnd,

        exportHeaderPrefix + 'ambient_sh_light',
        uniformVec3Prefix + 'ambientSHLightColor[AMBIENT_SH_LIGHT_COUNT]' + unconfigurable,
        uniformVec3Prefix + 'ambientSHLightCoefficients[AMBIENT_SH_LIGHT_COUNT * 9]' + unconfigurable,
        __webpack_require__(85),
        exportEnd,

        exportHeaderPrefix + 'ambient_cubemap_light',
        uniformVec3Prefix + 'ambientCubemapLightColor[AMBIENT_CUBEMAP_LIGHT_COUNT]' + unconfigurable,
        'uniform samplerCube ambientCubemapLightCubemap[AMBIENT_CUBEMAP_LIGHT_COUNT]' + unconfigurable,
        'uniform sampler2D ambientCubemapLightBRDFLookup[AMBIENT_CUBEMAP_LIGHT_COUNT]' + unconfigurable,
        exportEnd,

        exportHeaderPrefix + 'point_light',
        uniformVec3Prefix + 'pointLightPosition[POINT_LIGHT_COUNT]' + unconfigurable,
        uniformFloatPrefix + 'pointLightRange[POINT_LIGHT_COUNT]' + unconfigurable,
        uniformVec3Prefix + 'pointLightColor[POINT_LIGHT_COUNT]' + unconfigurable,
        exportEnd,

        exportHeaderPrefix + 'spot_light',
        uniformVec3Prefix + 'spotLightPosition[SPOT_LIGHT_COUNT]' + unconfigurable,
        uniformVec3Prefix + 'spotLightDirection[SPOT_LIGHT_COUNT]' + unconfigurable,
        uniformFloatPrefix + 'spotLightRange[SPOT_LIGHT_COUNT]' + unconfigurable,
        uniformFloatPrefix + 'spotLightUmbraAngleCosine[SPOT_LIGHT_COUNT]' + unconfigurable,
        uniformFloatPrefix + 'spotLightPenumbraAngleCosine[SPOT_LIGHT_COUNT]' + unconfigurable,
        uniformFloatPrefix + 'spotLightFalloffFactor[SPOT_LIGHT_COUNT]' + unconfigurable,
        uniformVec3Prefix + 'spotLightColor[SPOT_LIGHT_COUNT]' + unconfigurable,
        exportEnd
    ].join('\n');


/***/ }),
/* 87 */
/***/ (function(module, exports) {


module.exports = "/**\n * http: */\n\n@export qtek.lambert.vertex\n\nuniform mat4 worldViewProjection : WORLDVIEWPROJECTION;\nuniform mat4 worldInverseTranspose : WORLDINVERSETRANSPOSE;\nuniform mat4 world : WORLD;\n\nuniform vec2 uvRepeat : [1.0, 1.0];\nuniform vec2 uvOffset : [0.0, 0.0];\n\nattribute vec3 position : POSITION;\nattribute vec2 texcoord : TEXCOORD_0;\nattribute vec3 normal : NORMAL;\n\nattribute vec3 barycentric;\n\n#ifdef SKINNING\nattribute vec3 weight : WEIGHT;\nattribute vec4 joint : JOINT;\n\nuniform mat4 skinMatrix[JOINT_COUNT] : SKIN_MATRIX;\n#endif\n\nvarying vec2 v_Texcoord;\nvarying vec3 v_Normal;\nvarying vec3 v_WorldPosition;\nvarying vec3 v_Barycentric;\n\nvoid main()\n{\n\n vec3 skinnedPosition = position;\n vec3 skinnedNormal = normal;\n\n#ifdef SKINNING\n\n @import qtek.chunk.skin_matrix\n\n skinnedPosition = (skinMatrixWS * vec4(position, 1.0)).xyz;\n skinnedNormal = (skinMatrixWS * vec4(normal, 0.0)).xyz;\n#endif\n\n gl_Position = worldViewProjection * vec4( skinnedPosition, 1.0 );\n\n v_Texcoord = texcoord * uvRepeat + uvOffset;\n v_Normal = normalize( ( worldInverseTranspose * vec4(skinnedNormal, 0.0) ).xyz );\n v_WorldPosition = ( world * vec4( skinnedPosition, 1.0) ).xyz;\n\n v_Barycentric = barycentric;\n}\n\n@end\n\n\n@export qtek.lambert.fragment\n\n#define ALPHA_TEST_THRESHOLD 0.5\n\nvarying vec2 v_Texcoord;\nvarying vec3 v_Normal;\nvarying vec3 v_WorldPosition;\n\nuniform sampler2D diffuseMap;\nuniform sampler2D alphaMap;\n\nuniform vec3 color : [1.0, 1.0, 1.0];\nuniform vec3 emission : [0.0, 0.0, 0.0];\nuniform float alpha : 1.0;\n\nuniform float lineWidth : 0.0;\nuniform vec3 lineColor : [0.0, 0.0, 0.0];\nvarying vec3 v_Barycentric;\n\n#ifdef AMBIENT_LIGHT_COUNT\n@import qtek.header.ambient_light\n#endif\n#ifdef AMBIENT_SH_LIGHT_COUNT\n@import qtek.header.ambient_sh_light\n#endif\n#ifdef POINT_LIGHT_COUNT\n@import qtek.header.point_light\n#endif\n#ifdef DIRECTIONAL_LIGHT_COUNT\n@import qtek.header.directional_light\n#endif\n#ifdef SPOT_LIGHT_COUNT\n@import qtek.header.spot_light\n#endif\n\n@import qtek.util.calculate_attenuation\n\n@import qtek.util.edge_factor\n\n@import qtek.util.rgbm\n\n@import qtek.plugin.compute_shadow_map\n\nvoid main()\n{\n#ifdef RENDER_NORMAL\n gl_FragColor = vec4(v_Normal * 0.5 + 0.5, 1.0);\n return;\n#endif\n#ifdef RENDER_TEXCOORD\n gl_FragColor = vec4(v_Texcoord, 1.0, 1.0);\n return;\n#endif\n\n gl_FragColor = vec4(color, alpha);\n\n#ifdef DIFFUSEMAP_ENABLED\n vec4 tex = texture2D( diffuseMap, v_Texcoord );\n#ifdef SRGB_DECODE\n tex.rgb = pow(tex.rgb, vec3(2.2));\n#endif\n gl_FragColor.rgb *= tex.rgb;\n#ifdef DIFFUSEMAP_ALPHA_ALPHA\n gl_FragColor.a *= tex.a;\n#endif\n#endif\n\n vec3 diffuseColor = vec3(0.0, 0.0, 0.0);\n\n#ifdef AMBIENT_LIGHT_COUNT\n for(int _idx_ = 0; _idx_ < AMBIENT_LIGHT_COUNT; _idx_++)\n {\n diffuseColor += ambientLightColor[_idx_];\n }\n#endif\n#ifdef AMBIENT_SH_LIGHT_COUNT\n for(int _idx_ = 0; _idx_ < AMBIENT_SH_LIGHT_COUNT; _idx_++)\n {{\n diffuseColor += calcAmbientSHLight(_idx_, v_Normal) * ambientSHLightColor[_idx_];\n }}\n#endif\n#ifdef POINT_LIGHT_COUNT\n#if defined(POINT_LIGHT_SHADOWMAP_COUNT)\n float shadowContribsPoint[POINT_LIGHT_COUNT];\n if( shadowEnabled )\n {\n computeShadowOfPointLights(v_WorldPosition, shadowContribsPoint);\n }\n#endif\n for(int i = 0; i < POINT_LIGHT_COUNT; i++)\n {\n\n vec3 lightPosition = pointLightPosition[i];\n vec3 lightColor = pointLightColor[i];\n float range = pointLightRange[i];\n\n vec3 lightDirection = lightPosition - v_WorldPosition;\n\n float dist = length(lightDirection);\n float attenuation = lightAttenuation(dist, range);\n\n lightDirection /= dist;\n\n float ndl = dot( v_Normal, lightDirection );\n\n float shadowContrib = 1.0;\n#if defined(POINT_LIGHT_SHADOWMAP_COUNT)\n if( shadowEnabled )\n {\n shadowContrib = shadowContribsPoint[i];\n }\n#endif\n\n diffuseColor += lightColor * clamp(ndl, 0.0, 1.0) * attenuation * shadowContrib;\n }\n#endif\n#ifdef DIRECTIONAL_LIGHT_COUNT\n#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)\n float shadowContribsDir[DIRECTIONAL_LIGHT_COUNT];\n if(shadowEnabled)\n {\n computeShadowOfDirectionalLights(v_WorldPosition, shadowContribsDir);\n }\n#endif\n for(int i = 0; i < DIRECTIONAL_LIGHT_COUNT; i++)\n {\n vec3 lightDirection = -directionalLightDirection[i];\n vec3 lightColor = directionalLightColor[i];\n\n float ndl = dot(v_Normal, normalize(lightDirection));\n\n float shadowContrib = 1.0;\n#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)\n if( shadowEnabled )\n {\n shadowContrib = shadowContribsDir[i];\n }\n#endif\n\n diffuseColor += lightColor * clamp(ndl, 0.0, 1.0) * shadowContrib;\n }\n#endif\n\n#ifdef SPOT_LIGHT_COUNT\n#if defined(SPOT_LIGHT_SHADOWMAP_COUNT)\n float shadowContribsSpot[SPOT_LIGHT_COUNT];\n if(shadowEnabled)\n {\n computeShadowOfSpotLights(v_WorldPosition, shadowContribsSpot);\n }\n#endif\n for(int i = 0; i < SPOT_LIGHT_COUNT; i++)\n {\n vec3 lightPosition = -spotLightPosition[i];\n vec3 spotLightDirection = -normalize( spotLightDirection[i] );\n vec3 lightColor = spotLightColor[i];\n float range = spotLightRange[i];\n float a = spotLightUmbraAngleCosine[i];\n float b = spotLightPenumbraAngleCosine[i];\n float falloffFactor = spotLightFalloffFactor[i];\n\n vec3 lightDirection = lightPosition - v_WorldPosition;\n float dist = length(lightDirection);\n float attenuation = lightAttenuation(dist, range);\n\n lightDirection /= dist;\n float c = dot(spotLightDirection, lightDirection);\n\n float falloff;\n falloff = clamp((c - a) /( b - a), 0.0, 1.0);\n falloff = pow(falloff, falloffFactor);\n\n float ndl = dot(v_Normal, lightDirection);\n ndl = clamp(ndl, 0.0, 1.0);\n\n float shadowContrib = 1.0;\n#if defined(SPOT_LIGHT_SHADOWMAP_COUNT)\n if( shadowEnabled )\n {\n shadowContrib = shadowContribsSpot[i];\n }\n#endif\n diffuseColor += lightColor * ndl * attenuation * (1.0-falloff) * shadowContrib;\n }\n#endif\n\n gl_FragColor.rgb *= diffuseColor;\n gl_FragColor.rgb += emission;\n if(lineWidth > 0.01)\n {\n gl_FragColor.rgb = gl_FragColor.rgb * mix(lineColor, vec3(1.0), edgeFactor(lineWidth));\n }\n\n#ifdef ALPHA_TEST\n if (gl_FragColor.a < ALPHA_TEST_THRESHOLD) {\n discard;\n }\n#endif\n\n gl_FragColor = encodeHDR(gl_FragColor);\n}\n\n@end";


/***/ }),
/* 88 */
/***/ (function(module, exports) {


module.exports = "@export qtek.sm.depth.vertex\n\nuniform mat4 worldViewProjection : WORLDVIEWPROJECTION;\n\nattribute vec3 position : POSITION;\n\n#ifdef SHADOW_TRANSPARENT\nattribute vec2 texcoord : TEXCOORD_0;\n#endif\n\n#ifdef SKINNING\nattribute vec3 weight : WEIGHT;\nattribute vec4 joint : JOINT;\n\nuniform mat4 skinMatrix[JOINT_COUNT] : SKIN_MATRIX;\n#endif\n\nvarying vec4 v_ViewPosition;\n\n#ifdef SHADOW_TRANSPARENT\nvarying vec2 v_Texcoord;\n#endif\n\nvoid main(){\n\n vec3 skinnedPosition = position;\n\n#ifdef SKINNING\n\n @import qtek.chunk.skin_matrix\n\n skinnedPosition = (skinMatrixWS * vec4(position, 1.0)).xyz;\n#endif\n\n v_ViewPosition = worldViewProjection * vec4(skinnedPosition, 1.0);\n gl_Position = v_ViewPosition;\n\n#ifdef SHADOW_TRANSPARENT\n v_Texcoord = texcoord;\n#endif\n}\n@end\n\n@export qtek.sm.depth.fragment\n\nvarying vec4 v_ViewPosition;\n\n#ifdef SHADOW_TRANSPARENT\nvarying vec2 v_Texcoord;\n#endif\n\nuniform float bias : 0.001;\nuniform float slopeScale : 1.0;\n\n#ifdef SHADOW_TRANSPARENT\nuniform sampler2D transparentMap;\n#endif\n\n@import qtek.util.encode_float\n\nvoid main(){\n float depth = v_ViewPosition.z / v_ViewPosition.w;\n \n#ifdef USE_VSM\n depth = depth * 0.5 + 0.5;\n float moment1 = depth;\n float moment2 = depth * depth;\n\n float dx = dFdx(depth);\n float dy = dFdy(depth);\n moment2 += 0.25*(dx*dx+dy*dy);\n\n gl_FragColor = vec4(moment1, moment2, 0.0, 1.0);\n#else\n float dx = dFdx(depth);\n float dy = dFdy(depth);\n depth += sqrt(dx*dx + dy*dy) * slopeScale + bias;\n\n#ifdef SHADOW_TRANSPARENT\n if (texture2D(transparentMap, v_Texcoord).a <= 0.1) {\n gl_FragColor = encodeFloat(0.9999);\n return;\n }\n#endif\n\n gl_FragColor = encodeFloat(depth * 0.5 + 0.5);\n#endif\n}\n@end\n\n@export qtek.sm.debug_depth\n\nuniform sampler2D depthMap;\nvarying vec2 v_Texcoord;\n\n@import qtek.util.decode_float\n\nvoid main() {\n vec4 tex = texture2D(depthMap, v_Texcoord);\n#ifdef USE_VSM\n gl_FragColor = vec4(tex.rgb, 1.0);\n#else\n float depth = decodeFloat(tex);\n gl_FragColor = vec4(depth, depth, depth, 1.0);\n#endif\n}\n\n@end\n\n\n@export qtek.sm.distance.vertex\n\nuniform mat4 worldViewProjection : WORLDVIEWPROJECTION;\nuniform mat4 world : WORLD;\n\nattribute vec3 position : POSITION;\n\n#ifdef SKINNING\nattribute vec3 boneWeight;\nattribute vec4 boneIndex;\n\nuniform mat4 skinMatrix[JOINT_COUNT] : SKIN_MATRIX;\n#endif\n\nvarying vec3 v_WorldPosition;\n\nvoid main (){\n\n vec3 skinnedPosition = position;\n#ifdef SKINNING\n @import qtek.chunk.skin_matrix\n\n skinnedPosition = (skinMatrixWS * vec4(position, 1.0)).xyz;\n#endif\n\n gl_Position = worldViewProjection * vec4(skinnedPosition , 1.0);\n v_WorldPosition = (world * vec4(skinnedPosition, 1.0)).xyz;\n}\n\n@end\n\n@export qtek.sm.distance.fragment\n\nuniform vec3 lightPosition;\nuniform float range : 100;\n\nvarying vec3 v_WorldPosition;\n\n@import qtek.util.encode_float\n\nvoid main(){\n float dist = distance(lightPosition, v_WorldPosition);\n#ifdef USE_VSM\n gl_FragColor = vec4(dist, dist * dist, 0.0, 0.0);\n#else\n dist = dist / range;\n gl_FragColor = encodeFloat(dist);\n#endif\n}\n@end\n\n@export qtek.plugin.shadow_map_common\n\n@import qtek.util.decode_float\n\nfloat tapShadowMap(sampler2D map, vec2 uv, float z){\n vec4 tex = texture2D(map, uv);\n return step(z, decodeFloat(tex) * 2.0 - 1.0);\n}\n\nfloat pcf(sampler2D map, vec2 uv, float z, float textureSize, vec2 scale) {\n\n float shadowContrib = tapShadowMap(map, uv, z);\n vec2 offset = vec2(1.0 / textureSize) * scale;\n#ifdef PCF_KERNEL_SIZE\n for (int _idx_ = 0; _idx_ < PCF_KERNEL_SIZE; _idx_++) {{\n shadowContrib += tapShadowMap(map, uv + offset * pcfKernel[_idx_], z);\n }}\n\n return shadowContrib / float(PCF_KERNEL_SIZE + 1);\n#else\n shadowContrib += tapShadowMap(map, uv+vec2(offset.x, 0.0), z);\n shadowContrib += tapShadowMap(map, uv+vec2(offset.x, offset.y), z);\n shadowContrib += tapShadowMap(map, uv+vec2(-offset.x, offset.y), z);\n shadowContrib += tapShadowMap(map, uv+vec2(0.0, offset.y), z);\n shadowContrib += tapShadowMap(map, uv+vec2(-offset.x, 0.0), z);\n shadowContrib += tapShadowMap(map, uv+vec2(-offset.x, -offset.y), z);\n shadowContrib += tapShadowMap(map, uv+vec2(offset.x, -offset.y), z);\n shadowContrib += tapShadowMap(map, uv+vec2(0.0, -offset.y), z);\n\n return shadowContrib / 9.0;\n#endif\n}\n\nfloat pcf(sampler2D map, vec2 uv, float z, float textureSize) {\n return pcf(map, uv, z, textureSize, vec2(1.0));\n}\n\nfloat chebyshevUpperBound(vec2 moments, float z){\n float p = 0.0;\n z = z * 0.5 + 0.5;\n if (z <= moments.x) {\n p = 1.0;\n }\n float variance = moments.y - moments.x * moments.x;\n variance = max(variance, 0.0000001);\n float mD = moments.x - z;\n float pMax = variance / (variance + mD * mD);\n pMax = clamp((pMax-0.4)/(1.0-0.4), 0.0, 1.0);\n return max(p, pMax);\n}\nfloat computeShadowContrib(\n sampler2D map, mat4 lightVPM, vec3 position, float textureSize, vec2 scale, vec2 offset\n) {\n\n vec4 posInLightSpace = lightVPM * vec4(position, 1.0);\n posInLightSpace.xyz /= posInLightSpace.w;\n float z = posInLightSpace.z;\n if(all(greaterThan(posInLightSpace.xyz, vec3(-0.99, -0.99, -1.0))) &&\n all(lessThan(posInLightSpace.xyz, vec3(0.99, 0.99, 1.0)))){\n vec2 uv = (posInLightSpace.xy+1.0) / 2.0;\n\n #ifdef USE_VSM\n vec2 moments = texture2D(map, uv * scale + offset).xy;\n return chebyshevUpperBound(moments, z);\n #else\n return pcf(map, uv * scale + offset, z, textureSize, scale);\n #endif\n }\n return 1.0;\n}\n\nfloat computeShadowContrib(sampler2D map, mat4 lightVPM, vec3 position, float textureSize) {\n return computeShadowContrib(map, lightVPM, position, textureSize, vec2(1.0), vec2(0.0));\n}\n\nfloat computeShadowContribOmni(samplerCube map, vec3 direction, float range)\n{\n float dist = length(direction);\n vec4 shadowTex = textureCube(map, direction);\n\n#ifdef USE_VSM\n vec2 moments = shadowTex.xy;\n float variance = moments.y - moments.x * moments.x;\n float mD = moments.x - dist;\n float p = variance / (variance + mD * mD);\n if(moments.x + 0.001 < dist){\n return clamp(p, 0.0, 1.0);\n }else{\n return 1.0;\n }\n#else\n return step(dist, (decodeFloat(shadowTex) + 0.0002) * range);\n#endif\n}\n\n@end\n\n\n\n@export qtek.plugin.compute_shadow_map\n\n#if defined(SPOT_LIGHT_SHADOWMAP_COUNT) || defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT) || defined(POINT_LIGHT_SHADOWMAP_COUNT)\n\n#ifdef SPOT_LIGHT_SHADOWMAP_COUNT\nuniform sampler2D spotLightShadowMaps[SPOT_LIGHT_SHADOWMAP_COUNT];\nuniform mat4 spotLightMatrices[SPOT_LIGHT_SHADOWMAP_COUNT];\nuniform float spotLightShadowMapSizes[SPOT_LIGHT_SHADOWMAP_COUNT];\n#endif\n\n#ifdef DIRECTIONAL_LIGHT_SHADOWMAP_COUNT\n#if defined(SHADOW_CASCADE)\nuniform sampler2D directionalLightShadowMaps[1];\nuniform mat4 directionalLightMatrices[SHADOW_CASCADE];\nuniform float directionalLightShadowMapSizes[1];\nuniform float shadowCascadeClipsNear[SHADOW_CASCADE];\nuniform float shadowCascadeClipsFar[SHADOW_CASCADE];\n#else\nuniform sampler2D directionalLightShadowMaps[DIRECTIONAL_LIGHT_SHADOWMAP_COUNT];\nuniform mat4 directionalLightMatrices[DIRECTIONAL_LIGHT_SHADOWMAP_COUNT];\nuniform float directionalLightShadowMapSizes[DIRECTIONAL_LIGHT_SHADOWMAP_COUNT];\n#endif\n#endif\n\n#ifdef POINT_LIGHT_SHADOWMAP_COUNT\nuniform samplerCube pointLightShadowMaps[POINT_LIGHT_SHADOWMAP_COUNT];\nuniform float pointLightShadowMapSizes[POINT_LIGHT_SHADOWMAP_COUNT];\n#endif\n\nuniform bool shadowEnabled : true;\n\n#ifdef PCF_KERNEL_SIZE\nuniform vec2 pcfKernel[PCF_KERNEL_SIZE];\n#endif\n\n@import qtek.plugin.shadow_map_common\n\n#if defined(SPOT_LIGHT_SHADOWMAP_COUNT)\n\nvoid computeShadowOfSpotLights(vec3 position, inout float shadowContribs[SPOT_LIGHT_COUNT] ) {\n float shadowContrib;\n for(int _idx_ = 0; _idx_ < SPOT_LIGHT_SHADOWMAP_COUNT; _idx_++) {{\n shadowContrib = computeShadowContrib(\n spotLightShadowMaps[_idx_], spotLightMatrices[_idx_], position,\n spotLightShadowMapSizes[_idx_]\n );\n shadowContribs[_idx_] = shadowContrib;\n }}\n for(int _idx_ = SPOT_LIGHT_SHADOWMAP_COUNT; _idx_ < SPOT_LIGHT_COUNT; _idx_++){{\n shadowContribs[_idx_] = 1.0;\n }}\n}\n\n#endif\n\n\n#if defined(DIRECTIONAL_LIGHT_SHADOWMAP_COUNT)\n\n#ifdef SHADOW_CASCADE\n\nvoid computeShadowOfDirectionalLights(vec3 position, inout float shadowContribs[DIRECTIONAL_LIGHT_COUNT]){\n float depth = (2.0 * gl_FragCoord.z - gl_DepthRange.near - gl_DepthRange.far)\n / (gl_DepthRange.far - gl_DepthRange.near);\n\n float shadowContrib;\n shadowContribs[0] = 1.0;\n\n for (int _idx_ = 0; _idx_ < SHADOW_CASCADE; _idx_++) {{\n if (\n depth >= shadowCascadeClipsNear[_idx_] &&\n depth <= shadowCascadeClipsFar[_idx_]\n ) {\n shadowContrib = computeShadowContrib(\n directionalLightShadowMaps[0], directionalLightMatrices[_idx_], position,\n directionalLightShadowMapSizes[0],\n vec2(1.0 / float(SHADOW_CASCADE), 1.0),\n vec2(float(_idx_) / float(SHADOW_CASCADE), 0.0)\n );\n shadowContribs[0] = shadowContrib;\n }\n }}\n for(int _idx_ = DIRECTIONAL_LIGHT_SHADOWMAP_COUNT; _idx_ < DIRECTIONAL_LIGHT_COUNT; _idx_++) {{\n shadowContribs[_idx_] = 1.0;\n }}\n}\n\n#else\n\nvoid computeShadowOfDirectionalLights(vec3 position, inout float shadowContribs[DIRECTIONAL_LIGHT_COUNT]){\n float shadowContrib;\n\n for(int _idx_ = 0; _idx_ < DIRECTIONAL_LIGHT_SHADOWMAP_COUNT; _idx_++) {{\n shadowContrib = computeShadowContrib(\n directionalLightShadowMaps[_idx_], directionalLightMatrices[_idx_], position,\n directionalLightShadowMapSizes[_idx_]\n );\n shadowContribs[_idx_] = shadowContrib;\n }}\n for(int _idx_ = DIRECTIONAL_LIGHT_SHADOWMAP_COUNT; _idx_ < DIRECTIONAL_LIGHT_COUNT; _idx_++) {{\n shadowContribs[_idx_] = 1.0;\n }}\n}\n#endif\n\n#endif\n\n\n#if defined(POINT_LIGHT_SHADOWMAP_COUNT)\n\nvoid computeShadowOfPointLights(vec3 position, inout float shadowContribs[POINT_LIGHT_COUNT] ){\n vec3 lightPosition;\n vec3 direction;\n for(int _idx_ = 0; _idx_ < POINT_LIGHT_SHADOWMAP_COUNT; _idx_++) {{\n lightPosition = pointLightPosition[_idx_];\n direction = position - lightPosition;\n shadowContribs[_idx_] = computeShadowContribOmni(pointLightShadowMaps[_idx_], direction, pointLightRange[_idx_]);\n }}\n for(int _idx_ = POINT_LIGHT_SHADOWMAP_COUNT; _idx_ < POINT_LIGHT_COUNT; _idx_++) {{\n shadowContribs[_idx_] = 1.0;\n }}\n}\n\n#endif\n\n#endif\n\n@end";


/***/ }),
/* 89 */
/***/ (function(module, exports) {


module.exports = "@export qtek.skybox.vertex\n\nuniform mat4 world : WORLD;\nuniform mat4 worldViewProjection : WORLDVIEWPROJECTION;\n\nattribute vec3 position : POSITION;\n\nvarying vec3 v_WorldPosition;\n\nvoid main()\n{\n v_WorldPosition = (world * vec4(position, 1.0)).xyz;\n gl_Position = worldViewProjection * vec4(position, 1.0);\n}\n\n@end\n\n@export qtek.skybox.fragment\n\nuniform mat4 viewInverse : VIEWINVERSE;\nuniform samplerCube environmentMap;\nuniform float lod: 0.0;\n\nvarying vec3 v_WorldPosition;\n\n@import qtek.util.rgbm\n\nvoid main()\n{\n vec3 eyePos = viewInverse[3].xyz;\n vec3 viewDirection = normalize(v_WorldPosition - eyePos);\n\n vec3 tex = decodeHDR(textureCubeLodEXT(environmentMap, viewDirection, lod)).rgb;\n\n#ifdef SRGB_DECODE\n tex.rgb = pow(tex.rgb, vec3(2.2));\n#endif\n\n gl_FragColor = encodeHDR(vec4(tex, 1.0));\n}\n@end";


/***/ }),
/* 90 */
/***/ (function(module, exports) {


module.exports = "\n@export qtek.util.rand\nhighp float rand(vec2 uv) {\n const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n highp float dt = dot(uv.xy, vec2(a,b)), sn = mod(dt, 3.141592653589793);\n return fract(sin(sn) * c);\n}\n@end\n\n@export qtek.util.calculate_attenuation\n\nuniform float attenuationFactor : 5.0;\n\nfloat lightAttenuation(float dist, float range)\n{\n float attenuation = 1.0;\n attenuation = dist*dist/(range*range+1.0);\n float att_s = attenuationFactor;\n attenuation = 1.0/(attenuation*att_s+1.0);\n att_s = 1.0/(att_s+1.0);\n attenuation = attenuation - att_s;\n attenuation /= 1.0 - att_s;\n return clamp(attenuation, 0.0, 1.0);\n}\n\n@end\n\n@export qtek.util.edge_factor\n\nfloat edgeFactor(float width)\n{\n vec3 d = fwidth(v_Barycentric);\n vec3 a3 = smoothstep(vec3(0.0), d * width, v_Barycentric);\n return min(min(a3.x, a3.y), a3.z);\n}\n\n@end\n\n@export qtek.util.encode_float\nvec4 encodeFloat(const in float depth)\n{\n \n \n const vec4 bitShifts = vec4(256.0*256.0*256.0, 256.0*256.0, 256.0, 1.0);\n const vec4 bit_mask = vec4(0.0, 1.0/256.0, 1.0/256.0, 1.0/256.0);\n vec4 res = fract(depth * bitShifts);\n res -= res.xxyz * bit_mask;\n\n return res;\n}\n@end\n\n@export qtek.util.decode_float\nfloat decodeFloat(const in vec4 color)\n{\n \n \n const vec4 bitShifts = vec4(1.0/(256.0*256.0*256.0), 1.0/(256.0*256.0), 1.0/256.0, 1.0);\n return dot(color, bitShifts);\n}\n@end\n\n\n@export qtek.util.float\n@import qtek.util.encode_float\n@import qtek.util.decode_float\n@end\n\n\n\n@export qtek.util.rgbm_decode\nvec3 RGBMDecode(vec4 rgbm, float range) {\n return range * rgbm.rgb * rgbm.a;\n }\n@end\n\n@export qtek.util.rgbm_encode\nvec4 RGBMEncode(vec3 color, float range) {\n if (dot(color, color) == 0.0) {\n return vec4(0.0);\n }\n vec4 rgbm;\n color /= range;\n rgbm.a = clamp(max(max(color.r, color.g), max(color.b, 1e-6)), 0.0, 1.0);\n rgbm.a = ceil(rgbm.a * 255.0) / 255.0;\n rgbm.rgb = color / rgbm.a;\n return rgbm;\n}\n@end\n\n@export qtek.util.rgbm\n@import qtek.util.rgbm_decode\n@import qtek.util.rgbm_encode\n\nvec4 decodeHDR(vec4 color)\n{\n#if defined(RGBM_DECODE) || defined(RGBM)\n return vec4(RGBMDecode(color, 51.5), 1.0);\n#else\n return color;\n#endif\n}\n\nvec4 encodeHDR(vec4 color)\n{\n#if defined(RGBM_ENCODE) || defined(RGBM)\n return RGBMEncode(color.xyz, 51.5);\n#else\n return color;\n#endif\n}\n\n@end\n\n\n@export qtek.util.srgb\n\nvec4 sRGBToLinear(in vec4 value) {\n return vec4(mix(pow(value.rgb * 0.9478672986 + vec3(0.0521327014), vec3(2.4)), value.rgb * 0.0773993808, vec3(lessThanEqual(value.rgb, vec3(0.04045)))), value.w);\n}\n\nvec4 linearTosRGB(in vec4 value) {\n return vec4(mix(pow(value.rgb, vec3(0.41666)) * 1.055 - vec3(0.055), value.rgb * 12.92, vec3(lessThanEqual(value.rgb, vec3(0.0031308)))), value.w);\n}\n@end\n\n\n@export qtek.chunk.skin_matrix\n\nmat4 skinMatrixWS;\nif (joint.x >= 0.0)\n{\n skinMatrixWS = skinMatrix[int(joint.x)] * weight.x;\n}\nif (joint.y >= 0.0)\n{\n skinMatrixWS += skinMatrix[int(joint.y)] * weight.y;\n}\nif (joint.z >= 0.0)\n{\n skinMatrixWS += skinMatrix[int(joint.z)] * weight.z;\n}\nif (joint.w >= 0.0)\n{\n skinMatrixWS += skinMatrix[int(joint.w)] * (1.0-weight.x-weight.y-weight.z);\n}\n@end\n\n\n\n@export qtek.util.parallax_correct\n\nvec3 parallaxCorrect(in vec3 dir, in vec3 pos, in vec3 boxMin, in vec3 boxMax) {\n vec3 first = (boxMax - pos) / dir;\n vec3 second = (boxMin - pos) / dir;\n\n vec3 further = max(first, second);\n float dist = min(further.x, min(further.y, further.z));\n\n vec3 fixedPos = pos + dir * dist;\n vec3 boxCenter = (boxMax + boxMin) * 0.5;\n\n return normalize(fixedPos - boxCenter);\n}\n\n@end\n\n\n\n@export qtek.util.clamp_sample\nvec4 clampSample(const in sampler2D texture, const in vec2 coord)\n{\n#ifdef STEREO\n float eye = step(0.5, coord.x) * 0.5;\n vec2 coordClamped = clamp(coord, vec2(eye, 0.0), vec2(0.5 + eye, 1.0));\n#else\n vec2 coordClamped = clamp(coord, vec2(0.0), vec2(1.0));\n#endif\n return texture2D(texture, coordClamped);\n}\n@end";


/***/ }),
/* 91 */
/***/ (function(module, exports) {


module.exports = "@export qtek.wireframe.vertex\n\nuniform mat4 worldViewProjection : WORLDVIEWPROJECTION;\nuniform mat4 world : WORLD;\n\nattribute vec3 position : POSITION;\nattribute vec3 barycentric;\n\n#ifdef SKINNING\nattribute vec3 weight : WEIGHT;\nattribute vec4 joint : JOINT;\n\nuniform mat4 skinMatrix[JOINT_COUNT] : SKIN_MATRIX;\n#endif\n\nvarying vec3 v_Barycentric;\n\nvoid main()\n{\n\n vec3 skinnedPosition = position;\n#ifdef SKINNING\n\n @import qtek.chunk.skin_matrix\n\n skinnedPosition = (skinMatrixWS * vec4(position, 1.0)).xyz;\n#endif\n\n gl_Position = worldViewProjection * vec4(skinnedPosition, 1.0 );\n\n v_Barycentric = barycentric;\n}\n\n@end\n\n\n@export qtek.wireframe.fragment\n\nuniform vec3 color : [0.0, 0.0, 0.0];\n\nuniform float alpha : 1.0;\nuniform float lineWidth : 1.0;\n\nvarying vec3 v_Barycentric;\n\n\n@import qtek.util.edge_factor\n\nvoid main()\n{\n\n gl_FragColor.rgb = color;\n gl_FragColor.a = (1.0-edgeFactor(lineWidth)) * alpha;\n}\n\n@end";


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";



    // TODO test
    var StaticGeometry = __webpack_require__(11);
    var Mesh = __webpack_require__(14);
    var Node = __webpack_require__(7);
    var StandardMaterial = __webpack_require__(29);
    var BoundingBox = __webpack_require__(4);
    var glMatrix = __webpack_require__(0);
    var mat4 = glMatrix.mat4;
    var vec3 = glMatrix.vec3;

    /**
     * @namespace qtek.util.mesh
     */
    var meshUtil = {
        /**
         * Merge multiple meshes to one.
         * Note that these meshes must have the same material
         *
         * @param {Array.<qtek.Mesh>} meshes
         * @param {boolean} applyWorldTransform
         * @return qtek.Mesh
         * @memberOf qtek.util.mesh
         */
        merge: function(meshes, applyWorldTransform) {

            if (! meshes.length) {
                return;
            }

            var templateMesh = meshes[0];
            var templateGeo = templateMesh.geometry;
            var material = templateMesh.material;

            var geometry = new StaticGeometry();
            geometry.boundingBox = new BoundingBox();

            var attributeNames = templateGeo.getEnabledAttributes();

            for (var i = 0; i < attributeNames.length; i++) {
                var name = attributeNames[i];
                var attr = templateGeo.attributes[name];
                // Extend custom attributes
                if (!geometry.attributes[name]) {
                    geometry.attributes[name] = attr.clone(false);
                }
            }

            var inverseTransposeMatrix = mat4.create();
            // Initialize the array data and merge bounding box
            var nVertex = 0;
            var nFace = 0;
            for (var k = 0; k < meshes.length; k++) {
                var currentGeo = meshes[k].geometry;
                if (currentGeo.boundingBox) {
                    currentGeo.boundingBox.applyTransform(applyWorldTransform ? meshes[k].worldTransform : meshes[k].localTransform);
                    geometry.boundingBox.union(currentGeo.boundingBox);
                }
                nVertex += currentGeo.vertexCount;
                nFace += currentGeo.triangleCount;
            }
            for (var n = 0; n < attributeNames.length; n++) {
                var name = attributeNames[n];
                var attrib = geometry.attributes[name];
                attrib.init(nVertex);
            }
            if (nVertex >= 0xffff) {
                geometry.indices = new Uint32Array(nFace * 3);
            }
            else {
                geometry.indices = new Uint16Array(nFace * 3);
            }

            var vertexOffset = 0;
            var indicesOffset = 0;
            var useIndices = templateGeo.isUseIndices();

            for (var mm = 0; mm < meshes.length; mm++) {
                var mesh = meshes[mm];
                var currentGeo = mesh.geometry;

                var nVertex = currentGeo.vertexCount;

                var matrix = applyWorldTransform ? mesh.worldTransform._array : mesh.localTransform._array;
                mat4.invert(inverseTransposeMatrix, matrix);
                mat4.transpose(inverseTransposeMatrix, inverseTransposeMatrix);

                for (var nn = 0; nn < attributeNames.length; nn++) {
                    var name = attributeNames[nn];
                    var currentAttr = currentGeo.attributes[name];
                    var targetAttr = geometry.attributes[name];
                    // Skip the unused attributes;
                    if (!currentAttr.value.length) {
                        continue;
                    }
                    var len = currentAttr.value.length;
                    var size = currentAttr.size;
                    var offset = vertexOffset * size;
                    var count = len / size;
                    for (var i = 0; i < len; i++) {
                        targetAttr.value[offset + i] = currentAttr.value[i];
                    }
                    // Transform position, normal and tangent
                    if (name === 'position') {
                        vec3.forEach(targetAttr.value, size, offset, count, vec3.transformMat4, matrix);
                    }
                    else if (name === 'normal' || name === 'tangent') {
                        vec3.forEach(targetAttr.value, size, offset, count, vec3.transformMat4, inverseTransposeMatrix);
                    }
                }

                if (useIndices) {
                    var len = currentGeo.indices.length;
                    for (var i = 0; i < len; i++) {
                        geometry.indices[i + indicesOffset] = currentGeo.indices[i] + vertexOffset;
                    }
                    indicesOffset += len;
                }

                vertexOffset += nVertex;
            }

            return new Mesh({
                material: material,
                geometry: geometry
            });
        },

        /**
         * Split mesh into sub meshes, each mesh will have maxJointNumber joints.
         * @param  {qtek.Mesh} mesh
         * @param  {number} maxJointNumber
         * @param  {boolean} inPlace
         * @return {qtek.Node}
         *
         * @memberOf qtek.util.mesh
         */
        splitByJoints: function(mesh, maxJointNumber, inPlace) {
            var geometry = mesh.geometry;
            var skeleton = mesh.skeleton;
            var material = mesh.material;
            var shader = material.shader;
            var joints = mesh.joints;
            if (!geometry || !skeleton || !joints.length) {
                return;
            }
            if (joints.length < maxJointNumber) {
                return mesh;
            }

            var shaders = {};

            var indices = geometry.indices;

            var faceLen = geometry.triangleCount;
            var rest = faceLen;
            var isFaceAdded = [];
            var jointValues = geometry.attributes.joint.value;
            for (var i = 0; i < faceLen; i++) {
                isFaceAdded[i] = false;
            }
            var addedJointIdxPerFace = [];

            var buckets = [];

            var getJointByIndex = function(idx) {
                return joints[idx];
            };
            while (rest > 0) {
                var bucketTriangles = [];
                var bucketJointReverseMap = [];
                var bucketJoints = [];
                var subJointNumber = 0;
                for (var i = 0; i < joints.length; i++) {
                    bucketJointReverseMap[i] = -1;
                }
                for (var f = 0; f < faceLen; f++) {
                    if (isFaceAdded[f]) {
                        continue;
                    }
                    var canAddToBucket = true;
                    var addedNumber = 0;
                    for (var i = 0; i < 3; i++) {

                        var idx = indices[f * 3 + i];

                        for (var j = 0; j < 4; j++) {
                            var jointIdx = jointValues[idx * 4 + j];

                            if (jointIdx >= 0) {
                                if (bucketJointReverseMap[jointIdx] === -1) {
                                    if (subJointNumber < maxJointNumber) {
                                        bucketJointReverseMap[jointIdx] = subJointNumber;
                                        bucketJoints[subJointNumber++] = jointIdx;
                                        addedJointIdxPerFace[addedNumber++] = jointIdx;
                                    }
                                    else {
                                        canAddToBucket = false;
                                    }
                                }
                            }
                        }
                    }
                    if (!canAddToBucket) {
                        // Reverse operation
                        for (var i = 0; i < addedNumber; i++) {
                            bucketJointReverseMap[addedJointIdxPerFace[i]] = -1;
                            bucketJoints.pop();
                            subJointNumber--;
                        }
                    }
                    else {
                        bucketTriangles.push(indices.subarray(f * 3, (f + 1) * 3));

                        isFaceAdded[f] = true;
                        rest--;
                    }
                }
                buckets.push({
                    triangles: bucketTriangles,
                    joints: bucketJoints.map(getJointByIndex),
                    jointReverseMap: bucketJointReverseMap
                });
            }

            var root = new Node({
                name : mesh.name
            });
            var attribNames = geometry.getEnabledAttributes();

            attribNames.splice(attribNames.indexOf('joint'), 1);
            // Map from old vertex index to new vertex index
            var newIndices = [];
            for (var b = 0; b < buckets.length; b++) {
                var bucket = buckets[b];
                var jointReverseMap = bucket.jointReverseMap;
                var subJointNumber = bucket.joints.length;

                var subMat = material.clone();
                if (material instanceof StandardMaterial) {
                    subMat.jointCount = subJointNumber;
                }
                else {
                    var subShader = shaders[subJointNumber];
                    if (!subShader) {
                        subShader = shader.clone();
                        subShader.define('vertex', 'JOINT_COUNT', subJointNumber);
                        shaders[subJointNumber] = subShader;
                    }
                    subMat.attachShader(subShader, true);
                }
                subMat.name = [material.name, b].join('-');

                var subGeo = new StaticGeometry();

                var subMesh = new Mesh({
                    name: [mesh.name, i].join('-'),
                    material: subMat,
                    geometry: subGeo,
                    skeleton: skeleton,
                    joints: bucket.joints.slice()
                });
                var nVertex = 0;
                var nVertex2 = geometry.vertexCount;
                for (var i = 0; i < nVertex2; i++) {
                    newIndices[i] = -1;
                }
                // Count sub geo number
                for (var f = 0; f < bucket.triangles.length; f++) {
                    var face = bucket.triangles[f];
                    for (var i = 0; i < 3; i++) {
                        var idx = face[i];
                        if (newIndices[idx] === -1) {
                            newIndices[idx] = nVertex;
                            nVertex++;
                        }
                    }
                }
                for (var a = 0; a < attribNames.length; a++) {
                    var attribName = attribNames[a];
                    var subAttrib = subGeo.attributes[attribName];
                    subAttrib.init(nVertex);
                }
                subGeo.attributes.joint.value = new Float32Array(nVertex * 4);

                if (nVertex > 0xffff) {
                    subGeo.indices = new Uint32Array(bucket.triangles.length * 3);
                }
                else {
                    subGeo.indices = new Uint16Array(bucket.triangles.length * 3);
                }

                var indicesOffset = 0;
                nVertex = 0;
                for (var i = 0; i < nVertex2; i++) {
                    newIndices[i] = -1;
                }

                for (var f = 0; f < bucket.triangles.length; f++) {
                    var triangle = bucket.triangles[f];
                    for (var i = 0; i < 3; i++) {

                        var idx = triangle[i];

                        if (newIndices[idx] === -1) {
                            newIndices[idx] = nVertex;
                            for (var a = 0; a < attribNames.length; a++) {
                                var attribName = attribNames[a];
                                var attrib = geometry.attributes[attribName];
                                var subAttrib = subGeo.attributes[attribName];
                                var size = attrib.size;

                                for (var j = 0; j < size; j++) {
                                    subAttrib.value[nVertex * size + j] = attrib.value[idx * size + j];
                                }
                            }
                            for (var j = 0; j < 4; j++) {
                                var jointIdx = geometry.attributes.joint.value[idx * 4 + j];
                                var offset = nVertex * 4 + j;
                                if (jointIdx >= 0) {
                                    subGeo.attributes.joint.value[offset] = jointReverseMap[jointIdx];
                                }
                                else {
                                    subGeo.attributes.joint.value[offset] = -1;
                                }
                            }
                            nVertex++;
                        }
                        subGeo.indices[indicesOffset++] = newIndices[idx];
                    }
                }
                subGeo.updateBoundingBox();

                root.add(subMesh);
            }
            var children = mesh.children();
            for (var i = 0; i < children.length; i++) {
                root.add(children[i]);
            }
            root.position.copy(mesh.position);
            root.rotation.copy(mesh.rotation);
            root.scale.copy(mesh.scale);

            if (inPlace) {
                if (mesh.getParent()) {
                    var parent = mesh.getParent();
                    parent.remove(mesh);
                    parent.add(root);
                }
            }
            return root;
        }
    };

    module.exports = meshUtil;


/***/ })
/******/ ]);
});