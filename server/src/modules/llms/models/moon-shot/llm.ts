import OpenAI from 'openai';
import { ChatLLM } from '../../base/chat-llm';
import { MoonShotLLMPrompt, MoonShotLLMResponse } from './typings';
import { API_KEY, BASE_URL, MODEL_NAME } from './config';
import { HttpException, Injectable } from '@nestjs/common';
import { CompletionGenerator } from './completion-generator';
import { processOpenAILLMResponse } from '../open-ai/helper/process-data';

@Injectable()
export class MoonShotLLM
  implements ChatLLM<MoonShotLLMPrompt, MoonShotLLMResponse>
{
  public modelName = MODEL_NAME;
  instance: OpenAI | undefined;
  private completionGenerator: CompletionGenerator = new CompletionGenerator();

  constructor() {
    try {
      this.instance = new OpenAI({
        apiKey: API_KEY,
        baseURL: BASE_URL,
      });
    } catch {}
  }

  async chat(
    prompt: MoonShotLLMPrompt | Array<MoonShotLLMPrompt>,
  ): Promise<MoonShotLLMResponse> {
    const finalPrompt = Array.isArray(prompt) ? prompt : [prompt];

    return this.generate(finalPrompt);
  }

  async call(prompt: MoonShotLLMPrompt): Promise<MoonShotLLMResponse> {
    return this.generate([prompt]);
  }

  async generate(prompts: MoonShotLLMPrompt[]): Promise<MoonShotLLMResponse> {
    const completionBody = this.completionGenerator.generateBody(prompts);
    const completion = await this.instance?.chat.completions.create(
      completionBody,
    );

    return processOpenAILLMResponse(completion);
  }

  /**
   * 使用 OpenAI 聊天模型基于 SSE 生成回应。
   */
  async chatSSE(prompt: MoonShotLLMPrompt | Array<MoonShotLLMPrompt>, options) {
    const finalPrompt = Array.isArray(prompt) ? prompt : [prompt];
    const completionBody = this.completionGenerator.generateBody(finalPrompt);

    if (!this.instance) {
      throw new HttpException('openai_api_key is error', 200);
    }

    const stream = await this.instance.chat.completions.create({
      ...completionBody,
      stream: true,
    });

    for await (const chunk of stream) {
      const isFinish = chunk.choices[0]?.finish_reason === 'stop';

      if (isFinish) {
        options.onComplete?.();
        break;
      }

      const content = chunk.choices[0]?.delta?.content || '';
      options.onMessage({ content });
    }
  }
}
