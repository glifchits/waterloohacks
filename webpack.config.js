var path = require('path');
var webpack = require('webpack');
var pwd = path.resolve(__dirname);

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/App.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProgressPlugin(function(percentage, message) {
      process.stdout.write('.');
      if (percentage === 1) {
        process.stdout.write('\n\n');
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: path.join(__dirname, 'src')
      }
    ]
  },
  resolve: {
    alias: {
      app: pwd + '/src'
    },
    extensions: ['', '.js', '.jsx', '.json']
  }
};
