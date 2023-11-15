import { BaseLLM } from '.';

/**
 * ChatLLM extends form BaseLLM
 * ChatLLMPrompt: default string;
 * ChatLLMResponse: default string;
 */
export abstract class ChatLLM<
  ChatLLMPrompt = any,
  ChatLLMResponse = any,
> extends BaseLLM<ChatLLMPrompt | string, ChatLLMResponse | string> {}
