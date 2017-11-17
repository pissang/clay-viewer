var shell = require('electron').shell;

export default function (url) {
    shell.openExternal(url);
}