import axios from "axios";
import { ChatParams } from "../apis-typings/basic-aigc";
import { ChatType } from "../typings/llm";
import { getStoreAppSetting } from "../hooks/use-setting/helper";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END_BASE_PATH,
});

export const getAIChat = (params: ChatParams) => {
  const url =
    params.chatType === ChatType.Vision
      ? "/basic-aigc/chatWithVision"
      : "/basic-aigc/chat";

  return axiosInstance.post(url, params, {
    headers: {
      "Content-Type": "application/json",
      OPENAI_API_KEY: getStoreAppSetting()?.OPENAI_API_KEY,
    },
  });
};
