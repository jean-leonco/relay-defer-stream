const server = require('./webpack.server');

const ReloadServerPlugin = require('./ReloadServerPlugin');

// @TODO - share some web and server config configuration
module.exports = {
  server,
  ReloadServerPlugin,
};
