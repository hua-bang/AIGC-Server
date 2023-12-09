import { useState } from "react";
import { message } from "antd";
import { PromptItem } from "../typings/prompt";
import { getAIChat } from "../apis/basic-aigc";

function useAIChat(llm: string) {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (prompt: PromptItem) => {
    setLoading(true);
    try {
      const nextPrompts = [...prompts, prompt];
      setPrompts(nextPrompts);

      const { data } = await getAIChat({
        prompt: nextPrompts,
        modelName: llm,
      });

      const { choices } = data.data.llmOutput;

      setPrompts((prev) => [...prev, choices[0].message]);
    } catch (error: any) {
      message.warning(error.msg);
    }
    setLoading(false);
  };

  return { loading, prompts, sendMessage };
}

export default useAIChat;
