var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'chai'],
        preprocessors: {
            '**/*.ts': ['webpack'],
        },
        webpack: {
            resolve: {
                extensions: ['', '.ts', '.js', '.tsx']
            },
            module: {                
                loaders: [
                  { test: /\.tsx$/, loader: 'ts-loader' },
                  { test: /\.ts*$/, loader: 'ts-loader' }
                ]
            }
        },
        files: [
            './**/*spec.ts'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome', 'PhantomJS'],
        captureTimeout: 60000,
        singleRun: false
    });
};