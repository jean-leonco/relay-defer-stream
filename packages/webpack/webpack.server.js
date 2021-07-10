const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');

const cwd = process.cwd();

const src = path.resolve(cwd, 'src');

const packages = [];
const packagesPath = packages.map((pkg) => path.resolve(cwd, '..', pkg));

module.exports = {
  context: cwd,
  target: 'node',
  stats: 'errors-only',
  node: {
    __dirname: true,
  },
  entry: {
    server: [path.resolve(src, 'index.ts')],
  },
  output: {
    path: path.resolve(cwd, 'build'),
    filename: 'server.js',
  },
  externals: [
    webpackNodeExternals(),
    webpackNodeExternals({
      modulesDir: path.resolve(cwd, '../../node_modules'),
      allowlist: [/@workspace/],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
  },
  module: {
    rules: [
      // ECMAScript modules: Use Javascript to load files
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },

      // Typescript and Javascript: Transpile and load using babel-loader
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        use: 'babel-loader?cacheDirectory=true',
        exclude: [/node_modules/],
        include: [src, ...packagesPath],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
