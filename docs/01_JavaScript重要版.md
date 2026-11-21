## 变量

## let和var区别

## 作用域和作用域链

## 数据类型

## this指向

Array的api
Promise
迭代器对象
生成器函数
await/async
Function
箭头函数与普通函数的区别
Object
面向对象

## 原型链

- 原型链是 实例对象的`__proto__` 指向 其构造函数的 `prototype`。
-
- 当 访问 对象某个成员时，先看自身有没有，在通过 `__proto__` 看 其构造函数的`prototype` 上有没有
- 一直向上找 直到 `Object.prototype.__proto__ ===  null` 就返回undefined

- 原型链的好处是 节约内存。因为所有方法都放`prototype`共享
- 缺点是访问不存在的成员时 仍然会遍历整个原型链，性能差。

- 应用场景是 实现继承 扩展类库、共享方法。

- 比如，可以在 Vue的原型上 挂载 请求方法，每个页面可以共享这个方法

## new操作符

new操作符就是`创建对象实现继承`。

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

类
构造函数
V8引擎
垃圾回收

## 事件循环

事件循环是为了解决单线程语言实现异步编程的排队机制。
先同步后异步 先微任务后宏任务，执行栈每次执行宏任务前 都会轮询微任务队列 清空微任务队列后再执行一个宏任务。

常见的微任务有 `promise .then .catch .finally`
常见的宏任务有 `script标签` `延时器` `交互事件` `IO操作`

## 事件循环的一轮是指什么

- 宏任务 -> 同步任务 -> 清空微任务队列 -> 判断浏览器渲染 -> 判断浏览器空闲 —> 下一轮的一个宏任务
- 也就是说 有多少个宏任务就有多少轮

## 前端安全 XSS

跨域

## 脚本延迟加载 defer async

闭包
防抖节流
浏览器存储 cookies localStorage sessionStorage indexedDB
浏览器缓存 强缓存 协商缓存
内存泄漏
深浅拷贝
执行上下文
并发与并行
同步和异步
模块化： es module 和 commonjs
重排重绘
浏览器渲染原理
AST抽象语法树
