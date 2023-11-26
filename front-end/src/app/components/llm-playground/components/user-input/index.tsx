"use client";
import { Input } from "antd";
import classnames from "classnames";
import React from "react";
import styles from "./index.module.css";
import { SendOutlined } from "@ant-design/icons";

interface UserInputProps {
  className?: string;
}

const UserInput: React.FC<UserInputProps> = ({ className }) => {
  const [prompt, setPrompt] = React.useState<string>();

  const handleClick = () => {
    console.log("prompt", prompt);
  };

  return (
    <div className={classnames(className, styles.container)}>
      <div className={styles.userInput}>
        <Input
          value={prompt}
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
