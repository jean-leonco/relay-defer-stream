const config = require('@workspace/babel');

process.env.WEBPACK_DEV_SERVER && config.plugins.push('react-refresh/babel');

module.exports = config;
