import type { OpenAI } from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';

// support plain string and ChatCompletionMessageParam Form openai
export type OpenAILLMPrompt = string | ChatCompletionMessageParam;

export interface OpenAILLMResponse {
  /** the string response of ai */
  generateText: string;
  /** the response of llm  */
  llmOutput: OpenAI.Chat.Completions.ChatCompletion;
}
