const path = require('path');

const { HotModuleReplacementPlugin } = require('webpack');

const { server, ReloadServerPlugin } = require('@workspace/webpack');

module.exports = {
  ...server,
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  watch: true,
  plugins: [
    ...server.plugins,
    new ReloadServerPlugin({
      script: path.resolve('build', 'server.js'),
    }),
    new HotModuleReplacementPlugin(),
  ],
};
