module.exports = {
  entry: './src/app.tsx',
  output: {
    filename: './wwwroot/js/bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.tsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.tsx$/, loader: 'ts-loader' },
      { test: /\.ts*$/, loader: 'ts-loader' }
    ]
  }
}
