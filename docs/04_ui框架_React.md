# react

- 中文官网：https://zh-hans.react.dev

## 27. diff算法 vue

> 代码肯定不会写 一定可以描述
>
> 干啥用的：对比新旧节点是否一样的
>
> 1. 怎么对比的，先看key，如果key不一样就重新render，如果key一样就判断别的
> 2. 为啥不用index，或者为什么不写key不行，isSameNode的第一轮判断（a.key === b.key）直接被跳过了
> 3. 为啥不用随机数，无论数组项变没变 都会被重新render

## 28. vue 和 react的区别

> 1. react是MVC，vue是MVVM（面试官一定会问MVC和MVVM的区别）
> 2. 响应式原理：react用setState， vue是直接改值
> 3. vue双向绑定 react单项
> 4. diff算法：todo
> 5. 组件化通信：react用回调 vue用回调和自定义事件都可以
> 6. react hooks声明函数会重复声明，vue3中函数声明在setup中 只在安装阶段的时候声明

npm create vite@latest my-app -- --template react-ts

## jsx

react中用 jsx 描述界面， vue中用template描述界面。

jsx本质是一个js对象

jsx语法 最终会被 react.createElement方法 来生成js对象

jsx本质就是react.createElement方法的语法糖

## class类组件

面向对象思想
类组件通过 继承React.Component 的render方法 返回一个jsx

## hooks函数式组件

函数式编程思想
函数式组件通过创建一个函数 返回jsx

## 容器组件

## 展示组件

## jsx绑定事件

通过 onClick 小驼峰绑定 ,
function handleClick(e) {}
e.nativeEvent 是原生的事件对象

类组件
<div onClick={(e) => this.handleClick(e, 123)}> </div>
函数组件
<div onClick={(e) => handleClick(e, 123)}> </div>

## 条件渲染

## 组件状态

vue中是data

类组件又叫有状态组件
函数组件叫无状态组件

```jsx
class App extends xx {
  construcor() {
    this.state = {
      a: 1,
    };
  }
  state = { a: 1 };
}
```

##

```jsx
function App() {
  const [msg, setMsg] = useState(1);

  function handleClick() {
    setMsg(msg + 1);
    setMsg(msg + 1);
    setMsg(msg + 1, () =>  setMsg(msg + 1, () =>  setMsg(msg + 1);));
    // 虽然写了3次 但页面上只会渲染加一次的结果 因为 msg每次都是1  相当于赋值了3次 每次都是2 页面只渲染一次
  }
  return (
    <>
      <div>{msg}</div>
      <button onClick={() => handleClick()}>按钮</button>
    </>
  );
}
```

## 事件处理函数

state的更新：如果改变状态的代码处于某个html元素的事件中 则就是异步 否则就是同步

设计成异步的好处就是 计算出最终值，最终只渲染一次，

最佳实践

1. 所有的state都当成异步， 获取更新后的状态用 setState第二个参数回调函数拿到
2. 永远不要相信setState调用之后的状态

## 组件的props
