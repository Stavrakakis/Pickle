module.exports = {
    entry: './app/App.tsx',
    watch: true,
    output: {
        filename: './wwwroot/js/bundle.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.tsx']
    },
    externals: {
        'jquery': '$'
    },
    module: {
        preLoaders: [
            { test: /\.ts$/, loader: "tslint" },
            { test: /\.tsx$/, loader: "tslint" }
        ],
        loaders: [
            { test: /\.tsx$/, loader: 'ts-loader' },
            { test: /\.ts*$/, loader: 'ts-loader' }
        ]
    },
    tslint: {
        failOnHint: true,
        configuration: require('./tslint.json')
    }
}
