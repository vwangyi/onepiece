# 搭建模版项目流程

## package.json

环境：node20

name
version
scripts
main 包入口文件
packageManager 包管理器
type: module // 包模块化规范 一个前端业务代码应该是module 但其他遵循commonjs配置文件 如 webpack.config.cjs babel.config.cjs 应该以 cjs结尾 不然受package.json的type影响

## webpack.config.cjs

环境：pnpm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin dotenv

entry 相对路径
output.path 绝对路径
插件 html-webpack-plugin 参数 template 绝对路径
插件 webpack.DefinePlugin 把环境变量文件注入到业务代码
通过 dotenv 读取 .env 环境变量

开发环境：npx webpack serve
生产环境：npx webpack

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

## TypeScript

环境：pnpm i -D typescript ts-loader fork-ts-checker-webpack-plugin vue-tsc

- tsconfig.json：`moduleResolution: "bundler"` 适配打包器场景；`noEmit: true` 只做类型检查（转译交给 babel/ts-loader）；`paths` 配置 `@/*` 与 webpack 的 resolve.alias 保持一致；`allowImportingTsExtensions` 允许 import 时显式写 `.ts` 扩展名
- loader 分工：ts-loader `transpileOnly: true` 只编译不做类型检查（快）；fork-ts-checker-webpack-plugin 在独立进程做类型检查（不阻塞构建）
- .vue 文件类型检查：vue-tsc，`pnpm type-check`
- env.d.ts：声明 `*.vue` 模块、webpack DefinePlugin 注入的 `__APP_*__` 全局常量、`__VUE_*__` 特性开关、静态资源模块
- 动态 import `./config.${env}.js` 时用 webpack `resolve.extensionAlias` 把 `.js` 映射回 `.ts` 源文件

## hmr

devServer.hot: true

## history路由

devServer.historyApiFallback: true

## 优化 - 代码分割

optimization.splitChunks

## 优化 - 代码压缩

optimization.minimize: true,
optimization.minimizer

## treeshaking

optimization.usedExports 为true

应该具名导入 而不是 整体导入
