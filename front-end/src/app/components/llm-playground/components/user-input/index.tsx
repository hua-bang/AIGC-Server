"use client";
import { Button, Input, Tabs } from "antd";
import classnames from "classnames";
import React from "react";
import styles from "./index.module.css";
import { ChatTypeOptions } from "./constant";
import { SendOutlined } from "@ant-design/icons";

export interface UserInputProps {
  className?: string;

  onPromptChange?: (prompt: string) => void;

  loading?: boolean;
}

const UserInput: React.FC<UserInputProps> = ({
  loading,
  className,
  onPromptChange,
}) => {
  const [prompt, setPrompt] = React.useState<string>("");

  const handlePromptChange = () => {
    if (!prompt || loading) {
      return;
    }
    onPromptChange?.(prompt);
    setPrompt("");
  };

  const handleClick = () => {
    handlePromptChange();
  };

  const handlePressEnter: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    handlePromptChange();
  };

  const renderTab = () => {
    const tabItems = ChatTypeOptions.map((chatTypeItem) => {
      return {
        key: chatTypeItem.type,
        label: chatTypeItem.label,
        icon: chatTypeItem.icon,
        disabled: chatTypeItem.disabled,
      };
    });

    return <Tabs defaultActiveKey="2" items={tabItems} />;
  };

  return (
    <div className={classnames(className, styles.wrapper)}>
      <div className={styles.container}>
        <div className={styles.typeSelector}>{renderTab()}</div>
        <div className={styles.inputMain}>
          <Input.TextArea
            bordered={false}
            value={prompt}
            onPressEnter={handlePressEnter}
            placeholder="Input your prompt to generate creativity content."
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            size="large"
          />
        </div>
        <div className={styles.submitBtn}>
          <Button
            disabled={!prompt}
            loading={loading}
            onClick={handleClick}
            icon={<SendOutlined />}
            size="large"
          />
        </div>
      </div>
    </div>
  );
};

export default UserInput;
