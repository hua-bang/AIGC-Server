/**
 * 获取 window 变量
 */
const getWindow = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window;
}