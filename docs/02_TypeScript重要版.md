## 基础类型

string number boolean null undefined symbol bigint void never unknown any

## any和unknown

any是放弃类型安全。尽量不用。
unknown是 安全的未知类型。需要类型收窄后才能操作。

## never

never是函数抛出错误或死循环 表示永远不会有返回值。

## 类型收窄

类型收窄是 通过 typeof instanceof in 等值判断 自定义类型守卫。

把类型宽度收窄。

## 类型推导

ts可以自动推导类型。

## 联合类型 交叉类型 字面量类型

## interface和type

我们按面试和工程实战的优先级梳理 TS 核心重点，由基础到工程架构，同时带上它解决的问题、坑点。

1. 基础类型 + 类型推导

• 基础：string、number、boolean、null、undefined、symbol、bigint、void、never、unknown、any

◦ any：放弃类型校验，尽量少用

◦ unknown：安全的“不知道是什么类型”，必须收窄之后才能操作

◦ never：永远不会发生的值（抛出异常、死循环函数返回值）

• 类型推断：TS 不是所有地方都要手动写类型，它会自动推导变量、返回值。
误区：不是所有变量都要加类型注解。

2. 联合、交叉、字面量类型

• 联合 A | B：是 A 或者 B；

• 交叉 A & B：同时具备 A 和 B 的所有属性；

• 字面量类型：type Status = 'success' | 'fail'，用来约束枚举式的固定值，比单纯 string 安全很多。

3. 类型收窄（Narrowing）

这是写业务最常用的：在分支里把联合类型缩小成确定类型。
方式：typeof、instanceof、in、等值判断、自定义类型守卫（type predicate is）。
很多人联合类型报错，根源就是没有收窄。

4. interface vs type

• interface：适合描述对象结构，可以合并声明（declaration merging），多用于组件 props、对象契约；

• type：可以描述联合、交叉、元组、工具类型等任意类型；

• 现在趋势：不用强行二选一，看场景。很多新项目统一用 type 也没问题。

5. 泛型（TS 重中之重）

泛型就是类型层面的参数，让工具、组件、函数复用，同时保留类型信息。
常见场景：封装请求函数、封装通用表格、hooks、工具函数。
重点理解：泛型约束 extends、默认泛型参数。
面试高频：手写一个泛型工具、封装一个通用请求返回类型。6. 工具类型（内置）

Partial、Required、Readonly、Pick、Omit、Exclude、Extract、ReturnType、Parameters。
不能只背名字，要理解怎么通过映射类型、条件类型实现。
底层能力就是：映射类型 + 条件类型 + 索引访问。

7. 索引、索引签名、模板字面量类型

• 索引访问：T[K] 取对象某个属性的类型；

• 索引签名：[key: string]，描述不确定 key 的对象；

• 模板字面量类型（TS 4.1+）：type EventName = on${string}``，对事件名、路由名做强约束，基建、组件库非常好用。

8. 类型断言 & 非空断言

• as 类型断言：告诉 TS “我比你更清楚这个类型”，属于逃逸手段，尽量优先用类型收窄而不是断言；

• ! 非空断言：obj! 代表不为 null / undefined，风险点自己承担；
还有 satisfies，只校验不强制转换，更安全。

9. 函数类型

函数签名、可选参数、默认参数、重载（function overload）。
重载适合一个函数多种入参对应多种返回值；但要注意：实现签名对外是不可见的。

10. 类与修饰符

public（默认）、private、protected、readonly。
区分 TS 的私有（编译期校验）和 JS 原生 # 私有字段（运行时真正私有）。

11. 模块、声明文件（.d.ts）

• declare 用来给 JS 库、全局变量补类型；

• @types/xxx 社区类型包；

• moduleResolution 解析策略（NodeNext、Bundler），是现在 monorepo + ESM 项目高频踩坑点；

• type-only import/export：import type，消除类型导入被打包进去的问题。

12. tsconfig 核心配置

• strict: true 是根基，开启所有严格检查（noImplicitAny、strictNullChecks 等），工程推荐打开；

• target：编译输出 JS 版本；

• module：输出模块规范；

• paths 路径别名；

• skipLibCheck、isolatedModules（Vite 必备）；

• noUnusedLocals 这类质量校验。

13. 类型体操（进阶）

条件类型 T extends U ? A : B、递归类型、推断 infer。
不是业务天天写，但是写工具类型、组件底层、面试会考；看懂别人的高级类型定义必备。

14. 工程里的 TS 实战要点（高级前端重点）

• 组件 Props 类型设计，配合 zod / yup：TS 是静态类型，不能校验运行时接口数据；类型 ≠ 校验；

• 状态管理：Pinia / Redux 如何推导类型；

• 微前端、monorepo 里跨包类型共享；

• 类型拆分：业务类型、公共契约类型抽离，复用；

• 类型测试：ts-expect-error 校验某些类型是否会报错。

一条主线总结

TS 核心就是：用一套静态类型系统，在编译期描述数据契约，提前捕获类型错误，给 IDE 提示；同时它是结构类型（鸭子类型），不是强 nominal 类型。

初级：基础类型、联合、收窄
中级：interface/type、泛型、内置工具类型、tsconfig、d.ts
高级：条件类型、infer、模板字面量、类型和运行时校验区分、大型工程类型架构设计

如果你想，接下来可以讲：TS 鸭子类型，或者一道类型体操题目练手。
