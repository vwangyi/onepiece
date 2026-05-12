# JavaScript核心概念
```js 
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
变量提升（Hoisting）
闭包（作用域链的应用）
避免全局污染
暂时性死区TDZ
```


 

DOM 文档对象模型 
资源提示符 async defer prefetch preload 
浏览器渲染原理

Promise.all()
requestAnimationFrame()




## 方案1
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

## 方案2 
- defer async 
 












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


## es
es是一个规范文档

浏览器环境
node环境
微信小程序环境 
3个环境都支持es规范


环境除了实现es规范，还有自己的环境api 
比如 浏览器有 window document对象  也叫web api 
node有global process对象 
微信小程序有wx对象