const path = require('node:path');
const webpack = require('webpack');
const env = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const pkg = require('./package.json');

console.log('version', pkg.version);

// 1. 先加载 .env（低优先级，作为默认值）
env.config({ path: path.resolve(__dirname, '.env') });

module.exports = (_, { mode }) => {
  // 2. 再加载 .env.[mode]，override 让环境文件覆盖 .env 中的同名变量
  env.config({
    path: path.resolve(__dirname, `.env.${mode}`),
    override: true
  });

  // 此处即可访问 env 文件中的变量
  console.log('[webpack] mode =', mode);
  console.log('[webpack] process.env.WEBPACK_ENV =', process.env.NODE_ENV);

  return {
    mode,
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, './dist')
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
        template: path.resolve(__dirname, './public/index.html')
      }),
      new VueLoaderPlugin(),
      // 3. 把变量注入前端业务代码，src 中可用 process.env.NODE_ENV
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        '__APP_VERSION__': JSON.stringify(pkg.version)
      })
    ]
  };
};
