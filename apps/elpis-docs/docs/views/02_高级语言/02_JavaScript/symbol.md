
Symbol是es6新增的基础数据类型, 可以创建绝对唯一的标识符，不需要关注值本身是什么

const KEY = Symbol(); 
const obj = { [KEY]: 1, a: Symbol() }
vue中的key 可以传Symbol()

Symbol() 不会被遍历 for of forin Object.keys中拿不到symbol()