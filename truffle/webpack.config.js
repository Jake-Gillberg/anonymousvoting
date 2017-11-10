const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    admin: './app/javascripts/admin.js',
    livefeed: './app/javascripts/livefeed.js',
    vote: './app/javascripts/vote.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './app/admin.html', to: "admin.html" },
      { from: './app/livefeed.html', to: "livefeed.html" },
      { from: './app/vote.html', to: "vote.html" },
      { from: './app/stylesheets', to: "stylesheets" },
      { from: './app/images', to: "images" },
      { from: './app/javascripts/deps', to: "deps" }
    ])
  ],
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      }
    ],
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },
  devServer: {
    host: '0.0.0.0'
  }
}
