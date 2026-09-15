

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





