# Rollup核心概念
- https://github.com/rollup/rollup
- https://cn.rollupjs.org/


## 为什么使用rollup？
1好处：
1.1 产物干净
1.2 tree shaking
1.3 格式分发
1.4 配置简单
1.5 生态完善 vue react 都是rollup打包
## rollup配置文件  
- 文件名 `rollup.config.js` 或 `rollup.config.mjs`

运行配置文件
```js
npx rollup -c
```
或在 package.json中配置 然后 pnpm dev 
```json
{
    "scripts": {
        "dev": "rollup -c"
    }
}
``` 

## rollup.config.js
```js
// rollup.config.js
import { defineConfig } from 'rollup';

export default defineConfig({
	/* 你的配置 */
});

// "dev": "rollup -c ./rollup.config.js" 
// pnpm dev
```

## 多产物输出
- 应用场景：我们的库 需要支持两种 模块化规范 esm 和 cjs 
```js
import { defineConfig } from 'rollup';

export default defineConfig({
    input: 'src/index.js', // 指定入口
    output: [
        {
            file: 'dist/bundle-iife.js',
            format: 'iife'
        },
        {
            file: 'dist/bundle-esm.js',
            format: 'esm'
        },
        {
            file: 'dist/bundle-cjs.js',
            format: 'cjs'
        }
    ]
})
```

## 多入口
```js
import { defineConfig } from 'rollup';

export default defineConfig({
    input: ['src/index.js', 'src/main.js'],
    output: {
        dir: 'dist', // 多入口时 通过output.dir 指定一个目录就行 不需要file来指定文件名
        format: 'esm',
        name: 'bundle'
    }
})
```
- 多入口的情况下 我们希望每个入口都可以多产物输出

```js
import { defineConfig } from 'rollup';

export default defineConfig({
    input: ['src/index.js', 'src/main.js'],
    output: [
        {
            dir: 'dist/cjs',  
            format: 'cjs',
        },
        {
            dir: 'dist/esm',
            format: 'esm'
        }
    ]
})
```
- 多入口的情况下 我们希望第一个入口输出格式是 cjs 第二个入口的输出格式是 mjs  
```js
import { defineConfig } from 'rollup';

export default defineConfig([
    {
        input: 'src/index.js',
        output: {
            dir: 'dist/cjs',  
            format: 'cjs',
            entryFileNames: '[name].[hash].js', // 指定输出的文件名
            chunkFileNames: '[name].[hash].js', // 为 import() 分割的文件命名 类似webpack的魔法注释
        }
    }, 
    {
        input: 'src/main.js',
        output: {
            dir: 'dist/esm',  
            format: 'esm',
        }
    },
])
```

## 代码分割
```js
function run() {
    // 动态导入的文件 会自动分割为一个单独的文件
    import('./utils.js').then(chunk => console.log(chunk))
} 
```
- 把第三方库单独打包
```js
// rollup.config.js
export default {
    input: '',
    output: { 
        manualChunks: { 
            // key是lodash-es是取的文件名  value是['lodash-es'] 匹配 import  _ from 'lodash-es';
            "lodash-es": ['lodash-es'],  
            react: ["react", "react-dom"], // 把react相关 打包到 react里面
        },
        // 支持函数写法
        manualChunks(id) {
            if(id.includes('lodash-es')) {
                return 'lodash-es';
            }
        },
        entryFileNames: '[name].[hash].js', // 指定输出的文件名
        chunkFileNames: '[name].[hash].js', // 为 import() 分割的文件命名 类似webpack的魔法注释 

    },

}
```

## 压缩
```js
// pnpm add rollup 

import { terser } from 'rollup-plugin-terser';
import { defineConfig } from 'rollup';

export default defineConfig({
    output: { 
        plugins: [terser()], // 注意压缩在output.plugins里面调用
    }
})
```
 
## 处理绝对路径 
- 处理绝对路径 rollup默认只能处理相对路径
- https://cn.rollupjs.org/troubleshooting/#warning-treating-module-as-external-dependency
- 应用场景：当我们的库使用第三方库时，一定是 import _ form 'lodash';
```js
import _ from 'lodash'; // 绝对路径
```

> 方案1：排除第三方库 由宿主环境提供  （不使用@rollup/plugin-node-resolve）
- 如果我们构建的是基建项目 那就不应该在我们的库中 而是由宿主环境提供
```js
// rollup.config.js
export default {  
	// external: ['lodash-es'], // 默认就是 只需要消除警告即可
};
```
> 方案2: 把lodash打包到自己的库中（使用@rollup/plugin-node-resolve）
- 如果我们构建业务项目 那么vue或react就应该在我们的库中
```js
// pnpm add lodash-es -D  # esmodule 
// pnpm add @rollup/plugin-node-resolve -D 
import { nodeResolve } from '@rollup/plugin-node-resolve';
// rollup.config.js
export default {   
    plugins: [nodeResolve()], // 使用nodeResolve() 让rollup可以处理 import from 'xx' 默认只能处理相对路径
};
```


## 处理commonjs规范的包
```js 
// pnpm add lodash -D   # commonjs
import _ from 'lodash'; // lodash是 commonjs规范 但用import from 的 esm引入就会报错
```
```js
// pnpm add @rollup/plugin-commonjs -D
// rollup.config.js
import commonjs from '@rollup/plugin-commonjs';
export default {
    plugins: [commonjs()], // 让node环境的 esm中 可以处理 commonjs规范的包
}
```

## 使用babel处理兼容性 jsx tsx
```js
// pnpm add -D @rollup/plguin-babel 
// pnpm add -D @babel/core @babel/preset-env
// pnpm add -D @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs3 

/**
 * @babel/core是 babel核心库
 * @babel/preset-env 是babel的预设，预设是一组插件多个插件
 * @babel/plugin-transform-runtime @babel/runtime @babel/runtime-corejs3 是使用babel的垫片 而垫片是corejs实现的
 * runtime就是处理时 产生的额外代码 和 webpack的runtime一致
 */
import babel from '@rollup/plugin-babel';
export default {
    plugins: [
        babel({
            babelHelpers: 'runtime',
            include: 'src/**',
            exclude: 'mode_modules/**',
            extensions: ['js', '.ts']
        })
    ]
}
```
- babel.config.json
```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "target": "> 0.25%, not dead",
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

## rollup处理ts
```js
// pnpm add typescript tslib @rollup/plugin-typescript -D 

// npx rollup -c ./rollup.config.ts --configPlugin typescript
```
## rollup处理html


```js 
// pnpm add rollup-plugin-generate-html-template -D
import htmlTemplate from 'rollup-plugin-generate-html-template';
export default {
    plugins: [  
        htmlTemplate({
            template: "public/index.html",
            target: "dist/index.html",
            attrs: ['type="module"'],
        }),
    ]
}
```

## 字符串替换
- 项目中使用了 process.env.NODE_ENV 但这个变量在node环境有 浏览器环境没有 所以处理一下
```js  
import replace from '@rollup/plugin-replace';
export default {
    plugins: [  
         replace({
            preventAssignment: true,
            "process.env.NODE_ENV": JSON.stringify("production"), // 否则会报：process is not defined的错
        }),
    ]
}
``` 
## rollup使用开发服务器


```js  
// pnpm add rollup-plugin-serve rollup-plugin-livereload -D
// pnpm add rollup-plugin-clear -D
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import clear from 'rollup-plugin-clear'; 
export default {
    plugins: [   
        serve("dist"), // 对dist文件夹进行启动服务
        livereload("src"), // 对src文件夹进行监控
        // 每次启动服务 都清空上一次的
        clear({
        targets: ["dist"],
        }),
    ]
}

// 修改 加上 -w  
// npx rollup -c ./rollup.config.ts --configPlugin typescript -w
``` 

## 处理style 
```js   
// pnpm add rollup-plugin-scss sass -D  
// pnpm add postcss rollup-plugin-postcss -D
import postcss from "rollup-plugin-postcss"; 
export default {
    plugins: [    
        postcss({
            extensions: [".css"], // 将scss解析成css
            extract: true,
            modules: true,
        }),
    ]
}
// 注意clear插件顺序
```

## 处理图片
```js   
// pnpm add @rollup/plugin-image -D
import image from "@rollup/plugin-image"; 
export default {
    plugins: [    
        image(),
    ]
}
// 注意clear插件顺序
```

## 别名映射
```js    
// pnpm add @rollup/plugin-alias -D 
// pnpm add @types/node -D // 解决node:url 的ts问题

import alias from "@rollup/plugin-alias"; 
import { fileURLToPath } from "node:url";
export default {
    plugins: [     
        alias({
        entries: [
            {
            find: "@",
            replacement: fileURLToPath(new URL("src", import.meta.url)), // rollup使用绝对路径 和 node的 path.resolve(__dirname) 类似
            },
        ],
        }),
    ]
} 
```    
## sourcemap

```js    
export default {
    output: {
        sourcemap: true, 
    }
} 
```
      

## 分析打包结果大小
```js
// pnpm i -D rollup-plugin-visualizer
import { visualizer } from "rollup-plugin-visualizer";
export default {
    plugins: [      
        visualizer()
    ], 
    // 如果分析出 react 库非常大   那么 就 用 cdn引入 打包结果就没有react了

    external: ['react', 'react-dom'],  // 不打包这些依赖  // 排除 external只是排除不打包而已 有可能是cdn提供 有可能是宿主提供
    output: {  
        format: 'umd',  // 或 'iife' globals和paths 表达意思都一样 当format是umd ｜ iife 时 globals生效
        format: 'esm',   // globals和paths 表达意思都一样 当format是esm时 paths生效 
        manualChunks: {  
            // react: ["react", "react-dom"],   // 打包结果没有react 分包自然也不需要了
        }, 
        globals: {
            "react": "React", // 当遇到 import React from 'react' 时，应该使用全局的 window.React 变量
            "react-dom": "ReactDOM", // 遇到 import ReactDOM from 'react-dom' 时，应该使用全局的 window.ReactDOM
        },
        paths: {
            // 源码中 import React from 'react'; 解析为：import React from 'https://cdn.jsdelivr.net/npm/react@18.2.0/+esm';
            "react": "https://cdn.jsdelivr.net/npm/react@18.2.0/+esm",  
            "react-dom": "https://cdn.jsdelivr.net/npm/react-dom@18.2.0/+esm", // 找 react-dom 通过 这个cdn去找

            // 关于 cdn  
            // 1. 有可能是 库的官方 提供（缺点 不稳定）
            // 2. 库的官方没提供 社区提供的 （缺点 不稳定）
            // 3. 自己公司创建的react的cdn （好处稳定 一般都是用自己公司的 稳定性占第一， 如果自己公司不提供cdn 那还是不用cdn了吧）
        }
    },
} 

```

## 树摇
- 树摇是什么
- 原理 基于 esm
- 如何使用
 
`tree shaking 树摇`: 树摇是基于esm规范的。原理就是

是什么

原理

应用：当我们使用esm导入导出时，尽量使用最小导入 
比如 如果使用 默认导出 则 整个对象哪怕只用了 一个属性 那么整个对象也算使用了 所以 整个对象都不会树摇
但 我们用具名导出 那么 只有当前使用的具名导出才会打包 其他都会树摇  所以尽量使用 最小化拿值 用具名导出 而不是默认导出

如果只是使用 默认导出对象的某一个方法 就不要默认导入整个对象，而是只导入使用的方法。


树摇是基于esm的 原理是因为esm 导入导出是静态的 commonjs导入导出是动态的  


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

