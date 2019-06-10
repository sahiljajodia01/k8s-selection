var path = require('path');

module.exports = {
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'switchcluster/js'),
        filename: 'index.js',
        libraryTarget: 'umd'
    },
    externals: ['base/js/namespace', 'jquery', 'base/js/dialog', 'require', 'base/js/events',
                'base/js/keyboard', 'base/js/utils', 'services/config'],
    module: {
        rules: [{
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: true
                }
            }],
        },
        {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ["env"],
                    "babelrc": false,
                }
            }
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }
        ]
    }
};
