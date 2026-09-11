

## 路径别名
路径别名是 通过resolve.alias 设置配置对象。key是@ value是src路径，表示 @映射为src路径
 比如 @: path.resolve(__dirname, 'src')

resolve.extensions: ['.vue', '.js'] 可以省略后缀 

```js
module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        extensions: ['.vue']
    }
}
```
## 搭建开发服务器
开发服务器就是 开发环境下本地启动服务，需要下载webpack-dev-server webpack-cli webpack库 
通过 npx webpack serve 启动 
通过 devServer 有默认值 是可选配置


通过 devServer.proxy 设置代理服务器 解决跨域问题
通过 devServer.historyApiFallback为true 设置history路由
通过 devServer.hot 为true开启 hmr热膜替换 

## HMR原理 热膜替换
hmr是什么
- devServer 监控能力 用webpack-dev-middleware 中间件实现 监控业务文件是否修改
- devServer 通知能力 用webpack-hot-middleware 中间件实现 通知页面重新请求最新的资源
- 内存：不会物理输出到磁盘 而是在内存中（更新内存 比 更新磁盘更快）



## 跨域问题

1. webpack5配置 devServer.proxy 数组 ,比如包含 /api开头的请求都走代理

## SourceMap 源码映射
通过devtool配置，devtool: 'eval-cheap-module-source-map',
缺点是对构建速度有一定影响 生产环境注意安全泄漏一般上传异常监控服务器 
好处是 快速定位源码错误的行列信息。

## 代码分割

通过 pnpm add -D webpack-bundle-analyzer 查看 最大的包 然后 采用 CDN 分包等



- 是什么
- 代码分割是 把js拆分成多个文件实现按需加载。而不是一次性加载所有js。


- 好处是
- 减少首屏加载时间，比如 不能在入口文件一次性引入antd，而是用到某个组件再按需引入。
- 按需加载，当用户点击后才加载 通过 调用import()函数
- 缓存第三方库基建代码 比如 vue antd组件库，业务代码会变动，基建代码不会变动。


- 多入口 entry: {}
- 单入口 splitChunks
- 动态导入 {异步导入、import()}


代码分割的使用场景
    路由懒加载：SPA 中每个路由对应一个 chunk。
    第三方库分离：把 React、Vue、ECharts 等单独打包。
    异步组件：比如弹窗、图表等非首屏组件。
    公共模块抽取：多个页面共用的工具函数、组件


总结：
    Webpack 代码分割就是把代码拆成多个文件，实现按需加载。主要通过三种方式：多入口配置、SplitChunksPlugin 抽取公共代码、动态 import() 语法。它的核心目的是优化首屏性能、提高缓存利用率。实际项目中，我通常会用动态 import 做路由懒加载，再用 splitChunks 把 node_modules 里的第三方库拆成 vendor 包。


文件哈希 

当文件内容一变，文件名的哈希就跟着变，浏览器就需要重新请求整个文件，而 对于 第三方库 不会经常升级修改，用户浏览器不会频繁请求第三方库的代码



## 减少打包体积 

- 按需引入 而不是 全量引入

- CDN 


 
## treeShaking是什么
treeShaking是树摇优化，通过移除没有使用的代码 来减少代码体积。
webpack5中 通过设置optimization.usedExports 为true 来开启树摇优化，true也是默认值。

通过esm来判断有没有使用。



## babal是什么

babel-loader



## webpack是什么
webpack时基于Nodejs的构建工具 像一个编译器，把开发时态的业务代码 编译为 运行时态的产物代码，最终可以让浏览器直接运行。


产物代码 既没有 esm 也没有commonjs 而是一个普通函数


安装 webpack和webpack-cli，虽然是cli命令 仍然推荐局部安装 npm i -D webpack webpack-cli  得到 webpack命令行命令

dev: "webpack --mode dev"
build: "webpack --mode prod"


webpack处理了 比如 模块化兼容性 ，比如 commonjs 导出 用 esm导入 可以直接用 
因为 webpack会处理兼容性，但是建议业务项目中统一用一种esm


 webpack是一个静态资源打包工具，

## webpack原理

## webpack构建流程
大概有3个阶段：初始阶段、编译阶段、输出阶段。
    ■ 初始阶段
      ● 通过启动命令 执行 webpack配置文件 创建一个编译器对象
    ■ 编译阶段
      ● 从入口文件开始，递归分析所有依赖模块。把项目中的业务文件 通过 loader 编译为 浏览器可识别的文件。
    ■ 输出阶段
      ● 把编译后模块 组合成 chunk 把chunk 转化为 bundle ，输出到文件系统中。


1. 初始化参数：从配置⽂件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：⽤上⼀步得到的参数初始化 Compiler 对象，加载所有配置的插件，执⾏对象的 run ⽅法开始执⾏编译；
3. 确定⼊⼝：根据配置中的 entry 找出所有的⼊⼝⽂件；
4. 编译模块：从⼊⼝⽂件出发，调⽤所有配置的 Loader 对模块进⾏翻译，再找出该模块依赖的模块，再递归本步骤直到所有⼊⼝依赖的⽂件都经过了本步骤的处理；
5. 完成模块编译：在经过第4步使⽤ Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据⼊⼝和模块之间的依赖关系，组装成⼀个个包含多个模块的 Chunk，再把每个 Chunk 转换成⼀个单独的⽂件加⼊到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和⽂件名，把⽂件内容写⼊到⽂件系统。 
在以上过程中，Webpack 会在特定的时间点⼴播出特定的事件，插件在监听到感兴趣的事件后会执⾏特定的逻辑，并且插件可以调⽤ Webpack 提供的 API 改变 Webpack 的运⾏结果。


## bundle、chunk、module是什么
- webpack输出的产物文件就是bundle。
- 静态资源就是 html css js 图片 视频 字体 等等资源文件 

## loader是什么

## plugin是什么



## entry

entry默认值是 ./src/index.js
默认出口是 ./dist/main.js
 

- 入口就是从哪个文件开始。
- 如果是一个入口 entry 就传 string格式的相对路径 
- 如果是多个入口 entry 就传 
相对于启动目录 npm run xxx 

-   output.filename： 'bundle.js'
- output.path: __dirname + '/dist'
- output.publicPath:'https://cdn.example.com/assets/[fullhash]/',
- output.publicPath:'' // __webpack_public_path__ = myRuntimePublicPath;

- 

## 问：打包需要足够的硬盘空间
打包需要充足的硬盘空间 如果没有充足的硬盘空间 会导致打出的包缺少东西 报 Object(...) not a function 

体现是 直接启动源码是可以的 打包出来就少东西 因为直接启动源码不需要硬盘只需要内存

打包出出来是 在内存中 写入到硬盘上



## webpack做了什么

1. 兼容模块化
2. 

## webpack编译原理
1. 初始化参数。执行 npm run dev 执行 webpack配置文件 导出一个最终配置对象
2. 编译阶段。创建编译器


1. 读取源码字符串
1. 处理loader数组： 通过modules.rules数组 
1. 生成AST抽象语法树：进行 词法分析 语法分析 语义分析 形成AST抽象语法树 
1. 保存到依赖树中
1. 替换依赖函数
1. 保存转换后的模块代码

- module 模块：webpack中每个文件就是一个模块
- chunk：多个模块组成一个chunk 
- bundle：最终输出的产物文件
- hash算法：是 将任意长度字符串 转换为 固定长度的字符串, 比如 sha256、md4、md5。
- hash值：
## AST抽象语法树 

多页面 每个页面 一个js：合适 每个页面之间差异大 没有重复代码

多页面 每个页面 多个js

单页面应用。 整个应用只有一个js  

## loader加载器
1. loader本质是一个函数，把源码字符串转为另一个源码字符串。
loader好处是可以修改源码
loader是 commonjs （虽然node支持esm 但还是用commonjs） webpack推荐commonjs



css文件内容是 字符串
png文件内容是 图片二进制


调用loader函数是 通过配置 module.rules 配置一个对象数组 object[]

test字段为 匹配的正则表达式
use.loader loader名称
use.options 参数
多个loader use就传一个对象数组

loader内部通过this.getOptions()获取参数

应用场景是：解析非js资源时 需要用loader来转换 比如 css png ts vue 等需要对应的loader

按照正常逻辑 用esm 导入一个 非js模块时 模块内部没有esm导出 应该报错 没有报错就是因为loader处理为js了

## plugins





## 水合
水合 本意是指 无水物吸水变成水合物的概念
水合（Hydration）：把JavaScript逻辑“注入”到已有的静态HTML上，让它“活”过来。
水合失败：注入js失败就是水合失败

水合就是把js逻辑注入到静态html上，让html活过来。


## 入口文件
入口文件就是通过 entry字段 配置一个相对路径 比如 './src/index.js' 作为项目的入口进行依赖分析。
出口文件通过配置 output.path 配置一个绝对路径 比如 path.resolve(__dirname, 'dist') 

## bundle是什么

