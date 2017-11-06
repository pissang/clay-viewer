const webpack = require('webpack');
const path = require('path');

let target = (process.env.TARGET || 'browser').toLowerCase();
let isElectron = target === 'electron';

module.exports = {
    entry: __dirname + '/src/main.js',
    resolve: {
      alias: {
        vendor: path.resolve(__dirname, isElectron ? 'src/electron' : 'src/browser')
      }
    },
    plugins: [new webpack.DefinePlugin({
      'process.env.TARGET': JSON.stringify(process.env.TARGET)
    })],
    output: {
      filename: isElectron ? 'electron/bundle.js' : 'bundle.js'
    },
    target: isElectron ? 'electron-renderer' : 'web'
  };