const path = require('path');

const WebpackNodeExternals = require('webpack-node-externals');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const packages = [];

module.exports = {
  target: 'node',
  stats: 'errors-only',
  node: {
    __dirname: true,
  },
  entry: {
    server: ['./src/index.ts'],
  },
  output: {
    path: path.resolve('build'),
    filename: 'server.js',
  },
  externals: [
    WebpackNodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
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
        use: 'babel-loader',
        exclude: [/node_modules/],
        include: [path.resolve('src'), ...packages.map(pkg => path.resolve(__dirname, `../${pkg}`))],
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};
