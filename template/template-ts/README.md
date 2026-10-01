## 技术栈

typescript + 面向对象 + webpack + jquery

## 构建器

ts
webpack
vite

##

pnpm i -D webpack@5 webpack-cli webpack-dev-server html-webpack-plugin typescript ts-loader fork-ts-checker-webpack-plugin

##

1. noEmit: true 不生成js
2. rewriteRelativeImportExtensions: true 库作者 源码写.ts后缀 编译后自动为.js
3. emitDeclarationOnly: true（仅生成类型声明）

需要满足上述三种情况之一 才可以配置 allowImportingTsExtensions：true

但更推荐allowImportingTsExtensions始终为false 且 import 导入时不要写.ts后缀 不管是 纯ts 还是 配合构建工具都不写.ts后缀

##

数据和界面 相分离

数据：容器组件
界面：渲染组件

容器组件数据 提取到 pinia

##
