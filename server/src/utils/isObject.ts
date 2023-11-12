/**
 * 判断一个只是否是对象
 * @param val 判断值
 * @returns { boolean }
 */
export const isObject = (val: unknown): val is Record<string, any> => {
  return val && typeof val === 'object';
};
