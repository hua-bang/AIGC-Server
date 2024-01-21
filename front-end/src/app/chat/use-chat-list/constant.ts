import { Chat } from "@/app/typings/chat";

const ChatListStorageKey = "chat_list";

export const getStoreChatList = () => {
  const chatList = localStorage.getItem(ChatListStorageKey);
  const nextChatList = chatList ? JSON.parse(chatList) : [];

  return nextChatList.filter((chat: Chat) => chat?.prompt?.length);
};

export const setStoreChatList = (chatList: Chat[]) => {
  localStorage.setItem(ChatListStorageKey, JSON.stringify(chatList));
};
