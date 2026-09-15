# Commonjs规范

commonjs模块化 本质就是一个函数包裹 函数可以接收 5个参数  exports, require, module, __filename, __dirname




1. 不能对exports赋值 因为exports 指向 module.exports， 对exports赋值就是切断了引用。

导出 
1. 通过 module.exports = {} 导出，
// 或者
exports.add = add;
exports.multiply = multiply;
 

通过module.exports = {} 导出，导出的是值拷贝。
通过require()函数 同步导入

commonjs 实现异步 也可以用 import()函数 


CommonJS 是 Node 的模块规范，用 require 同步加载、module.exports 导出。每个文件被包裹成函数，有独立作用域，模块有缓存只执行一次。导出的是值拷贝，不是实时绑定，所以循环依赖和后续变量更新容易出问题。它和 ESM 最大的区别是运行时同步 vs 编译时静态、值拷贝 vs 实时绑定，这也导致 CJS 不支持 tree-shaking。



