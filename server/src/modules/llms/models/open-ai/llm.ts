import { ClientOptions, OpenAI } from 'openai';
import { ChatLLM } from '../../base/chat-llm';
import { OpenAILLMPrompt, OpenAILLMResponse } from './typings';

export class OpenAILLM extends ChatLLM<OpenAILLMPrompt, OpenAILLMResponse> {
  public modelName = 'open-ai';
  instance: OpenAI | undefined;

  constructor(clientOptions?: ClientOptions) {
    super();

    const defaultClientOptions = {
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_PATH,
    };
    const instance = new OpenAI(clientOptions ?? defaultClientOptions);
    this.instance = instance;
  }

  async call(prompt: string): Promise<OpenAILLMResponse> {
    return this.generate([prompt]);
  }

  async generate(prompts: string[]): Promise<OpenAILLMResponse> {
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
