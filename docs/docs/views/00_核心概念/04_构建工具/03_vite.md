

## 
1. 模块化
2. 兼容性
3. 开发效率
4. 生产环境代码质量


## 

vite的优势就是快 


开发环境： vite 支持原生esm 的模块化加载 1 依赖预构建 2 HMR 
         vite是 对于业务源码采用 no-bundle 也就是不打包 
         vite对于第三方库node_modules是打包的

生产环境：基于rollup打包 



vite和webpack对比

预设场景不一样：vite专做web场景 而webpack不局限于web


开发环境基于esbuild打包 依赖预构建  单文件编译 代码压缩
生产环境采用 rollup打包 

esbuild 的缺点 不支持es5 不支持代码分割 


## 环境

pnpm add -D vite typescript 




## 入口文件
serve.open  package.json 同级 有 index.html 作为入口文件



## vite提供的命令
vite 
vite build 
vite preview
vite optimize


## 配置文件
vite.config.ts
vite.config.js
vite.config.mjs
vite.config.mts
vite.config.cjs
vite.config.cts


## 
pnpm add -D @types/node  // ts中找到node的类型





## vite提供的环境变量文件

.env 
.env.dev 

配置文件中拿环境变量
业务代码中 拿环境变量 

import函数对象 由宿主环境（浏览器或nodejs）提供（es规范规定）
但vite会重写import 使用vite就可以使用 import.meta.env.VITE_
不使用构建工具 就只有import 



## 
pnpm add -S vue 
pnpm add -D @vitejs/plugin-vue 

import vue from '@vitejs/plugin-vue';

vue()



## 依赖预构建

依赖就是指 node_modules ，因为node_modules几乎不变 ，经常改变的是业务源码src里面的，所以把node_modules预先打包 


optimizaDeps.exclude: ['lodash-es']  排除依赖预构建后就发现发了很多请求 这就是esm的请求瀑布流问题

依赖预构建就是通过 esbuild做的 

## 手写esbuild插件实现依赖预构建





## vite静态资源处理

从后端来看，前端所有东西都是静态资源，js css 图片 都是静态资源。
从前端来看，图片 视频 字体 等才是静态资源,vite也是认为这些后缀是静态资源

vite帮我们都处理好了
```js
<img src="../xxx/xxx.png" />
background: url('@/xx/xx.png')
import xx from '@/xxx/xx.png'
相对路径 绝对路径都可以使用  vite帮我们处理好了 不用管开发环境和生产环境

但是 

const spring = ref('../assets/spring.jpg');
这种方式是不行的 vite不会处理 不要这样用

方案1：动态导入。    缺点是每张图片都有一个js 
有时候需要点击谁 才显示谁的图片 可以用动态导入 import('@/xx/')

方案2：动态变量 vite提供的 new URL()

const url = computed(() => new URL(`@/assets/${img.value}/.png`, import.meta.url))



有时候图片不在本地服务器 而是其他服务器 比如后端、CDN 等等  把import.meta.url换成正确的服务器地址就行
const url = computed(() => new URL(`@/assets/${img.value}/.png`, 'http://xxx.cdnxxx.com'))
const url = computed(() => new URL(`@/assets/${img.value}/.png`, import.meta.env.VITE_BASE_URL))

```

对于md文件 vite默认不认为是静态资源就没有处理 

方案1
import xxx from '@/xxx/xxx.md?raw'; // 加上?raw 表示读取文件原始内容
方案2
import xxx from '@/xxx/xxx.md?url'; // 加上?url 表示当成一个url处理
方案3 
在vite.config.ts配置文件中 assetsInclude: ['**/*.md'], 告诉vite md文件是静态资源

## import.meta.glob 
- 不仅仅可以导入静态资源 更多的时候是处理js动态文件的 比如 动态路由

import.meta.glob('@/xxx/xx/*.jpg', {eager: true}) // 得到一个对象 

 

## public和src/asstes 有什么区别


public 不会经过打包 生产环境会完整复制到 目标目录根文件夹下  比如 网站ico文件

public存放的是 
    1 不会被源码引入的静态文件
    2 只想得到一个url 可以访问
    3 希望保持原路径 原文件名


## 静态资源
静态资源处理方式 有2种 1.原始文件格式 2. base64格式

通过 build.assetsInlineLimit: 1024 * 10  可以转base64 

svg 始终会处理成单文件 不会转base64 



## vite 冷启动 热更新 

- xx


## hmr
hmr是 
vite的热更新是基于esm模块化实现的，文件改变实现局部更新

import.meta是浏览器提供的 

局部模块更新 而不是全量模块更新

```js
// 生产环境没有import.meta.hot 所以会树摇优化掉
if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
        newModule.render()
    })
}
```
```js
// 指定某个子模块的hmr 
if (import.meta.hot) {
    import.meta.hot.accept('./render.ts',(newModule) => {
        newModule.render()
    })
}
```
 
```js
// 指定多个子模块的hmr 
if (import.meta.hot) {
    import.meta.hot.accept(['./render.ts', './state.ts'],(modules) => {
        modules
    })
}
```