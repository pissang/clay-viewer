# qtek-model-viewer

Simple 3D model viewer based on [QTEK](https://github.com/pissang/qtek)

## Loader

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
            intensity: 1,
            // Main light color string
            color: '#fff',
            // Alpha is rotation from bottom to up.
            alpha: 45,
            // Beta is rotation from left to right.
            beta: 45
        });
        // Set ambient light options
        viewer.setAmbientLight({
            // Ambient light intensity
            intensity: 0.8
        });

        viewer.start();

        // Load extra animation glTF
        viewer.loadAnimation('asset/xiniu/xiniu_stand_as.gltf')
            .on('success', function () {
                console.log('Changed animation')
            });
        // Animation pause and start
        viewer.pauseAnimation();
        viewer.resumeAnimation();

        
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

## Converter

qtek provide a python tool for converting FBX to glTF.

https://github.com/pissang/qtek/blob/master/tools/fbx2gltf.py

```
usage: fbx2gltf.py [-h] [-e EXCLUDE] [-t TIMERANGE] [-o OUTPUT] [-f FRAMERATE]
                   [-p POSE]
                   file

FBX to glTF converter

positional arguments:
  file

optional arguments:
  -h, --help            show this help message and exit
  -e EXCLUDE, --exclude EXCLUDE
                        Data excluded. Can be: scene,animation
  -t TIMERANGE, --timerange TIMERANGE
                        Export animation time, in format
                        'startSecond,endSecond'
  -o OUTPUT, --output OUTPUT
                        Ouput glTF file path
  -f FRAMERATE, --framerate FRAMERATE
                        Animation frame per sencond
  -p POSE, --pose POSE  Static pose time

```


## Seperate scene and animation

Export scene

```bash
# exclude animation
fbx2gltf.py -e animation -p 0 xxx.fbx
```

Export animation

```bash
# exclude scene, 0 to 20 second, 20 framerate.
fbx2gltf.py -e scene -t 0,20 -f 20 -o xxx_ani.gltf xxx.fbx
```

Load scene and animation asynchronously

```js
viewer.loadModel('asset/xiniu/xiniu.gltf')
    // Model loaded. not include textures.
    .on('loadmodel', function (modelStat) {
        viewer.start();
        // Load extra animation glTF
        viewer.loadAnimation('asset/xiniu/xiniu_ani.gltf');
    });
```