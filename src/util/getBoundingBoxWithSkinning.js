var BoundingBox = require('qtek/lib/math/BoundingBox');
var glmatrix = require('qtek/lib/dep/glmatrix');
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