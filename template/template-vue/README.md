# 搭建模版项目流程

## package.json

环境：node20

name
version
main
scripts
packageManager

## webpack.config.js

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
