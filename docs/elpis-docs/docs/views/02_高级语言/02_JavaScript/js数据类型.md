
## js数据类型
```cpp
// string number boolean null undefined Bigint Symbol

js中只有8种数据类型：7个基础类型 一个引用类型

7个基础类型: string number boolean null undefined Bigint Symbol
1个引用类型: Object 

 

类型
Number                  =>  typeof 0 // 'number'
String                  =>  typeof 'hello' // 'string'
Boolean                 =>  typeof true // 'boolean'
Symbol                  =>  typeof Symbol() // 'symbol'
BigInt                  =>  typeof 1n // 'bigint'
Undefined               =>  typeof undefined // 'undefined'
Null                    =>  typeof null // 'object'

Object                  =>  typeof {} // 'object'    
Object                  =>  typeof function(){} // 'function'


用typeof判断数据类型  大部分和类名是一样的 
但 null的数据类型是 'object' 这是作者自己承认一个设计缺陷
函数的typeof 是 'function' 其他对象的typeof 都是 'object'





文本数据类型 比如 String Number Boolean Null Undefined Symbol BigInt
图片数据类型 比如 ImageData Image
音频数据类型 比如 AudioContext AudioBufferSourceNode
二进制数据类型 比如 File,Blob,ArrayBuffer

计算机数据类型只有3种 文本 图片 音频 这3种底层都是二进制数据 因为计算机只认识二进制

视频: 是由图片和音频组成的
html字符串: 特定格式的字符串
json字符串：特定格式的字符串
xml字符串：特定格式的字符串
json数据： JSON类  xxx.json文件
```

## 引用数据类型
```cpp
类 对象 函数 数组 
 

// number类型的字面量 
const number = [
  1, // number
  1.0, // number
  0, // number
  -1.0, // number
  -2, // number
  NaN, // number
  -Infinity, // number
  +Infinity, // number
  010, // number
  0x10, // number 
];

// string类型的字面量
const string = [
  '', // string
  'hello', // string
  '我', // string
  '1', // string
  '0', // string
  'true', // string
  'false', // string
  'null', // string
  'undefined', // string
  'NaN', // string
  '-Infinity', // string
  '+Infinity', // string
  'hello \' world', // string
  '\'', // string
];

// boolean类型的字面量
const boolean = [
  true, // boolean
  false, // boolean
];

// null类型的字面量
const null = [
  null, // null
];

// undefined类型的字面量
const undefined = [
  undefined, // undefined
];

// symbol类型的字面量
const symbol = [
  Symbol(), // symbol
  Symbol('hello'), // symbol
  Symbol('123'), // symbol
];

// bigint类型的字面量
const bigint = [
  1n, // bigint
];



const object = [
  {}, // object
  {name: 'zhangsan'}, // object 
]

const array = [
  [], // array
  [1,2,3], // array
  [1,2,3, [4,5,6]], // array
]

// 数据类型转换
String() 
Number() 
Boolean()

```
