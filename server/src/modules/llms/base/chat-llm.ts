import { BaseLLM } from '.';

/**
 * ChatLLM extends form BaseLLM
 * ChatLLMPrompt: default string;
 * ChatLLMResponse: default string;
 */
export abstract class ChatLLM<
  ChatLLMPrompt = string,
  ChatLLMResponse = string,
> extends BaseLLM<ChatLLMPrompt | string, ChatLLMResponse | string> {}
