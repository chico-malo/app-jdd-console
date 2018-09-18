/**
 * @author Sean sean.snow@live.com
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('../webpack.dev');

const host = '0.0.0.0';
const port = 3000;
// const api = 'https://merchant.shangfudata.com';
const api = 'http://192.168.88.15:7004';

const compiler = webpack(config);

const server = new WebpackDevServer(compiler, {
  contentBase: config.output.path,
  hot: true,
  compress: true,
  historyApiFallback: true,
  disableHostCheck: true,
  proxy: {
    '*': api,
  },
  quiet: false,
  watchOptions: {
    poll: 1000
  }
});

server.listen(port, host);
