const fs = require('fs');
const electron = require('electron');

export default function (file, fileName) {
    electron.remote.dialog.showSaveDialog({
        title: 'Download',
        defaultPath: fileName
    }, function (filePath) {
        FileAPI.readAsArrayBuffer(file, function (evt) {
            if (evt.type == 'load') {
                fs.writeFile(filePath, new Buffer(evt.result));
            }
        });
    });
}