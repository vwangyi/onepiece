# babel 



babel是 对js做兼容性处理，把es6的新语法转为旧的语法。

定义：babel是一个JavaScript编译器，

babel是什么：babel是一个JavaScript编译器，可以把新语法转为旧语法，让开发者立即使用新语法，而不需要等待浏览器支持。比如 箭头函数转普通函数
babel插件是什么
babel预设是什么： 预设就是多个插件的集合 形成一个预设
polyfill垫片是什么




babel.config.js

- https://github.com/babel/babel
- https://babel.dev/docs/


polyfill 垫片 ，有一些新增的语法 旧语法不存在，就用polyfill功能

polyfill就是一段旧代码 来实现 新语法

比如 Array.prototype.includes 旧语法就没有对应的api 而是用一段旧代码实现 includes 

if(!Array.prototype.includes) {
    Array.prototype.includes = function(){}
}




## 新建一个项目

```sh
cd babel-demo
pnpm add —D @babel/core @babel/cli @babel/preset-env 
```
- @babel/core 是babel的核心包 提供核心api
- @babel/cli 是提供cli命令行工具
- @babel/preset-env 是预设，预设表示多个插件.

.babelrc
```js
{
    "presets": [[
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
    ]],
}
```

https://babel.dev/docs/config-files#project-wide-configuration 
https://babel.dev/docs/config-files#file-relative-configuration

# Babel 

- 官网：https://www.babeljs.cn/
- 源码：https://github.com/babel/babel


- 是什么  
- babel是 JavaScript编译器 主要是将es6新语法 转为 es5的兼容性代码。比如 箭头函数转普通函数、ts转js， div转view


## babel核心原理
- 词法分析
- 语法分析
- 语义分析
- 解析（Parse）→ 转换（Transform）→ 生成（Generate）。首先将源代码解析成 AST（抽象语法树），然后通过插件遍历并修改 AST，最后生成新的代码。”



- 预设 和 插件

预设是一组插件的组合



- babal插件



- 其他
swc 用 rust语言写的 js编译器
esbuild 是go语言写的js编译器
tsc 是 ts写的 ts编译器