import { ChatParams } from "../apis-typings/basic-aigc";
import { ChatType } from "../typings/llm";
import { getStoreAppSetting } from "../hooks/use-setting/helper";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import { axiosInstance } from "./base";
import { getAccessToken } from "../utils/access-token-storage";

export const getAIChat = (params: ChatParams) => {
  const url =
    params.chatType === ChatType.Vision
      ? "/basic-aigc/chatWithVision"
      : "/basic-aigc/chat";

  return axiosInstance.post(url, params);
};

/**
 * 根据 sse 获取 AI 聊天
 * @param params
 * @param sseOptions
 * @returns
 */
export const getAIChatSSE = (
  params: ChatParams,
  sseOptions?: Parameters<typeof fetchEventSource>[1]
) => {
  const url = `${process.env.NEXT_PUBLIC_BACK_END_BASE_PATH}basic-aigc/chat/sse`;

  const accessToken = getAccessToken();

  return fetchEventSource(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      OPENAI_API_KEY: getStoreAppSetting()?.OPENAI_API_KEY || "",
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
    },
    body: JSON.stringify(params),
    ...(sseOptions || {}),
  });
};
