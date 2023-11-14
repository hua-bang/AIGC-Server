import { BaseLLM } from '.';

export abstract class ChatLLM<
  ChatLLMPrompt = string,
  ChatLLMResponse = string,
> extends BaseLLM<ChatLLMPrompt | string, ChatLLMResponse | string> {}
