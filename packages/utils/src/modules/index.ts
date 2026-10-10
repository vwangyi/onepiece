/**
 * 判断是否为数组
 */
export function isArray(value: unknown): boolean {
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
export function isString(str: string): boolean {
  if (typeof str === 'string') {
    return true;
  }
  return false;
}

/**
 *
 */
export async function getUserMedia() {
  return await navigator.mediaDevices.getUserMedia();
}
