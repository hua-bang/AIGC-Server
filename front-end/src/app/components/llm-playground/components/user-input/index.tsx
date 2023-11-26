"use client";
import { Input } from "antd";
import classnames from "classnames";
import React from "react";
import styles from "./index.module.css";
import { SendOutlined } from "@ant-design/icons";

export interface UserInputProps {
  className?: string;

  onPromptChange?: (prompt: string) => void;
}

const UserInput: React.FC<UserInputProps> = ({ className, onPromptChange }) => {
  const [prompt, setPrompt] = React.useState<string>("");

  const handleClick = () => {
    if (!prompt) {
      return;
    }
    onPromptChange?.(prompt);
    setPrompt("");
  };

  return (
    <div className={classnames(className, styles.container)}>
      <div className={styles.userInput}>
        <Input
          value={prompt}
          onPressEnter={handleClick}
          placeholder="Input your prompt to generate creativity content."
          onChange={(e) => setPrompt(e.target.value)}
          size="large"
          suffix={
            <SendOutlined className={styles.sendBtn} onClick={handleClick} />
          }
        />
      </div>
    </div>
  );
};

export default UserInput;
