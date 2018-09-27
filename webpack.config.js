const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const sharedPlugins = [
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({template: 'index.ejs'}),
]

module.exports = {
  context: __dirname + '/src',
  devtool: debug ? 'inline-sourcemap' : false,
  mode: debug ? 'development' : 'production',
  entry: './app.js',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['vue-style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.vue', '.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    },
  },
  devServer: {
    historyApiFallback: true,
  },
  output: {
    publicPath: '/',
    path: __dirname + '/build/',
    filename: 'app.min.js',
  },
  plugins: debug ? sharedPlugins.concat([]) : sharedPlugins.concat([
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]),
};
