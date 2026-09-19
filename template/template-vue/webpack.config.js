const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const cwd = process.cwd();
console.log('process.env.WEBPACK_NODE_ENV =', process.env);
module.exports = (env, argv) => {
  console.log('env: ', env, argv); // 'local'
  console.log('WEBPACK_NODE_ENV: ', process.env.WEBPACK_NODE_ENV); // 'local'
  console.log('Production: ', env.production); // true
  return {
    dotenv: true, // 启用内置的 dotenv 插件
    mode: 'development',
    entry: './src/main.js',
    output: {
      path: path.resolve(cwd, './dist')
      // filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: {
            loader: 'vue-loader'
          }
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(cwd, './public/index.html')
      }),
      new VueLoaderPlugin()
    ]
  };
};
