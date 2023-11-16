import { ClientOptions, OpenAI } from 'openai';
import { ChatLLM } from '../../base/chat-llm';
import { OpenAILLMPrompt, OpenAILLMResponse } from './typings';
import { ChatCompletionMessageParam } from 'openai/resources';

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

  async call(prompt: OpenAILLMPrompt): Promise<OpenAILLMResponse> {
    return this.generate([prompt]);
  }

  generateCompletion(prompts: OpenAILLMPrompt[]) {
    const completionBody: OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming =
      {
        messages: [],
        model: 'gpt-4-1106-preview',
      };

    if (prompts.length === 1) {
      const [promptValue] = prompts;

      const content =
        typeof promptValue === 'string' ? promptValue : promptValue.content;

      completionBody.messages = [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content },
      ];
    } else {
      const nextMessages = prompts.map((prompt) =>
        typeof prompt === 'string' ? { role: 'user', content: prompt } : prompt,
      );
      completionBody.messages = nextMessages as ChatCompletionMessageParam[];
    }

    return completionBody;
  }

  async generate(prompts: OpenAILLMPrompt[]): Promise<OpenAILLMResponse> {
    const completionBody = this.generateCompletion(prompts);
    const completion = await this.instance?.chat.completions.create(
      completionBody,
    );

    const generateText = completion.choices[0].message.content;

    return {
      generateText,
      llmOutput: completion,
    };
  }

  async chat(
    prompt: OpenAILLMPrompt | Array<OpenAILLMPrompt>,
  ): Promise<OpenAILLMResponse> {
    const finalPrompt = Array.isArray(prompt) ? prompt : [prompt];

    return this.generate(finalPrompt);
  }
}
