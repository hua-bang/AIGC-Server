import { BasePromptValue } from './prompt/base-prompt-value';
import { StringPromptValue } from './prompt/string-prompt-value';
import { BaseLanguageModelInput } from './typings/index';
import { LLMResult } from './typings/llm-result';

export abstract class BaseLLM<
  CallOptions extends Record<string, any> = Record<string, any>,
> {
  /**
   * This method takes an input and options, and returns a string. It
   * converts the input to a prompt value and generates a result based on
   * the prompt.
   * @param input Input for the LLM.
   * @param options Options for the LLM call.
   * @returns A string result based on the prompt.
   */
  async invoke(
    input: BaseLanguageModelInput,
    options?: CallOptions,
  ): Promise<string | undefined> {
    const promptValue = this._convertInputToPromptValue(input);
    const result = await this.generatePrompt([promptValue], options);
    try {
      return result.generateText;
    } catch {
      return undefined;
    }
  }

  private _convertInputToPromptValue(
    input: BaseLanguageModelInput,
  ): BasePromptValue {
    if (typeof input === 'string') {
      return new StringPromptValue(input);
    } else {
      return input;
    }
  }

  async generatePrompt(
    promptValues: BasePromptValue[],
    options?: string[] | CallOptions,
  ) {
    const prompts: string[] = promptValues.map((promptValue) =>
      promptValue.toString(),
    );
    return this.generate(prompts, options);
  }

  async generate(
    prompts: string[],
    options?: string[] | CallOptions,
  ): Promise<LLMResult> {
    if (!Array.isArray(prompts)) {
      throw new Error("Argument 'prompts' is expected to be a string[]");
    }

    return this._generate(prompts, options);
  }

  abstract _generate(
    prompts: string[],
    options?: string[] | CallOptions,
  ): Promise<LLMResult>;

  async _call(prompt: string, options?: string[] | CallOptions) {
    const result = await this._generate([prompt], options);
    return result.generateText;
  }
}
