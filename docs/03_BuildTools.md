## ======================================= webpack =======================================

## webpack打包模式

webpack打包模式 指定 mode 为 developement 或 production

## webpack打包入口

打包入口是 entry 配置一个相对路径。

```js

```

## webpack打包出口

打包出口是 output.path 配置一个绝对路径。

## webpack的源码映射

通过 devtool 指定为 'source-map'

## webpack指定模版文件

webpack 指定模版文件 通过 html-webpack-plugin插件 传配置项 template 给一个绝对路径。

## webpack开发服务器

webpack开发服务器 需要安装 webpack-dev-server 通过 npx webpack serve 启动开发服务器。

## webpack注入变量到业务代码

通过 webpack.DefinePlugin()插件 传一个配置项
key是注入的变量名
value是注入的变量值 字符串需要用JSON.strtingfly包裹一下。

```js
const webpack = require('webpack');
export default {
  plugins: [
    new window.DefinePlugin({
      key: JSON.stringfly('string'),
    }),
  ],
};
```

## webpack环境安装

环境：pnpm i -D webpack@5 webpack-cli@5

## webpack 插件

plugins 用来扩展webapck功能

plugins: [],数组

## webpack loader

loader是用来处理非js文件

## webpack开发服务器打开history路由

通过 devServer.historyApiFallback 为 true

## output.publicPath

output.publicPath 资源加载前缀 部署到 根路径 就是 / , 部署到 子路径 就是 /子路径/ ， 默认是 空字符串表示 相对index.html

## 处理ts

通过 ts-loader 做编译 用 ForkTsCheckerWebpackPlugin 做类型检查。

## ======================================= webpack =======================================

## babel.config.cjs 如果需要兼容性就用babel

polyfill：pnpm i -D core-js regenerator-runtime

## vue

环境：
pnpm i -S vue
pnpm i -D vue-loader babel-loader

loader：vue-loader babel-loader
plugin: vue-loader.VueLoaderPlugin

## 插件调用

从module.rules 数组里面匹配 test 正则 ，匹配成功就 从use数组里面 从右向左依次调用loader

use.loader是loader名称
use.option是loader参数

## tsconfig.json

环境：pnpm i -D typescript ts-loader fork-ts-checker-webpack-plugin vue-tsc

loader：ts-loader 参数transpileOnly: true 只编译不做检测（快）
插件：fork-ts-checker-webpack-plugin （单独进程做检测 不阻塞构建）

compilerOptions.moduleResolution 为bundler 指定为构建工具打包场景
compilerOptions.noEmit true 不产出js文件 只做类型检测，编译交给ts-loader
compilerOptions.paths 和 路径别名一致
compilerOptions.allowImportingTsExtensions 为true 表示允许导入ts时，写.ts后缀

类型声明文件：全局变量

- .vue 文件类型检查：vue-tsc，`pnpm type-check`

## hmr

devServer.hot: true

## webpack代码分割

optimization.splitChunks

## webpack代码压缩

optimization.minimize: true,
optimization.minimizer

## treeshaking

optimization.usedExports 为true

应该具名导入 而不是 整体导入
