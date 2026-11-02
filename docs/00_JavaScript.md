<script setup>
document.title = 'JavaScript'
</script>
# 面向对象

- js是基于原型链实现的面向对象语言。java是基于类实现的面向对象语言。
 
## 原型和原型链
- 原型就是 每个实例对象都有 `__proto__` 每个构造函数都有 `prototype`
- 原型链是 实例对象的 `__proto__` 指向 其构造函数的`prototype`

- 原型链的好处是 节约内存。因为所有实例对象的方法都放在其构造函数的prototype 上共享 不管new多少实例都不会浪费内存
- 缺点是访问不存在的成员时 仍然会遍历整个原型链，性能差。

- 应用场景是 实现继承 扩展类库、共享方法。
- 当 访问 对象某个成员时，先看自身有没有，在通过 `__proto__` 看 其构造函数的`prototype` 上有没有
- 一直向上找 直到 `Object.prototype.__proto__ ===  null` 就返回undefined

- 比如，可以在 Vue的原型上 挂载 请求方法，每个页面可以共享这个方法

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
- 私有成员 命名用#前缀  配合 get set 使用
  getter成员 用 get 关键字
  setter成员 用 set 关键字


## 

## super
- super是es6实现类继承的核心概念

- 不写 constructor，会自动调用super 并传参。


- super有2种用法：
1. 作为函数调用：super() - 调用父类构造函数    只能在 子类的constructor里面 调用父类的 constructor方法  且必须第一行 （使用this之前）
2. 作为对象使用：super.methodName() - 调用父类的方法   通过super调用方法 这个方法的this 是 当前super所在的方法的调用方式决定的 如果是用变量装一下 直接调用变量 this是undefined 

// super关键字
//     // super关键字
//     // super可以调用父类的 constructor函数 并传参  也可以调用父类的普通函数
//     // super必须在 子类用this之前调用 
//     super()  // 在子类的constructor中  调用父类constructor函数
//     super.父类方法名()   // 在子类的普通函数中  调用父类方法

//     子类和父类有同名方法时
//     子类用 super.名字()  调用父类的方法  用this.名字() 调用自己子类的方法
//     如果没有重名方法 super.名字() 和 this.名字()  没有区别 因为只能找到一个方法


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
    const obj = Object.create(Class.prototype);  // 原型链继承方法
    const result = Class.apply(obj, args);  // 调用父构造 继承属性
    return result instanceof Object ? result : obj;   // 返回这个对象
}
createObj(Array, 1)
createObj(Array, 1,2)
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
function Animal() {
   
}
Animal.prototype.chi = function() {
  console.log('我是动物 我会吃人')
}
function Dog() {
   Animal.call(this); // 构造函数继承， 缺点：只能继承父类自身属性方法 不能继承父类的原型链上的属性方法
}
```

## 原型链继承
```js 
function Dog() {

} 
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
console.log('toString', dog.toString) 
console.log('constructor', Dog.prototype.constructor === Dog)
```

## class继承
```js
class Animal {
  constructor(name){

  }
}

class Dog extends Animal { 
  constructor(name, age) {
    super(name);  // 必须在使用this之前调用super  调用super就是调用 父类的constructor方法
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
console.log( vm.toString, vm.valueOf ) // toString方法 valueOf方法都是继承过来的
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


## 闭包
闭包是函数嵌套函数，内部函数可以访问外部函数的作用域。
函数执行完毕，闭包变量没有正常销毁。
好处是 可以延长变量的生命周期和模块化开发
缺点是可能导致内存泄漏
应用场景是 防抖 节流 esm和commonjs都是使用闭包实现模块化

## 防抖节流
防抖是 在指定时间内，多次触发都会重新计时，只执行最后一次。使用场景搜索联想
节流是多次触发在指定时间内只执行一次，不会重新计时。 使用场景 滚动条频繁触发。

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

## const/let/var区别  
var是函数作用域 let是块级作用域 
var可以声明前访问 let不能在声明前访问 
let和const的唯一区别是 const必须赋值且不能修改。

## 数据类型  
数据类型一共是 7个基础类型 1个引用类型。
分别是 number string boolean null undefined symbol bigint 和 object。
另外，js数据有类型，但js变量没有类型，ts的作用就是让js变量有类型。


## 检测数据类型
typeof、instanceof、Object.prototype.toString.call() 


## typeof null返回什么
typeof null 返回 'object'字符串  
 
## null和undefined区别
null表示值就是null 
undefined表示 没有值 值没有定义


## intanceof 操作符的实现原理

## 包装类型
string number boolean 
当 基础类型 不是对象 没有属性方法 当用基本数据类型访问属性方法时 会自动转包装类型 String('a') 


## 深浅拷贝 
浅拷贝：只复制对象的第一层属性。如果属性值是基本类型，拷贝的是值；如果属性值是引用类型（对象、数组），
则拷贝的是内存地址。因此，新旧对象会共享同一个嵌套对象，修改一方会影响另一方。

深拷贝：递归复制对象的所有层级。它会创建一个完全独立的对象，在堆内存中开辟新空间。
新旧对象完全隔离，修改任意一方都不会影响另一方。

如何实现浅拷贝： 展开运算符...  Object.assign() 数组的slice和concat()
如何实现深拷贝:
- JSON.parse(JSON.stringify(obj)) 缺点是 不支持函数和循环引用
- lodash.cloneDeep() 好处是 支持函数、循环引用 
- window.structuredClone({a: {a:1}})



## 数据类型转换
1. 引用类型 转 基础类型：调用 valueOf  toString（） 不行就报错
2. 基础类型 转 字符串：直接加引号  null "null"  "undefined" "false"  "1"  1n 是 "1" "Symbol()"
3. 基础类型 转 数字：


undefined 是 NaN 
null为0
布尔值转数字：false为0 true为1
字符串转数字：
    引号中 只有数字 会忽略首尾空白字符 得到数字 
    '' 会会忽略首尾空白字符为0 

引号中不是 纯数字 也不是纯空白字符 那就是 NaN 
4. 任意 转 布尔：6大假值   
- JS的6大假值是 false '' null undefined 0 NaN  （正负0也属于0 正负NaN 也属于NaN）


## let和var的区别
1. 全局污染。var声明的变量会挂在window上 造成全局污染。
2. 块级作用域。let变量是块级作用域。var是全局作用于域和函数作用域。
3. 暂时性死区。var声明前可以访问。let声明前访问会报错暂时性死区。
4. 重复声明。var可以重复声明。let不能重复声明。

const和let的唯一区别是 const声明必须赋值且不能修改。

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
回调函数 Promise  generator async/await 

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
- 箭头函数 有 `__proto__` 但没有 `prototype` ，所以不能作为构造函数也不能 new 调用  (Array.prototype.constructor )

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
(()=>{}).__proto__ === (function () {}).__proto__ // true  所以都有call 但是箭头函数调用call没效果

super区别先不说 


## arguments
- argument是一个伪数组对象，表示所有的参数列表，现在用 es6 的剩余参数取代。
```js
function a(...args) {
  console.log( Array.from(arguments) )
  console.log(args)
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



## ////



## Sandbox
JS沙箱就是一个安全隔离的代码执行环境。比如 iframe标签、WebWorker、ES Module、Proxy + with。都可以叫做沙箱

## CSS隔离
CSS隔离



## 表达式
能够计算并产生一个值就是表达式。 比如 加减乘除 函数调用都是表达式。if else就是语句。
 
能够计算出一个值并且可以作为函数参数 就是js表达式

## 
标识符是 由 字母 数字 下划线组成 不能数字开头 不能是关键字保留字 区分大小写 是用来命名变量的符号
## Symbol 
Symbol可以用来创建绝对唯一的标识符 Symbol可以传一个描述信息 类似注释


## 循环语句有哪些
for、for-in、for-of、while、do-while
  

## 循环 递归 遍历 迭代的区别  
遍历是 侧重访问数据结构中的每一个元素。只是看一下所有元素。
迭代是 侧重于按顺序从数据结构中一个个主动取出来。按某种顺序取出来所有元素。
循环是 侧重于 重复执行某一段代码。
递归是 函数自己调用自己。没有结束条件就会导致栈溢出





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
 
 