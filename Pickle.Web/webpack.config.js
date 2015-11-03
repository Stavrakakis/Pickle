module.exports = {
  entry: './app/App.tsx',
  output: {
    filename: './wwwroot/js/bundle.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.tsx']
  },
  module: {
    loaders: [
      { test: /\.tsx$/, loader: 'ts-loader' },
      { test: /\.ts*$/, loader: 'ts-loader' }
    ]
  }
}
