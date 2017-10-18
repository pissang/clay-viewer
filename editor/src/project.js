import Filer from 'filer.js';

var filer = new Filer();
var filerInited = false;

function init(cb) {
    filer.init({
        persistent: true,
        size: 1024 * 1024 * 200
    }, function (fs) {
        filerInited = true;

        filer.mkdir('/project', false, function () {
            Promise.all([
                loadModelFromFS(),
                loadSceneFromFS()
            ]).then(function (result) {
                cb && cb(result[0][0], result[0][1], result[1]);
            });
        }, function (err) {
            swal('Create project error.' + err.toString());
        });
    }, function (err) {
        swal('Init error.' + err.toString());
    });
}

function saveModelFiles(files) {
    if (!filerInited) {
        swal('Not inited yet.');
    }
    function doSave() {
        filer.mkdir('/project/model', false, function () {
            var count = files.length;
            files.forEach(function (file) {
                filer.write('/project/model/' + file.name, { data: file, type: file.type }, function () {
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
    filer.ls('/project/model', function (entries) {
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

function saveSceneConfig(sceneCfg) {
    // FIXME Write file may failed
    filer.write('/project/scene.json', {
        data: JSON.stringify(sceneCfg, null, 2),
        type: 'application/json'
    }, function () {
        console.log('Saved scene');
    }, function (err) {
        console.error('Failed to save scene,' + err.toString());
    });
}

function loadSceneFromFS() {
    return new Promise(function (resolve, reject) {
        filer.create('/project/scene.json', true, function () {
            resolve(null);
        }, function () {
            // FIXME it will throw async error if file not exists
            filer.open('/project/scene.json', function (file) {
                FileAPI.readAsText(file, 'utf-8', function (evt) {
                    if (evt.type === 'load') {
                        resolve(JSON.parse(evt.result || '{}'));
                    }
                });
            }, function (err) {
                resolve(null);
            });
        });
    });
}

function loadModelFromFS() {
    return new Promise(function (resolve, reject) {
        filer.ls('/project/model', function (entries) {
            var files = [];
            entries = entries.filter(function (entry) {
                return entry.isFile;
            });
            entries.forEach(function (entry) {
                filer.open(entry, function (file) {
                    files.push(file);
                    if (files.length === entries.length) {
                        loadModelFiles(files, function (glTF, filesMap) {
                            resolve([glTF, filesMap]);
                        });
                    }
                });
            });
        }, function (err) {
            resolve([]);
        });
    });
}

function writeTextureImage(file) {
    filer.write('/project/model/' + file.name, { data: file, type: file.type }, function () {
        console.log('Writed file ' + file.name);
    }, function (err) {
        swal(err.toString());
    });
}

var filesMap = {};
function loadModelFiles(files, cb) {
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

function removeProject() {
    filer.rm('/project', function () {
        filer.mkdir('/project', false, function () {});
    });
}


export { init, saveModelFiles, loadModelFiles, saveSceneConfig, writeTextureImage, removeProject };