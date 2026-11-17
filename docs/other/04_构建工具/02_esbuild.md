

esbuild是基于go语言，vite的开发模式也是用esbuild，优势就是快。




## 
esbuild

esm是原生js就支持的模块化

esbuild的依赖构建 解决了 esm的请求瀑布流问题


## 环境
pnpm add -D esbuild 

##

npx xxx 就等同于 ./node_modules/.bin/xxx 

## 
用 esbuild 把ts转js 比 tsc 效率高很多 ，但esbuild不支持把ts转为es5，作者就不想支持。但tsc可以把ts转es5 

vite中也是采用 esbuild 来对ts转js


## 
构建工具至少会通过 配置文件和命令行 两种调用方式

## 