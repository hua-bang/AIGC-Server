import axios, { AxiosInstance } from "axios";
import { ChatParams } from "../apis-typings/basic-aigc";
import { ChatType } from "../typings/llm";
import { getStoreAppSetting } from "../hooks/use-setting/helper";

let axiosInstance: AxiosInstance | undefined;

const createAxiosInstance = () => {
  console.log("process.env", process.env);

  axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_END_BASE_PATH,
  });

  axiosInstance.interceptors.response.use((res) => {
    if (res.data.code !== 0) {
      throw new Error(res.data.message);
    }

    return res;
  });
};

export const getAIChat = (params: ChatParams) => {
  if (!axiosInstance) {
    createAxiosInstance();
  }

  const url =
    params.chatType === ChatType.Vision
      ? "/basic-aigc/chatWithVision"
      : "/basic-aigc/chat";

  return axiosInstance?.post(url, params, {
    headers: {
      "Content-Type": "application/json",
      OPENAI_API_KEY: getStoreAppSetting()?.OPENAI_API_KEY,
    },
  });
};
