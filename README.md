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
// Return an eventful object.
viewer.loadModel('asset/xiniu/xiniu_walk_as.gltf')
    // Model loaded. not include textures.
    .on('loadmodel', function (modelStat) {
        // Set camera options.
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

        // Set main light options.
        viewer.setMainLight({
            // Main light intensity
            intensity: config.lightIntensity,
            // Main light color string
            color: config.lightColor,
            // Alpha is rotation from bottom to up.
            alpha: config.lightAlpha,
            // Beta is rotation from left to right.
            beta: config.lightBeta
        });
        // Set ambient light options
        viewer.setAmbientLight({
            // Ambient light intensity
            intensity: config.ambientIntensity
        });

        viewer.start();
        
        // Add a hotspot with HTML. CSS needs to be stylized by yourself
        var dom = viewer.addHotspot([5, 2, 0], `
            <div class="tip">1</div>
        `);
        dom.addEventListener('click', function () {
            alert('Do something');
        });

        // Print model stat.
        console.log('Model loaded:');
        console.log('三角面：', modelStat.triangleCount);
        console.log('顶点：', modelStat.vertexCount);
        console.log('场景节点：', modelStat.nodeCount);
        console.log('Mesh：', modelStat.meshCount);
        console.log('材质：', modelStat.materialCount);
        console.log('纹理：', modelStat.textureCount);
    })
    .on('ready', function () {
        console.log('All loaded inlcuding textures.');
    })
    .on('error', function () {
        console.log('Model load error');
    });

```
