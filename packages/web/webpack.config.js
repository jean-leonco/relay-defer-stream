const path = require('path');

const { HotModuleReplacementPlugin } = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const common = require('./webpack.common');

const PORT = 8001;

module.exports = {
  ...common,
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve('build'),
    hot: true,
    compress: true,
    port: PORT,
    publicPath: '/',
  },
  plugins: [
    ...common.plugins,
    new ReactRefreshWebpackPlugin(),
    new HotModuleReplacementPlugin(),
  ],
};
