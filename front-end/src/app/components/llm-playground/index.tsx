"use client";
import { useState } from "react";
import Content from "./components/content";
import UserInput from "./components/user-input";
import styles from "./index.module.css";
import { PromptItem } from "@/app/typings/prompt";
import { useLLMSelector } from "./components/llm-selector/hook";

const LLMPlayground = () => {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);

  const { llm, renderSelector } = useLLMSelector();

  const handlePromptChange = (prompt: string) => {
    const promptItem = {
      role: "user",
      content: prompt,
    };
    setPrompts((prompts) => [...prompts, promptItem]);
  };

  return (
    <div className={styles.playground}>
      {renderSelector()}
      <Content className={styles.llmContent} prompts={prompts} />
      <UserInput
        className={styles.llmUserInput}
        onPromptChange={handlePromptChange}
      />
    </div>
  );
};

export default LLMPlayground;
