
<script setup>
import { ref } from 'vue'; 

</script>

# JavaScript核心概念  


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
块级作用域：是花括号内声明的变量 比如 if for 对象的花括号不算  （es6新增

for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);  // 打印 3, 3, 3
}

作用域链（Scope Chain）是使用变量时 先找当前作用域 在找向外层作用域查找 直到全局作用域，最终找不到就报错未定义。
词法作用域（Lexical Scope）是函数定义时就确定了  词法作用域为什么叫词法作用域
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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head> 
<body>
    <div></div>
    <script>
        // js放在所有dom之后 也就是body结束标签（</body>）之前
    </script>
</body>  
<script>/* 放这也一样 */</script> 
</html>
```

### 方案2 
- defer async 
 











MDN官网：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript
ES官网：https://ecma-international.org/technical-committees/tc39/
w3c官网：https://www.w3.org/standards/
chromium 官网：https://chromium.googlesource.com/chromium/src/
v8引擎源码：https://github.com/v8/v8






- 什么是JavaScript
- ecmaScript + DOM + BOM = JavaScript 

浏览器环境 和 node环境 都是 实现ES的一种宿主环境


- ES到底定义了什么
- 语法
- 数据类型
- 语句
- 关键字
- 保留字
- 操作符
- 全局对象

JavaScript 和 AdobeActionScript 都实现了 esmaScript 的规范 


W3C（world wide web Consoruim）万维网联盟 制定DOM标准 
注意 DOM并非只能通过JS访问，

BOM 没有标准， 由浏览器自行实现。


### es#
es是一个规范文档

浏览器环境
node环境
微信小程序环境 
3个环境都支持es规范


环境除了实现es规范，还有自己的环境api 
比如 浏览器有 window document对象  也叫web api 
node有global process对象 
微信小程序有wx对象