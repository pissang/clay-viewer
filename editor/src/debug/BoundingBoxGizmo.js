import Mesh from 'claygl/src/Mesh';
import BoundingBox from 'claygl/src/math/BoundingBox';
import Material from 'claygl/src/Material';
import Shader from 'claygl/src/Shader';

import Lines3DGeometry from './Lines3DGeometry';
import lines3DGLSL from './lines3d.glsl.js';

Shader.import(lines3DGLSL);

var BOX_POINTS = [
    [-1, 1, 1], [1, 1, 1],
    [1, 1, 1], [1, -1, 1],
    [1, -1, 1], [-1, -1, 1],
    [-1, -1, 1], [-1, 1, 1],

    [-1, 1, -1], [1, 1, -1],
    [1, 1, -1], [1, -1, -1],
    [1, -1, -1], [-1, -1, -1],
    [-1, -1, -1], [-1, 1, -1],

    [-1, 1, 1], [-1, 1, -1],
    [1, 1, 1], [1, 1, -1],
    [-1, -1, 1], [-1, -1, -1],
    [1, -1, 1], [1, -1, -1]
];

var BoundingGzimo = Mesh.extend(function () {

    return {
        target: null,

        lineWidth: 3,

        ignorePicking: true,

        _boundingBox: new BoundingBox()
    };
}, function () {
    if (!this.geometry) {
        var geometry = this.geometry = new Lines3DGeometry({
            useNativeLine: false
        });
        geometry.setVertexCount(geometry.getLineVertexCount() * 12);
        geometry.setTriangleCount(geometry.getLineTriangleCount() * 12);
        geometry.resetOffset();
        for (var i = 0; i < BOX_POINTS.length; i += 2) {
            geometry.addLine(BOX_POINTS[i], BOX_POINTS[i + 1], [1, 1, 1, 1], this.lineWidth * window.devicePixelRatio);
        }
    }
    if (!this.material) {
        this.material = new Material({
            shader: new Shader({
                vertex: Shader.source('ecgl.meshLines3D.vertex'),
                fragment: Shader.source('ecgl.meshLines3D.fragment')
            })
        });
    }
}, {
    updateLocalTransform: function (force) {
        var bbox = this._boundingBox;
        if (this.target) {
            this.target.getBoundingBox(null, bbox);
            bbox.applyTransform(this.target.worldTransform);

            this.position.copy(bbox.max).add(bbox.min).scale(0.5);
            this.scale.copy(bbox.max).sub(bbox.min).scale(0.5);
        }

        Mesh.prototype.updateLocalTransform.call(this, force);
    }
});

export default BoundingGzimo;