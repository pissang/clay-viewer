var filer = new Filer();
var filerInited = false;

function init(cb) {
    filer.init({
        persistent: true,
        size: 1024 * 1024 * 200
    }, function (fs) {
        filerInited = true;
        loadScene(cb);
    }, function (err) {
        swal(err.toString());
    });
}

function saveSceneFiles(files) {
    if (!filerInited) {
        swal('Not inited yet.');
    }
    function doSave() {
        filer.mkdir('/project/scene', false, function () {
            var count = files.length;
            files.forEach(function (file) {
                filer.write('/project/scene/' + file.name, { data: file, type: file.type }, function () {
                    count--;
                    if (count === 0) {
                    }
                }, function (err) {
                    swal(err.toString());
                });
            });
        }, function (err) {
            swal(err.toString());
        });
    }
    filer.ls('/project/scene', function (entries) {
        var count = entries.length;
        if (count === 0) {
            doSave();
        }
        entries.forEach(function (entry) {
            filer.rm(entry, function () {
                count--;
                if (count === 0) {
                    doSave();
                }
            });
        });
    }, function (err) {
        doSave();
    });
}

function loadScene(cb) {
    filer.ls('/project/scene', function (entries) {
        var files = [];
        entries = entries.filter(function (entry) {
            return entry.isFile;
        });
        entries.forEach(function (entry) {
            filer.open(entry, function (file) {
                files.push(file);
                if (files.length === entries.length) {
                    loadSceneFiles(files, cb);
                }
            });
        });
    }, function (err) {
        cb();
    });
}

var filesMap = {};
function loadSceneFiles(files, cb) {
    var glTFFile = files.find(function (file) {
        return file.name.match(/.gltf$/);
    });
    if (!glTFFile) {
        swal('glTF file nout found');
    }

    // Unload urls after use
    for (var name in filesMap) {
        URL.revokeObjectURL(filesMap[name]);
    }
    filesMap = {};

    function readAllFiles(cb) {
        var count = 0;
        files.forEach(function (file) {
            if (file !== glTFFile) {
                count++;
                filesMap[file.name] = URL.createObjectURL(file);
            }
        });
        cb && cb(filesMap);
    }
    FileAPI.readAsText(glTFFile, 'utf-8', function (evt) {
        if (evt.type == 'load') {
            // Success
             var json = JSON.parse(evt.result);
             readAllFiles(function (filesMap) {
                cb && cb(json, filesMap);
             });
        } else if(evt.type =='progress'){
            var pr = evt.loaded / evt.total * 100;
        }
    });
}


export { init, saveSceneFiles, loadSceneFiles };