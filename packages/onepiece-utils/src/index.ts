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
