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

/**
 * 防抖  生产环境建议直接用 lodash
 * @param fn
 * @param delay
 * @param param2
 * @returns
 */
export function debounce1<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number,
): ((...args: Args) => void) & { cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Args | null = null;
  let lastThis: unknown = null;

  function debounced(this: unknown, ...args: Args): void {
    lastThis = this;
    lastArgs = args;

    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      timer = null;
      const args2 = lastArgs;
      const this2 = lastThis;
      lastArgs = lastThis = null;
      fn.apply(this2, args2 as Args);
    }, delay);
  }

  debounced.cancel = (): void => {
    if (timer !== null) clearTimeout(timer);
    timer = null;
    lastArgs = lastThis = null;
  };
  return debounced;
}
