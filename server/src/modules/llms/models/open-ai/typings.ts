import type { OpenAI } from 'openai';

export type OpenAILLMPrompt = string;

export interface OpenAILLMResponse {
  generateText: string;
  llmOutput: OpenAI.Chat.Completions.ChatCompletion;
}
