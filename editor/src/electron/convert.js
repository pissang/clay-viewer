const fs = require('fs');
const shell = require('shelljs');
const path = require('path');
const electron = require('electron');

// Modules for model converting
module.exports = function (files) {
    let appDataPath = electron.remote.app.getPath('documents');
    let QMVPath = `${appDataPath}/QTEK Model Viewer`;
    let modelTmpPath = `${QMVPath}/tmp/`;
    console.log(appDataPath);
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
        return new Promise(function (resolve, reject) {
            let glTFFileName = path.basename(nameList[0], path.extname(nameList[0]));
            let glTFPath = `${modelTmpPath}/${glTFFileName}.gltf`;
            let glTFBinPath = `${modelTmpPath}/${glTFFileName}.bin`;
            let fullPath = `${modelTmpPath}${nameList[0]}`.replace(/ /g, '\\ ');
            shell.exec(`./electron/convert/dist/fbx2gltf/fbx2gltf ${fullPath}`, {
                async: true
            }, function (code, stdout, stderr) {
                if (fs.existsSync(glTFPath)) {
                    resolve({
                        name: glTFFileName,
                        json: fs.readFileSync(glTFPath, 'utf-8'),
                        buffer: fs.readFileSync(glTFBinPath)
                    });
                }
                else {
                    reject(stdout);
                }
            });
        });
    });
}