"use client";
import Content from "./components/content";
import UserInput from "./components/user-input";
import styles from "./index.module.css";
import { useLLMSelector } from "./components/llm-selector/hook";
import useAIChat from "@/app/hooks/use-ai-chat";
import { PromptItem } from "@/app/typings/prompt";
import { ChatType } from "@/app/typings/llm";
import React from "react";
import { PlusCircleOutlined, ShareAltOutlined } from "@ant-design/icons";

const LLMPlayground: React.FC<LLMPlaygroundProps> = ({
  showAddIcon = false,
}) => {
  const { llm, llmInstance, renderSelector } = useLLMSelector();

  const { loading, prompts, setPrompts, sendMessage } = useAIChat(llm);

  const handlePromptChange = (
    prompt: PromptItem["content"],
    chatType: ChatType
  ) => {
    const promptItem = {
      role: "user",
      content: prompt,
    };
    sendMessage(promptItem, chatType);
  };

  const handleChangeTypeChange = () => {
    setPrompts([]);
  };

  return (
    <div className={styles.playgroundWrapper}>
      <div className={styles.playground}>
        <div className={styles.selectorWrapper}>
          {renderSelector()}
          <div className={styles.featureBtnArea}>
            {showAddIcon && (
              <PlusCircleOutlined onClick={handleChangeTypeChange} />
            )}
            <ShareAltOutlined />
          </div>
        </div>

        <Content
          className={styles.llmContent}
          prompts={prompts}
          loading={loading}
          llmInstance={llmInstance}
        />
        <UserInput
          className={styles.llmUserInput}
          loading={loading}
          onPromptChange={handlePromptChange}
          onChatTypeChange={handleChangeTypeChange}
        />
      </div>
    </div>
  );
};

interface LLMPlaygroundProps {
  showAddIcon?: boolean;
}

export default LLMPlayground;
