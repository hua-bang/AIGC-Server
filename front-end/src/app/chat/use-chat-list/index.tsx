import { Chat } from "@/app/typings/chat";
import { useEffect, useState } from "react";
import { getStoreChatList, setStoreChatList } from "./constant";

const useChatList = () => {
  const [chatList, setChatList] = useState<Chat[]>(() => getStoreChatList());

  useEffect(() => {
    setStoreChatList(chatList);
  }, [chatList]);

  return { chatList, setChatList };
};

export default useChatList;
