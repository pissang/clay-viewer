import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: __dirname + '/index.js',
    plugins: [
        nodeResolve(),
        commonjs()
    ],
    // sourceMap: true,
    output: [
        {
            format: 'umd',
            // Old name
            name: 'QMV',
            file: 'dist/clay-viewer.js'
        }
    ]
};