/**
 * 判断是否为数组
 * @param value - 要判断的值
 * @returns 是否为数组
 */
export function isArray(value: unknown): boolean {
  if (typeof Array?.isArray === 'function') {
    return Array.isArray(value);
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
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str: string) {
  if (typeof str === 'string') {
    return true;
  }
  return false;
}
