
# hooks组合式函数

- https://cn.vuejs.org/guide/reusability/composables.html#composables  
- 是什么： hooks 是 vue3 提供的一个叫组合式函数，类似 vue2 的 mixins


 

 ## 容器组件
容器组件 可以直接访问 store 或调用api 负责数据获取状态管理 调用展示组件，包含业务 不会包含UI。一般是放views下

 ## 展示组件
展示组件 是纯粹的UI渲染，数据都是通过props接收 没有业务状态 只有自身的ui状态。包含ui不包含业务。

 ## hooks组合式函数
 hooks是把 容器组件里面的业务逻辑抽离出来，这也导致了 容器组件和展示组件的边界模糊。好处是业务逻辑复用。


 以前是 容器组件 + 展示组件 
 现在是 展示组件 + 多个颗粒度更细的hooks



展示组件一定是存在的


store和hooks

## 普通函数和组合式函数区别

普通js函数是复用无状态逻辑，返回的值是最终值不会变化。比如lodash 或我们自己写防抖节流。
vue的hooks组合式函数是 复用有状态逻辑，返回的值会根据逻辑而变化。

hooks和组件差不多，hooks就是把组件的js逻辑抽离出来。 都有自己的状态，区别是 组件有template，hooks没有template

## 组合式函数和store的区别 
hooks是复用有状态逻辑（状态是各自分开的）
store 是管理统一状态。状态只有一份。大家共享同一份。

## hooks函数的状态
- 写到函数内和函数外的区别
- 1 写到函数内 每次使用都是创建新的状态
- 2 写到函数内 每次使用都是返回同一个变量（相当于store 可以共享同一份状态）

- 不推荐 写到函数外，需要共享请使用 store 




## 把store提取为单独的npm包
- 不要在包内部实例化 store（不要调用 createPinia()），让消费项目自己安装 pinia 并挂载。

- 我知道了 虽然npm包是一个store 自己项目也有一个store 但注册是在自己项目中创建的一个store ，这个store 是 npm包和自己的store 组合而成的一个store 只要id不同就没有问题，所以最终还是满足 整个项目只有一个store的条件

```text
npm 包 (elpis-store-pinia)
    └── export const useUserStore = defineStore('elpis-user', ...)

项目内 (stores/product.ts)
    └── export const useProductStore = defineStore('product', ...)

项目入口 (main.ts)
    └── const pinia = createPinia()
    └── app.use(pinia)

任何组件
    ├── import { useUserStore } from 'elpis-store-pinia'
    ├── import { useProductStore } from '@/stores/product'
    ├── const userStore = useUserStore()      // 自动注册到 pinia 实例
    └── const productStore = useProductStore() // 自动注册到同一个 pinia 实例
```