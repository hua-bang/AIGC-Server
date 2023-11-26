"use client";
import { useState } from "react";
import Content from "./components/content";
import LLMSelector from "./components/llm-selector";
import UserInput from "./components/user-input";
import styles from "./index.module.css";
import { PromptItem } from "@/app/typings/prompt";

const LLMPlayground = () => {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);

  const handlePromptChange = (prompt: string) => {
    const promptItem = {
      role: "user",
      content: prompt,
    };
    setPrompts((prompts) => [...prompts, promptItem]);
  };

  return (
    <div className={styles.playground}>
      <LLMSelector className={styles.llmSelector} />
      <Content className={styles.llmContent} prompts={prompts} />
      <UserInput
        className={styles.llmUserInput}
        onPromptChange={handlePromptChange}
      />
    </div>
  );
};

export default LLMPlayground;
