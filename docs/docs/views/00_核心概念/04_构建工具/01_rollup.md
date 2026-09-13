

## .mjs .cjs 

mjs是 esm模块化的js   等同于 pageage.json中配置 type:module
cjs是 commojs模块化的js 

rollup.config.ts
rollup.config.js




## 
webpack基于commonjs模块化 虽然可以也用esm 
rollup 是基于esm模块化 

webpack输出格式 一般都是iife格式



## 环境
pnpm add -D rollup @rollup/plugin-node-resolve @rollup/plugin-commonjs

rollup是核心包
@rollup/plugin-node-resolve 是解决本身不能处理导入绝对路径
@rollup/plugin-commonjs 是可以让rollup用esm导入commonjs的导出

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'; 



// 执行脚本
rollup -c rollup.config.ts --configPlugin typescript 
rollup -c rollup.config.js  
 

## 智能提示

import { defineConfig } from 'rollup'
导出的对象用defineConfig包裹 就有智能提示 不用defineConfig包裹就没有智能提示


## tree shaking
- 尽量最小化导入 ：尽量使用具名导入 而不是默认导入， 具名导入有 树摇优化 


除了可以使用 ES 模块之外，Rollup 还可以静态分析你导入的代码，并将排除任何实际上没有使用的内容，从上面的引入和最后的打包结果就可以看到，没有使用到的内容直接被删除了。

> 注意，**摇树优化的核心思想是在编译阶段通过静态分析确定代码的使用情况，而不是在运行时**。

所以摇树优化一般是建立在**ES6 模块化语法**基础之上的，ESM的导入导出是静态的。

CommonJS 模块的导入和导出是动态的，无法在编译阶段静态确定代码的使用情况。一般情况下，摇树优化工具无法在 CommonJS 模块中进行精确的摇树，因为无法静态分析模块间的导入和导出关系。

然而，一些构建工具（如 Webpack）会尝试通过静态分析和启发式方法对 CommonJS 模块进行近似的摇树优化。它们会尽可能地识别出那些可以在编译阶段确定未被使用的代码，并进行剔除。但这种处理方式可能不如对 ES6 模块的优化效果好，且有一定的限制。

**摇树优化的原理：**

1. 静态分析：对 JavaScript 代码进行静态分析，识别出模块的导入和导出关系。
2. 标记未使用代码：标记出在导入和导出关系上没有被使用的代码。这些代码可能是模块的导出函数、变量、类等。
3. 剔除未使用代码：根据标记结果，构建工具会将未被使用的代码从最终的打包结果中剔除，只保留被使用的部分。

由于是静态分析，所以我们在写代码的时候，需要注意自己的写法，简单来说，尽量的使用最小导入，比如你可以比较一下我们这里导入代码之后，打包的区别：

```javascript
// 直接默认导入整个对象
import util from "./util.js";
const r = util.getRandomNum(1, 10)
console.log(r)

// 具名导入具体的函数
import { getRandomNum } from "./util.js";
const r = getRandomNum(1, 10)
console.log(r)
```


## sourcemap
output.sourcemap 为true 


## 入口和出口
1. 入口文件通过 input 指定一个相对路径，多个入口就传数组 
2. output.file 是出口地址 相对地址  output.format是 格式有 iife esm cjs umd 等等 多个出口 output就传一个数组

3. 如果想 a入口导出是esm b入口导出是cjs 那就完整导出数组 表示多个配置对象

output.name  如果output.format是iife 取一个输出名

```js
export default [
    {
        input: './xx/main.js',
        output: {
            filename: 'dist/main.js',
            format: 'esm'
        }
    },
    {
        input: './xx/main1.js',
        output: {
            filename: 'dist/main1.js',
            format: 'iife'
        }
    },

]
```


## rollup处理绝对路径
rollup默认情况下不认识 决定路径 只认识相对路径 
```js

import { chunk } from 'lodash-es' // 报错


// pnpm add -D @rollup/plugin-node-resolve 
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
    plugins: [
        nodeResolve(),
        commonjs(),
    ],
    external: ['loadsh-es'] // 是否排除打包
}
```

## 代码分割

output.manualChunks 可以传函数 可以传对象，注意传函数可能有循环引用问题
```js  
export default {
    output: {
        manualChunks: {
            'lodash': ['lodash-es']
        }
    }
}
```

    output.entryFileNames: '[name].js',
    output.chunkFileNames: 'chunk-[name]-[hash].js',


懒加载同样是 import()

## lodash 和 lodash-es
lodash是 cmj模块化
lodash-es 是esm模块化



## 让rollup支持用 esm方式 导入 cjs 模块的能离

import { chunk } from 'lodash' // lodash是cjs导出 这里用esm会报错

pnpm add @rollup/plugin-commonjs --save-dev
```js
import { nodeResolve } from '@rollup/plugin-node-resolve';
+import commonjs from '@rollup/plugin-commonjs'; 
export default {
  input: 'src/index.js',
  output: {
    dir: 'dist/esm/',
    format: 'esm',
  },
 plugins: [
    nodeResolve(), 
    commonjs(), // 支持用esm导入 cjs的导出 

]
}
```

## rollup中使用babel
```js

pnpm add @rollup/plugin-babel -D


import babel from '@rollup/plugin-babel';
export default {
  input: 'src/index.js',
  output: {
    dir: 'dist/esm/',
    format: 'esm',
  },
 plugins: [
    nodeResolve(), 
    commonjs(), // 支持用esm导入 cjs的导出 
    babel({
        babelHelpers: 'bundled'
    }),
    babel({
      babelHelpers: 'runtime',
      include: 'src/**',
      exclude: 'node_modules/**',
      extensions:['.js', '.ts']
    }),
]
}


// .babelrc.json
// pnpm add -D @babel/core @babel/preset-env
// babel等工具链 不一定要在构建工具中使用 可以单独给项目使用
{
    "preset": ["@babel/preset-env"]
}

// 预设是一组插件，只能做语法转换
// polyfill 兼容性垫片 需要用 @babel/runtime
```
**.babelrc.json：**

```javascript
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": "> 0.25%, not dead",
        "useBuiltIns": "usage",
        "corejs": 3
      }
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 3
      }
    ]
  ]
}
```

## rollup中使用typescript
```shell
pnpm add typescript tslib @rollup/plugin-typescript -D
```
```js
import typescript from '@rollup/plugin-typescript';
export default {
  input: 'src/index.js',
  output: {
    dir: 'dist/esm/',
    format: 'esm',
  },
 plugins: [
    nodeResolve(), 
    commonjs(), // 支持用esm导入 cjs的导出 
    babel({
        babelHelpers: 'bundled'
    }),
    babel({
      babelHelpers: 'runtime',
      include: 'src/**',
      exclude: 'node_modules/**',
      extensions:['.js', '.ts']
    }),
    typescript()
]
}
```