# babel 
babel.config.js

- https://github.com/babel/babel
- https://babel.dev/docs/


## babel是什么
- babel是一个JavaScript编译器,把新语法转为旧语法。比如 箭头函数转普通函数 让开发者立即使用新语法，而不需要等待浏览器支持。 

## babel插件是什么
- 

## babel预设是什么
- 预设就是多个插件的集合 形成一个预设

## polyfill垫片是什么
polyfill 垫片 ，有一些新增的语法 旧语法不存在，就用polyfill功能

polyfill就是一段旧代码 来实现 新语法

比如 Array.prototype.includes 旧语法就没有对应的api 而是用一段旧代码实现 includes 

if(!Array.prototype.includes) {
    Array.prototype.includes = function(){}
} 



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

https://babel.dev/docs/config-files#project-wide-configuration 
https://babel.dev/docs/config-files#file-relative-configuration
 

## 

```sh
pnpm add @/babel/core @/babel/cli 
```




## 做题
1. 新建一个项目
2. 写一个箭头函数 用babel转为普通函数



## 使用babel插件
1. 安装
2. 在配置文件中或cli中 使用插件

在配置文件中 使用 插件 预设 自定义插件 