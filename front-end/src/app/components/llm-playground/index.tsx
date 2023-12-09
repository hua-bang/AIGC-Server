"use client";
import Content from "./components/content";
import UserInput from "./components/user-input";
import styles from "./index.module.css";
import { useLLMSelector } from "./components/llm-selector/hook";
import useAIChat from "@/app/hooks/use-ai-chat";

const LLMPlayground = () => {
  const { llm, llmInstance, renderSelector } = useLLMSelector();

  const { loading, prompts, sendMessage } = useAIChat(llm);

  const handlePromptChange = (prompt: string) => {
    const promptItem = {
      role: "user",
      content: prompt,
    };
    sendMessage(promptItem);
  };

  return (
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
      />
    </div>
  );
};

export default LLMPlayground;
