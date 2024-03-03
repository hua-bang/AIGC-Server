import { useEffect, useRef, useState } from "react";
import { PromptItem } from "../../typings/prompt";
import { getAIChat, getAIChatSSE } from "../../apis/basic-aigc";
import { ChatType } from "@/app/typings/llm";
import { Chat } from "@/app/typings/chat";
import { ChatParams } from "@/app/apis-typings/basic-aigc";
import { useToast } from "@/components/ui/use-toast";
import useSetting from "@/app/hooks/use-setting";

function useAIChat(llm: string) {
  const [prompts, setPrompts] = useState<PromptItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { renderSetting } = useSetting();

  const { toast } = useToast();

  const getCurrentChatRef = useRef(() => {
    return {
      prompt: prompts,
      modelName: llm,
      chatType: ChatType.Chat,
    };
  });

  const toastError = (errMessage: string) => {
    toast({
      variant: "destructive",
      title: "Request Error",
      description: (
        <>
          {errMessage || "服务器异常"}, please check{" "}
          {renderSetting(<span className="font-bold underline">settings</span>)}
        </>
      ),
    });
  };

  const fetchSseAIChat = async (params: ChatParams) => {
    return new Promise<Chat>((resolve, reject) => {
      let nextMessage = "";
      getAIChatSSE(params, {
        onmessage(ev) {
          setLoading(false);

          const { content: message, error } = JSON.parse(ev.data) || {};

          if (error) {
            const err = error.error ?? error;
            toastError(err.message);
            return;
          }

          if (message) {
            nextMessage += message;

            const nextPromptItem = {
              role: "assistant",
              content: nextMessage,
            };

            setPrompts([...params.prompt, nextPromptItem]);
          }
        },
        onclose() {
          const currentChat = getCurrentChatRef.current();

          const nextChat: Chat = {
            ...currentChat,
            chatType: params.chatType,
          };

          resolve(nextChat);
        },
        onerror(err) {
          reject(err);
        },
      });
    });
  };

  const fetchSimpleAIChat = async (params: ChatParams) => {
    const { data } = await getAIChat(params);

    const { message } = data.data;

    const nextPrompts = params.prompt;

    const finalPrompts = [...nextPrompts, message];

    setPrompts(finalPrompts);

    const nextChat: Chat = {
      prompt: nextPrompts,
      modelName: llm,
      chatType: params.chatType,
    };

    return nextChat;
  };

  const sendMessage = async (prompt: PromptItem, chatType: ChatType) => {
    setLoading(true);
    try {
      let nextPrompts = [...prompts, prompt];
      setPrompts(nextPrompts);

      const fetchAIChatAPI =
        chatType === ChatType.Chat ? fetchSseAIChat : fetchSimpleAIChat;

      const nextChat = await fetchAIChatAPI({
        prompt: nextPrompts,
        modelName: llm,
        chatType,
      });
      return nextChat;
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setLoading(false);
    }
    return null;
  };

  useEffect(() => {
    setPrompts([]);
  }, [llm]);

  useEffect(() => {
    getCurrentChatRef.current = () => ({
      prompt: prompts,
      modelName: llm,
      chatType: ChatType.Chat,
    });
  }, [prompts, llm]);

  return { loading, prompts, setPrompts, sendMessage };
}

export default useAIChat;
