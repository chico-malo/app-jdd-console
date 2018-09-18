const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

/**
 * @author 田尘殇Sean(sean.snow@live.com) createAt 2018/3/9
 */
const buildDir = 'build/app';
const srcDirs = path.resolve(__dirname, 'src');
const scriptDir = 'javascript';
const styleDir = 'stylesheets';
const imagesDir = 'images';
const fontDir = 'fonts';
const fileDir = 'files';
const dll = ['polyfill', 'common', 'react'];

const {PROFILE = 'development', NODE_ENV = 'development'} = process.env;

const api = {
  development: {
    merchant: '',
    open: 'https://app.shangfudata.com/open/api'
  },
  beta: {
    merchant: 'http://apptest.shangfudata.com/merchant/api',
    open: 'http://apptest.shangfudata.com/open/api'
  },
  production: {
    merchant: 'https://merchant.shangfudata.com/api',
    open: 'https://app.shangfudata.com/open/api'
  }
};

const assets = [];

dll.forEach(dllName => assets.push({
  // Glob to match all of the dll file
  filepath: path.resolve(__dirname, `build/dll/${dllName}.dll.js`),
  publicPath: `./${scriptDir}`,
  outputPath: scriptDir,
  includeSourcemap: false
}));

function getImageLoader(mimetype) {
  return `url-loader?limit=10000&mimetype=${mimetype}&name=${imagesDir}/[name]-[hash].[ext]`;
}

module.exports = {
  entry: {
    app: './src/index.web.tsx'
  },
  output: {
    path: path.join(__dirname, buildDir),
    filename: `${scriptDir}/[name].[hash].bundle.js`,
    // necessary for HMR to know where to load the hot update chunks
    publicPath: './'
  },
  context: __dirname,
  resolve: {
    extensions: ['.ts', '.tsx', '.webpack.js', '.web.js', '.js', '.jsx', '.json', '.css', '.less', '.sass', 'scss', '.png', '.jpg', '.jpeg'],
    alias: {
      'react-native': path.resolve(__dirname, '../react-native'),
      common: path.resolve(__dirname, '../common')
    },
    modules: [
      'node_modules'
    ]
  },
  mode: NODE_ENV,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcDirs, 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      debug: PROFILE === 'development',
      api: api[PROFILE]
    }),
    new ExtractTextPlugin({
      filename: `${styleDir}/[name].[hash].style.css`
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new CleanWebpackPlugin([buildDir]),
    new webpack.NoEmitOnErrorsPlugin(),
    new AddAssetHtmlPlugin(assets),
    ...dll.map(dllName => new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require(`./build/dll/${dllName}.manifest.json`)
    }))
  ],
  module: {
    rules: [{
      test: /\.tsx?$/,
      include: [
        srcDirs,
        path.resolve(__dirname, '../react-native'),
        path.resolve(__dirname, '../common')
      ],
      enforce: 'pre',
      use: ['source-map-loader']
    }, {
      test: /\.tsx?$/,
      include: [
        srcDirs,
        path.resolve(__dirname, '../react-native'),
        path.resolve(__dirname, '../common')
      ],
      use: ['awesome-typescript-loader']
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'postcss-loader'
        ],
        publicPath: '../'
      })
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ],
        publicPath: '../'
      })
    }, {
      test: /\.gif/,
      use: getImageLoader('image/gif')
    }, {
      test: /\.jpg/,
      use: getImageLoader('image/jpg')
    }, {
      test: /\.png/,
      use: getImageLoader('image/png')
    }, {
      test: /\.svg/,
      use: getImageLoader('image/svg+xml')
    }, {
      test: /\.(woff|eot|ttf)/,
      use: [`file-loader?name=${fontDir}/[name]-[hash].[ext]`]
    }, {
      test: /\.(xlsx)/,
      use: [`file-loader?name=${fileDir}/[name]-[hash].[ext]`]
    }]
  }
};
