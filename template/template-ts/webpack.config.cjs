const path = require('node:path');
const webpack = require('webpack');
const { defineConfig } = webpack;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = defineConfig((_, { mode }) => {
  return {
    resolve: {
      extensions: ['.ts', '.js']
    },
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, './dist'),
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.ts/,
          use: ['ts-loader']
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html')
      })
    ],
    devServer: {
      port: 1236,
      open: true
    }
  };
});
