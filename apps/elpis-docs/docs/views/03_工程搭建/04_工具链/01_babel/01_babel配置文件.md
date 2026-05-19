# babel的配置文件
> Babel有两种并行配置文件格式，可以一起使用，也可以单独使用。

> `https://babel.dev/docs/config-files#project-wide-configuration`

> `https://babel.dev/docs/config-files#file-relative-configuration`

 

1. 项目范围的配置
- 文件名： `babel.config格式`
- 1. 文件名 `babel.config.*` 文件，扩展名如下：`.json`、`.js`、`.cjs`、`.mjs`、`.cts`、 ...
- 2. 作用范围 整个项目
- 3. 应用场景 monorepo架构根目录


2. 目录范围的配置
- 文件名：`.babelrc格式`
- `.babelrc.*`文件，扩展名如下：`.json`、`.js`、`.cjs`、`.mjs`、`.cts`。
- `.babelrc`文件，没有扩展名。
- `package.json`文件，带有"babel"键。

- 作用范围：不会应用到其他目录，也不会应用到 node_modules
- 应用场景：monorepo的子包 或 multirepo架构 用这个格式   
- 可以继承或重写项目级配置


如果是 monorepo项目 根目录使用babel.config.js方便统一 子包使用 .babelrc 方便继承或局部覆盖。 
如果是常规的 multirepo项目 使用 babel.config.js 或 .babelrc 均可



## 配置项plugins

- plugins 传一个数组， 数组项就是使用的插件  
插件需要传递参数，数组项就传一个 长度为2的元组，第一项是 插件名 string 第二项是 参数 object 
插件需要传递参数，数组项就传一个 插件名 string 


## 配置项presets



## 配置目标浏览器范围

3种方式 优先级顺序如下：

1. babel.config文件的targets字段
2. .browserslistrc
3. package.json的browserslist字段


browserslistConfigFile 默认为true 表示：按 targets  > .browserslistrc > package.json的browserslist字段 
传一个相对路径 表示指定文件 控制 目标浏览器范围

```json 
{
  "targets": "> 0.25%, not dead",
  "presets": [
    [
        "@babel/preset-env", 
        {
            "browserslistConfigFile": "./.browserslistrc"
        }
    ]
  ]
}
```
 