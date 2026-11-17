## 导入node:前缀

node14新增 node:前缀 cjs和mjs都可以使用

```js
import path from 'node:path';
const path = require('node:path');
```

## esm模块化的import对象

## 当前模块文件的url

mjs的import.meta.url

## 当前模块文件的文件夹路径

## 获取当前文件路径

cjs的__dirname
mjs的path.dirname(fileURLToPath(import.meta.url))

1. url是什么
2. path是什么
3. url和path的区别是什么

4. import.meta.url import.meta.url 是当前esm模块的url
5. url.fileURLToPath()
6. path.basename() 取文件夹名
7. path.dirname() 取文件名
8. path.extname() 取文件扩展后缀

- path.resolve()
- path.join()

- fs模块 file 读文件
- os模块

## url怎么转换成path

url.fileURLToPath()

## 路径拼接

路径拼接用 path.join 和 path.resolve

path.resolve是从右往左拼接，直到拼出一个绝对路径为止。没有就用process.cwd()作为绝对路径的基准

## globalThis

glboalThis 在node环境下是global 在浏览器环境下是window

## 同步和异步

同步表示会阻塞事件循环，异步不会阻塞事件循环

##

crypto.xxx

## 同步删除文件或目录

fs.rmSync()方法

## fs模块读写文件

## 读文件

同步读文件 用fs.readFileSync('a.txt', 'utf8');
异步读文件 用fs.promises.readFile('a.txt', 'utf8');

## process进程信息

- 拿环境变量 拿命令行参数 拿当前工作目录 退出进程

```js
process.argv; // 命令行参数
process.env.NODE_ENV;
process.cwd(); // 当前工作目录
process.exit(1);
```

## child_process子进程模块

## crypto加密模块

## os操作系统模块
