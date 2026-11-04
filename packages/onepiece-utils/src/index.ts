// export * from './src/modules/index';

/**
 * 判断是否为数组
 */
export function isArray(value: unknown): value is unknown[] {
  if (typeof Array?.isArray === 'function') {
    return Array.isArray(value) === true;
  }
  if (typeof Object?.prototype?.toString?.call === 'function') {
    return Object.prototype.toString.call(value) === '[object Array]';
  }
  if (value instanceof Array) {
    return true;
  }
  return false;
}

/**
 * 判断是否为字符串
 */
export function isString(str: unknown): boolean {
  if (typeof str === 'string') {
    return true;
  }
  return false;
}

export function isNumber(n: unknown): boolean {
  return typeof n === 'number';
}

/**
 *
 */
export async function getUserMedia() {
  return await navigator.mediaDevices.getUserMedia();
}

// 判断小数
export function isDecimal(num: unknown) {
  return typeof num === 'number' && isFinite(num) && num % 1 !== 0;
}

// 判断正数（大于0）
export function isPositive(num: unknown) {
  return typeof num === 'number' && num > 0;
}

// 判断负数（小于0）
export function isNegative(num: unknown) {
  return typeof num === 'number' && num < 0;
}

// 判断NaN
export function isNaN(n: unknown) {
  return typeof n === 'number' && Number.isNaN(n);
}

// 判断整数
export function isInteger(n: unknown) {
  return typeof n === 'number' && Number.isInteger(n);
}

/**
 * 函数重载 js版本
 * const getUsers = createOverload();
 * getUsers.addImpl('xxx', () => {});
 * @returns
 */
export function createOverload() {
  const map = new Map();

  function overload(this: unknown, ...args: unknown[]) {
    const key = args.map(it => typeof it).join(',');
    const fn = map.get(key);
    if (!fn) {
      throw new TypeError('没有找到对应的实现');
    }
    return fn.apply(this, args);
  }

  overload.addImpl = function (...args: unknown[]) {
    const fn = args.pop();
    if (typeof fn !== 'function') {
      throw new TypeError('最后一个参数必须是函数');
    }
    const key = args.join(',');
    map.set(key, fn);
  };
  return overload;
}

// /**
//  * 防抖
//  * @param fn
//  * @param delay
//  * @returns
//  */
// function debounce(fn, delay) {
//   let timer = null;
//   return function (...args) {
//     timer && clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn.apply(this, args); // 仿执行、仿this、仿传参
//     }, delay);
//   };
// }

// /**
//  * 创建一个防抖函数
//  * https://www.lodashjs.com/docs/lodash.debounce
//  * @param func 需要防抖的函数
//  * @param wait 延迟毫秒数
//  * @param options 选项配置
//  * @returns 防抖后的函数
//  */
// export function debounce<T extends (...args: unknown[]) => unknown>(
//   func: T,
//   wait?: number,
//   options?: DebounceSettings
// ): DebouncedFunc<T> {
//   return _.debounce(func, wait, options);
// }

// /**
//  * 创建一个节流函数
//  * https://www.lodashjs.com/docs/lodash.throttle
//  * @param func 需要节流的函数
//  * @param wait 延迟毫秒数
//  * @param options 选项配置
//  * @returns 节流后的函数
//  */
// export function throttle<T extends (...args: unknown[]) => unknown>(
//   func: T,
//   wait?: number,
//   options?: ThrottleSettings
// ): DebouncedFunc<T> {
//   return _.throttle(func, wait, options);
// }
