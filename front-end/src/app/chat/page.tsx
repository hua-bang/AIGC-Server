"use client";
import React from "react";
import LLMPlayground from "../components/llm-playground";
import { useChatConfigContext } from "./context";

const Chat: React.FC = () => {

  const { chat, handleChatChange, renderMenuCollapsedIcon } = useChatConfigContext() || {};

  return (
    <LLMPlayground
      showAddIcon={true}
      chat={chat}
      onChatChange={handleChatChange}
      renderPrefixIcon={() => {
        return renderMenuCollapsedIcon?.();
      }}
    />
  )
};

export default Chat;
