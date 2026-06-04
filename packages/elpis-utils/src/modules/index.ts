/**
 * 判断是否为数组
 * @param value - 要判断的值
 * @returns 是否为数组
 */
export function isArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value);
}
