## 事件循环

- 事件循环是 为了解决单线程语言 如何调度任务 实现异步编程的核心机制, 简单来说就是排队，排队规则是：先同步后异步 先微任务后宏任务，执行栈每次执行宏任务前 都会轮询微任务队列 清空微任务队列后再执行一个宏任务
 
  ○ 优缺点
    ■ 好处是 非阻塞。将异步任务交给其他线程处理，不会阻塞主线程。
    ■ 缺点是 长任务仍然会阻塞
  ○ 讲应用
    ■ 平时开发中 应该尽量避免长任务
    ■ 常见的微任务：Promise.then catch finally
    ■ 常见宏任务：setTimeout setInterval 交互事件

- 上面我 带出了  单线程 微任务 宏任务 



- 单线程：是js只能被主线程执行 主线程只有一个 所以js是单线程语言。
- 异步任务：是不能立即执行的任务
- 微任务是
- 宏任务是
- 渲染任务是
常见的宏任务有 setTimeout、setInterval、I/O、UI渲染、事件回调等
常见的微任务有 Promise.then/catch/finally、MutationObserver、queueMicrotask，以及在Node.js里的 process.nextTick。”

- 宏任务队列中 又细分了 很多队列：交互队列 延时队列 等等 
- 当异步任务满足触发条件就会进入任务队列进行排队等待主线程执行
 
## 微任务
微任务队列：
  Promise.resolve().then(函数)
  Promise.reject().catch(函数)
  Promise.resolve().finally(函数) 
  queueMicrotask(函数); 
  new window.MutationObserver(函数);
  nextTick(函数);  

## 宏任务
宏任务队列：
  setTimeout(函数)
  setInterval(函数) 
  requestIdleCallback(函数)  
  dom.addEventListener('click', 函数) // 所有交互事件都是宏任务 
  // io文件操作也是宏任务

 

## 事件循环的一轮
```js
事件循环的一轮
事件循环的一轮是指：
  执行完当前 执行栈 中的同步任务  
  并清空微任务队列 
  requestAnimationFrame 执行渲染任务 
  然后再执行1个宏任务 为一轮

可以理解为 有几个宏任务 就有几轮 因为执行宏任务前 必须清空微任务队列  
执行完1个宏任务 这一轮就结束 
```