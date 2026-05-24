
##  语句
```cpp
// 语句是最小执行单元 也就是底层的一个二进制指令  


// 单语句 以分号; 结尾
console.log("hello");
// 语句块 以大括号{}括起来 里面可以包含多个语句
{
  console.log(1);
  console.log(2);
} 



语句是程序执行的最小单元，一个分号就是一个语句；
流程控制语句：顺序结构 分支结构 循环结构
分支： if else switch 
比如说 注释语句 流程控制语句（顺序 分支 循环） 输入输出语句 
1注释语句： // 单行注释  /* 多行注释 */

  2 输入输出语句  必须要有头文件 #include <iostream>
  cout << "hello" << endl; // 输出hello 并换行 
  int a = 1;
  cout << "a = " << a << endl; // 输出a = 1
  cin >> a; // 输入一个整数 并赋值给a
  cout << "a = " << a << endl; // 输出a = 输入的整数

  3 三种流程控制语句
  顺序 选择 循环
  
if (true) {

}
if(true) {
    // 条件为真执行
} else {
    // 条件为假执行
}
if (true) {
    // 条件为真执行
} else if (true) {
    // 条件为真执行
} else {
    // 条件为假执行
}
// switch语句
switch (表达式) {
    case 常量1:
        // 语句
        break;
    case 常量2:
        // 语句
        break;
    default:
        // 语句
        break;
}

// while循环
while (条件) {
    // 循环体
}
// do-while循环
do {
    // 循环体
} while (条件);

// for循环
for (初始化表达式; 条件表达式; 步进表达式) {
    // 循环体
}

break; // break语句 结束当前循环
continue; // continue语句 结束本次循环
return 值; // return语句 结束函数
goto 标签; // goto语句 跳转到标签
// 解释:如果标记的名称存在，执行到goto语句时，会跳转到标记的位置


// 单行注释
const a; 

/* 多行注释 */
const b;

/**
 * 文档注释 
 * 这是一个示例函数，用于加法运算。
 * 关键字 {类型} 参数名 - 参数描述
 * @param {any} a - 第一个操作数
 * @param {number} b - 第二个操作数
 * @param {object} option - 第三个操作数
 * @param {string} option.name - 第三个操作数
 * @param {function} callback - 回调函数  (item, arr) => {}
 * 
 * @param {'GET'|'POST'} option.age - 第三个操作数
 * 
 * @returns {Number|Function} - 两个操作数的和
 * @author WangYi <codewy@outlook.com>
 * @example getRange(1, 10); // 获取[1,10]之间的随机数
 * 
 * @throws {Error} 如果除数为0，则抛出错误
 * @deprecated 该函数已被废弃，请使用新的 addNumbers 函数代替。
 * @history
 * - 2021-01-01  初始版本
 * - 2022-05-15  修复 bug：处理负数的情况
 */
arr.push = function push(a, b = 3){
    return a + b
}


outer: for(let i = 0; i < 10; i++) {
    console.log('顶层循环');
    for (let j = 0; j < 10; j++) {
        console.log('内层循环', i, j);
        if (i * j > 30) {
            console.log('退出外层循环')
            break outer;
        }
        
    }
    
}




## 语句
```javascript
// 语句是最小执行单元 也就是底层的一个二进制指令  
// 语句内部通常包含一个或多个表达式

// 单语句 以分号; 结尾
console.log("hello");
// 语句块 以大括号{}括起来 里面可以包含多个语句
{
  console.log(1);
  console.log(2);
} 

// 顺序流：从上到下 从左到右 一行一行执行（受运算符影响 比如赋值 ）
// 分支流：分支语句
// 循环流：循环语句

// 注释语句========================================================

// 单行注释
/* 多行注释 */ 

/**
 * 文档注释
 * @func
 * @desc 这是函数用于测试
 * @param {number | string} a 第一个参数
 * @param {number} b=1 第二个可选参数
 * @returns {*} 返回值
 */

/**
 * 网络请求
 * @param { object } options 配置对象  如果有形参写这一句
 * @param { string } options.url 请求地址
 * @param { 'GET' | 'POST' } options.method 请求方法
 * @param { object } options.body  
 * @param { object } options.headers  
 * @returns { Promise } 返回一个Promise 如果有返回值才写这一句
 * @throws { Error } 如果有异常才写这一句
 * @date 2021-09-01 初始化时间 如果留下时间写这一句 
 * @author WangYi <codewy@outlook.com> 如果留下作者写这一句
 */ 
/**
 * 这是一个示例函数，用于加法运算。
 * @param { number | string } a 第一个操作数
 * @param { number | number } b 第二个操作数
 * @returns { * } - 两个操作数的和
 */ 
 


// 赋值语句= =====================================
let a = 1 + 2; // 赋值语句 把 1 + 2 的运算结果赋值给变量a

const obj = {name: 'zhangsan'}; // 把一个对象的引用地址赋值给 obj变量

let i = 0;
i++; // 把i自增1然后赋值给i变量 

// 分支语句 =====================================================
if (true) {
  console.log('true');
} else {
  console.log('false');
}

if (true) {
  console.log('true');
} else if (true) {
  console.log('true');
} else {
  console.log('false');
}
const value = 1;
switch (value) {
  case 1: // value === 1 就满足条件
    console.log(1);
    break;
  case 2: // value === 2 就满足条件
    console.log(2);
    break;
  default: // 上面的条件都不满足 就执行default
    console.log('default');
}



// 循环语句 ==============================================================
  // for循环 (知道循环次数用for循环)
const arr = [1,2,3,4,5];
for (let i = 0; i <= arr.length; i++) {
  // 条件 当i小于等于arr的长度时执行循环体
  // 循环体执行完毕 执行i++ 自增
  // 在看条件 如果条件满足继续执行循环体
      console.log(i);   	 
} 
for(let k = -5; k == (-1); k++) {
    // 这个循环体永远不会执行
    // int k = -5 是循环变量的初始化值
    // k == (-1) 是循环条件 只有满足循环条件才会执行循环体一次
    // k++ 每执行一次循环体 k就会自增 换句话说 只要不进循环体 k++永不执行
    console.log(k);
}
// while循环 (不知道循环次数用while循环)
int k = 0;
while(k < 3) {
  System.out.println("1");
  k++;
} 
//  do-while循环
do {
  console.log('do');
} while (x>2);

// break语句 continue语句 return语句========================================

      /**
       * break语句
       * switch分支 和 for循环 while循环 和 do语句 和 语句块 使用
       */
      for(let i = 0; i < 100; i++) {
        if (i == 5) break; // 立即结束整个循环
        console.log(i);
      }
      
      
      /**
       * continue语句
       * 循环中使用 立即结束本次循环 开始执行下一次循环 也可以配合标号使用
       */
      for(let i = 0; i < 100; i++) {
        if (i == 5) continue; // 立即结束本次循环 开始执行下一次循环
        console.log(i);
      }
      
      out: for(let i = 0; i < 100; i++) {
        for(let j = 0; j < 100; j++) {
          if (j == 5) continue out; // 立即结束本次循环 开始执行下一次循环
          console.log(j);
        }
      }
          // 语句块中 配合标号使用 
        let x = 20; 
        out: for (let i = 2; i < 10; i++) { // 自我理解 给for循环 标记了out
          console.log(i);
          while(x < 1000) {  
            console.log(x);
            if (i * x >= 80) break out; // 跳出或结束打标记的循环
            else x += 5
          }
        }
        console.log(i);
        // 跳出标号所标记的语句块 多用于嵌套块中，控制从内层跳到外层块之后


// return语句 在函数内部使用
  function add(a, b) {
    const result = a + b;
    return result;
    // return语句下面的代码不会执行
  }

// try-catch 异常处理语句
  try {
    // 可能会出现异常的代码
  } catch (err) {
    // 异常处理代码
  } finally {
    // 无论是否出现异常都会执行
  } 
```
