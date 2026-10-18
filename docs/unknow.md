



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

