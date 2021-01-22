const server = require('./webpack.server');
const web = require('./webpack.web');

const ReloadServerPlugin = require('./ReloadServerPlugin');

// @TODO - share some web and server config configuration
module.exports = {
  server,
  web,
  ReloadServerPlugin,
};
