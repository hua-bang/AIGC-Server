import { ClientOptions, OpenAI } from 'openai';
import { BaseLLM } from './base';
import { LLMResult } from './base/typings/llm-result';

export class OpenAILLM extends BaseLLM {
  instance: OpenAI | undefined;

  constructor(clientOptions?: ClientOptions) {
    super();
    const instance = new OpenAI(clientOptions);
    this.instance = instance;
  }

  async _generate(prompts: string[]): Promise<LLMResult> {
    const completion = await this.instance?.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompts[0] },
      ],
      model: 'gpt-4-1106-preview',
    });

    const generateText = completion.choices[0].message.content;

    return {
      generateText,
      llmOutput: completion,
    };
  }
}
