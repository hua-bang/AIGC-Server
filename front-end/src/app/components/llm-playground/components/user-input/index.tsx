"use client";
import classnames from "classnames";
import React from "react";
import styles from "./index.module.css";
import { useChatTypeSelector } from "./hooks/use-chat-type-selector";
import { ChatVisionContent, PromptItem } from "@/app/typings/prompt";
import InputWithImage from "./components/input-with-image";
import { ChatType } from "@/app/typings/llm";
import { useUpdateEffect } from "@/app/hooks/use-update-effect";
import { sleep } from "@/app/utils/sleep";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader, SendHorizontal } from "lucide-react";

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
  const [prompt, setPrompt] = React.useState<PromptItem["content"]>();

  const { chatType, renderChatTypeSelector } = useChatTypeSelector();

  const handlePromptChange = async () => {
    if (!prompt || loading) {
      return;
    }
    onPromptChange?.(prompt, chatType);
    await sleep(100);

    setPrompt(undefined);
  };

  const handleClick = () => {
    handlePromptChange();
  };

  const handlePressEnter: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.nativeEvent.isComposing || e.shiftKey) {
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
      <Textarea
        value={(prompt ?? "") as string}
        onPressEnter={handlePressEnter}
        placeholder="Input your prompt to generate creativity content."
        className="border-0"
        onChange={(e) => {
          setPrompt(e.target.value);
        }}
      />
    );
  };

  useUpdateEffect(() => {
    setPrompt(undefined);
    onChatTypeChange?.(chatType);
  }, [chatType]);

  return (
    <div className={classnames(className, styles.wrapper)}>
      <div className={styles.container}>
        <div className={styles.typeSelector}>{renderChatTypeSelector()}</div>
        <div className={styles.inputMain}>{renderInput()}</div>
        <div className={styles.submitBtn}>
          <Button disabled={!prompt} variant="outline" onClick={handleClick}>
            {loading ? <Loader size={16} /> : <SendHorizontal size={16} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserInput;
