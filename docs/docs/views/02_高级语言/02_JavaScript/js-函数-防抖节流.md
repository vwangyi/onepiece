# 防抖节流

问：防抖节流
● 防抖是多次触发只执行最后一次
● 节流是多次触发在指定时间内只执行一次。
● 都是用于 优化高频触发场景，区别是 
● 防抖的使用场景是 输入框触发联想，节流的使用场景是 滚动条触发
● 

```typescript
// 装饰者

// 防抖
// 1. 装饰者框架
function debounce (fn: (...args: any[]) => any) {

  return function () {

  };
}

// 2. 防抖的功能
// 2.1 声明定时器（记录+更新定时器：闭包）
// 2.2 重置定时器
function debounce (fn: (...args: any[]) => any, delay: number):  {
  let timer = null;
  return function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {

    }, delay);
  };
}

// 3. 彻底模仿fn
// 3.1 执行
// 3.2 传参
// 3.3 this
function debounce (fn, delay) {
  let timer = null;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 标准ts防抖
function debounce<T, U> (fn: (this: U,...args: T[]) => void, delay: number): (...args: T[]) => void {
  let timer: number | null = null;
  return function (this: U, ...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function fn (a: number) {

}

const f1 = debounce<number, Window>(fn, 1000);

// 节流

// 1. 装饰者框架
function throttle (fn) {

  return function () {

  };
}

// 2. 节流的功能
// 2.1 闭包
// 2.2 time秒内执行一次（频率）
// 2.3 如果开关打开直接执行  如果关闭 等待time秒后打开开关
function throttle (fn, time) {
  let timer = null;
  let flag = true;
  return function () {
    // 如果开关开着呢
    if (flag) {
      fn();
      flag = false;
    } else {
      timer = setTimeout(() => {
        flag = true;
      }, time);
    }
  };
}

// 3. 彻底模仿fn
// 3.1 执行
// 3.2 传参
// 3.3 this
function throttle (fn, time) {
  let timer = null; // 0
  let flag = true; // 1
  return function (...args) {
    // 如果开关开着呢
    if (flag) {
      // flag: 1
      fn.apply(this, args);
      flag = false;
    } else {
      // flag: 0
      // time: 1
      timer = setTimeout(() => {
        flag = true;
      }, time);
    }
  };
}

// 4. 优化flag
function throttle (fn, time) {
  let timer = null; // 0
  return function (...args) {
    // 如果开关开着呢
    if (!timer) {
      fn.apply(this, args);
      timer = setTimeout(() => {
        timer = null;
      }, time);
    }
  };
}
```


- 什么是防抖
- 什么是节流

## 防抖

防抖是：在指定时间内，多次触发都会重新计时，只执行最后一次。

```js
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args) // 仿执行、仿this、仿传参
    }, delay)
  }
}
```

## 防抖应用场景

- 搜索框输入触发联想



## 节流

节流是 多次触发在指定时间内只执行一次。

```js
function throttle(fn, time) {
  let flag = null; // 节流阀 为真 表示关闭状态 为假表示开启状态
  return function (...args) { 
    // flag为假表示 开启节流阀
    if (!flag) {
      fn.apply(this, args); // 当开启节流阀 立即执行一次
      // 执行后 立即关闭节流阀，一段时间后才打开节流阀
      flag = setTimeout(() => flag = null, time); 
    }
  };
}
```



## 节流应用场景

- 滚动条频繁滚动触发



相同点：都是用于高频触发场景

不同点：具体场景不同
