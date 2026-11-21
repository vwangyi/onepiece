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
