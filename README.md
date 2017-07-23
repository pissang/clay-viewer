# qtek-model-viewer

Simple 3D model viewer based on [QTEK](https://github.com/pissang/qtek)

## Basic Usage

```js
var viewer = new QMV.Viewer(document.getElementById('main'), {
    shadow: true,
    // Shading mode. 'standard'|'lambert'
    shader: 'standard'
});

// Load a glTF model
// Model will be fit in 10x10x10 automatically after load.
viewer.loadModel('asset/xiniu/xiniu_walk_as.gltf', function () {
    viewer.setCameraControl({
        // Alpha is rotation from bottom to up.
        alpha: 10,
        // Beta is rotation from left to right.
        beta: 30,
        distance: 20,
        // Min distance of zoom.
        minDistance: 1,
        // Max distance of zoom.
        maxDistance: 100,

        // Center of target.
        center: [0, 0, 0],

        // If auto rotate.
        autoRotate: false,

        // Degree per second.
        autoRotateSpeed: 60,

        // Direction of autoRotate. cw or ccw when looking top down.
        autoRotateDirection: 'cw',

        // Start auto rotating after still for the given time
        autoRotateAfterStill: 30
    });
    viewer.start();
});

// Add a hotspot with HTML. CSS needs to be stylized by yourself
var dom = viewer.addHotspot([5, 2, 0], `
    <div class="tip">1</div>
`);
dom.addEventListener('click', function () {
    alert('Do something');
});
```
