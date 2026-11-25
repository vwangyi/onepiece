## webpack打包入口

- entry 配置一个相对路径。

## webpack打包出口

- output.path 配置一个绝对路径。

## webpack指定模版文件

html-webpack-plugin 传一个template绝对路径

## webpack开发服务器

webpack开发服务器 需要安装 webpack-dev-server 通过 npx webpack serve 启动开发服务器。

## webpack.DefinePlugin

webpack.DefinePlugin 负责注入变量到业务代码中。
传一个配置对象，key是注入的变量名，value是注入的变量值，如果是字符串需要用JSON.strtingfly包裹一下。

## webpack环境安装

环境：pnpm i -D webpack@5 webpack-cli@5

## webpack 插件

plugins 用来扩展webapck功能

plugins: [],数组

## webpack loader

loader是用来处理非js文件，把非js文件转为js文件。

## webpack开发服务器打开history路由

通过 devServer.historyApiFallback 为 true

## 处理ts

ts-loader负责把ts编译为js。
fork-ts-checker-webpack-plugin 负责做类型检查。

## 处理vue

vue-loader 负责把vue编译为js。
VueLoaderPlugin 负责把script和style当成js和css处理。

## webpack打包模式

webpack打包模式 指定 mode 为 developement 或 production

## output.publicPath

output.publicPath 资源加载前缀 部署到 根路径 就是 / , 部署到 子路径 就是 /子路径/ ， 默认是 空字符串表示 相对index.html

## webpack的源码映射

通过 devtool 指定为 'source-map'

## ======================================= webpack =======================================
