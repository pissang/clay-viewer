import Base from 'claygl/src/core/Base';
import Vector4 from 'claygl/src/math/Vector4';
import BoundingBox from 'claygl/src/math/BoundingBox';

var DEFAULT_FAR_ALPHA = 0.1;
var DEFAULT_NEAR_ALPHA = 1.0;

var HotspotManger = Base.extend(function () {

    return {

        /**
         * @type {HTMLDomElement}
         */
        dom: null,

        /**
         * @type {clay.Renderer}
         */
        renderer: null,

        /**
         * @type {clay.camera.Perspective}
         */
        camera: null,

        _boundingBox: new BoundingBox(),

        /**
         * @type {HTMLDomElement}
         * @private
         */
        _hotspotRoot: null,

        _hotspots: []
    };
}, function () {
    if (!this.dom || !this.renderer || !this.camera) {
        throw new Error('Tip manager needs `root`,  `camera`, `renderer`');
    }

    var tipRoot = this._hotspotRoot = document.createElement('div');
    tipRoot.style.cssText = 'position:absolute;top:0;left:0;right:0;bottom:0;overflow:hidden;';
    this.dom.appendChild(tipRoot);
}, {

    setBoundingBox: function (min, max) {
        this._boundingBox.min.setArray(min);
        this._boundingBox.max.setArray(max);
    },

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
        var tmpBBox = new BoundingBox();
        this._hotspots.forEach(function (hotspot) {

            // Update position
            var p = hotspot.position;
            pos.set(p[0], p[1], p[2], 1);
            pos.transformMat4(this.camera.viewMatrix);
            var linearDepth = pos.z;

            pos.transformMat4(this.camera.projectionMatrix);
            pos.scale(1 / pos.w);

            var x = (pos.x + 1.0) * 0.5 * this.renderer.getWidth();
            var y = (pos.y + 1.0) * 0.5 * this.renderer.getHeight();

            hotspot.dom.style.left = x + 'px';
            hotspot.dom.style.top = this.renderer.getHeight() - y + 'px';

            // Upadte alpha
            var farAlpha = hotspot.farAlpha == null ? DEFAULT_FAR_ALPHA : hotspot.farAlpha;
            var nearAlpha = hotspot.nearAlpha == null ? DEFAULT_NEAR_ALPHA : hotspot.nearAlpha;

            tmpBBox.copy(this._boundingBox);
            tmpBBox.applyTransform(this.camera.viewMatrix);
            var percent = (linearDepth - tmpBBox.max.z) / (tmpBBox.min.z - tmpBBox.max.z);
            var alpha = Math.max(Math.min(percent, 1.0), 0.0) * (farAlpha - nearAlpha) + nearAlpha;

            hotspot.dom.style.opacity = 1;

            hotspot.onupdate && hotspot.onupdate(x, y);
        }, this);
    }
});

export default HotspotManger;