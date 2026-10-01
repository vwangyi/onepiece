## 27. diff算法 vue
> 代码肯定不会写 一定可以描述
>
> 干啥用的：对比新旧节点是否一样的
>
> 1. 怎么对比的，先看key，如果key不一样就重新render，如果key一样就判断别的
> 2. 为啥不用index，或者为什么不写key不行，isSameNode的第一轮判断（a.key === b.key）直接被跳过了
> 3. 为啥不用随机数，无论数组项变没变 都会被重新render
>

## 28. vue 和 react的区别
> 1. react是MVC，vue是MVVM（面试官一定会问MVC和MVVM的区别）
> 2. 响应式原理：react用setState， vue是直接改值
> 3. vue双向绑定 react单项
> 4. diff算法：todo
> 5. 组件化通信：react用回调  vue用回调和自定义事件都可以
> 6. react hooks声明函数会重复声明，vue3中函数声明在setup中 只在安装阶段的时候声明
>