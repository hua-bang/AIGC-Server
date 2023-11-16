import { OpenAI } from 'openai';
import { ChatLLM } from '../../base/chat-llm';
import { OpenAILLMPrompt, OpenAILLMResponse } from './typings';
import { MODEL_NAME, defaultClientOptions } from './config';
import { CompletionGenerator } from './completion-generator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenAILLM extends ChatLLM<OpenAILLMPrompt, OpenAILLMResponse> {
  public modelName = MODEL_NAME;
  instance: OpenAI | undefined;

  constructor(private completionGenerator: CompletionGenerator) {
    super();
    this.instance = new OpenAI(defaultClientOptions);
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
