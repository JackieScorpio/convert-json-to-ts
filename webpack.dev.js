const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3000,
    compress: true,
    allowedHosts: "all", // fix bug with insecure way: webpack-dev-server invalid host/origin header
    hot: true,
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, './src/public'),
    }
  },
});
