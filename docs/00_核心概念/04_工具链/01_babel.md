# babel 
babel.config.js

- https://github.com/babel/babel
- https://babel.dev/docs/


## babel是什么
- babel是一个JavaScript编译器,把新语法转为旧语法。比如 箭头函数转普通函数  
- babel的好处是 写的是新语法 但可以兼容旧的浏览器
 
pnpm add —D @babel/core @babel/cli @babel/preset-env 

## babel配置文件命名格式
babel配置文件命名格式 支持两种格式，`babel.cofig`格式 和 `.babelrc`格式,
 
如果是 monorepo项目 根目录使用babel.config.js方便统一 子包使用 .babelrc 方便继承或局部覆盖。 
如果是常规的 multirepo项目 使用 babel.config.js 或 .babelrc 均可

`babel.config`: `babel.config.js` `babel.config.json` `babel.config.mjs` ... 
`babelrc`: `.babelrc` `.babelrc.js` `.babelrc.json` `.babelrc.mjs` 或 `package.json`文件，带有"babel"键。 ...


## babel插件plugins是什么
- 概念
插件执行顺序为 左到右 
- 如何使用  
- plugins 传一个数组， 数组项就是使用的插件  
插件需要传递参数，数组项就传一个 长度为2的元组，第一项是 插件名 string 第二项是 参数 object 
插件需要传递参数，数组项就传一个 插件名 string 
https://babeljs.io/docs/plugins-list 



## 自定义插件
```js
 
插件的核心，其实就是创建一些新的 AST 节点，去替换旧的 AST 节点。


function (babel) {
    babel.types.callExpression(callee, arguments) // callee表示是被调用的函数的节点 arguments函数的参数
    babel.types.memberExpression(object, property, computed = false) // object是对象节点 property是属性节点  computed表示属性名是否是动态计算的
    babel.types.identifier(callee, arguments) //  创建 AST 节点， 但是是identifier类型的ast节点
}
module.exports = function(babel){
  // 该函数会自动传入 babel 对象
  // types 也是一个对象，该对象上面有很多的方法，方便我们对 AST 的节点进行操作
  const { types } = babel;
  
  return {
    name: "插件的名字",
    visitor: {
      // ...
      // 这里书写不同类别的方法，不同的方法会被进入不同类别的节点触发
    }
  }
}
```
## babel预设presets是什么
- 预设就是多个插件的集合 形成一个预设
- 如何配置
- 预设 执行顺序 右到左 


## polyfill垫片是什么

polyfill垫片是 用旧代码 实现 新语法。
比如 数组的includes方法 在es5就没有对应的api。
 
if(!Array.prototype.includes) {
    Array.prototype.includes = function(){}
} 
 
```js
{
  "presets": [
    [
      "@babel/preset-env", // 预设名
      {
        "useBuiltIns": "entry",   // 根据浏览器版本范围来添加 polyfills 还需要在源码的入口文件中手动引入 core-js
        "useBuiltIns": "usage", // 用到了特性 才添加对应的polyfills
        "useBuiltIns": false, // 关闭 polyfills
        "corejs": 2, // 因为 polyfills 功能是 core-js实现的 所以这里需要指定core-js版本
        "corejs": 3,
        "corejs": false, 
 
        "modules": "amd",
        "modules": "umd",
        "modules": "systemjs",
        "modules": "commonjs",
        "modules": "cjs",
        "modules": "auto",
        "modules": false,  

        "targets": "> 0.25%, not dead",
        "include": ["@babel/plugin-proposal-optional-chaining"], // 原本这个插件在预设里面 由于target被排除了 这里就可以加上
      }
    ]
  ]
}
``` 







## 继承babel配置文件 
```js
{
  "extends": "./base.babelrc.json"
}
```
## 重写
- 对匹配的文件重写babel配置
- overrides ：该配置项用于对匹配上的特定文件或者目录应用不同的配置
  - test：做匹配
  - include：包含哪些目录
  - exclude：排除哪些目录

```js
{
  "overrides": [
    {
      "test": ["*.ts", "*.tsx"],
      "exclude": "node_modules",
      "presets": ["@babel/preset-typescript"]
    }
  ]
}
```

## 白名单黑名单

- ignore 和 only ：ignore 控制忽略文件，only 指定特有文件
```js
{
  "ignore": ["node_modules"], // 黑名单
  "only": ["src"], // 白名单
}
```

## 按环境区分配置
- env：为你不同的环境提供不同的配置，例如在开发环境或者生成环境需要使用不同的插件或者预设，那么就可以通过 env 来指定环境。
```js
{
  "env": {
    "development": {
      "plugins": ["pluginA"]
    },
    "production": {
      "plugins": ["pluginB"]
    }
  }
}
```



## sourceMap  
```js
{
  "sourceMaps": true, // 开启source map
  "sourceFileName": "customFileName.js", // source map 文件的文件名
  "sourceRoot": "/root/path/to/source/files/" // source map 文件对应的 URL 前缀
}
```

 
 

## 配置目标浏览器范围

3种方式 优先级顺序如下：

1. 配置文件的targets字段
2. .browserslistrc
3. package.json的browserslist字段


browserslistConfigFile 默认为true 表示：按 targets  > .browserslistrc > package.json的browserslist字段 
传一个相对路径 表示指定文件 控制 目标浏览器范围

```json 
{
  "targets": "> 0.25%, not dead",
  "presets": [
    [
      "@babel/preset-env", 
      {
        "browserslistConfigFile": "./.browserslistrc"
      }
    ]
  ]
}
```
 



## @babel/core



- @babel/core: 这个是 Babel 的核心包，提供了核心 API
## @babel/cli

- @babel/cli：该依赖提供 CLI 命令行工具
## @babel/preset-env

- @babel/preset-env：预设环境，Babel 在做代码转换的时候，是需要依赖插件的，但是会有一种情况，就需要的插件很多。所谓预设，指的就是内置了一组插件，这样我们只需要引入一个预设即可，不需要再挨着挨着引入众多的插件


## 新建一个项目
```js
// 把箭头函数转为 普通函数
```

- 安装包
```sh
cd babel-demo
pnpm add —D @babel/core @babel/cli @babel/preset-env 
```
- @babel/core 是babel的核心包 提供核心api
- @babel/cli 是提供cli命令行工具
- @babel/preset-env 是预设，预设表示多个插件.

- 配置文件
- .babelrc
```js
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "edge": "17",
                    "firefox": "60",
                    "chrome": "67",
                    "safari": "11.1",
                },
                "useBuiltIns": "usage",
                "corejs": "3.6.5"
            }
        ]
    ],
    "plugins": [
        '@babel/plugin-transform-arrow-functions', // pnpm add -D @babel/plugin-transform-arrow-functions
    ]
}
```
 

## 如何学习

## 下载库 
