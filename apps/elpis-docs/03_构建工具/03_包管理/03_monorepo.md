
## monorepo multirepo

工具库
组件库

打包


仓库就是 用版本控制系统（git svn）初始化之后，就是一个仓库。存在 .git 或 .svn 

多包管理方案：
- monorepo： 一个仓库里面有多个包 
- multirepo：一个仓库里面只有一个包（新建多个仓库 来管理多个包）




monorepo的好处
1. 多个包之间 可以共享， 比如 组件库 公共函数 公共依赖 公共api  eslint等工具链   

monorepo缺点
仓库庞大
每个包缺少独立版本控制


multirepo的好处
1. 独立的版本控制
2. 仓库小

multirepo的缺点
1. 多个项目中不方便共享代码


monorepo的缺点就是multirepo的优点
monorepo的优点就是multirepo的缺点



## workspace 
workspace是什么
工作空间就是 这个空间专门用来工作 这里存放有很多工作用到的自资源

pnpm的workspace是什么
pnpm的workspace就是 管理多个包的统一的一个工作空间 通过 pnpm-workspace.yaml文件来定义哪些包是子包。
默认情况下 所有子目录都是子包。

```yaml
packages:
  - "packages/*" # packages/* 表示packages下的所有子目录都是子包 但是不包含子目录的子目录 
  - "packages/**" # packages/** 表示packages下的所有子目录都是子包 包含子目录的子目录 
  - "!**/test/**" # 排除test目录
```