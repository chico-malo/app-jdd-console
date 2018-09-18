const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const buildDir = './build/dll';

const {NODE_ENV = 'development'} = process.env;

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/5/8
 */
module.exports = {
  entry: {
    polyfill: ['babel-polyfill', 'whatwg-fetch', 'es6-promise'],
    common: ['history', 'md5', 'object-path', 'lokijs', 'object-assign', 'classnames'],
    react: ['react', 'react-dom', 'react-redux', 'redux', 'redux-observable', 'react-router-dom', 'react-router-redux']
  },
  output: {
    path: path.join(__dirname, buildDir),
    filename: '[name].dll.js',
    library: '[name]_[hash]'
  },
  context: path.resolve(__dirname),
  mode: NODE_ENV,
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin([buildDir]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, buildDir, '[name].manifest.json'),
      name: '[name]_[hash]',
      context: __dirname
    })
  ]
};
