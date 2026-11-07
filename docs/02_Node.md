## path.resolve

path.join方法
1path.resolve方法

可以把相对路径转为绝对路径
path.resolve(process.cwd(), "./xxx")
path.resolve(__dirname, "./xxx")
path.join(__dirname, 'xx')

##

fs.readFile

crypto.xxx

## globalThis

glboalThis 在node环境下是global 在浏览器环境下是window

## fs模块读写文件

```js
const fs = require('fs');
fs.readFileSync('a.txt', 'utf8'); // 同步读
fs.promises.readFile('a.txt', 'utf8'); // 异步读（推荐）
fs.writeFileSync('b.txt', 'hello');
fs.readdirSync('./dir');

if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
const content = await fs.promises.readFile(jsonPath, 'utf-8');
```

掌握 sync 版和 promises 版就够了，回调版可以跳过。

## path模块处理路径

- 拼接路径

```js
path.join(__dirname, 'data', 'a.json');
path.resolve('./src');
path.extname('a.txt'); // '.txt'
```

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
