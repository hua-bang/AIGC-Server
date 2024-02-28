"use client";
import Content from "./components/content";
import UserInput from "./components/user-input";
import styles from "./index.module.css";
import { useLLMSelector } from "./components/llm-selector/hook";
import useAIChat from "@/app/hooks/use-ai-chat";
import { PromptItem } from "@/app/typings/prompt";
import { ChatType } from "@/app/typings/llm";
import React, { useEffect } from "react";
import { Chat } from "@/app/typings/chat";
import { v4 as uuid } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, Share2 } from "lucide-react";
const LLMPlayground: React.FC<LLMPlaygroundProps> = ({
  chat,
  onChatChange,
  showAddIcon = false,
  renderPrefixIcon,
}) => {
  const { llm, llmInstance, renderSelector } = useLLMSelector();

  const { loading, prompts, setPrompts, sendMessage } = useAIChat(llm);

  const { toast } = useToast();

  const handlePromptChange = async (
    prompt: PromptItem["content"],
    chatType: ChatType
  ) => {
    const promptItem = {
      role: "user",
      content: prompt,
    };
    const currentChatId = chat?.id;
    const nextChat = await sendMessage(promptItem, chatType);
    if (nextChat && currentChatId === chat?.id) {
      onChatChange?.({
        ...nextChat,
        id: chat?.id,
      });
    }
  };

  const handleChangeTypeChange = () => {
    setPrompts([]);
    onChatChange?.({
      prompt: [],
      chatType: ChatType.Chat,
      id: uuid(),
      modelName: llm,
    });
  };

  useEffect(() => {
    if (chat?.id && chat.prompt) {
      setPrompts(chat.prompt);
    }
  }, [chat?.id]);

  return (
    <div className={styles.playgroundWrapper}>
      <div className={styles.playground}>
        <div className={styles.selectorWrapper}>
          {renderPrefixIcon?.()}
          {renderSelector()}
          <div className={styles.featureBtnArea}>
            {showAddIcon && (
              <PlusCircle size={16} onClick={handleChangeTypeChange} />
            )}
            <Share2
              size={16}
              onClick={() => {
                toast({
                  title: "Coming Soon!",
                });
              }}
            />
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
  chat?: Chat;
  showAddIcon?: boolean;
  onChatChange?: (chat: Chat) => void;

  renderPrefixIcon?: () => React.ReactNode;
}

export default LLMPlayground;
