import axios from "axios";
import { ChatParams } from "../apis-typings/basic-aigc";
import { ChatType } from "../typings/llm";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export const getAIChat = (params: ChatParams) => {
  const url =
    params.chatType === ChatType.Vision
      ? "/basic-aigc/chatWithVision"
      : "/basic-aigc/chat";

  return axiosInstance.post(url, params, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
