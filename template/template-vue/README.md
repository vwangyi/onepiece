# 搭建模版项目流程

## package.json

环境：node20

name
version
main
scripts
packageManager

## webpack.config.js

环境：pnpm i -D webpack webpack-cli webpack-dev-server html-webpack-plugin

entry 相对路径
output.path 绝对路径
output.filename
插件 html-webpack-plugin 参数 template 绝对路径
开发环境：npx webpack serve
生产环境：npx webpack

## vue

环境：
pnpm i -S vue
pnpm i -D vue-loader babel-loader

loader：vue-loader babel-loader
plugin: vue-loader里面的VueLoaderPlugin
