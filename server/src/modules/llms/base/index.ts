/**
 * Export an abstract class named BaseLLM. This class is generic, using LLMPrompt and LLMResponse as its generic parameters
 * LLMPrompt represents the type for input prompts
 * LLMResponse represents the type for model responses.
 */
export abstract class BaseLLM<LLMPrompt, LLMResponse> {
  // A protected property, modelName, of type string.
  protected modelName: string;

  /**
   * An abstract method, call. It takes a parameter of type LLMPrompt and returns a Promise that resolves to a result of type LLMResponse.
   * This method is designed to be abstract, meaning subclasses of BaseLLM are required to provide a concrete implementation of this method.
   * @param prompt LLMPrompt
   */
  abstract call(prompt: LLMPrompt): Promise<LLMResponse>;

  /**
   * Another abstract method, generate. Similar to the call method, but it takes an array of LLMPrompt as input and returns a Promise,
   * which resolves to a result of type LLMResponse.
   * @param prompts Array of LLMPrompt
   */
  abstract generate(prompts: LLMPrompt[]): Promise<LLMResponse>;
}
