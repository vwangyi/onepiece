
# JS循环 5

> 重复执行类似逻辑时

## for 5

### 语法

```js
for (设置初始值; 保持循环的条件表达式; 改变初始值) {
  // 循环体
}

// 通常写法
for (var i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

### 求和

```js
// 求0-5的和
var sum = 0;
for (var i = 0; i < 6; i++) {
  sum += i; // 每一轮给sum加一个数字
}
// 循环结束时sum就被加满了
console.log(sum);
```

### 求平均值

> 和 / 个数

```js
// 求0-5的平均值
// 1. 求0-5的和
// 2. 和 / 个数
var sum = 0;
for (var i = 0; i < 6; i++) {
  sum += i; // 每一轮给sum加一个数字
}
// 循环结束时sum就被加满了
console.log(sum);
var avg = sum / 6;
console.log(avg);
```

### 多重循环

```js
// 打印4行5列的'a'
// 'aaaaa'
// 'aaaaa'
// 'aaaaa'
// 'aaaaa'

for (var i = 0; i < 4; i++) {
  var tmp = ''; // 工具人
  for (var j = 0; j < 5; j++) {
    tmp += 'a';
  }
  // 工具人变成了'aaaaa'
  console.log(tmp);
}
```

## for...in 5

> 大多数场景是遍历对象的
>
> 但是它能遍历数组

```js
var obj = {
  name: 'zs',
  age: 12,
  sex: 'nan',
};

for (var key in obj) {
  console.log(key); // 'name', 'age', 'sex'
  console.log(obj[key]); // 'zs', 12, 'nan'
}

// 不推荐
var arr = [1, 2, 3];

for (var key in arr) {
  console.log(key);
}
```

## for...of 5

> es6语法
>
> 缺点：拿不到索引
>
> 可以遍历数组，Map对象，Set集合

```js
var arr = [1, 2, 3];

for (var item of arr) {
  console.log(item); // 1, 2, 3
}
```



## while 4

### 语法

```js
while (保持循环的条件表达式) {
  // 循环体
}
```

## do while 0

### 语法

```js
do {
  // 循环体
} while (保持循环的条件表达式);
```

## 打断循环 5

```js
for (balabala) {
  if (条件) {
    break;
  }
}
```

## 跳出某轮循环 5

```js
// 打印1~10 但是不打5
for (var i = 1; i < 11; i++) {
  if (i === 5) {
    continue;
  }
  console.log(i);
}
```


```
