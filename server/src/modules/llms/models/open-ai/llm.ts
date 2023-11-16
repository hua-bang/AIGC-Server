import { ClientOptions, OpenAI } from 'openai';
import { ChatLLM } from '../../base/chat-llm';
import { OpenAILLMPrompt, OpenAILLMResponse } from './typings';
import { MODEL_NAME, defaultClientOptions, defaultModel } from './config';
import { CompletionGenerator } from './completion-generator';

export class OpenAILLM extends ChatLLM<OpenAILLMPrompt, OpenAILLMResponse> {
  public modelName = MODEL_NAME;
  instance: OpenAI | undefined;
  completionGenerator: CompletionGenerator;

  constructor(clientOptions?: ClientOptions) {
    super();
    this.instance = new OpenAI(clientOptions ?? defaultClientOptions);
    this.completionGenerator = new CompletionGenerator();
  }

  async call(prompt: OpenAILLMPrompt): Promise<OpenAILLMResponse> {
    return this.generate([prompt]);
  }

  async generate(prompts: OpenAILLMPrompt[]): Promise<OpenAILLMResponse> {
    const completionBody = this.completionGenerator.generateBody(prompts);
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
