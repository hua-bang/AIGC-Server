import type { OpenAI } from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import { ChatLLMBaseResponse } from '../../base/chat-llm';

// support plain string and ChatCompletionMessageParam Form openai
export type OpenAILLMPrompt = string | ChatCompletionMessageParam;

export interface OpenAILLMResponse extends ChatLLMBaseResponse {
  /** the string response of ai */
  generateText: string;
  /** the response of llm  */
  llmOutput: OpenAI.Chat.Completions.ChatCompletion;
}
