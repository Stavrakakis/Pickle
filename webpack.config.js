module.exports = {
  entry: './src/app.tsx',
  output: {
    filename: 'src/bundle.js'
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
