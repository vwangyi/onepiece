## import.meta.url

import.meta.url 是当前esm模块的url

## url怎么转换成path

url.fileURLToPath(import.meta.url)

## url和path的区别

## 路径拼接

路径拼接用 path.join 和 path.resolve

path.resolve是从右往左拼接，直到拼出一个绝对路径为止。没有就用process.cwd()作为绝对路径的基准

##

path.dirname(p)：取文件夹名

path.basename(p)：取文件名

path.extname(p)：取扩展名

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

## 子进程child_process

## crypto加密

## os操作系统信息
