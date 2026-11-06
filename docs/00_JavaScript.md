<script setup>
document.title = 'JavaScript';
</script>

## 防抖节流

防抖是 函数频繁触发只执行最后一次。
节流是 函数频繁触发指定时间内只执行一次。指定5秒 就是每5秒执行一次。

## 变量提升

## 重复声明

## 严格模式

## 作用域和作用域链

## 块级作用域

## 函数作用域

## 全局作用域

## 闭包

闭包是函数嵌套函数，内部函数可以访问外部函数的作用域。
函数执行完毕，闭包变量没有正常销毁。
好处是 可以延长变量的生命周期和模块化开发
缺点是可能导致内存泄漏
应用场景是 防抖 节流 esm和commonjs都是使用闭包实现模块化

## 纯函数

纯函数是相同的输入始终保持相同的输出。

## 作用域和作用域链

作用域是变量可以被访问的范围，分为全局作用域、函数作用域、块级作用域。
作用域链是查找变量的机制，首先从当前作用域查找，然后是外层作用域，一直到全局作用域，找不到就报错。

## this指向

this在全局作用域下指向window
this在函数作用域下 跟函数调用方式有关 一般情况下 this指向调用者
函数直接小括号调用 严格模式下是undefined 非严格模式下是window
通过new调用 this指向实例对象
通过 call bind apply调用 this指向第一个参数

## typeof null返回什么

typeof null 返回 'object'字符串

## null和undefined区别

null表示值就是null
undefined表示 没有值 值没有定义

## intanceof 操作符的实现原理

## 表达式

能够计算并产生一个值就是表达式。 比如 加减乘除 函数调用都是表达式。if else就是语句。

能够计算出一个值并且可以作为函数参数 就是js表达式

##

标识符是 由 字母 数字 下划线组成 不能数字开头 不能是关键字保留字 区分大小写 是用来命名变量的符号

## Symbol

Symbol可以用来创建绝对唯一的标识符 Symbol可以传一个描述信息 类似注释

## 循环 递归 遍历 迭代的区别

遍历是 侧重访问数据结构中的每一个元素。只是看一下所有元素。
迭代是 侧重于按顺序从数据结构中一个个主动取出来。按某种顺序取出来所有元素。

## 循环

for、for-in、for-of、while、do-while
循环是重复执行同一段代码。循环数组用 for forEach for-of 循环对象用for-in

## 递归

递归是函数自己调用自己。没有结束条件就会导致栈溢出。

##

遍历是 按照某种顺序 操作数据结构中的每一个元素

- 遍历是 按照某种顺序 操作数据结构中的每一个元素 操作往往包含 curd

##

迭代是 按照某种顺序 访问数据结构中的每一个元素 迭代属于遍历的一种

## 数据类型

数据类型一共是 7个基础类型 1个引用类型。
分别是 number string boolean null undefined symbol bigint 和 object。

## TS

ts的作用就是给js变量加上类型。

## 检测数据类型

typeof、instanceof、toString.call()

## 原型和原型链

- 原型就是 每个实例对象都有 `__proto__` 每个构造函数都有 `prototype`
- 原型链是 实例对象的 `__proto__` 指向 其构造函数的`prototype`

- 原型链的好处是 节约内存。因为所有方法都放prototype上共享
- 缺点是访问不存在的成员时 仍然会遍历整个原型链，性能差。

- 应用场景是 实现继承 扩展类库、共享方法。
- 当 访问 对象某个成员时，先看自身有没有，在通过 `__proto__` 看 其构造函数的`prototype` 上有没有
- 一直向上找 直到 `Object.prototype.__proto__ ===  null` 就返回undefined

- 比如，可以在 Vue的原型上 挂载 请求方法，每个页面可以共享这个方法

## 原型链终点

原型链终点是 Object.prototype.**proto** === null

## 声明变量

声明变量用 const let var。

## let和var区别

1. 全局污染。var声明的变量会挂在window上 造成全局污染。
2. 块级作用域。let变量是块级作用域。var是全局作用域和函数作用域。
3. 暂时性死区。var声明前可以访问。let声明前访问会报错暂时性死区。
4. 重复声明。var可以重复声明。let不能重复声明。
   const和let的唯一区别是 const声明必须赋值且不能修改。

##

## 创建数组

创建数组用 字面量方式[]、 new Array()、 Array.of() 来创建。

## 是否是数组

是否是数组用 Array.isArray() 和 intanceof Array

## 数组浅拷贝

数组浅拷贝用 slice 传入开始索引和结束索引，支持反向索引。返回新数组，不影响原数组。

## 数组去重

基础类型用 ...new Set()，对象数组用 reduce() + Object.values() 利用了对象的key不能重复的特性。

## 数组扁平化用 flat

## 数组查找

数组查找用 some every find 找不到返回undefined，findIndex找不到返回-1 indexOf includes

## 数组排序

数组排序用 sort reverse

## 数组映射

数组映射用 map()，map()返回新数组，不影响原数组。

## 数组过滤

数组过滤用 filter()，filter()返回新数组，不影响原数组。

## 数组合并

数组合并用 concat 和 展开运算符 ...，concat()返回新数组，不影响原数组。

## 数组清空

清空数组用 arr.length = 0 或者 赋值一个新数组。 区别就是 legnth赋值0 地址不会变。

## 取出数组项

取出数组项 用 下标或解构赋值。

## 数组追加项

数组追加项用 push 和 unshift 返回新长度

## 数组删除项

数组删除项用 pop 和 shift，返回删除的元素。删中间用 splice()，传入开始下标和删除的项数，splice()返回删除的元素组成的新数组，影响原数组。

## 数组修改项

数组修改项用 下标 或 splice()

## 数组转字符串

数组转字符串用join

## 类数组转数组

类数组是只有长度和下标，通过 Array.from()转为数组 或者用展开运算符 ...

## 创建字符串

字符串是用单引号、双引号或反引号表示。字符串的特性是一旦创建就不可变。

## 字符串查找

字符串查找：indexOf includes startsWith endsWith

## 字符串截取

字符串截取 substring 和 slice

## 字符串拼接

字符串拼接 用模版字符串和+号

## 字符串替换

字符串替换 replace

## 字符串转数组

字符串分割： split

## Promise

Promise是用来封装异步的对象。Promise有3个状态，等待、成功、失败，状态一经改变就不可逆。

## 取消Promise

取消Promise可以通过Promise.race()模拟取消

## Promise并发

promise并发通过 Promise.all()方法

AbortController 是取消请求

## resolve/reject/throw 有什么区别

- 它们都可以改变promise状态
- 调用resolve() 表示把状态从等待改为成功，传入的值就是promise的结果值
- 调用reject() 表示把状态从等待改为失败，传入的值就是promise的结果值
- throw '' 表示把状态从等待改为失败，抛出的值就是promise的结果值

## then / catch / finally

- then / catch / finally 一定都是返回promise
- then和catch中 默认都是返回成功的promise 除非手动返回失败的promise 比如 Promise.reject(1)或throw 1 才是返回失败的promise
- finally是不管成功失败都会走, 不接受任何参数 不会改promise的状态和结果值 但finally里面 throw 1 仍然可以改为失败的promise

- async函数也一样 默认返回成功的promise 除非手动返回失败promise或throw 才是失败的promise

- 在 then catch finally 中使用throw 都会改变 promise状态为失败 且 throw的值就是结果值。

## then的第二个回调和catch有什么区别

- then的第二个回调是 只处理当前promise的错误
- catch是 之前的所有promise错误都会捕获。

## Promise.all 和 Promise.allSettled 区别

- Promise.all 和 Promise.allSettled 的区别？
- all 任何一个失败就立即 reject；allSettled 等待所有完成，返回每个状态和结果，不会失败。
- async/await 和 Promise 的关系？
- async 函数返回 Promise，await 会等待 Promise 落定；本质是 Promise 的语法糖。

```js
// https://www.cnblogs.com/dirgo/p/19194161
const prom = Promise.all()  // 也可以不是数组 但必须是iterator接口
等待所有promise实例 完成
所有的promise实例成功 返回的就是 成功的promise 且结果值是所有promise结果值组成的数组
只要有一个promise实例失败  返回的是 新的 失败状态的promise 且结果值为 第一个失败的promise的结果值

Promise.all() 是 只要有一个失败 那就是失败
Promise.allSettled 是不管成功或失败 都会执行完毕
```

## Promise.race()

```js

const prom = Promise.race()   返回第一个完成的promise实例的成功状态和结果值
Promise.race([Promise实例1, Promise实例2, Promise实例3])
# 等待第一个完成的promise
# 返回第一个完成的promise实例
```

## Promise.withResolvers()

- Promise.withResolvers 会把 resolve和reject 放到promise外面调用 来决定promise的状态和结果值

```js
let { promise, resolve, reject } = Promise.withResolvers();
// 等价于
let promise, resolve, reject;
promise = new Promise((res, rej) => {
  resolve = res;
  reject = rej;
});

// 使用
await promise;
```

## await/async

- async-await 的底层就是 生成器函数 + yield，如果没有async-await 就只能用 生成器函数 + yield。
- async-await 并没有完全取代 生成器函数 + yield ，yield 在特定领域（状态机、数据流、协程）仍有不可替代的价值。

## 可迭代对象 / 迭代器

可迭代对象是 原型链上存在[Symbol.iterator] 方法的对象，该方法返回一个迭代器（Iterator）。可迭代对象可以被 for...of 循环遍历，也可以被展开运算符 ... 操作。
// 可迭代对象可以被 for...of 循环遍历，也可以被展开运算符 ... 操作。 还可以手动调用 next() 方法
// 比如 Array, Map, Set, String, TypeArray, arguments, NodeList 都是 天生的迭代器 但Object不是天生的迭代器。

// 如果这个对象原型链上有迭代器，那么就可以说这是一个可迭代对象。如果没有迭代器，那这个对象就是不可迭代的。

一个对象只有实现了 [Symbol.iterator] 方法，才是可迭代的。普通对象默认是不可迭代的，所以普通对象不能用 for - of ，也不能用 ... 展开到数组中。

但是可以用 ... 展开到 对象中，{ ...obj } 不能 [...obj] [...'123'] 字符串可以展开到数组中是因为都是可迭代的

...可迭代对象（数组） 表示展开的是值 通过迭代器取出的值 依赖迭代协议
...普通对象 表示展开属性（浅拷贝）将源对象的可枚举属性浅拷贝到新对象中 依赖属性枚举

for of和... 作用于可迭代对象上 本质就是调用 可迭代对象的迭代器方法Symbol.iterator，通过迭代器方法取出值

普通对象不是可迭代对象，找不到迭代器方法 所以报错， for of 或 ...到数组里面 就会报错
但 ...展开到普通对象里面 不是调用迭代器方法 所以不会报错

普通对象 默认可枚举 但不可迭代 {...{a:1}} 但是 [...{a:1}] 是报错的
数组是 默认可迭代 也是 可枚举 [...[1,2,3]] 和 {...[1,2,3]} 都是支持的

## 生成器函数

- 生成器函数是用 function* 声明的函数， 可以用 yield 暂停并恢复函数的执行。 生成器函数就是返回迭代器。

在 JavaScript 中，**生成器函数**是一种特殊类型的函数，它可以**暂停执行**并在稍后**恢复执行**，同时**保持上下文状态**。生成器函数使用 `function*` 语法定义，并通过 `yield` 关键字控制执行流程。

- 生成器函数 可以暂停执行和恢复执行, 并保持上下文状态。通过 function* + yield 方式实现。

第几次调用next 执行的是生成器函数的第几次yield 之前的代码 传入的参数是yield返回值
迭代器对象第一次调用next 传递的参数没有意义 如果需要传参 就放到第二步

## 协程

在 JavaScript 中，协程（Coroutine）是通过生成器函数实现的。虽然 ES6 规范中没有直接称为 "coroutine" 的特性，但生成器函数具备了协程的核心能力：可以暂停执行并恢复执行，同时保持函数内部状态。

核心定义
协程是一种可以暂停执行并恢复执行的函数（或子程序），保持其局部状态。你可以把它看作比线程更轻量级的“微线程”，但完全由程序员在用户空间控制切换，而不是操作系统调度。  
进程 线程 由 操作系统调度
协程由 程序员调度

## 迭代/遍历/循环/递归

迭代的目标源是有序的 且连续 的 比如 Array, Map, Set, String, TypeArray, arguments, NodeList

顺序：
Promise
async await
迭代器 可迭代对象
生成器函数 function* yield
协程

异步编程的核心机制：
事件循环（Event Loop）：负责协调异步任务的执行。当遇到耗时操作时，JS引擎将任务“挂起”，让其在后台执行，主线程继续处理后续的同步任务。当耗时任务完成后，结果或通知会被放入任务队列（微任务队列和宏任务队列），等待主线程空闲时处理。

## 异步任务

## requestAnimationFrame

await表达式
await表达式 必须 写在async函数中 async函数可以没有await

> await 等价于 .then
> await表达式 后面的所有东西都是 异步微 (在本函数作用域中)
> await右侧的表达式 一般是promise对象 也可以是其他值(但没啥意义 await 不是一个promise时 (await 可不写))

> 如果右侧为 成功的promise实例 则await表达式 返回的就是promise成功的值
> 如果右侧为 失败的promise实例 就会报错 则需要 try catch 捕获这个错误 或者 .catch(err => console.log(err))

迭代器
生成器函数
装饰器
async函数：返回promise

帧率是
我的显示器是60Hz（HZ表示硬件显示器）
这个游戏能跑到60fps （fps表示软件）
60帧 既表示60Hz 也表示60fps
60HZ 或 60fps
60赫兹(HZ) 表示 每秒画60次， 那么画一帧的耗时就是 1000/60 = 16.67毫秒 ms （一帧就是一张图片）也就是 每16.67ms 渲染一次

requestAnimationFrame 可以让回调在 下一次渲染前调用 使用场景是
requestIdleCallback 可以让 回调在 主线程空闲之前调用

- 可迭代对象：对象的原型链上有 迭代器对象，那就是可迭代的对象，比如 Array Map Set 的原型链上 都有迭代器对象， 而 Object的原理链上没有除非手动添加
- 迭代器对象是什么 ：迭代器对象是有 next方法 next方法返回value和done的对象 done表示是否可以继续调用next() 一般不会手动创建迭代器对象 而是用生成器函数默认返回迭代器对象
- 生成器函数是用function* 声明的函数，内部可以使用 yeild 关键字

- 有生成器函数或迭代器对象的数据结构 可以 用 forof循环

- async函数和aawit表达式 底层原理就是 生成器函数 + yield表达式 和 co模块

- 单线程：js是单线程语言 因为js只能被浏览器的主线程执行，而主线程只有一个但浏览器是一个多进程多线程的应用程序。

- 同步任务：同步任务就是 主线程立即执行 不用排队
- 异步任务：异步任务 是主线程不能立即执行的任务，交给其他线程当异步任务满足触发条件就会进入任务队列进行排队等待主线程执行。比如 IO 网络等

## 垃圾回收机制

- 垃圾回收机制
  - 是什么
    - 垃圾回收机制是 JS引擎 自动管理内存的机制，常见垃圾回收算法有 标记清除 引用计数
    - 标记清除是 从根对象出发，递归标记所有可达对象。然后遍历堆内存，回收没有标记的对象。
    - 引用计数是 记录对象的引用次数，大于0就不回收，等于0 就立即回收。
  - 优缺点
    - 标记清除的缺点是 可能产生内存碎片
    - 引用计数的缺点是 无法处理循环引用问题。
  - 讲应用
    - V8 是把堆内存分为新生代和老生代
    - 新生代使用 scavenge 算法管理生命周期短的变量
    - 老生代使用 标记清除 管理生命周期长的变量。
    - 在平时开发中，不再使用的可达对象 就应该赋值null

## 内存碎片

- 内存碎片就是多个不连续的小块内存， 通过标记整理，使用标记整理，把标记对象向左侧移动，右侧就是剩余的所有内存

## 垃圾

- 不再使用的内存就是垃圾。
-
- 不能被访问就是垃圾，如何变为垃圾：赋值为 null 保证不能访问。

## 垃圾回收机制是 对 堆内存还是栈内存 回收 ？

- 堆内存。原始类型数据用完就销毁 不需要垃圾回收机制介入

## Scavenge算法

- Scavenge算法 就是 把新生代分为 from空间和to空间 from空间快满了就把可达对象全部复制到to空间 然后清理form空间 就这样相互倒换
  优缺点 它的好处是用空间换时间 虽然始终有一半的空间没有使用，但是 换一个引用地址 是非常节约时间的

如果一个对象在经历过一次 Scavenge 回收后仍然存活，那么它会被晋升到老生代

## XSS和CSRF

##

## cookie & localStorage & sessionStorage & session

- cookie 4k 不设置过期时间关页面消失 可以设置路径 比如 记住密码功能
- localStorage 20m 关页面不消失 跨页面能拿到 不清除一直有（必须手动清除）
- sessionStorage 5m 关页面消失 跨页面拿不到
- session在服务器 没有大小 更安全 临时数据但是要存储 比如购物车 因为换设备依然要显示。

## indexedDB

基础概念
● 数据库（Database） ：IndexedDB 的顶层容器，每个数据库有唯一名称和版本号，版本号升级时会触发 onupgradeneeded 事件。
● 对象仓库（Object Store） ：类似关系型数据库的“表”，用于存储结构化数据，每个对象仓库有唯一主键（keyPath）。
● 事务（Transaction） ：所有数据操作（增删查改）必须通过事务执行，支持 readonly（只读）和 readwrite（读写）两种模式，确保数据一致性。
● 索引（Index） ：基于对象仓库的某个属性创建，用于快速查询数据（类似数据库索引），支持唯一索引（unique: true）和非唯一索引。
● 主键（KeyPath） ：对象仓库中每条数据的唯一标识，可手动指定（如 deviceId）或自动生成（autoIncrement: true）。
● 游标（Cursor） ：用于遍历对象仓库中的数据，支持条件筛选、排序等复杂查询（基础用法中未提及，下文补充）。
● 版本号管理：数据库版本号必须为正整数，升级后无法回退，修改表结构时需递增版本号。
● 事务生命周期：事务会在操作完成后自动提交，若长时间不操作（如超过 5 秒）会被浏览器终止。
○ 也就是说 当对表进行事务操作（比如 增删改查）操作完成后 会自动关闭事务 不需要程序员手动关闭事务，

● 错误处理：所有操作都需捕获错误（如主键重复、权限不足、存储满），避免影响页面正常运行。
● 性能优化：
○ 批量操作时尽量合并为一个事务，减少事务创建次数。
○ 大量数据查询使用游标（Cursor），避免使用 getAll() 导致内存占用过高。(尽量用分页查询 而不是全量查询）
○ 合理创建索引，提升查询效率，但避免过多索引（会影响新增/修改性能）。
● 数据序列化：虽然 IndexedDB 支持存储对象，但复杂对象（如函数、循环引用对象）无法存储，需提前序列化（如 JSON.stringify）。
● 浏览器兼容性：主流浏览器（Chrome、Firefox、Edge、Safari 10.1+）均支持 IndexedDB，如需兼容旧浏览器（如 IE9-），需使用 localForage 等兼容库。
● 安全限制：IndexedDB 受同源策略限制，不同域名无法访问彼此的数据库；本地文件（file:// 协议）无法使用 IndexedDB，需通过服务器（http:///https://）访问。

```js
const transaction = db.transaction('myStore', 'readwrite');
const store = transaction.objectStore('myStore');

const request = store.put({ id: 1, value: 'data' });
// 没有为 request 设置 onsuccess/onerror 回调！
// 事务将一直等待这个请求的“完成”信号，直到超时（约5秒）后失败回滚。

// 添加一个异步操作
setTimeout(() => {
  // 此操作必定失败，因为事务早已结束
  store.put({ id: 2, value: 'too late' });
}, 1000);
```

## 浏览器跨域

> 由于**浏览器**的同源策略(同协议同域名同端口)产生的问题
>
> 1. JSONP（不推荐）  
>    动态创建script标签，把接口地址写在src里，并且把自己写的回调函数名称拼接接口地址上
> 2. CORS  
>    在接口中设置res.header("Access-Control-Allow-Origin", "*");
> 3. Nginx  
>    配置反向代理（前端和后端都弄到一个server）  
>    前端打后端跨域，所以需要找一个中间商，中间商需要具备的特征（服务端：因为服务端互打不跨域，和前端项目同源，所以前端和后端都弄到一个server）
> 4. proxy  
>    项目开发时临时配置webpack

- 红宝书 第28章 最佳实践
- 红宝书 第22章 处理XML
- 红宝书 第23章 JSON
- 红宝书 第20章 JavaScript API
- 红宝书 第13章 客户端检测
- 红宝书 第1章
- 红宝书 第2章

- 什么是进程
- 什么是线程
- 浏览器的进程模型
- 多线程模式和异步模式
- 什么是阻塞
- 事件循环和异步的关系
- chrome源码中的事件循环
- 事件循环过程
- 多任务的优先级队列
- 计时器精准性问题
- 红宝书 第21章

XSS CSRF

- 红宝书 第24章

- 五层网络模型
- 常见的请求方法
- cookie
- cookie和storage
- 加密
- jwt
- 同源策略
- 跨域-代理
- 跨域-cors
- 跨域- jsonp
- 文件上传
- 输入url地址后发生了什么
- 文件下载
- session
- http缓存协议
- tcp协议
- CSRF攻击和XSS攻击
- 网络性能优化
- 断点续传
- 域名和DNS
- SSL、TLS、HTTPS
- HTTP各版本差异
- WebSocket 和 webSocket实战

浏览器渲染流程  
资源提示关键词  
浏览器的组成部分  
浏览器离线存储概述  
WebsQL  
IndexedDB  
FileAPI!  
浏览器缓存  
跨标签页通信概述  
BroadCast实现跨标签页通信  
ServiceWorker实现跨标签页通信  
storage实现跨标签页通信  
SharedWorker实现跨标签页通信  
IndexedDB实现跨标签页通信  
cookie实现跨标签页通信  
postMessage实现跨标签页通信  
Websocket实现跨标签页通信  
web worker

# 面向对象

- js是基于原型链实现的面向对象语言。java是基于类实现的面向对象语言。

## 对象循环引用

- 两个对象相互引用，解决方法是 使用弱引用或 避免循环引用

## 原型 原型链

```txt
是什么
原型就是 每个实例对象都有 `__proto__` 每个构造函数都有 `prototype`
原型链是 实例对象的`__proto__` 指向 其构造函数的`prototype`
         __proto__ 和 prototype的关系就是原型链的关系。

优缺点
原型链的好处是 节约内存。因为所有实例对象的方法都统一放在 其构造函数的prototype上 共享
    不管创建多少实例对象都不会浪费内存
缺点是访问不存在的成员时，仍然会遍历整个原型链，性能差。

讲应用
应用场景 实现继承 扩展类库、共享方法
当访问对象某个成员时，先看自身有没有，在通过 __proto__ 看 其构造函数的prototype上有没有，
    一直向上找 直到 Object.prototype.__proto__ ===  null 就返回undefined
比如，可以在 Vue的原型上 挂载 字典方法，请求方法。每个页面可以共享这个方法
Vue.prototype.$t = function () {}
Vue.prototype.axios = function() {}
```

## 封装继承多态

- 封装：把数据和操作数据的方法封装到一起。好处是隐藏内部细节，只暴露必要的方法。
- 比如 可以把 数据和操作数据的方法 封装到类里面或函数里面。
- 比如 store中一个模块 就是把数据和操作数据的方法封装到一起。页面上只是调用触发。

- 继承：一个对象可以继承另一个对象的属性和方法，实现代码复用。好处是
- class的extend继承（class是语法糖 底层也是原型链） 原型链继承 构造函数继承 组合继承 寄生组合继承

- 多态是 同一个方法，不同的对象调用，得到不同的结果。
- 多态：同一个方法，不同的对象调用或传不同的参数有不同的行为（得到不同的结果）
- 比如 封装同一个方法，根据调用者this不同 或 参数不同 ，做出不同的行为。

## 成员

- 成员表示属性和方法

## 静态成员

- 静态成员 用 static 关键字声明 表示是类的静态成员 不用 static 表示是实例成员

## 私有成员

- 私有成员 命名用#前缀 配合 get set 使用
  getter成员 用 get 关键字
  setter成员 用 set 关键字

##

## super

- super是es6实现类继承的核心概念

- 不写 constructor，会自动调用super 并传参。

- super有2种用法：

1. 作为函数调用：super() - 调用父类构造函数 只能在 子类的constructor里面 调用父类的 constructor方法 且必须第一行 （使用this之前）
2. 作为对象使用：super.methodName() - 调用父类的方法 通过super调用方法 这个方法的this 是 当前super所在的方法的调用方式决定的 如果是用变量装一下 直接调用变量 this是undefined

// super关键字
// // super关键字
// // super可以调用父类的 constructor函数 并传参 也可以调用父类的普通函数
// // super必须在 子类用this之前调用
// super() // 在子类的constructor中 调用父类constructor函数
// super.父类方法名() // 在子类的普通函数中 调用父类方法

// 子类和父类有同名方法时
// 子类用 super.名字() 调用父类的方法 用this.名字() 调用自己子类的方法
// 如果没有重名方法 super.名字() 和 this.名字() 没有区别 因为只能找到一个方法

在对象字面量中使用 super
ES6 允许在对象字面量中使用 super（需要方法简写语法）： xxx() {} 不能是 xxx: function(){}

## 对象

- js对象是一个无序的键值对集合，键只能是string或symbol，值可以是任意类型。

## new操作符

- new操作符 底层原理
- 创建一个空对象，并且把空对象的__proro__ 指向 父类的prototype 利用原型链继承方法
- 利用apply方法 调用 父类，并把this修改为 这个空对象， 实现继承属性
- 最后返回这个对象

```js
function createObj(Class, ...args) {
  // 创建一个空对象 并且把 空对象的 __proto__ 指向 父类的prototype
  const obj = Object.create(Class.prototype); // 原型链继承方法
  const result = Class.apply(obj, args); // 调用父构造 继承属性
  return result instanceof Object ? result : obj; // 返回这个对象
}
createObj(Array, 1);
createObj(Array, 1, 2);
```

## 编程思维-面向对象

- 编程思维一个项目中可以有多种编程范式 取决于实际场景灵活运用

## 面向对象编程OOP

-

## 面向过程

## 面向函数编程

- 面向函数编程 全是 纯函数

## 脑图

```js
● JS中的继承
  ○ 是什么
    ■ JS的继承是通过 构造函数继承属性、原型链继承方法 来实现
  ○ 优缺点
    ■ 构造函数继承属性的好处是
      ● 就算继承的是 引用数据类型 也不会影响其他实例
    ■ 原型链继承方法的好处是
      ● 节约内存，因为所有方法都在prototype上共享
  ○ 应用
    ■ 一般来说 不需要共享就用构造函数继承，需要共享就用原型链继承
```

## 构造函数继承

```js
function Animal() {}
Animal.prototype.chi = function () {
  console.log('我是动物 我会吃人');
};
function Dog() {
  Animal.call(this); // 构造函数继承， 缺点：只能继承父类自身属性方法 不能继承父类的原型链上的属性方法
}
```

## 原型链继承

```js
function Dog() {}
Dog.prototype = new Object(); // 原型链继承：缺点是 引用类型的数据会被所有实例对象共享 ，一个实例修改 所有实例都变了 这是我们不希望的
Dog.prototype.constructor = Dog; // 修复 constructor 指回自己
```

## 组合继承

```js
function Dog() {
  Object.call(this); // 继承属性
}
Dog.prototype = new Object(); // 继承方法： 缺点是 继承属性和继承方法 一共调用2次父类
Dog.prototype.constructor = Dog; // 修复 constructor 指回自己
```

## 寄生组合继承

- 最优解

```js
function Dog() {
  Object.call(this);
}
Dog.prototype = Object.create(Object.prototype); // 赋值一个空对象 {}
Dog.prototype.constructor = Dog; // 修复 constructor 指回自己

const dog = new Dog();
console.log('toString', dog.toString);
console.log('constructor', Dog.prototype.constructor === Dog);
```

## class继承

```js
class Animal {
  constructor(name) {}
}

class Dog extends Animal {
  constructor(name, age) {
    super(name); // 必须在使用this之前调用super  调用super就是调用 父类的constructor方法
    /**
     * 为什么需要调用super
     * 我的理解是 调用super 本质是调用父类的constructor
     * 因为 js的class 是基于原型链的，必须先实例化父类 才能保证原型链的顺序
     * 为什么不把 调用 super 的逻辑放进 extends 里面？因为调用方法可能需要传参数, 不知道传什么 所以开放super给开发者决定
     */
  }
}
```

## Vue继承Object

```js
function Vue() {
  Object.call(this); // 继承Object属性
}
// 继承Object方法
Vue.prototype = Object.create(Object.prototype);
Vue.prototype.constructor = Vue;

// 测试
const vm = new Vue();
console.log(vm.toString, vm.valueOf); // toString方法 valueOf方法都是继承过来的
```

## 原型链的终点

是什么？

## 内存泄漏

内存泄漏就是内存使用后没有回收。
比如全局变量、没有清除定时器 、没有解绑的事件、游离节点等等。
不再使用的变量需要赋值null 切断引用 让GC回收

## 垃圾

垃圾就是不再使用的变量。

## GC垃圾回收机制

垃圾回收机制就是自动回收不再使用的变量。js是自动垃圾回收机制，js的垃圾回收机制是引用计数和标记清除。

## 包装类型

string number boolean
当 基础类型 不是对象 没有属性方法 当用基本数据类型访问属性方法时 会自动转包装类型 String('a')

## 深浅拷贝

浅拷贝：只复制对象的第一层属性。如果属性值是基本类型，拷贝的是值；如果属性值是引用类型（对象、数组），
则拷贝的是内存地址。因此，新旧对象会共享同一个嵌套对象，修改一方会影响另一方。

深拷贝：递归复制对象的所有层级。它会创建一个完全独立的对象，在堆内存中开辟新空间。
新旧对象完全隔离，修改任意一方都不会影响另一方。

如何实现浅拷贝： 展开运算符... Object.assign() 数组的slice和concat()
如何实现深拷贝:

- JSON.parse(JSON.stringify(obj)) 缺点是 不支持函数和循环引用
- lodash.cloneDeep() 好处是 支持函数、循环引用
- window.structuredClone({a: {a:1}})

## 数据类型转换

1. 引用类型 转 基础类型：调用 valueOf toString（） 不行就报错
2. 基础类型 转 字符串：直接加引号 null "null" "undefined" "false" "1" 1n 是 "1" "Symbol()"
3. 基础类型 转 数字：

undefined 是 NaN
null为0
布尔值转数字：false为0 true为1
字符串转数字：
引号中 只有数字 会忽略首尾空白字符 得到数字
'' 会会忽略首尾空白字符为0

引号中不是 纯数字 也不是纯空白字符 那就是 NaN 4. 任意 转 布尔：6大假值

- JS的6大假值是 false '' null undefined 0 NaN （正负0也属于0 正负NaN 也属于NaN）

## 块级作用域

## 变量提升

## new操作符

## 箭头函数与普通函数的区别

## JavaScript脚本延迟加载 defer async

## use strict是什么意思 ? 使用它区别是什么？

use strict 是一种 ECMAscript5 添加的（严格模式）运行模式，这种模式使得 Javascript 在更严格的条件下运行。设立严格模式的目的如下：

    •	消除 Javascript 语法的不合理、不严谨之处，减少怪异行为;
    •	消除代码运行的不安全之处，保证代码运行的安全；
    •	提高编译器效率，增加运行速度；
    •	为未来新版本的 Javascript 做好铺垫。

解释型语言 编译型语言

js是解释型语言 不需要编译 直接被浏览器解释执行， 但vue需要编译为js 才可以被浏览器解释执行，所以vue是有编译阶段的。
java是编译型语言，java语言本身需要编译成.class才可以被执行。所以是编译型语言

for...in和for...of的区别

● for…of 遍历获取的是对象的键值，for…in 获取的是对象的键名；
● for… in 会遍历对象的整个原型链，性能非常差不推荐使用，而 for … of 只遍历当前对象不会遍历原型链；
● 对于数组的遍历，for…in 会返回数组中所有可枚举的属性(包括原型链上可枚举的属性)，for…of 只返回数组的下标对应的属性值；
总结：for...in 循环主要是为了遍历对象而生，不适用于遍历数组；for...of 循环可以用来遍历数组、类数组对象，字符串、Set、Map 以及 Generator 对象。

获取非原型链上的属性 通过hasOwnProperty可以判断是自己的属性还是原型链上的
({a: 1}).hasOwnProperty('keys')

## 执行上下文/作用域链/闭包

异步编程的实现方式？如何实现异步编程
回调函数 Promise generator async/await

JavaScript中的异步机制可以分为以下几种：

● 回调函数 的方式，使用回调函数的方式有一个缺点是，多个回调函数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦合度太高，不利于代码的可维护。
● Promise 的方式，使用 Promise 的方式可以将嵌套的回调函数作为链式调用。但是使用这种方法，有时会造成多个 then 的链式调用，可能会造成代码的语义不够明确。
● generator 的方式，它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部还可以将执行权转移回来。当遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕时再将执行权给转移回来。因此在 generator 内部对于异步操作的方式，可以以同步的顺序来书写。使用这种方式需要考虑的问题是何时将函数的控制权转移回来，因此需要有一个自动执行 generator 的机制，比如说 co 模块等方式来实现 generator 的自动执行。
● async 函数 的方式，async 函数是 generator 和 promise 实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行。

Promise.all和Promise.race的区别的使用场景

## 对async/await 的理解

## await后面可以是任意值 ,如果不是promise 那就没意义 等于不写await

## 并发与并行

## 同步和异步

## monorepo和微前端的区别

## 词法作用域和动态作用域

- 词法作用域是 函数的作用域在定义时就确定。
- 动态作用域是 函数作用域在调用时才确定。

## 严格模式

- 在脚本顶部或函数内顶部 写'use strict' 字符串。

## 箭头函数普通函数区别

this arguments prototype 都没有

- 箭头函数没有this，箭头函数使用this是外层的this。
- 箭头函数没有 arguments，批量获取参数 只能使用es6的剩余参数
- 箭头函数 有 `__proto__` 但没有 `prototype` ，所以不能作为构造函数也不能 new 调用 (Array.prototype.constructor )

有4个区别：this arguments new.target new

普通函数：this 是动态绑定的，取决于调用方式
箭头函数：this 是词法绑定的，取决于词法环境定义到哪里，继承外层作用域的 this

普通函数：有自己的 arguments 对象
箭头函数：没有 arguments，需要使用 rest 参数

普通函数：可以使用new.target
箭头函数：使用 new.target 会报错

普通函数：可以通过new调用
箭头函数：new调用会报错 因为没有 prototype.constructor 也没有constructor 但箭头存在 `__proto__` 原型链

相同点：
(()=>{}).**proto** === (function () {}).**proto** // true 所以都有call 但是箭头函数调用call没效果

super区别先不说

## arguments

- argument是一个伪数组对象，表示所有的参数列表，现在用 es6 的剩余参数取代。

```js
function a(...args) {
  console.log(Array.from(arguments));
  console.log(args);
}
```

##

脚手架是用来快速搭建项目的命令行工具。好处就是统一标准化，比如 ts eslint 构建工具配置。不需要完全从0到1.

## 柯里化

- 柯里化是把多参函数优化为嵌套的单参函数 是什么 应用 柯里化 固定化参数 好处

## 高阶函数

- 高阶函数：函数的返回值或参数也是函数
- 操作型函数：这个函数会修改外部状态外部某个变量
- 取值型函数：这个函数会返回一个值 或 传递一个回调接收参数

## 变量提升

- 变量提升是 变量声明会提升到顶部，赋值不会提升。
- 函数和变量同名，函数会先提升 变量会覆盖函数。

## 暂时性死区

## 值传递和引用传递

- 值传递就是 两个变量完全独立，给其中一个赋值，不影响另一个。
- 引用传递就是 给其中一个变量赋值，另一个也跟着变。
- C++里面有引用传递 JS没有引用传递 全是值传递。

## 纯函数

- 纯函数就是 相同的输入始终返回相同的输出，不受外部状态影响，也不修改任何外部状态，没有副作用。

## 惰性函数

- 惰性函数是 第一次调用时 根据实际情况 重写自身，后续调用更高效。这个实际情况后续都不会变。 比如兼容性问题只需要判断一次。

## 参数归一化

## 函数重载

- 函数重载是 可以声明 函数名相同 但 参数个数 或 参数类型不同的同名函数。 js不支持函数重载 只能手动模拟。
- 函数重载：函数重载是 函数名相同，参数的个数或类型不同。

## dom

dom是文档对象模型。

## 创建dom

创建dom 通过document.createElement方法 或 document.querySelector 或 document.getElementById 等方式拿到dom

## 删除dom

删除dom 通过 dom.remove()

## 事件对象

事件对象是绑定事件后通过回调函数的参数拿到。
e.target / e.currentTarget
e.preventDefault()
e.stopPropagation()
e.key / e.code（键盘）
e.clientX / pageX（鼠标）

## 事件绑定

事件绑定通过 dom.addEventListener() 和 dom.onclick = function(){} 方式绑定。解绑通过 removeEventListener 和 dom.onclick = null 方式解绑。

## 事件类型

鼠标事件：click dblclick contextmenu
mouse系列有 down up move over enter out leave

mousedown mouseup mousemove mouseover(冒泡) mouseout mouseenter(不冒泡) mouseleave

表单事件：input focus blur change
鼠标事件：click dblclick contextmenu mousedown mouseup mousemove mouseover(冒泡) mouseout mouseenter(不冒泡) mouseleave
键盘事件：keydown keyup
窗口事件：resize scroll whell
手指事件：touchstart touchmove touchend
拖拽事件：dragstart drag dragend
放置事件：dragover drop dragenter dragleave

## 阻止默认行为

阻止默认行为是 通过事件对象 e.preventDefault()

## 事件冒泡

## 事件捕获

## 事件委托

## 事件流

DOM事件流分为三个阶段 捕获阶段 目标阶段 冒泡阶段

## dom常用方法

innerText
innerHTML
textContent

## 进入全屏

进入全屏通过 document.documentElement.requestFullscreen() 而退出全屏通过 document.exitFullscreen() 退出全屏。

# Math 数学对象

```js
Math.floor(1.2); // 2 向上取整
Math.ceil(1.2); // 1 向下取整
Math.random(); // 0-1之间的随机数 小数点是16位
Math.max(1, 2, 3, 4); // 4 最大值
Math.min(1, 2, 3, 4); // 1 最小值
```

## Worker线程

## 视频

```js
// video.js
// flv.js
// Dplary.js
// 方式一 html方式
<video id='videoElement'></video>;

const videoElement1 = document.getElementById('videoElement');

// 方式二
const videoElement2 = document.createElement('video');
```

## 集合Set

集合Set就是没有顺序且唯一的数组

add
delete
has
clear
size

## Number

number用来表示 整数 小数 正数 负数 正无穷 负无穷 NaN
常用操作

判断：Number.isInteger、Number.isFinite、Number.isSafeInteger

转换：Number()、parseInt、parseFloat、toFixed（返回字符串，注意舍入误差）

数学：Math.round/floor/ceil/trunc、Math.random、Math.max/min

格式化：toLocaleString、Intl.NumberFormat

NaN 只能用 Number.isNaN 判断。window.isNaN会先转换再判断。

0.1 + 0.2 !== 0.3 // true 为什么不等于 因为精度问题

## Map

Map是key-value组成的元组数组。也就是一个二维数组。 key可以是任意值。
常用方法 set get delete has keys values entries forEach

## 图像

图像用new Image和 img标签 来创建。new Image 主要是内存中创建，img标签是页面中创建。

## history

history历史对象是用来记录浏览器的历史记录，包括页面跳转、前进后退等操作。
window.history.go(整数) // 1表示前进1个页面 -1表示后退一个页面
history.length(): 保存历史记录的数量

// history可以实现多页面的跳转 单页面跳转用vue-router
history.pushState
history.replaceState

## canvas

canvas画布

## Date

Date对象 通过 new Date() 创建,

getFullYear getMonth getDate getHours getMinutes getSeconds
setFullYear setMonth setDate setHours setMinutes setSeconds

## 时间戳

时间戳是 世界时间1970年1月1号0点 到现在的毫秒数。中国时间是早上8点。通过 Date.now() 或者 把 new Date() 用+转一下 获取当前时间戳

## 文件

inputDOm的change事件可以拿到 file文件对象

##

scroll家族
scrollTop 可读写
scrollLeft 可读写
scrollHeight 只读
scrollWidth 只读

offset家族
offsetTop
offsetLeft
offsetHeight
offsetWidth
offsetParent

client家族
clientTop
clientLeft
clientHeight
clientWidth

## 表单元素

type
checked
value
disabled
readonly
required
placeholder
autofocus
blur
focus

## ////

## Sandbox

JS沙箱就是一个安全隔离的代码执行环境。比如 iframe标签、WebWorker、ES Module、Proxy + with。都可以叫做沙箱

## CSS隔离

CSS隔离

01_database

Nodejs

Nestjs

TypeScript JavaScript

Vue

`esm es module`
`cjs commonjs`
`IIFE立即执行函数`

`this指向`,
`原型 原型链`,
`作用域 作用域链`,  
`闭包`,
`垃圾回收机制`  
`高阶函数`  
`运算符规则`  
`js表达式`  
`数据类型转换`  
`预编译`  
`执行上下文 执行上下文栈`  
`面向对象 封装继承多态`  
`属性描述符`  
`代理和反射`  
`Promise`  
`剩余参数 扩展运算符`  
`解构`  
`ES Module`  
`普通函数 箭头函数`  
`class`  
`生成器函数 迭代器对象 迭代协议`  
`符号`  
`集合类型`  
`类型化数组`  
`变量提升`  
`暂时性死区TDZ`  
`DOM文档对象模型`  
`BOM浏览器对象模型`  
`资源提示符 async defer prefetch preload `  
`深浅拷贝`
`值传递 引用传递`  
`帧率`
`BFC`
`XSS和CSRF`
`强缓存协商缓存`

`跨域`
`重排重绘`
`深浅拷贝`
`http方法`
`http协议`
`http状态码`
`事件委托事件代理`
`HTML页面的生命周期钩子`

document.DOMContentLoaded = () => {} 加载完整个DOM树后触发
window.load = () => {} // img css js 等资源加载完毕 触发
window.beforeunload = () => {} 用户离开页面前触发
window.unload = () => {} 用户离开页面后触发

核心概念
this指向
面向对象：封装 继承 多态
原型 原型链
作用域 作用域链
预编译 执行上下文 执行上下文栈
闭包 Closure
垃圾回收
高阶函数
运算符规则 表达式 类型转换
属性描述符
代理和反射
promies手写
剩余参数 扩展运算符
解构
es module
箭头函数
类
生成器 迭代器 迭代协议
符号
集合类型
类型化数组

作用域和作用域链

作用域（Scope）是变量可以在哪个范围内使用
全局作用域：是在函数外声明的变量
函数作用域：是函数内声明的变量
块级作用域：是花括号内声明的变量 比如 if for 对象的花括号不算 （es6新增

for (let i = 0; i < 3; i++) {
setTimeout(() => console.log(i), 100); // 打印 3, 3, 3
}

作用域链（Scope Chain）是使用变量时 先找当前作用域 在找向外层作用域查找 直到全局作用域，最终找不到就报错未定义。
词法作用域（Lexical Scope）是函数定义时就确定了 词法作用域为什么叫词法作用域
函数的this是 函数调用时才确定
let const 是块级作用域  
var是函数作用域

## `作用域 作用域链`

## `new操作符`

## `this指向`

## `XSS和CSRF`

## `强缓存协商缓存`

## `资源提示符`

## `跨域`

## `重排重绘`

## `深浅拷贝`

## `ES Module`

## `普通函数 箭头函数`

## `class`

## `生成器函数 迭代器对象 迭代协议`

## `Promise`

- 引导all race 方法

## `Promise.all()`

### 方案1

- `js放在所有dom之后 也就是body结束标签（</body>）之前`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>Document</title>
  </head>
  <body>
    <div></div>
    <script>
      // js放在所有dom之后 也就是body结束标签（</body>）之前
    </script>
  </body>
  <script>
    /* 放这也一样 */
  </script>
</html>
```

### 方案2

- defer async

## V8引擎如何执行js代码的

编译器 解析器 词法分析 语法分析 抽象语法树 字节码 即时编译器 垃圾回收机制

https://www.yuque.com/12312wo/ohpa1n/fyv7nzo9eh8zr4ro

## 渲染引擎是如何渲染的 ( 浏览器的渲染原理 )

重排 重绘

## 为什么读取 offsetHeight 会导致强制重排（reflow）

## 渲染引擎原理

- 执行渲染： 主线程在事件循环机制下调用渲染引擎 webkit/blink 执行渲染, 渲染时机是 在事件循环的宏任务前 判断是否需要渲染 需要渲染就渲染。
  - 重排重绘
  - 渲染：通过html字符串 计算出 屏幕上每一个像素点信息的颜色 交给GPU完成渲染。

主线程 调用渲染引擎 执行渲染 - 解析html

- 重绘 重排

执行渲染阶段（样式、布局、绘制、合成）

    webkit/blink渲染引擎：（如何渲染的） 重排重绘 DOM树 CSSOM树 布局树 分层 堆叠上下文 包含块

主线程通知 渲染引擎webkit/blink： 解析html css DOM树 CSSOM树 布局树 绘制 （遇到js 通知 v8引擎执行js）
主线程通知 合成线程 去 生成像素信息

渲染流水线（样式计算、布局、绘制）

# 渲染原理

大多情况下 dom树和布局树不是一一对应的
比如: 父元素的高度是auto 那么就是根据子元素的高度来计算的 %单位根据父元素的宽度来计算的
比如 :before 布局树比dom树多一个节点
比如 display:none 布局树比dom树少一个节点
匿名行盒 匿名块盒 等等 都会导致布局树和dom树 不一一对应

渲染就是通过html字符串 计算出 屏幕上每一个像素点是什么颜色，

主线程通过网络 拿到html后 产生一个渲染任务

根据事件循环机制 主线程从消息队列中 拿到渲染任务 通过 blink渲染引擎 进行解析渲染

主线程通过blink 解析到 js 就会 调用 v8引擎执行js代码

css和js 都是预解析线程 主线程不会等css 但主线程会等js（为什么等 因为js可能操作dom css不会操作dom） 所以

```js
四大样式表
1. 浏览器默认样式表
2. 内联样式 <div style="xxx"></div>  >>> js操作 dom,style.xxx
3. 内部样式表 <style>xxx</style>
4. 外部样式表 <link rel="stylesheet" href="xxx.css">
除了浏览器的默认样式之外 其他样式表js都能操作

```

第一步完成后，会得到DOM树和CSSOM树，浏览器的默认样式、内部样式、外部样式、行内样式均会包含在CSSOM 树中。
下载和解析CSS的工作是在预解析线程中进行的 和渲染主线程无关。所以css不会阻塞 dom ，
8个步骤

1. 解析html字符串 生成dom树 生成cssom树
2. 解析css字符串 样式计算
3. 把dom树和cssom树合并成一个渲染树 布局
4. 把渲染树绘制到屏幕上 绘制 分层
5. 生成图层
6. 图层合成
7. 显示在屏幕上
8. 重复上面的步骤 每次渲染都要执行 这个串行的过程。

dom树
cssom树
布局树 渲染树

```js
● 渲染流程
  ○ 是什么
    ■ 浏览器的渲染流程，大致有8个步骤：
    输入html字符串 输出dom树 cssom树
    ■ 首先，解析html字符串，遇到js会阻塞dom树的构建，遇到css不会阻塞dom树构建，但是link标签的资源下载过慢会阻塞dom树的渲染 所以css可以放在dom之前 js需要放在dom之后;

    ■ 第二步，计算样式，这里相对单位会变为绝对单位，比如%单位会 变为 px单位 （css属性值计算过程 发生在这里）
    ■ 第三步，排列布局，这里会计算每个DOM的几何信息。js中操作DOM几何属性就会触发重排。  视觉格式化模型：盒模块 包含块


    ■ 第四步，分层，使用 will-change可以单独分层  will-change: transform;
    ■ 第五步，绘制，为每一个图层生成绘制指令，js中操作DOM外观属性就会触发重绘。重排一定导致重绘，重绘不一定重排，所以重绘的性能更好。


   最后一步 是 合成线程 将绘制指令转为是实际像素 渲染到页面上

    ■ 第六步，分块，分块是为了 优先处理 视口区域
    ■ 第七步，光栅化，这里会把绘制指令转为实际的像素
    ■ 第8步，合成，将像素合成最终画面。使用transform效率比left top高 是因为left top是几何属性会触发重排重绘，而transform是合成线程处理，和主线程无关。

    浏览器的每一帧渲染 都会依次执行 这个串行过程。
```

## 正文

```js
## 浏览器是如何渲染页面的？

当浏览器的网络线程收到 HTML 文档后，会产生一个渲染任务，并将其传递给渲染主线程的消息队列。
在事件循环机制的作用下，渲染主线程取出消息队列中的渲染任务，开启渲染流程。
整个渲染流程分为多个阶段，分别是： HTML 解析、样式计算、布局、分层、绘制、分块、光栅化、画
每个阶段都有明确的输入输出，上一个阶段的输出会成为下一个阶段的输入。
这样，整个渲染流程就形成了一套组织严密的生产流水线。

## 解析html字符串
渲染的第一步是**解析 HTML**。
解析过程中遇到 CSS 解析 CSS，遇到 JS 执行 JS。为了提高解析效率，浏览器在开始解析前，会启动一个预解析的线程，率先下载 HTML 中的外部 CSS 文件和 外部的 JS 文件。
如果主线程解析到`link`位置，此时外部的 CSS 文件还没有下载解析好，主线程不会等待，继续解析后续的 HTML。这是因为下载和解析 CSS 的工作是在预解析线程中进行的。这就是 CSS 不会阻塞 HTML 解析的根本原因。
如果主线程解析到`script`位置，会停止解析 HTML，转而等待 JS 文件下载好，并将全局代码解析执行完成后，才能继续解析 HTML。这是因为 JS 代码的执行过程可能会修改当前的 DOM 树，所以 DOM 树的生成必须暂停。这就是 JS 会阻塞 HTML 解析的根本原因。
第一步完成后，会得到 DOM 树和 CSSOM 树，浏览器的默认样式、内部样式、外部样式、行内样式均会包含在 CSSOM 树中。

遇到css不会阻塞dom树构建，但是link标签的资源下载过慢会阻塞dom树的渲染，解决方法：使用cdn加快下载css
遇到script会阻塞dom树构建，解决方法：使用async和defer属性 或 放到`</body>`标签前面
https://cloud.tencent.com/developer/article/1370715
-------

## 计算最终样式
渲染的下一步是**样式计算**。

主线程会遍历得到的 DOM 树，依次为树中的每个节点计算出它最终的样式，称之为 Computed Style。

在这一过程中，很多预设值会变成绝对值，比如`red`会变成`rgb(255,0,0)`；相对单位会变成绝对单位，比如`em`会变成`px`

这一步完成后，会得到一棵带有样式的 DOM 树。

--------

## 布局

接下来是**布局**，布局完成后会得到布局树。

布局阶段会依次遍历 DOM 树的每一个节点，计算每个节点的几何信息。例如节点的宽高、相对包含块的位置。

大部分时候，DOM 树和布局树并非一一对应。

比如`display:none`的节点没有几何信息，因此不会生成到布局树；又比如使用了伪元素选择器，
虽然 DOM 树中不存在这些伪元素节点，但它们拥有几何信息，
所以会生成到布局树中。还有匿名行盒、匿名块盒等等都会导致 DOM 树和布局树无法一一对应。
得到layout布局树 或叫render tree 渲染树 布局树和渲染树是同一个东西
创建 布局树（又称 Render Tree，但严格来说布局树更准确）
(1) 生成布局树（Layout Tree）
线程：渲染主线程
过程：
遍历 DOM 树，过滤掉不需要布局的节点（如 display: none）
创建 布局树（又称 Render Tree，但严格来说布局树更准确）
计算每个节点的几何信息（位置、尺寸等）
关键点：
visibility: hidden 会保留在布局树中（占位但不绘制）

布局过程可能触发 回流（Reflow）（如修改宽度、字体大小）
-----------

## 分层
下一步是**分层**

主线程会使用一套复杂的策略对整个布局树中进行分层。

分层的好处在于，将来某一个层改变后，仅会对该层进行后续处理，从而提升效率。

滚动条、堆叠上下文、transform、opacity 等样式都会或多或少的影响分层结果，也可以通过`will-change`属性更大程度的影响分层结果。

使用 will-change:transform 可以单独分层，并且会启动 GPU 进行加速渲染。
 .box {
      width: 100px;
      height: 100px;
      background-color: red;
      transition: transform 0.5s, opacity 0.5s;
      /* 提前告知浏览器即将变化的属性 */
      will-change: transform, opacity;
    }

    .box:hover {
      transform: scale(1.5);
      opacity: 0.5;
    }
    will-change有四个属性值：auto，scroll-position，contents 和 <custom-ident>。

<custom-ident> 值用于指定你期望改变的一个或多个属性的名称。多个属性用逗号隔开。
在dom变换之前添加 will-change 再变化之后移除 will-change 可以减少内存开销。
变化前使用will-change，变化后移除will-change
线程：渲染主线程

过程：

根据层级（z-index）、裁剪、滚动等属性，将布局树分为多个 图层（Layers）

每个图层独立绘制和合成（如视频、3D 变换会触发新图层）

优化：

避免过多图层（内存开销）和层爆炸（Layer Explosion）
---------
## 绘制
再下一步是**绘制**

主线程会为每个层单独产生绘制指令集，用于描述这一层的内容该如何画出来。

------

完成绘制后，主线程将每个图层的绘制信息提交给合成线程，剩余工作将由合成线程完成。

合成线程首先对每个图层进行分块，将其划分为更多的小区域。

它会从线程池中拿取多个线程来完成分块工作。

为每个图层生成 绘制指令列表（Paint Records）

指令类似“先画背景，再画边框，最后画文本”

关键点：

绘制阶段 不实际渲染像素，只是生成指令

修改颜色等不影响布局的属性会触发 重绘（Repaint）

----
线程：合成线程（Compositor Thread）

过程：

将图层拆分为 图块（Tiles）（如 256x256 像素的小块）

优先处理可视区域（Viewport）内的图块

分块完成后，进入**光栅化**阶段。

合成线程会将块信息交给 GPU 进程，以极高的速度完成光栅化。

GPU 进程会开启多个线程来完成光栅化，并且优先处理靠近视口区域的块。

光栅化的结果，就是一块一块的位图

---------

最后一个阶段就是**画**了

合成线程拿到每个层、每个块的位图后，生成一个个「指引（quad）」信息。

指引会标识出每个位图应该画到屏幕的哪个位置，以及会考虑到旋转、缩放等变形。

变形发生在合成线程，与渲染主线程无关，这就是`transform`效率高的本质原因。

合成线程会把 quad 提交给 GPU 进程，由 GPU 进程产生系统调用，提交给 GPU 硬件，完成最终的屏幕成像。

## 什么是 reflow？

reflow 的本质就是重新计算 layout 树。

当进行了会影响布局树的操作后，需要重新计算布局树，会引发 layout。

为了避免连续的多次操作导致布局树反复计算，浏览器会合并这些操作，当 JS 代码全部完成后再进行统一计算。所以，改动属性造成的 reflow 是异步完成的。

也同样因为如此，当 JS 获取布局属性时，就可能造成无法获取到最新的布局信息。

浏览器在反复权衡下，最终决定获取属性立即 reflow。

## 什么是 repaint？

repaint 的本质就是重新根据分层信息计算了绘制指令。

当改动了可见样式后，就需要重新计算，会引发 repaint。

由于元素的布局信息也属于可见样式，所以 reflow 一定会引起 repaint。

## 为什么 transform 的效率高？

因为 transform 既不会影响布局也不会影响绘制指令，它影响的只是渲染流程的最后一个「draw」阶段

由于 draw 阶段在合成线程中，所以 transform 的变化几乎不会影响渲染主线程。反之，渲染主线程无论如何忙碌，也不会影响 transform 的变化。

```

● 1 parseHTML 解析html 字符串 把字符串解析成 dom树和css om树 （为什么要解析 因为字符串不方便操作 解析成对象 方便后续操作）
○ 解析标签的时候 遇到没有defer或async的script标签 就会阻塞dom树的构建
○ script标签表示 js
○ link style 标签 表示css 标签的style属性也是css 【外链式 内链式 行内式 浏览器默认样式表】
○ link标签 style标签 通过 document.styleSheets
○ 行内式 通过 dom.style获取
● 做解析html字符串 解析出 dom树对象和css树对象 是方便用js操作 因为字符串不方便操作

相对包含块的位置 而不是父元素 width: 100% 百分比是相对包含块

will-change这个属性可以设置单独一层 不要滥用 发现有性能问题希望单独这里分一层 才用

● 什么是 reflow 重排

重排一定会引起重绘  
● transform为什么效率高 因为trasfrom只会引起重绘 不会重排

webkit和blink是 渲染引擎：执行 html css 渲染到页面上 之前是webkit 现在是 blink
v8引擎是 执行js

浏览器内核Chromium = 渲染引擎(webkit blink) + JS引擎(v8) + 其他

Chromium 是 chrome浏览器的源码项目名 （有些项目 app名和项目名一致）
chrome 是谷歌浏览器软件的英文名
渲染引擎(webkit blink) + JS引擎(v8) 统称为 浏览器内核

## 什么是 reflow？ 重排

reflow 的本质就是重新计算 layout 树。

当进行了会影响布局树的操作后，需要重新计算布局树，会引发 layout。

为了避免连续的多次操作导致布局树反复计算，浏览器会合并这些操作，当 JS 代码全部完成后再进行统一计算。所以，改动属性造成的 reflow 是异步完成的。

也同样因为如此，当 JS 获取布局属性时，就可能造成无法获取到最新的布局信息。

浏览器在反复权衡下，最终决定获取属性立即 reflow。

## 什么是 repaint？ 重绘

repaint 的本质就是重新根据分层信息计算了绘制指令。

当改动了可见样式后，就需要重新计算，会引发 repaint。

由于元素的布局信息也属于可见样式，所以 reflow 一定会引起 repaint。

## 为什么 transform 的效率高？

因为 transform 既不会影响布局也不会影响绘制指令，它影响的只是渲染流程的最后一个「draw」阶段

由于 draw 阶段在合成线程中，所以 transform 的变化几乎不会影响渲染主线程。反之，渲染主线程无论如何忙碌，也不会影响 transform 的变化。

##

单线程是异步产生的原因
事件循环是异步的实现方式

##

渲染主线程 调用V8引擎 去解析js代码生成字节码并执行 （主线程是人 V8是工具） 负责“算逻辑”，不负责“画像素”。
渲染主线程 调用Blink / WebKit 渲染引擎 去执行渲染任务， 负责“画像素”。（样式、布局、绘制、合成）。

## 并发和并行

并发是 在一段时间内 CPU面对多个任务，会将每个任务交替执行一段时间。对于某个瞬间只在执行一个任务，高频切换 让每个任务都能得到推进。并不是同时执行的。

并行是多个CPU或多核的单个CPU，在同一时间，每个核心都在执行不同的任务。多个任务在同时执行。

获取 几核 os模块  
并发是逻辑上的“同时”，是任务交替执行（看起来像同时）。
并行是物理上的“同时”，是任务真正在同时执行。

单核CPU通过快速切换任务执行，实现同时处理多个任务。
多核CPU在同一时间执行不同的任务，实现真正的同时处理。

在现在的操作系统中 并发和并行是同时存在的。
从单核CPU看 那就是并发
从多核CPU看 那就是并行

举个例子。并发是一个人吃三个馒头，一口一口交替着吃。并行是三个人一人吃一个馒头，同时吃。

## 同步和异步

1. 同步是什么
2. 异步是什么

等就是同步 不等就是异步

同步sync: 执行多个任务，必须等上一个任务完成拿到结果后，再执行下一个任务。
异步async： 执行多个任务时，不用等上一个任务完成，就可以执行下一个任务。

## 堆和栈

## 浏览器内核

- 浏览器内核 一般是 渲染引擎和JS引擎的统称。

## V8引擎

- 执行JS：主线程在事件循环机制下调用V8引擎执行JS。
- 词法分析 语法分析
- 事件循环机制：

执行渲染和执行js是互斥的，因为主线程执行渲染就不能

主线程 调用V8引擎 执行（执行栈的顶栈的js代码）- 词法分析 - 语法分析 - 语义分析 - AST抽象语法树 - 把源码 转为 二进制代码 - 垃圾回收机制

    v8引擎：（v8是如何执行js代码的）AST抽象语法树 词法分析 语法分析 语义分析 GC垃圾回收机制 标记清除算法 引用计数 svaweiji算法  执行上下文
        词法环境 执行栈 作用域作用域链 闭包  执行栈

## 预编译

- 预编译是
  预编译 = 代码执行前的准备阶段，包括：

创建执行上下文

变量提升（var、function）

确定作用域链

确定 this 指向
------------

预编译发生在代码执行之前

var 和 function 会提升,会初始化值为undefined ，let/const 会提升但不会初始化 存在暂时性死区 TDZ

函数提升优先级高于变量提升

预编译阶段确定了作用域链和 this

理解预编译就能理解变量提升的本质

## 为什么需要执行栈？

- js是单线程语言 一次只能做一件事，执行栈可以

1. 管理函数的执行顺序
2. 管理多个执行上下文的创建和销毁
3. 记录当前执行到了哪里
4. 处理函数的返回

执行栈和异步代码的关系

- 执行栈里面是当前执行的函数
- 任务队列里面是等待执行的函数， 异步任务不会立即执行，而是通过事件循环进行排队。

## AST抽象语法树

- AST抽象语法树 是 把 源码字符串 通过 词法分析 语法分析 得到抽象语法树。

## 词法分析

- 词法分析就是把源码字符串进行词法拆分得到词法单元。比如 var a = 1; 分别是 关键字var 标识符a 标点符号= 数值1 标点符号;

## 语法分析

- 语法分析就是 把 词法单元 输入词法单元 输出抽象语法树。

## 为什么使用树结构而不用链表 数组

- 因为树结构的好处是 层次关系 搜索效率 动态数据集合 有序存储 空间优化 分治策略

https://www.jointjs.com/demos/abstract-syntax-tree

## 主线程 只执行 执行栈 栈顶的代码

在事件循环机制下，其他线程会将达到触发条件的异步任务 放到 任务队列中排队

主线程在事件循环机制下 循环执行栈顶的任务。栈空则等待。主线程只做一件事就是执行栈顶的代码 不会做其他事。

在整个执行过程中 栈底一定是 全局上下文，栈顶就是不同的函数切换执行。执行完毕就出栈，

事件循环负责 把 任务队列中 正在排队的任务 放进 执行栈中 创建执行上下文 。

当没有同步代码执行( foo() ) 事件循环会把任务 放进 执行栈

事件循环 负责任务队列的 入队 出队。
主线程 负责执行栈的 出栈 压栈

## 编译阶段 和 执行阶段

- 编译阶段
  1. 词法分析（Lexing）：代码 → Token 流
  2. 语法分析（Parsing）：Token → AST（抽象语法树）
  3. 作用域确定：确定每个标识符在哪个作用域
  4. 生成字节码或机器码
  5. 【关键】创建全局执行上下文（结构确定，部分初始化）
- 执行阶段
  1. 逐条执行代码
  2. 遇到 var x = 5 → 赋值
  3. 遇到函数调用 → 创建新的执行上下文
  4. 逐行执行直到结束

## 变量提升和暂时性死区

- var变量 可以在声明前访问 是 在执行上下文里面 已经存储了 初始值为undefined的var变量
- let/const 变量 存在暂时性死区是 ？

- var变量可以在声明前访问，是因为执行上下文里面记录了 var变量 并且初始化值为 undefined 并可以访问 没有死区。
- letconst变量 不能在声明前访问，，在执行上下文里面 也记录了let变量 但没有初始化为undefined，并且在赋值前都属于死区。访问就报错。

这样设计的好处是 避免 var 带来的提升混乱，强制变量 遵循 先声明 后使用的规范。

## 堆和栈

- 当打开浏览器时，会分配浏览器进程，浏览器进程里面 有一块内存空间和至少一个线程。
- 内存空间就分为 堆内存和栈内存
- 栈内存 存储 基本数据类型和 指向堆内存的引用数据类型的地址（只是地址）
  - 函数调用时创建执行上下文（Execution Context）
  - LIFO（后进先出）结构
  - 函数执行完通常会被销毁 不需要垃圾回收机制介入
- 堆内存 存储
  - 存储引用类型的实际数据（对象、数组、函数体等）
  - 需要手动或自动（垃圾回收）管理 需要垃圾回收机制管理

  注意：函数内部的基本数据类型，虽然是基本数据类型 但因为它是函数内的局部变量且有嵌套函数引用了它，所以不在栈上，而是分配在堆中。

## 词法环境

- 每个函数执行时，会创建自己的执行上下文，包含三部分：

```js
ExecutionContext = {
  ThisBinding: this值,
  LexicalEnvironment: {
    // 词法环境
    EnvironmentRecord: {}, // 存储变量和函数声明
    outer: reference // 指向外部词法环境（作用域链核心）
  },
  VariableEnvironment: {}
};
```

-

```js
function outer() {
  let count = 0; // ① 在堆中分配

  function inner() {
    // ② inner函数体也在堆中
    count++; // ③ 引用外部变量
    console.log(count);
  }

  return inner; // ④ 返回inner函数的引用
}

const fn = outer(); // ⑤ 外部变量fn持有inner引用
fn(); // ⑥ 执行inner
```

关键点：count 虽然是基本类型，但因为它是函数内的局部变量且有嵌套函数引用了它，所以不在栈上，而是分配在堆中。

## 事件循环

事件循环是为了解决单线程语言实现异步编程的核心机制，简单来说就是排队。
排队规则是：先同步后异步 先微任务后宏任务，执行栈每次执行宏任务前 都会轮询微任务队列 清空微任务队列后再执行一个宏任务。

## 常见的微任务

- promise的 then catch finally
- queueMicrotask
- new window.MutationObserver(函数);

## 常见的宏任务

- script标签
- setTimeout
- setInterval
- 交互事件 比如 点击 按键
- IO操作 读取文件 网络请求回调

## 事件循环的一轮是指什么

- 宏任务 -> 同步任务 -> 清空微任务队列 -> 判断渲染 -> 判断空闲 —> 下一轮的一个宏任务
- 也就是说 有多少个宏任务就有多少轮

## 渲染

渲染是一个阶段 渲染不是任务也不是队列 是一个阶段， 可以说 渲染这个阶段是异步执行的

## rAF 和 rIC

requestAnimationFrame 是下一次渲染之前调用。同一帧所有的rAF会合并执行。
requestIdleCallback 是是下一次渲染之后有空闲才调用。rIC 不建议修改DOM，应用场景日志上报 数据预加载

## 执行上下文

执行上下文是v8引擎执行代码前的环境对象，比如定义了 this指向 outer作用域链 词法环境 letconst变量 函数 变量环境var变量 等等 一共有创建执行销毁三个阶段。
创建是
执行是
销毁是

- 函数调用前，会创建函数执行上下文并压入执行栈中，var初始化为undefined 函数初始化为函数对象 是一个引用地址指向堆内存中的实际对象。 let/const不会初始化进入暂时性死区，声明前访问将报错。
- 函数执行时，逐行执行代码，给变量更新值。 逐行执行代码，对变量赋值，并执行函数逻辑。
- 函数执行结束后，对应的执行上下文从调用栈中弹出。、

## 执行上下文栈

执行上下文栈是v8引擎采用先进后出的栈结构来管理所有执行上下文的创建执行销毁三个阶段。
栈底始终是全局执行上下文
每调用一个函数前就创建函数执行上下文压入栈顶
函数执行完毕就从栈顶弹出并销毁。栈顶始终是当前执行的函数执行上下文。
递归没有结束条件就会导致栈溢出。
只剩全局执行上下文就是栈空，在事件循环机制下会从任务队列中取出新的任务执行。

tips: 变量对象 活跃对象 是es5的说法 这里不研究。
