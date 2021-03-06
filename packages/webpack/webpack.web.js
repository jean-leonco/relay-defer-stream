const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackDotEnv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// @TODO - add better way to import template html
const indexHtml = require('../web/src/index.html');

const cwd = process.cwd();

const src = path.resolve(cwd, 'src');

const packages = ['relay'];
const packagesPath = packages.map((pkg) => path.resolve(cwd, '..', pkg));

module.exports = {
  context: cwd,
  stats: 'errors-only',
  entry: {
    app: [path.resolve(src, 'index.tsx')],
  },
  output: {
    path: path.resolve(cwd, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
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

      // Typescript and Javascript: Transpile and load using happypack
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        use: 'babel-loader?cacheDirectory=true',
        exclude: [/node_modules/],
        include: [src, ...packagesPath],
      },

      // Images: Copy image files to build folder
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },

      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackDotEnv({ path: './.env' }),
    new HtmlWebpackPlugin({ templateContent: indexHtml }),
  ],
};
