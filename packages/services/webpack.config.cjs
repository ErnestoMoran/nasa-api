const path = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
const fs = require('fs')
const gracefulFs = require('graceful-fs')
gracefulFs.gracefulify(fs)

// const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
    context: __dirname,
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    entry: slsw.lib.entries,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', { targets: "defaults" }]],
                        sourceType: 'unambiguous'
                    }
                }
            }
        ],
    },
    target: 'node',
    externals: [
        // nodeExternals(),
        // necessary to avoid critical dependency error warning when packaging with webpack
        { mongoose: 'commonjs mongoose', encoding: 'encoding' },
    ],
    resolve: {
        cacheWithContext: true,
        modules: ['./lib', path.resolve('../../node_modules')],
        extensions: ['.tsx', '.ts', '.js','.mjs','.json'],
    },
    output: {
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
        },
    },
    plugins: [],
}

