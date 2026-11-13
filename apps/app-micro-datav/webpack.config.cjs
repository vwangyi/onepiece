const path = require('node:path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const pkg = require('./package.json');

// 必须和主应用 registerMicroApps 里的 name 保持一致
const APP_NAME = 'datav-app';

module.exports = {
  mode: 'development',
  entry: './src/app/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    // qiankun 要求子应用产物以 UMD 形式把生命周期挂到 window 上，
    // 否则主应用会报 You need to export lifecycle functions in xxx entry
    library: { name: APP_NAME, type: 'umd' },
    globalObject: 'window',
    chunkLoadingGlobal: `webpackJsonp_${pkg.name}`,
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
    // 子应用运行在主应用的页面里，编译错误不要糊住整个主应用
    client: { overlay: false },
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
    }),
    new webpack.DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: true,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true,
    }),
  ],
};
