import axios from "axios";
import { getStoreAppSetting } from "../hooks/use-setting/helper";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END_BASE_PATH,
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.OPENAI_API_KEY = getStoreAppSetting()?.OPENAI_API_KEY;
  config.headers["Content-Type"] = "application/json";
  return config;
});

axiosInstance.interceptors.response.use((res) => {
  if (res.data.code !== 0) {
    throw new Error(res.data.message);
  }

  return res;
});

export { axiosInstance };
