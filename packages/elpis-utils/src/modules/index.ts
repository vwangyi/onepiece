/**
 * 判断是否为数组
 * @param value - 要判断的值
 * @returns 是否为数组
 */
export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value);
}

/**
 * 面向对象编程
 * 定义一个类来表示计数器 使用计数器类 
    const counter = new Counter();
    counter.increment();
    counter.increment();
    counter.decrement();
    counter.valueOf();  // 输出 1
 */
export class Counter {
  count = 0;
  constructor() {
    this.count = 0;
  }
  increment() {
    this.count++;
  }
  decrement() {
    this.count--;
  }
  valueOf() {
    return this.count;
  }
  reset() {
    this.count = 0;
  }
}
