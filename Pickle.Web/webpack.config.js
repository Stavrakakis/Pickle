var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: './app/App.tsx',
    watch: true,
    output: {
        path: './wwwroot/public',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.css', '.less', '.web.js', '.ts', '.js', '.tsx']
    },
    externals: {
        'jquery': '$'
    },
    plugins: [
        new ExtractTextPlugin('styles.css')
    ],
    module: {
        preLoaders: [
            { test: /\.ts$/, loader: 'tslint' },
            { test: /\.tsx$/, loader: 'tslint' }
        ],
        loaders: [
            { test: /\.tsx$/, loader: 'ts-loader' },
            { test: /\.ts*$/, loader: 'ts-loader' },
            {
                test: /\.less/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract('style', 'css!less')
            }
        ]
    },
    tslint: {
        failOnHint: true,
        configuration: require('./tslint.json')
    }
}
