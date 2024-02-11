/**
 * 获取当前 URL 的查询参数。
 * @returns {Object} 包含所有查询参数的对象。
 */
export function getQueryParams(key?: string) {
  // 确保这个函数仅在浏览器环境中调用
  if (typeof window === 'undefined') {
    return {};
  }

  const searchParams = new URLSearchParams(window.location.search);
  const queryParams: Record<string, any> = {};

  // Convert the iterable iterator to an array before iterating over it
  const entries = Array.from(searchParams.entries());

  // Iterate over the array of entries and add them to the queryParams object
  for (const [key, value] of entries) {
    queryParams[key] = value;
  }

  if(key) {
    return queryParams[key];
  }

  return queryParams;
}