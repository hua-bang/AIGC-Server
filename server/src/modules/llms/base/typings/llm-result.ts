export type LLMResult = {
  /**
   * List of the things generated. Each input could have multiple {@link Generation | generations}, hence this is a list of lists.
   */
  generateText?: string;
  /**
   * Dictionary of arbitrary LLM-provider specific output.
   */
  llmOutput?: Record<string, any>;
};
