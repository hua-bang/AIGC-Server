export abstract class BaseLLM<LLMPrompt, LLMResponse> {
  protected modelName: string;

  abstract call(prompt: LLMPrompt): Promise<LLMResponse>;
  abstract generate(prompts: LLMPrompt[]): Promise<LLMResponse>;
}
