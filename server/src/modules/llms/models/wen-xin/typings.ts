// support plain string and ChatCompletionMessageParam Form openai
export type WenXinLLMPrompt = string | Record<string, any>;

export interface WenXinLLMResponse {
  /** the string response of ai */
  generateText: string;
  /** the response of llm  */
  llmOutput: Record<string, any>;
}
