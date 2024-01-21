import { getLocalStorage, setLocalStorage } from "@/app/utils/storage";
import { SettingValue } from "./typings";

const AppSettingStorageKey = "APP_SETTING";

export const getStoreAppSetting = (): SettingValue | undefined => {
  const appSetting = getLocalStorage(AppSettingStorageKey);
  return appSetting ? JSON.parse(appSetting) : undefined;
};

export const setStoreAppSetting = (value: SettingValue) => {
  setLocalStorage(AppSettingStorageKey, JSON.stringify(value));
};
