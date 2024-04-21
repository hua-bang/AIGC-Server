import { getLocalStorage, setLocalStorage } from "./storage";

const key = "access_token";

export const getAccessToken = () => {
  return getLocalStorage(key);
};

export const setAccessToken = (value?: string) => {
  setLocalStorage(key, value);
};
