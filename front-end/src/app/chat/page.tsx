"use client";
import LLMPlayground from "../components/llm-playground";
import useChatLayout from "./use-chat-layout";

const Chat: React.FC = () => {
  const { renderLayout } = useChatLayout({
    rightContent: <LLMPlayground />,
  });

  return renderLayout();
};

export default Chat;
