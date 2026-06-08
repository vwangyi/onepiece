 以下是关于 Vue.js 的核心知识点总结，帮助你快速了解这个前端框架。

1. 是什么
渐进式 JavaScript 框架，专注于构建用户界面（UI）。

核心库只关注视图层，易于上手，也便于与第三方库或现有项目整合。

两大核心特性：响应式数据绑定 + 组件化开发。

2. 核心概念（快速概览）
概念	说明
响应式数据	修改数据，视图自动更新（基于 Object.defineProperty 或 Proxy）。
组件	可复用的 Vue 实例，封装结构、样式、逻辑。
指令	如 v-bind、v-model、v-if、v-for，在模板中声明式操作 DOM。
生命周期钩子	如 created、mounted、updated、destroyed，在组件不同阶段执行代码。
模板语法	基于 HTML 的模板，支持插值 {{ }}、指令等。



# Vue核心概念 
`单向数据流`  
`diff算法`  
`虚拟dom`  
`模板编译原理`  



在整个软件工程中，屎山是必须存在的，换句话说，当项目越来越屎山，（导致维护性越来越差）就要额外花时间做轻重构或优化，
做了轻重构或优化之后，减少了一定程度的屎山，不可能完全消除屎山，然后随着时间的推移，当屎山导致难以维护时又需要再一次处理屎山。

是否是屎山取决于 你的团队是否可以很好的维护。换句话说，你的团队每个人都认为不是屎山还可以维护，即使团队外的别人觉得是屎山完全不能维护，那也不叫屎山。


封装给谁用 
1 自己用：不用那么严格 比如不用判断空 因为自己调用不会传空
2 团队成员用
3 公司所有人用
4 开源给社区用：必须上ts




- 响应式数据
- 单向数据流: 父组件 传递 props数据  子组件自动更新视图
- v-bind和props ： props用 计算属性 监听 template中 可以自动响应  $attrs 
    - 给 slot标签传 v-bind 则是 在 template上 #名字="scoped接收"


- v-on和emit  js调用 const emit = defineEmits([]);  template中调用 $emit('事件名', '传参')


- useTemplateRef 和 ref 和 defineExpose  vm.expose = {};

- nextTick

- 插槽 传 `<template #default="scopted"> 接收 <slot> 和 $slot`

- 生命周期钩子 父子钩子 执行顺序  onMounted执行 表示所有子组件的onMouted都已经执行  可以多个onMounted 按顺序执行

- 路由跳转传参

- 动态组件 component 

- provide/inject

- v-model:  v-model是语法糖 本质是 props + @input ， 表单元素双向绑定的基本语法
- 语法糖是什么 语法糖只是书写上比较方便 本质还是xxx写法，换成xxx写法和语法糖写法 效果是一致的

- 单向数据流 vs 双向绑定 的区别：也就是说 双向绑定也是遵循单向数据流的
- v-model在自定义组件上默认绑定的是什么？ v2 defineModel 和 v3 

- defineProperty 和 Proxy 的区别
- vue2为什么不能监听 数组下标和对象新增属性  v2提供了$set $delete
- $set $delete 底层原理是什么

- 依赖收集 Dep 和 watcher 到底是什么关系

- 视图更新机制：数据改变后 异步更新队列怎么工作。nextTick到底在等什么

- 视图更新机制：computed和watch和渲染watcher的执行优先级

- 视图更新机制：双向绑定在 v-for、组件嵌套、keep-alive下的表现差异

- v-model自定义修饰符 怎么写
- 表单复杂场景：防抖 校验 格式化 怎么和双向绑定结合

- vue3的v-model 支持多绑定 底层改了什么： v2和v3都支持多绑定

- 性能：频繁修改数据触发多次更新 怎么优化
- 大表单双向绑定 为什么卡顿
- 为什么不要在 v-for 里直接用 v-model
- 双向绑定与虚拟dom diff算法的关系


从vue技术栈 引导 js原生  渲染管线 异步队列 响应式系统（vue团队用原生js实现的响应式系统用到vue里面）



- 写完个性化桌面功能 总结vue技术


## 是什么
- Vue是构建用户界面的渐进式框架，它的核心思想是 数据响应式和组件化。 


- 数据响应式是什么

- 组件化是什么

- 如何理解渐进式
    * 渐进式是指 随着项目逐渐复杂，Vue 可以引入 路由 状态管理等插件，实现轻量到复杂的开发体验。
 