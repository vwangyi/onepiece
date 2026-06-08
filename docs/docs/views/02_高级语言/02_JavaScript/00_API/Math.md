# Math 数学对象

```js

Math.floor(1.2) // 2 向上取整
Math.ceil(1.2) // 1 向下取整
Math.round(1.2) // 1 四舍五入 
Math.random();  // [0, 1) 0-1之间的随机数
Math.random() * 2 - 1;  // [-1, 1) -1到1之间的随机数
Math.random() * 20 + 50;  // [50, 70) 50到70之间的随机数 
Math.floor(Math.random() * 20 + 51)  // [50, 70] 50到70之间的随机整数
Math.floor(Math.random() * 10)  // [0, 9] 0到9之间的随机整数
Math.pow(2, 30); // 返回 2的30次方
2 ** 30 // 返回 2的30次方 
// 根号2
Math.sqrt(2)  // 1.414...
// 根号3
Math.sqrt(3)  // 1.732...
// 根号5
Math.sqrt(5)  // 2.232...
Math.max(1, 2, 3, 4) // 4 最大值
Math.min(1, 2, 3, 4) // 1 最小值
Math.abs(-1)  // 1 绝对值 

const getAngle = angle => angle * Math.PI / 180
getAngle(120) // 120是角度 返回值是弧度（120角度对应的弧度）
```