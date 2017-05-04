var PROD = process.argv.indexOf('-p') >= 0;
var webpack = require('webpack');
var CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

module.exports = {
    plugins: [
        new CaseSensitivePathsPlugin({}),
        new webpack.DefinePlugin({
            'typeof __DEV__': JSON.stringify('boolean'),
            __DEV__: PROD ? false : true
        })
    ],
    entry: {
        'QMV': __dirname + '/index.js'
    },
    output: {
        libraryTarget: 'umd',
        library: ['QMV'],
        path: __dirname + '/dist',
        filename: PROD ? '[name].min.js' : '[name].js'
    }
};