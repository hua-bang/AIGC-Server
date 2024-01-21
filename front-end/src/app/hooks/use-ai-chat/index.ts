import { useEffect, useState } from "react";
import { message } from "antd";
import { PromptItem } from "../../typings/prompt";
import { getAIChat } from "../../apis/basic-aigc";
import { ChatType } from "@/app/typings/llm";
import { Chat } from "@/app/typings/chat";

function useAIChat(llm: string) {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPrompts([]);
  }, [llm]);

  const sendMessage = async (prompt: PromptItem, chatType: ChatType) => {
    setLoading(true);
    try {
      let nextPrompts = [...prompts, prompt];
      setPrompts(nextPrompts);

      const { data } = await getAIChat({
        prompt: nextPrompts,
        modelName: llm,
        chatType,
      });

      const { message } = data.data;

      nextPrompts = [...nextPrompts, message];

      setPrompts(nextPrompts);

      const nextChat: Chat = {
        prompt: nextPrompts,
        modelName: llm,
        chatType,
      };

      return nextChat;
    } catch (error: any) {
      message.warning(error.msg);
    } finally {
      setLoading(false);
    }
    return null;
  };

  return { loading, prompts, setPrompts, sendMessage };
}

export default useAIChat;
