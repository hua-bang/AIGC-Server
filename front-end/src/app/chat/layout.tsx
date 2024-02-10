"use client";
import React, { useState } from "react";
import useChatLayout from "./use-chat-layout";
import useChatList from "./use-chat-list";
import { Chat } from "../typings/chat";
import { ChatConfigContext } from "./context";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { chatList, setChatList } = useChatList();

  const [selectChatId, setSelectChatId] = useState(chatList[0]?.id);

  const chat = chatList.find((item) => item.id === selectChatId);

  const handleChatChange = (nextChat: Chat) => {
    const index = chatList.findIndex((item) => item.id === nextChat.id);

    if (index === -1) {
      setChatList((prev) => [nextChat, ...prev]);
      setSelectChatId(nextChat.id);
      return;
    }

    const nextChatList = [...chatList];
    nextChatList.splice(index, 1, nextChat);
    setChatList(nextChatList);
  };

  const { renderLayout } = useChatLayout({
    list: chatList as Chat[],
    selectChatId,
    onSelectChat: setSelectChatId,
    rightContent: children,
  });

  return (
    <ChatConfigContext.Provider value={{
      chat,
      handleChatChange,
    }}>
      {renderLayout()}
    </ChatConfigContext.Provider>
  );
}