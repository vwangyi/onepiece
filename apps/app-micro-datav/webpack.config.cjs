const path = require('node:path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.jsx', '.scss', '.css'],
    mainFiles: ['index'],
    alias: { '@': path.resolve(__dirname, './src') },
  },
  devServer: {
    port: 5020,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
      // title: process?.env?.APP_TITLE,
      // favicon: path.resolve(__dirname, './public/favicon.ico'),
      // templateParameters: { faviconVersion: pkg.version },
    }),
  ],
};
