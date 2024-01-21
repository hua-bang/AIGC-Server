import { Chat } from "@/app/typings/chat";

export const getChatTitle = (chat: Chat): string => {
  const { prompt = [] } = chat;

  if (!prompt[0]) {
    return "新对话";
  }

  const title =
    typeof prompt[0].content === "string"
      ? prompt[0].content
      : prompt[0].content?.[0]?.text;

  return title || "新对话";
};
