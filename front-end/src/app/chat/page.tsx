"use client";
import { useState } from "react";
import LLMPlayground from "../components/llm-playground";
import { Chat } from "../typings/chat";
import useChatLayout from "./use-chat-layout";
import useChatList from "./use-chat-list";

const Chat: React.FC = () => {
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

  const { renderLayout, renderMenuCollapsedIcon } = useChatLayout({
    list: chatList as Chat[],
    selectChatId,
    onSelectChat: setSelectChatId,
    rightContent: (
      <LLMPlayground
        showAddIcon={true}
        chat={chat}
        onChatChange={handleChatChange}
        renderPrefixIcon={() => {
          return renderMenuCollapsedIcon();
        }}
      />
    ),
  });

  return renderLayout();
};

export default Chat;
