



## 
手动写入依赖，包版本改为workspace:* , 然后i一下。发布时会自动把workspace:*替换为正确版本，
## 
file字段 表示 只需要发布dist就行。
 
## 类型收窄 
类型收窄就是 变量的类型从"宽"变成"窄"。

## 类型谓词 
类型谓词只能用于函数返回值。 v is string 当为true时 v的类型就是string。


## 
FSD 的依赖方向是单向的：app → pages → widgets → features → entities → shared（上层可依赖下层，下层不能依赖上层）。

app是 
pages和widgets
features和entitis是 
shared是


## 
传统分层存在问题：同一个业务功能 散落在多个顶层文件夹里面。

app是入口文件 根组件 全局配置 router等

pages是页面。由多个widgets组成。
widgets是页面的小部件。是由feature和entity组成（也就是属性和方法组成）。比如 header sidebar banner  footer 等widget

feature是单独的业务功能用户行为。比如 登录功能  搜索功能 购物车功能，是一个动词。
entities是业务实体对象。User对象 Order对象 是一个名词。

shared是通用基础能力，不依赖任何层 可以单独发包。和业务无关 能保证不变那就是和业务无关。 比如 组件 utils api  config styles 


## 
pages可以有自己的ui组件，只服务于自己。

index.ts命名的价值是提供统一入口。


pages页面只能依赖下层 不能依赖同层。页面不能相互依赖。

model 




缺点 ：分层地狱 。


层、片、段是
层是 app pages widgets features entities shared 

片是 user post comment 

段是 api model ui 


shared 是开发过程中逐渐提取出来的。


FSD 的代码结构由三个核心概念支撑：Layers（层）、Slices（切片） 和 Segments（段）。

每个层有6层：app、pages widgets features entities shared
片是按业务功能划分。在pages widgets features entities 内部。
每个片由多个段组成。段有 api model ui lib config 等等



widgets负责组合下层（features、entities、shared）形成一个完整的功能区，带有数据获取和交互功能。



## 分层Layers
分层是 FSD中 一共 6个层 固定名字为： app pages widgets features entities shared。
不一定需要所有层。一般简单的就是 app pages shared 三层即可。
每层依赖下层 不能依赖上层

## 分片Slices
slices是按照业务划分的自定义名字。比如有login register。每个公司业务不一样 slices命名也不一样。
## 分段Segments
分段是每个分片下的

分段是按代码的目的分。比如 api model ui 等等。
app层和shared层直接就是这些分段。
pages widgets features entities则是分片下才有这些分段。

segment 名称应该描述目的（为什么），而不是本质（是什么）。像 “components”、“hooks”、“modals” 这样的名称不应该使用，因为它们描述了这些文件是什么，但不能帮助在内部导航代码。这要求团队中的人在这样的文件夹中挖掘每个文件，并且也保持不相关的代码接近，这导致了重构影响的代码区域广泛，从而使代码审查和测试更加困难。


“components”、“hooks”、“modals等名称 并不能帮我们快速理解业务。

Segments是有固定名字的 比如 api ui model 也可以自定义名字。但非常不建议用 component hooks 等名字
## 页面pages
pages是页面。页面之间不能相互引用。

## Shared层

Shared层中的代码不是提前计划的，而是在开发过程中提取的。只有在开发过程中才知道哪些是复用共享的。


## public api 
 slices/segments 等模块中 统一采用index.ts 导出。外界不应该访问其内部细节。而是统一访问index.ts
 好处是当你重构模块时，外部导入仍然是index.ts。
大量 index 文件可能有性能问题。所以 slices/ui/下就不需要index了  通常在slices/index 和 shared/ui/index 就行了
index中有大量的export 可能有性能问题 若存在这种情况 可以不要index文件
## 交叉导入 
交叉导入是指同一 layer 上的一个 slice 从另一个 slice 导入的情况

同层相互导入在规范上是被禁止的。但确实存在合理的交叉导入情况。业务实体在现实世界中经常相互引用。

只能在entities层上 使用导入 且尽量少用交叉导入。

entities/
├── A/
│   ├── @x/
│   │   └── B.ts   ← 这是 A 专门为 B 准备的“接口”
│   └── index.ts   ← A 对全项目公开的常规公共 API
└── B/  >>>  import type { EntityA } from "@/entities/A/@x/B";



## slices group 切片组
采用切片组比扁平化更加容易找到代码。
比如 商品列表页和商品详情页，goods下面有list和detail 而不是用两个同级的good-list和goods-detail


## Code smells 代码异味
代码异味是指 可能存在问题的地方，目前没有爆发。
技术债务：欠缺技术债务。

## 处理assets

1. ui界面上用到图片 就放同级就行 太多可以用文件夹assets装一下。
2. 非ui界面的assets 比如 model/xx.js 就放到js同级就行。
3. Shared Assets 需要共享就放到 shared/ui/aa.png 
4. 全局的 可以放到 app层

public文件夹和 FSD没有冲突。

总结：将assets放在使用的地方，需要共享就放到shared。

## 
https://fsd.how/docs/guides/examples/types/#type-validation-schemas-and-zod



## feature层
https://fsd.how/zh/docs/reference/layers/#features
feature是


不是所有功能都要放进feature，衡量某个功能放进feature的指标是 是否在多个页面上复用。
比如 项目中有多个地方都有评论功能。那么评论就是一个可复用的功能。 
注意 如果feature里面放入太多功能。那么重要的功能就会被埋没。所以请衡量最核心的功能才放进feature。
且考虑到是否能让新人快速上手。
功能slices下 有 ui api。model 


## 重要心得
 * 1. entities features widgets shared 并不是一开始就有的 ，app pages 任何大小的项目都有。
 * 我们应该无脑的在pages上写所有功能，当发现问题时 才 分门别类的 拆分抽离到 feature entities widgets shared中

看 entities/user模块