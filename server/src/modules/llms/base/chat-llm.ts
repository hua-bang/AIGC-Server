import { BaseLLM } from '.';

interface GenerationItem {
  text: string;
}
export interface ChatLLMBaseResponse {
  generateText: string;
  llmOutput?: Record<string, any>;
  generations?: Array<Array<GenerationItem>>;
}

/**
 * ChatLLM extends form BaseLLM
 * ChatLLMPrompt: default string;
 * ChatLLMResponse: default string;
 */
export abstract class ChatLLM<
  ChatLLMPrompt = any,
  ChatLLMResponse extends ChatLLMBaseResponse = ChatLLMBaseResponse,
> extends BaseLLM<ChatLLMPrompt | string, ChatLLMResponse | string> {
  chatWithVision:
    | ((
        prompts: ChatLLMPrompt | Array<ChatLLMPrompt>,
      ) => Promise<ChatLLMResponse>)
    | undefined = undefined;

  abstract chat(
    prompts: ChatLLMPrompt | Array<ChatLLMPrompt>,
  ): Promise<ChatLLMResponse>;

  call(prompt: ChatLLMPrompt) {
    return this.generate([prompt]);
  }
}
