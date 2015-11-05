var webpack = require('webpack');

module.exports = function (config) {
    config.set({
        frameworks: ['mocha', 'chai', 'sinon'],
        preprocessors: {
            './**/*spec.ts': ['webpack'],
        },
        webpack: {
            resolve: {
                extensions: ['', '.ts', '.js', '.tsx']
            },
            externals: {sinon: "sinon"},
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