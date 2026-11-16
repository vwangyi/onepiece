##

ts两种用途。编译和类型检查。

前端是 webpack构建工具做编译，ts只做类型检查。
后端是 ts也要做编译也做类型检查。

##

https://www.typescriptlang.org/zh/play/

## ts

ts是js的超集，给js变量加上了类型。在编译阶段就提前发现问题，不需要到运行时才发现问题。
上ts就是 用开发成本 换 维护成成本。

## any 和 unknown

1、any是关闭了类型安全，unknown 使用前必须进行类型收窄（narrowing）
2、any类型的变量和unknown类型的变量 都可以赋值任意类型的变量，但是any可以赋值给任意类型变量 但unknown只能赋值给 unkonwn
比如 any可以赋值给string 但 unknow只能赋值给unknown
3、优先推荐unknown

## 类型别名

类型别名就是 给类型取一个别名。通过 `type 名字 = 类型;` 声明。

```ts
type Gender = '男' | '女' | '未知';
```

## 鸭子辩型法

鸭子辩型法是不看出生只看行为。如果看起来像鸭子，游泳像鸭子，叫声像鸭子，那我认为它就是鸭子。

## 编译目标版本

把ts编译成js的目标版本 比如 es5 es6
compilerOptions.target

## 严格空值检查 strictNullChecks

严格空值检查就是 null只能赋给null, undefined 只能赋给 undefined
通过 compilerOptions.strictNullChecks为true 开启严格空值检查

## 隐式this

隐式this就是通过自动推导的this, 通过compilerOptions.noImplicitThis 为true 表示不允许隐式this

## 隐式any

隐式this就是通过自动推导出的any, 通过compilerOptions.noImplicitAny 为true 表示不允许隐式this

## 始终严格

始终严格是 编译后的js也开启严格模式。 通过compilerOptions.alwaysStrict为true 开启。
给编译后的js加上"use strict"开启严格模式。

## 严格模式总开关

严格模式总开关，通过compilerOptions.strict 为true开启 比如 严格空值检查 隐式any 隐式this 等等

## 隐式any 隐式this

隐式any就是ts推导出来的any
隐式this 也就是ts推导出来的this类型 ts中函数里面的this 需要在参数上接收this (this: Window) => this

## 显式this

显式this就是手动设置的this类型 ts中函数里面的this 需要在参数上接收this (this: Window) => this

## 显式any

显式any就是手动设置的any

## 类型推导

类型推导就是自动推导类型。变量名下有3个点表示没有找到类型。

## 泛型

泛型是 通过声明泛型变量占位。使用者传入具体类型，实现类型复用和类型安全。

## 泛型函数

泛型函数是在函数中使用泛型。 类 接口 别名 都可以使用泛型。

## 多泛型

多泛型是可以声明多个泛型变量。

## 泛型约束

```ts
function getLength<T extends { length: number }>(x: T): number {
  return x.length;
}
```

## 装饰器

装饰器是xxx，它的作用是为字段 类 参数 方法 提供完整的元数据信息，比如校验 提示等信息。

# 元数据

元数据就是描述数据的数据

## 成员装饰器

成员装饰器就是装饰成员的。属性和方法。

## 类装饰器

## 参数装饰器

参数装饰器是装饰参数的装饰器。

## 装饰器

- 面向对象中的概念 比如 java中的注解

## 装饰器执行顺序

多个装饰器执行顺序是 从下到上

## 公共成员

- public 关键字

## 私有成员

- private 关键字

## 受保护成员

- protected 关键字

## 只读成员

- readonly 关键字

## 静态成员

- static 关键字

## 实例成员

## public

public是公共成员修饰符，表示公共的。都可以访问。

```ts
class Person {
  public name: string = '';
}
```

## private

private是私有成员修饰符，表示私有的。只能自己访问。

```ts
class Person {
  private name: string = '';
}
```

##

public private protected readonly static

## 索引器

```ts
// 当用对象.xx 访问不存在的成员时， ts会报错。
// 但用对象[xx] 访问不存在的成员 会推到出any类型

class User {
  [prop: string]: any; // 打开隐式any配置下 也可以中括号访问  这就是索引器
  constructor(
    public name: string,
    public age: number,
  ) {}
  sayHello() {}
}
const u = new User();
u.name;
u['pid'];

// [prop: string]: any;  索引器的key可以是 string 或 number

class MyArray {
  [prop: number]: any; // 写一个索引器
  [0] = 1;
  [1] = 'asdf';
  [2] = {};
}
const a = new MyArray();
a[0];
a[9];

// js中的key本质都是string 即使写number也会转string
```

## 函数重载

函数重载是 函数名相同，参数的个数或类型不同。通过 声明多个重载签名和一个实现签名来实现。

## 重载签名

重载签名 只声明参数/返回类型，没有函数体，可以有多个重载签名。
匹配签名是从上到下

```ts
function a(a: string, b: string): string;
```

## 实现签名

实现签名是 有函数体，实现签名只有一个，且对调用方不可见。
实现签名必须兼容所有重载签名

## typeof 和 keyof

typeof 获取变量的类型
typeof 获取所有key组成的联合类型。keyof 值 返回的是联合类型。

typeof 是对《值》取类型
keyof 是对《类型》取类型
keyof T 把"一个类型有哪些键"变成"一个联合类型"，它是映射类型、泛型约束、属性访问类型安全的基石。最常见的组合是 keyof typeof obj（从值反推键）和 K extends keyof T（约束参数必须是合法键）。

```ts
type ColorKey = keyof typeof 变量; // 先用typeof取 再用keyof取
```

## in 遍历

TS 的 全部由 [K in keyof T] 实现：
Partial、Required、Readonly、Pick、Record Exclude Partial Readonly Extract ReturnType NonNullable InstanceType

```ts
K in 联合类型   表示遍历联合类型 K是每次的值

K in keyof 'string' | 'number';

type Color = 'string' | 'number';
K in Color
```

=========================================================

## 安装TS环境

https://www.typescriptlang.org/zh/play/

pnpm i typescript -g
pnpm i -D -w typescript @types/node
全局安装 typescript 得到 tsc命令， tsc --init 可以生成 tsconfig.json配置文件

## ts可以做什么

ts可以做编译和类型检查
前端项目一般来说 用构建工具vite webpack做编译 ts只做类型检查

## 控制范围

tsconfig.json中 include和exclude 传递 相对路径数组。**表示任意文件夹 *表示任意文件
"include": ["./**/_"]
"include": ["./dist/\**/_"]

## 继承tsconfig.json

通过 extends 传递相对路径，继承某个文件配置，继承多个就传数组
"extends": "./config/tsconfig.json"

## 编译后的出口

compilerOptions.rootDir 一般是 ./src
compilerOptions.outDir 一般是 ./dist
compilerOptions.outFile 把多个ts编译为一个js

用vite webpack等构建工具做编译 rootDir和outDir可以不用

## 编译后的模块化

compilerOptions.module 用于指定编译后的js模块化 必须和package.json 的 "type"一致。

## 内置API

compilerOptions.lib 告诉ts那些API是内置的 ["DOM", "ES2015", "DOM.Iterable"] 浏览器环境有dom nodejs环境没有dom

##

compilerOptions.allowJs 是否 对js文件进行ts编译
compilerOptions.checkJs 是否 对js文件进行ts类型检查
compilerOptions.removeComments 是否 移除产物中的注释
compilerOptions.noEmit 是否 生成编译结果js文件 不生成结果相当于只做类型检查 ts可以做类型检查和编译2件事
compilerOptions.noEmitOnError 是否 打开存在错误时ts编译不通过
compilerOptions.declaration 是否 编译后额外生成 .d.ts 类型声明文件

compilerOptions.strict 是否 开启ts严格 建议开启 开启后下面4个都是ture
compilerOptions.noImplicitThis 是否 不允许this不明确类型
compilerOptions.strictNullChecks 是否 开启严格空值检查  
compilerOptions.noImplicitAny 是否 不开启隐式any
compilerOptions.alwaysStrict 是否 在编译后的js开启严格模式

## 类型声明文件

类型声明文件 是以.d.ts结尾的文件。主要是为js代码提供ts类型。
一个纯js库，需要额外写.d.ts的类型声明文件。发布到@types。

## 三斜线指令

三斜线指令就是 在 .d.ts类型声明文件中 引入 其他类型声明文件。

##

compilerOptions.typeRoots. 告诉ts去哪里找全局类型声明文件 ["./node_modules/@types", "./src/types"]
compilerOptions.types typeRoots设置的路径所有包进行白名单筛选 ["node", "lodash"]

## 声明文件查找位置

- 声明文件的书写位置
  - 1. 先找 放到 tsconfig.json配置的include字段的文件夹内部
  - 2. 再找 放到 node_modules/@types文件夹中
  - 3. 手动配置 compilerOptions.typeRoots: ["./node_modules/@types","./src/types"] 配置typeRoots 一二条就失效
  - 4. 和js代码所在目录相同 并且文件名也相同的文件。比如 /xxx.js /xxx.d.ts

## 联合类型

联合类型就是 通过 或（|）连接多个类型组成一个新的类型。

## 交叉类型

交叉类型就是 通过 且（&）连接多个类型组成一个新的类型。

## 字面量类型

字面量类型就是 把值本身当成一个类型。

## 元组类型

元组就是固定长度的数组。

```ts
let axis: [number, string] = [1, 'a'];
```

## 数组类型

string[]

##

never 用于函数不可能有返回值 比如 throw 1;  
void 表示函数没有返回值 虽然默认返回undefined 但还是用 void

## any类型 unknow类型

any类型的变量，不仅影响自己 还影响其他变量，
unknow类型的变量 只是影响自己。

##

lib: ['ESNext', 'DOM']
ESNext类型有Object、Function、Array、Promise 等
DOM类型有：Node、Element、HTMLElement、Document、HTMLInputElement、HTMLDivElement、HTMLCanvasElement
Event、EventTarget、MouseEvent、KeyboardEvent、FocusEvent、NodeList、HTMLCollection、DOMTokenList

## 类型声明文件 .d.ts

## 类型文件 types

类型文件就是 放在types里面的ts文件，里面全是ts类型。

## 可选属性

可选属性 通过 ?: 实现

## 抽象类

抽象类 只能被继承 不能被实例化。通过 abstract 声明。

## 枚举类

通过 enum 名字 {} , 等号键值对。
经常用 字面量联合 + const断言 来替代枚举：

```ts
enum Gender {
    male = '男';
    female = '女';
}

let gender: Gender;
gender = Gender.male; // 本质是 男
gender = Gender.female;
```

## 可选参数 默认参数

- 可选参数必须在参数列表的末尾

```ts
// 可选参数 就是类型加了 | undefined
function func(a: number, b?: number, c: number = 0) {
  if (b) {
    return a + b;
  } else {
    return a;
  }
}
```

## 类型兼容

类型兼容是 指 基本类型必须完全匹配。对象类型采用鸭子辩型法。
后端接口返回对象，采用鸭子辩型法，只能多 不能少。
如果赋值的是一个变量 那就是 鸭子辩型法，如果赋值的是一个字面量对象 那就需要完全匹配

## 类型断言

类型断言是 在值后面加上 as 一个类型 表示 告诉ts 值就是as后面的类型

## const断言

const断言是 在值后面加上 as const 告诉ts 值的类型就是值本身字面量

const a = 'a' as const;

## 非空断言

非空断言就是 在值后面加一个! 告诉TS这个值不可能是null和undefined。

## 类型保护

类型保护是通过 typeof instanceof 进行if判断。

```ts
if (typeof window === 'string') {
}
```

## 类型保护函数

类型保护函数 就是通过写一个函数返回true false，来做if判断。

```ts
function hasFireShow(animal: object): animal is IFireShow {
  return (
    (animal as unknown as IFireShow).singleFire &&
    (animal as unknown as IFireShow).doubleFire
  );
}
```

## interface

interface是用来约束对象的类型关键字。

```ts
interface User {
  name: string;
  sayHello: () => void;
}
```

## readonly 修饰符

```ts
const arr: readonly number[] = [1, 2, 3];
```

## 接口可以继承多个类

```ts
interface C extends A, B {}
```

## type和interface

接口和类型别名的最大区别：接口可以被类实现，而类型别名不可以

## never

never类型是 函数报错时永远不会有返回值。返回值类型就是never

```ts
const fn = (): never => throw 1;
```

## void类型

void类型就是 函数没有return 或 return undefined 才使用。如果返回值类型是 undefined 就必须写 return undefined；

## 类型推导

ts中变量没有类型注解时，ts会根据变量的值来推导出变量的类型，这就是类型推导。

## number类型

boolean类型 表示这个变量只能是 true 或 false ，Boolean类型 表示不仅可以是true false 还可以是布尔对象
number类型 表示这个变量只能是 数字, Number类型 表示不仅可以是数字还可以是数字对象 new Number(1)
string类型 表示这个变量只能是 字符串,String类型 表示 不仅可以是字符串 还可以是 字符串对象

## 枚举类型

枚举类型就是用 enum 定义

## 模块化

esModuleInterop

1. ts中 仍然使用 esm规范。
2. compilerOptions.module 编译后使用什么模块化 commonjs esm
3. compilerOptions.moduleResolution: bundler | node 配合构建工具用bundler 否则用node 模块解析策略

4. noImplicitUseStrict 编译后 移除 use strict
5. removeComments true 编译后 移除注释
6. noEmitOnError： 错误时不生成编译结果
7. esModuleInterop：true // 用esm 导入 commonjs等非esm模块 比如 import fs from 'fs'; 否则 import * as fs from 'fs'
8. 非常推荐 allowImportingTsExtensions 始终为false。且导入ts文件时省略.ts后缀。不管是 纯ts 还是 配合构建工具都不写.ts后缀

## 在遵循esm的ts中 写commonjs

```ts
export = { name: 'hello', sum() {} };
import xx = require('./xx'); // 导入
// ts用上面的语法 编译后 就是 commonjs
```

## 文件名tsconfig.json

tsconfig.json 是官方名字 ，
但tsconfig.app.json tsconfig.node.json 只是约定俗成的名字
app管src node管webpack.config.cjs

## 根选项：定义项目结构和文件范围

files string[] 指定需要编译的文件白名单，文件不存在会报错
include string[] 指定需要编译的文件或目录，支持通配符（如 src/**/*）
exclude string[] 指定不需要编译的文件或目录，默认排除 node_modules
extends string 继承另一个配置文件，相对路径基于原配置文件解析
references { path: string }[] 引用其他子项目，用于 Monorepo 项目依赖管理
compileOnSave boolean 保存时自动编译（需编辑器支持）

## 基本选项：控制编译目标和输出格式

target string ES3 编译后的 JS 目标版本，如 ES5、ES2015、ES2022、ESNext
module string CommonJS 模块系统，如 CommonJS、AMD、ES2015、ESNext、NodeNext
lib string[] 根据 target 推断 包含的库文件声明，如 ["DOM", "ES2022"]
allowJs boolean false 允许编译 .js 文件
checkJs boolean false 对 .js 文件进行类型检查
jsx string preserve JSX 生成方式：preserve、react、react-jsx、react-jsxdev
declaration boolean false 生成对应的 .d.ts 声明文件
declarationMap boolean false 为声明文件生成 sourcemap
sourceMap boolean false 生成 .map 文件
outFile string — 将所有输出合并为一个文件（仅用于 amd 或 system 模块）
outDir string — 指定输出目录
rootDir string — 指定输入文件的根目录，控制输出目录结构
composite boolean false 启用项目编译，用于构建项目间依赖
incremental boolean false 启用增量编译
tsBuildInfoFile string — 指定增量编译信息文件的路径
removeComments boolean false 删除编译后的注释
noEmit boolean false 不生成输出文件，仅进行类型检查
importHelpers boolean false 从 tslib 导入辅助函数
downlevelIteration boolean false 为 ES5/ES3 目标提供完整的迭代器支持
isolatedModules boolean false 将每个文件作为独立模块转换
allowSyntheticDefaultImports boolean false 允许从没有默认导出的模块进行默认导入
esModuleInterop boolean false 改善 CommonJS 与 ES 模块的互操作性
forceConsistentCasingInFileNames boolean false 强制文件名大小写一致
skipLibCheck boolean false 跳过第三方库的类型检查
useDefineForClassFields boolean 根据 target 决定 使用 ES 标准的类字段定义
moduleDetection string auto 模块检测策略：auto、legacy、force
verbatimModuleSyntax boolean false 强制使用 import type 语法，减少运行时开销
allowImportingTsExtensions boolean false 允许导入时包含 .ts 扩展名

## 严格类型检查：提升类型安全性的核心选项

strict
noImplicitAny: true 禁止隐式any类型的变量
noImplicitThis true 禁止隐式this类型的变量
strictNullChecks true 开启严格的空值检查 undefined null 只能赋值给 undefined null
strictFunctionTypes true 函数参数双向协变检查 函数类型的严格检查（参数逆变）
strictBindCallApply true 严格检查bind call apply的参数类型
strictPropertyInitialization true 严格检查类属性的初始化
alwaysStrict true 在编译后的js中开启严格模式
noUncheckedIndexedAccess true 严格检查索引访问的返回值类型，开启后索引访问的返回值类型会包含 undefined
exactOptionalPropertyTypes true 严格检查可选属性的类型，开启后可选属性的类型会被视为可能为 undefined
noImplicitOverride true 禁止在子类中覆盖父类的方法时不使用 override 关键字
noPropertyAccessFromIndexSignature true 禁止通过索引签名访问对象的属性，开启后只能通过显式声明的属性访问对象的属性

## 额外检查：发现代码中的潜在问题

noUnusedLocals boolean false 报告未使用的局部变量
noUnusedParameters boolean false 报告未使用的函数参数
noImplicitReturns boolean false 不是所有代码路径都返回值时报告错误
noFallthroughCasesInSwitch boolean false 报告 switch 语句中未处理的贯穿情况
allowUnreachableCode boolean undefined 允许不可达代码
allowUnusedLabels boolean undefined 允许未使用的标签

## 模块解析：控制模块导入的解析方式

moduleResolution: node、classic、bundler、nodenext

baseUrl: "./",
paths: {"@/_": ["src/_"]}

typeRoots: ["./node_modules/@types", "./src/types"]
types: ["node", "lodash"]
resolveJsonModule: true 允许导入json文件
preserveSymlinks: true 保留符号链接，防止模块解析时跳过符号链接

moduleResolution string 根据 module 推断 模块解析策略：node、classic、bundler、nodenext
baseUrl string — 解析非相对模块名的基准目录
paths object — 模块名到基于 baseUrl 的路径映射，如 {"@/_": ["./src/_"]}
rootDirs string[] — 将多个目录合并为一个虚拟目录
typeRoots string[] ["node_modules/@types"] 类型定义文件的目录列表
types string[] — 指定要包含的类型声明包
allowUmdGlobalAccess boolean false 允许从模块访问 UMD 全局变量
resolveJsonModule boolean false 允许导入 JSON 模块
preserveSymlinks boolean false 不解析符号链接的真实路径

## Source Map：调试相关的映射文件配置

sourceRoot string — 调试器定位 TypeScript 文件的位置
mapRoot string — 调试器定位 map 文件的位置
inlineSourceMap boolean false 将 sourcemap 嵌入生成的 JS 文件中
inlineSources boolean false 将源代码与 sourcemap 一起嵌入单个文件

## 实验性选项：装饰器等实验性特性

experimentalDecorators boolean false 启用实验性装饰器支持
emitDecoratorMetadata boolean false 为装饰器提供元数据支持

## 其他选项

listEmittedFiles boolean false 打印编译输出的文件列表
listFiles boolean false 打印编译的文件列表（包括引用的声明文件）
diagnostics boolean false 输出诊断信息
extendedDiagnostics boolean false 输出更详细的诊断信息

## watchOptions：文件监视行为配置

watchFile string 监视文件策略：fixedPollingInterval、priorityPollingInterval、dynamicPriorityPolling、useFsEvents 等
watchDirectory string 监视目录策略
fallbackPolling string 轮询回退策略
synchronousWatchDirectory boolean 禁用目录的延迟监视
excludeDirectories string[] 从监视中排除的目录
excludeFiles string[] 从监视中排除的文件
