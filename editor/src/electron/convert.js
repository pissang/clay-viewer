const fs = require('fs');
// const shell = require('shelljs');
const path = require('path');
const electron = require('electron');
const child_process = require('child_process');

// Modules for model converting
module.exports = function (files) {
    let appDataPath = electron.remote.app.getPath('documents');
    let QMVPath = `${appDataPath}/QTEK Model Viewer`;
    let modelTmpPath = `${QMVPath}/tmp/`;
    if (!fs.existsSync(QMVPath)) {
        fs.mkdirSync(QMVPath);
    }
    if (!fs.existsSync(modelTmpPath)) {
        fs.mkdirSync(modelTmpPath);
    }
    return Promise.all(files.map(function (file, idx) {
        return new Promise(function (resolve, reject) {
            FileAPI.readAsArrayBuffer(file, function (evt) {
                if (evt.type == 'load') {
                    fs.writeFile(modelTmpPath + file.name, new Buffer(evt.result), function () {
                        resolve(file.name);
                    });
                }
            });
        });
    })).then(function (nameList) {
        var firstModelFileName = nameList.find(function (name) {
            return path.extname(name) !== '.mtl';
        });
        return new Promise(function (resolve, reject) {
            let glTFFileName = path.basename(firstModelFileName, path.extname(firstModelFileName));
            let glTFPath = `${modelTmpPath}/${glTFFileName}.gltf`;
            let glTFBinPath = `${modelTmpPath}/${glTFFileName}.bin`;
            let fullPath = `${modelTmpPath}${firstModelFileName}`;

            child_process.execFile(
                path.join(electron.remote.app.getAppPath(), 'electron/convert/dist/fbx2gltf/fbx2gltf'),
                [fullPath], function (error, stdout, stderr
            ) {
                if (fs.existsSync(glTFPath)) {
                    resolve({
                        name: glTFFileName,
                        json: fs.readFileSync(glTFPath, 'utf-8'),
                        buffer: fs.readFileSync(glTFBinPath)
                    });
                }
                else {
                    reject(error || stderr || stdout);
                }
            });
        });
    });
}