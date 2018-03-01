var glob = require('glob');
var fs = require('fs');

glob(__dirname + '/../{src,editor}/**/*.glsl', function (err, files) {
    files.forEach(function (filePath) {
        var glslCode = fs.readFileSync(filePath, 'utf-8');
        // TODO Remove comment
        glslCode = glslCode.replace(/\/\/.*\n/g, '');
        glslCode = glslCode.replace(/ +/g, ' ');

        // var dir = path.dirname(filePath);
        // var baseName = path.basename(filePath, '.essl');
        fs.writeFileSync(
            filePath + '.js',
               'export default ' + JSON.stringify(glslCode) + ';\n',
            'utf-8'
        );
    });
});