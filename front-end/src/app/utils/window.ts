/**
 * 获取 window 变量
 */
export const getWindow = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window;
}