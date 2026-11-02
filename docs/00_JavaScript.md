
<script setup>
    console.log(1111)
</script>


## 创建数组
创建数组用 字面量方式[]、 new Array()、  Array.of()  来创建。

## 是否是数组
是否是数组用 Array.isArray() 和 intanceof Array

## 数组浅拷贝
数组浅拷贝用 slice 传入开始索引和结束索引，支持反向索引。返回新数组，不影响原数组。


## 数组去重
基础类型用 ...new Set()，对象数组用 reduce() + Object.values() 利用了对象的key不能重复的特性。

## 数组扁平化用 flat 

## 数组查找
数组查找用 some every find 找不到返回undefined，findIndex找不到返回-1  indexOf includes

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

mousedown mouseup mousemove  mouseover(冒泡) mouseout mouseenter(不冒泡) mouseleave


表单事件：input focus blur change
鼠标事件：click dblclick contextmenu mousedown mouseup mousemove  mouseover(冒泡) mouseout mouseenter(不冒泡) mouseleave
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
Math.floor(1.2) // 2 向上取整
Math.ceil(1.2) // 1 向下取整 
Math.random(); // 0-1之间的随机数 小数点是16位
Math.max(1, 2, 3, 4) // 4 最大值
Math.min(1, 2, 3, 4) // 1 最小值
```


## Worker线程

## 视频  
```js
// video.js
// flv.js
// Dplary.js
// 方式一 html方式
<video id="videoElement"></video>

const videoElement1 = document.getElementById('videoElement')

// 方式二
const videoElement2 = document.createElement('video')
```
 

## 字符串
字符串是用单引号、双引号或反引号表示。


字符串是不可变的。一旦创建就不能改。所以方法都是返回新串
查找：indexOf、includes、startsWith、endsWith、search
截取：slice（支持负索引）、substring（自动交换、负值当 0）、substr（已废弃）
变换：replace/replaceAll、split、trim、padStart/padEnd、repeat
模板：反引号支持插值 ${} 和多行
正则相关：match、matchAll、replace 带函数



字符串查找：indexOf includes startsWith endsWith 
字符串截取  substring 和 slice  
字符串分割： split 
字符串拼接 用模版字符串和+号 
字符串替换 replace 
字符串长度 length

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



0.1 + 0.2 !== 0.3 // true  为什么不等于 因为精度问题

## Map 
Map是key-value组成的元组数组。也就是一个二维数组。 key可以是任意值。
常用方法 set get delete has keys values entries forEach


## 图像
图像用new Image和 img标签 来创建。new Image 主要是内存中创建，img标签是页面中创建。
 
## history
history历史对象是用来记录浏览器的历史记录，包括页面跳转、前进后退等操作。
window.history.go(整数)   //  1表示前进1个页面 -1表示后退一个页面
history.length(): 保存历史记录的数量  

// history可以实现多页面的跳转 单页面跳转用vue-router
history.pushState
history.replaceState


## canvas
canvas画布 

## Date
Date对象 通过 new Date() 创建,

getFullYear getMonth  getDate getHours getMinutes getSeconds 
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
scrollWidth  只读

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



## 表达式
能够计算并产生一个值就是表达式。 比如 加减乘除 函数调用都是表达式。if else就是语句。

## ////






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
 
 