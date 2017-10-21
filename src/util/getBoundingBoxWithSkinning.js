import BoundingBox from 'qtek/src/math/BoundingBox';
import glmatrix from 'qtek/src/dep/glmatrix';
var vec3 = glmatrix.vec3;

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

    node.traverse(function (mesh) {
        if (mesh.geometry) {
            var tmpBBox = new BoundingBox();
            if (mesh.isSkinnedMesh()) {
                getBoundingBoxOfSkinningMesh(mesh, tmpBBox);
                mesh.geometry.boundingBox.copy(tmpBBox);
            }
            else {
                tmpBBox.copy(mesh.geometry.boundingBox);
                tmpBBox.applyTransform(mesh.worldTransform);
            }
            out.union(tmpBBox);
        }
    });
    return out;
}

export default getBoundingBoxWithSkinning;