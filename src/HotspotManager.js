var Base = require('qtek/lib/core/Base');
var Vector4 = require('qtek/lib/math/Vector4');

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