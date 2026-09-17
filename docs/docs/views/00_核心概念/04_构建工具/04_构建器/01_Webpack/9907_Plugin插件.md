# 插件


### 16. webpack 插件如何实现
+ compiler对象代表了完整的webpack环境配置。这个对象在启动webpack时被一次性建立，并配置好所有可操作 的设置，包括options、loaderffiplugin。当在webpack环境中应用一插件时，插件将收到此compiler的引 用。可以使用它来访问webpack的主环境
+ compilation对象代表了一次资源版本构建。当运行webpack开发环境中间件时，每当检测到一个文件变化，就会 创建一个新的compilation,从而生成的编译资源，<sup>     </sup>compilation对象表现了当前的模块资源、编译生成 资源变化的文件、以及被跟SS依赖的状态的信息。compilation对象也提供了很多关键脚的回调，以供插件使用
+ 创建一个插件函数，在其prototype上定义apply方法，指定一 ebpack自身的事件钩子
+ 函数内部处理webpack内部实例的特箴据
+ 处理完成后，调用webpack提供的回调函数

```js
function MyWebpackPlugin()(
}；
//prototype 上定义 apply 方法
MyWebpackPlugin, prototype.apply=function(){
〃指定一个事件函数挂载到webpack
compiler.pluginCwebpacksEventHook"funcion (compiler)( console. log(H 这是一个插件”)；
〃功能完成调用后webpack提供的回调函数
callback()
})
```


 