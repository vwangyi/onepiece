# Date

```js
// performance.now() 页面加载到现在的毫秒数  精确到小数点后5位  

// 常见的时间格式
// '2022/5/20 20:30:00'
// '2022-5-20 20:30:00' 
const date = new Date() // 默认传入 当前系统时间   
const date8 = new Date('2023/01/01 12:29:54')
const date9 = new Date('2023-01-01 12:29:54') 

/* 日期对象 转 时间戳的方法 */ 
// 时间戳是 中国时间1970年1月1号早上8点或世界时间1970年1月1号0点 到现在的毫秒数


// 获取时间戳  
const time1 = +new Date(); // 最常用 用+号转 
const time2 = new Date().getTime()  
const time3 = new Date().valueOf()   
const time4 = Date.now();  
new Date().toLocaleString() // '2025/12/3 11:17:16'

/* 实例对象的常用方法 */  

// 获取年份
const year = new Date().getFullYear(); 
// 获取月份 
const month = new Date().getMonth() + 1;
// 获取几号
const day = new Date().getDate(); 
date.setDate() // 设置几号
date.setMonth() // 设置月份
date.setFullYear() // 设置年份 

/* 获取 过去7天 或 未来7天 的日期组成的数组 */  
/* 曾经遇到的难点. 每天都会产生交易 查询历史交易   获取 闰年 闰月 等等 */
```