import { BaseLLM } from '.';

interface GenerationItem {
  text: string;
}

type Content = string | Record<string, any>;

interface MessageItem {
  role: string;
  content: Content;
}

export interface ChatLLMBaseResponse {
  generateText: string;
  message?: MessageItem;
  llmOutput?: Record<string, any>;
  generations?: Array<Array<GenerationItem>>;
}

/**
 * ChatLLM extends form BaseLLM
 * ChatLLMPrompt: default string;
 * ChatLLMResponse: default string;
 */
export interface ChatLLM<
  ChatLLMPrompt = any,
  ChatLLMResponse extends ChatLLMBaseResponse = ChatLLMBaseResponse,
> extends BaseLLM<ChatLLMPrompt | string, ChatLLMResponse | string> {
  chatWithVision?:
    | ((
        prompts: ChatLLMPrompt | Array<ChatLLMPrompt>,
      ) => Promise<ChatLLMResponse>)
    | undefined;

  chat(prompts: ChatLLMPrompt | Array<ChatLLMPrompt>): Promise<ChatLLMResponse>;

  chatSSE?: (
    prompts: ChatLLMPrompt | Array<ChatLLMPrompt>,
    options: {
      onMessage: (data: Record<string, any>) => void;
      onComplete: () => void;
    },
  ) => Promise<any>;
}
