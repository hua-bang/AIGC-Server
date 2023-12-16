"use client";
import { Button, Input } from "antd";
import classnames from "classnames";
import React, { useEffect } from "react";
import styles from "./index.module.css";
import { SendOutlined } from "@ant-design/icons";
import { useChatTypeSelector } from "./hooks/use-chat-type-selector";
import { ChatVisionContent, PromptItem } from "@/app/typings/prompt";
import InputWithImage from "./components/input-with-image";
import { ChatType } from "@/app/typings/llm";
import { useUpdateEffect } from "@/app/hooks/use-update-effect";

export interface UserInputProps {
  className?: string;

  onPromptChange?: (prompt: PromptItem["content"], type: ChatType) => void;

  loading?: boolean;

  onChatTypeChange?: (type: ChatType) => void;
}

const UserInput: React.FC<UserInputProps> = ({
  loading,
  className,
  onPromptChange,
  onChatTypeChange,
}) => {
  const [prompt, setPrompt] = React.useState<PromptItem["content"]>("");

  const { chatType, renderChatTypeSelector } = useChatTypeSelector();

  const handlePromptChange = () => {
    if (!prompt || loading) {
      return;
    }
    onPromptChange?.(prompt, chatType);
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

  const renderInput = () => {
    if (chatType === ChatType.Vision) {
      return (
        <InputWithImage
          value={prompt as ChatVisionContent}
          onPressEnter={handlePressEnter}
          onChange={(value) => {
            setPrompt(value);
          }}
        />
      );
    }

    return (
      <Input.TextArea
        bordered={false}
        value={prompt as string}
        onPressEnter={handlePressEnter}
        placeholder="Input your prompt to generate creativity content."
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
        size="large"
      />
    );
  };

  useUpdateEffect(() => {
    setPrompt("");
    onChatTypeChange?.(chatType);
  }, [chatType]);

  return (
    <div className={classnames(className, styles.wrapper)}>
      <div className={styles.container}>
        <div className={styles.typeSelector}>{renderChatTypeSelector()}</div>
        <div className={styles.inputMain}>{renderInput()}</div>
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
