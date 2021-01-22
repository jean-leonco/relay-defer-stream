const path = require('path');

const { HotModuleReplacementPlugin } = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { web } = require('@workspace/webpack');

const PORT = 8001;

module.exports = {
  ...web,
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
  plugins: [...web.plugins, new ReactRefreshWebpackPlugin(), new HotModuleReplacementPlugin()],
};
