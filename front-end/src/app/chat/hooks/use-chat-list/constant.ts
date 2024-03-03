import { Chat } from "@/app/typings/chat";
import { ChatType } from "@/app/typings/llm";
import { getLocalStorage, setLocalStorage } from "@/app/utils/storage";

const ChatListStorageKey = "chat_list";

export const getStoreChatList = () => {
  const chatList = getLocalStorage(ChatListStorageKey);
  const nextChatList = chatList ? JSON.parse(chatList) : [];

  return nextChatList.filter((chat: Chat) => chat?.prompt?.length);
};

export const setStoreChatList = (chatList: Chat[]) => {
  const nextChatList = chatList.filter(
    (chat) => chat.chatType === ChatType.Chat && chat.id
  );
  setLocalStorage(ChatListStorageKey, JSON.stringify(nextChatList));
};
