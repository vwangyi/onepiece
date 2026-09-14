

## path常用方法
可以把相对路径转为绝对路径
const path = require('node:path'); 
path.resolve(process.cwd(), "./xxx")
path.resolve(__dirname, "./xxx")
path.join(__dirname, 'xx')
 

## globalThis是什么
glboalThis 在 node环境下是 global对象 在浏览器环境下 是window对象

## process是什么
```js
globalThis.process === process; // true
process.env
``` 

