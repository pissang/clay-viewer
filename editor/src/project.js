import env from './env';
import { updateGLTFMaterials, mergeMetallicRoughness, mergeSpecularGlossiness, convertToBinary, TEXTURES } from './glTFHelper';
import convert from 'vendor/convert';
import mime from 'mime-types';
import downloadFile from 'vendor/download';


var fs;
var Buffer = BrowserFS.BFSRequire('buffer').Buffer;

var FS_NOT_PREPARED_ERROR = 'File system not prepared yet.';

function extname(fileName) {
    var idx = fileName.lastIndexOf('.');
    return idx >= 0 ? fileName.substr(idx + 1).toLowerCase() : '';
}
// Simple method handling mkdir and dirname.
function mkdir(path, parentDir) {
    var pathList = path.split('/');
    parentDir = parentDir || '';
    if (path.indexOf('/') === 0) {
        pathList.shift();
    }
    // Handle xxx//xxx
    pathList = pathList.filter(function (item) {
        return !!item;
    });
    return new Promise(function (resolve, reject) {
        if (!fs) {
            reject(FS_NOT_PREPARED_ERROR);
            return;
        }
        var current = pathList.shift();
        var dirName = parentDir + '/' + current;
        fs.mkdir(dirName, function (err) {
            if (!err || err.code === 'EEXIST') {
                if (pathList.length) {
                    mkdir(pathList.join('/'), dirName).then(resolve).catch(reject);
                }
                else {
                    resolve();
                }
            }
            else {
                reject(err.toString());
            }
        });
    });
}

function rmdir(path) {
    return new Promise(function (resolve, reject) {
        if (!fs) {
            reject(FS_NOT_PREPARED_ERROR);
            return;
        }

        ls(path).then(function (files) {
            return Promise.all(files.map(function (fileName) {
                return new Promise(function (resolve, reject) {
                    var filePath = path + '/' + fileName;
                    fs.lstat(filePath, function (err, stat) {
                        if (err) {
                            reject(err.toString());
                        }
                        else {
                            stat.isDirectory() 
                                ? rmdir(filePath).then(resolve, reject)
                                : fs.unlink(filePath, function (err) {
                                    err ? reject(err.toString()) : resolve();
                                });
                        }
                    });  
                });
            }));
        }, reject)
        .then(function () {
            fs.rmdir(path, function (err) {
                err ? reject(err.toString()) : resolve();
            });
        }, reject);
    });
}

function dirname(path) {
    var arr = path.split('/');
    arr.pop();
    return arr.join('/');
}

function writeFile(path, file) {
    return new Promise(function (resolve, reject) {
        if (!fs) {
            reject(FS_NOT_PREPARED_ERROR);
        }
        FileAPI.readAsArrayBuffer(file, function (evt) {
            if (evt.type === 'load') {
                fs.writeFile(path, Buffer.from(evt.result), function (err) {
                    // Don't know why there is EEXIST error.
                    if (err && err.code !== 'EEXIST') {
                        reject(err);
                    }
                    else {
                        console.log('Writed file ' + file.name + ' ' + evt.result.byteLength);
                        resolve();
                    }
                });
            }
        });
    });
}

function ls(path) {
    return new Promise(function (resolve, reject) {
        fs.readdir(path, function (err, files) {
            if (err) {
                reject(err);
            }
            else {
                resolve(files);
            }
        });
    });
}

function init(cb) {
    BrowserFS.install(window);
    // Configures BrowserFS to use the LocalStorage file system.
    BrowserFS.configure({
        fs: 'IndexedDB',
        options: {}
        // options: {
        //     size: 1024 * 1024 * 100,
        //     type: PERSISTENT
        // }
    }, function(e) {
        if (e) {
            // An error happened!
            throw e;
        }
        fs = BrowserFS.BFSRequire('fs');        

        mkdir('/project').then(function () {
            Promise.all([
                loadModelFromFS(),
                loadSceneFromFS()
            ]).then(function (result) {
                if (!result[0]) {
                    cb();
                }
                else {
                    cb && cb(result[0].glTF, result[0].filesMap, result[1]);
                }
            }).catch(function (err) {
                cb();
            });
        }, function (err) {
            cb();
        });
    });
}

function saveModelFiles(files) {
    function doSave() {
        return mkdir('/project/model').then(function () {
            return Promise.all(files.map(function (file) {
                return writeFile('/project/model/' + file.name, file);
            }));
        });
    }
        
    return rmdir('/project/model').then(function () {
        return doSave();
    }, function (err) {
        return doSave();
    });
}

function saveSceneConfig(sceneCfg) {
    return mkdir('/project').then(function () {
        return writeFile('/project/scene.json', new File(
            [JSON.stringify(sceneCfg)],
            'scene.json',
            { type: 'application/json' }
        ));
    });
}

function loadSceneFromFS() {
    return new Promise(function (resolve, reject) {
        if (!fs) {
            reject(FS_NOT_PREPARED_ERROR);
            return;
        }
        fs.readFile('/project/scene.json', 'utf-8', function (err, data) {
            if (err) {
                resolve(null);
            }
            else {
                var json = null;
                try {
                    json = JSON.parse(data);
                }
                catch(e) {
                    console.error(e);
                }
                resolve(json);
            }
        });
    });
}

function loadModelFromFS() {
    return readModelFilesFromFS().then(function (files) {
        return createModelFilesURL(files);
    });
}

function writeTextureImage(file) {
    return mkdir('/project/model').then(function () {
        return writeFile('/project/model/' + file.name, file);
    });
}

function removeProject() {
    return rmdir('/project');
}

function readModelFilesFromFS() {
    return ls('/project/model').then(function (files) {
        return Promise.all(files.map(function (fileName) {
            return new Promise(function (resolve, reject) {
                fs.readFile('/project/model/' + fileName, function (err, data) {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(new File(
                            [data],
                            fileName,
                            { type: mime.lookup(extname(fileName))}
                        ));
                    }
                });
            });
        }));
    });
}

/**
 * Create urls from files need for model loading.
 */
var currentFilesMap = {};
function createModelFilesURL(files) {
    return new Promise(function (resolve, reject) {
        var glTFFile = files.find(function (file) {
            return file.name.endsWith('.gltf');
        });
        var glBFile = files.find(function (file) {
            return file.name.endsWith('.glb');
        });
        if (!glTFFile && !glBFile) {
            if (process.env.TARGET === 'electron') {
                var validModelFiles = files.filter(function (file) {
                    var ext = extname(file.name);
                    return env.SUPPORTED_MODEL_FILES.indexOf(ext) >= 0;
                });
                if (validModelFiles.length > 0) {
                    convert(validModelFiles).then(function (result) {
                        var _buffer = result.buffer;
                        // Buffer to array buffer
                        var glTFBuffer = _buffer.buffer.slice(_buffer.byteOffset, _buffer.byteOffset + _buffer.byteLength);
                        afterFileConvert(result.name, result.json, glTFBuffer);
                    }, function (err) {
                        reject('Failed to convert model:' + err.toString());
                    });
                }
                else {
                    reject('No model file found');
                }
            }
            else {
                reject('No glTF file found');
            }
        }
        else {
            afterFileConvert();
        }

        function afterFileConvert(glTFName, glTFText, glTFBuffer) {
            files = files.filter(function (file) {
                return file.name.match(/.(gltf|bin|glb)$/)
                    || file.type.match(/image/);
            });
    
            // Unload urls after use
            for (var name in currentFilesMap) {
                URL.revokeObjectURL(currentFilesMap[name]);
            }
            var filesMap = {};
            currentFilesMap = filesMap;
    
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
    
            if (glTFText) {
                readAllFiles(function (filesMap) {
                    files.push(new File(
                        [glTFText], glTFName + '.gltf', { type: 'application/json' }
                    ), new File(
                        [glTFBuffer], glTFName + '.bin', { type: 'application/octet-stream' }
                    ));
                    resolve({
                        glTF: JSON.parse(glTFText), filesMap: filesMap, 
                        buffers: [glTFBuffer],
                        allFiles: files
                    });
                });
            }
            else {
                if (glBFile) {
                    FileAPI.readAsArrayBuffer(glBFile, function (evt) {
                        if (evt.type === 'load') {
                            readAllFiles(function (filesMap) {
                                resolve({
                                    glTF: evt.result, filesMap: filesMap, allFiles: files
                                });
                             });
                        }
                    });
                }
                else if (glTFFile) {
                    FileAPI.readAsText(glTFFile, 'utf-8', function (evt) {
                        if (evt.type === 'load') {
                            // Success
                            // TODO json parse maybe failed
                            var json;
                            try {
                                json = JSON.parse(evt.result);   
                            }
                            catch (e) {
                                resolve(null);
                                return;
                            }
                            readAllFiles(function (filesMap) {
                                resolve({
                                    glTF: json, filesMap: filesMap, allFiles: files
                                });
                             });
                        }
                    });
                }
            }
        }
    });
}

function downloadProject(format, onsuccess, onerror) {
    Promise.all([
        readModelFilesFromFS(),
        loadSceneFromFS()
    ]).then(function (result) {
        var files = result[0];
        var loadedSceneCfg = result[1];

        var zip = new JSZip();

        var glTFFile;
        var filesMap = {};
        files = (files || []).filter(function (file) {
            if (file.name.endsWith('.gltf')) {
                glTFFile = file;
            }
            else {
                filesMap[file.name] = file;
                return true;
            }
        });

        if (!glTFFile) {
            swal('No glTF file in project!');
            onerror && onerror();
            return;
        }

        Promise.all(loadedSceneCfg.materials.map(function (matConfig, idx) {
            // TODO Different material use same metalnessMap and roughnessMap.
            if (matConfig.metalnessMap || matConfig.roughnessMap) {
                var metalnessFile = filesMap[matConfig.metalnessMap];
                var roughnessFile = filesMap[matConfig.roughnessMap];
                return new Promise(function (resolve) {
                    mergeMetallicRoughness(metalnessFile, roughnessFile, matConfig.metalness, matConfig.roughness).then(function (canvas) {
                        var fileName = matConfig.name + '$' + idx + '_metallicRoughness.png';
                        var dataUrl = canvas.toDataURL();
                        dataUrl = dataUrl.slice('data:image/png;base64,'.length);
                        zip.file(fileName, dataUrl, {
                            base64: true
                        });
                        matConfig.metalnessMap = matConfig.roughnessMap = fileName;

                        console.log('Merged %s, %s to %s', matConfig.metalnessMap, matConfig.roughnessMap, fileName);

                        resolve();
                    });
                });
            }
            else if (matConfig.specularMap || matConfig.glossinessMap) {
                var specularFile = filesMap[matConfig.specularMap];
                var glossinessFile = filesMap[matConfig.glossinessMap];
                return new Promise(function (resolve) {
                    mergeSpecularGlossiness(specularFile, glossinessFile, matConfig.specularColor, matConfig.glossiness).then(function (canvas) {
                        var fileName = matConfig.name + '$' + idx + '_specularGlossiness.png';
                        var dataUrl = canvas.toDataURL();
                        dataUrl = dataUrl.slice('data:image/png;base64,'.length);
                        zip.file(fileName, dataUrl, {
                            base64: true
                        });
                        matConfig.specularMap = matConfig.glossinessMap = fileName;

                        console.log('Merged %s, %s to %s', matConfig.specularMap, matConfig.glossinessMap, fileName);

                        resolve();
                    });
                });
            }
            return null;
        }).filter(function (p) { return p != null; })).then(function () {
            FileAPI.readAsText(glTFFile, 'utf-8', function (e) {
                if (e.type == 'load') {
                    var newGLTF = updateGLTFMaterials(JSON.parse(e.result), loadedSceneCfg);
                    newGLTF.extensionsUsed = newGLTF.extensionsUsed || [];
                    if (newGLTF.extensionsUsed.indexOf('KHR_materials_pbrSpecularGlossiness') < 0) {
                        newGLTF.extensionsUsed.push('KHR_materials_pbrSpecularGlossiness');
                    }
                    ['extensionsUsed', 'images', 'textures', 'samplers', 'animations'].forEach(function (key) {
                        if (newGLTF[key] && !newGLTF[key].length) {
                            delete newGLTF[key];
                        }
                    });
                    if (!newGLTF.textures) {
                        delete newGLTF.samplers;
                    }
                    // Remove unused images
                    files = files.filter(function (file) {
                        if (file.type.match(/image/)) {
                            return newGLTF.images && newGLTF.images.some(function (img) {
                                return img.uri === file.name;
                            });
                        }
                        // Other is binary file.
                        else if (file.name.endsWith('.bin')) {
                            return true;
                        }
                    });
                    files.forEach(function (file) {
                        zip.file(file.name, file);         
                    });

                    if (format === 'glb') {
                        var binaryFiles = [];
                        var imageFiles = [];
                        zip.forEach(function (path, file) {
                            (path.endsWith('.bin') ? binaryFiles : imageFiles).push({
                                reader: zip.file(path).async('arraybuffer'),
                                name: path
                            });
                        });
                        Promise.all([
                            Promise.all(binaryFiles.map(function (a) {return a.reader; })),
                            Promise.all(imageFiles.map(function (a) { return a.reader; }))
                        ]).then(function (res) {
                            var ab = convertToBinary(newGLTF, res[0], res[1].reduce(function (obj, ab, idx) {
                                obj[imageFiles[idx].name] = ab;
                                return obj;
                            }, {}));
                            downloadFile(new Blob([ab], {type: 'model/json-binary'}), 'model.glb');
                            onsuccess && onsuccess();
                        }).catch(onerror);
                    }
                    else {
                        zip.file(glTFFile.name, JSON.stringify(newGLTF, null, 2));
                        zip.generateAsync({ type: 'blob' })
                        .then(function (blob) {
                            downloadFile(blob, 'model.zip');
                            onsuccess && onsuccess();
                        }).catch(onerror);
                    }
                }
            });
        });
    }).catch(function (err) {
        swal(err.toString());
        onerror && onerror();
    })
}


export {
    init,
    saveModelFiles,
    createModelFilesURL,
    saveSceneConfig,
    writeTextureImage,
    removeProject,
    downloadProject
};