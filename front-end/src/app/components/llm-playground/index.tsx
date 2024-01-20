"use client";
import Content from "./components/content";
import UserInput from "./components/user-input";
import styles from "./index.module.css";
import { useLLMSelector } from "./components/llm-selector/hook";
import useAIChat from "@/app/hooks/use-ai-chat";
import { PromptItem } from "@/app/typings/prompt";
import { ChatType } from "@/app/typings/llm";

const LLMPlayground = () => {
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
        {renderSelector()}
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

export default LLMPlayground;
