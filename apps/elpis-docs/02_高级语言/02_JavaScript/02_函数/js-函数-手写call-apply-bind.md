# 手写 call apply bind 方法 
```js 
// 手写 call apply bind方法 
// 都是伪代码 js底层是c++实现的 

// 1 处理第一个参数为null undefined时 指向 globalThis 为原始值时 转为包装类对象 Object('123')
// 2 通过js的规则 this指向调用者 把真实调用函数挂在第一个参数上来调用 实现this指向第一个参数

function call(ctx, ...args) { 
    // 若第一个参数为null或undefined 则为globalThis 若为其他基础类型则转为对象 
    // Object() 传原始型 得到包装类对象
    ctx = [null, void 0].includes(ctx) ? globalThis : Object(ctx); 
    // 处理 调用函数的this指向 第一个形参 
    const fn = this
    const key = Symbol() // 用symbol来防止第一个参数对象 上有相同的属性  
    Object.defineProperty(ctx, key, {
        value: fn,
        enumerable: false
    }) 
    const result = ctx[key](...args) // 利用js的规则 this指向调用者ctx
    return result

}

function apply(ctx, args) { 
    const fn = this
    if(!Array.isArray(args)) {
        throw new Error('the second argument must be an array')
    }
    fn.myCall(ctx, ...args)
}

function bind(ctx, ...args) { 
    const fn = this
    return function (...args2) {
        if(new.target) {
            return new fn(...args, ...args2)
        }
        return fn.apply(ctx, args.concat(args2))
    }
}

Function.prototype.call1 = call;
Function.prototype.apply1 = apply;
Function.prototype.bind1 = bind;
```

