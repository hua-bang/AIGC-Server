export const getLocalStorage = (key: string) => {
  if (typeof localStorage === "undefined") {
    return null;
  }

  return localStorage.getItem(key);
};

export const setLocalStorage = (key: string, value: string) => {
  if (typeof localStorage === "undefined") {
    return;
  }

  localStorage.setItem(key, value);
};
