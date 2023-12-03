import { OpenAI } from 'openai';
import { ChatLLM } from '../../base/chat-llm';
import { OpenAILLMPrompt, OpenAILLMResponse } from './typings';
import {
  MODEL_NAME,
  DEFAULT_MAX_TOKEN,
  defaultVisionModel,
  getDefaultClientOptions,
  defaultImageModel,
} from './config';
import { CompletionGenerator } from './completion-generator';
import { Injectable } from '@nestjs/common';
import { DrawLLM } from '../../base/draw-llm';

@Injectable()
export class OpenAILLM
  implements ChatLLM<OpenAILLMPrompt, OpenAILLMResponse>, DrawLLM<string, any>
{
  public modelName = MODEL_NAME;
  instance: OpenAI | undefined;

  constructor(private completionGenerator: CompletionGenerator) {
    this.instance = new OpenAI(getDefaultClientOptions());
  }

  async call(prompt: OpenAILLMPrompt): Promise<OpenAILLMResponse> {
    return this.generate([prompt]);
  }

  async generate(prompts: OpenAILLMPrompt[]): Promise<OpenAILLMResponse> {
    const completionBody = this.completionGenerator.generateBody(prompts);
    const completion = await this.instance?.chat.completions.create(
      completionBody,
    );

    return this.processOpenAILLMResponse(completion);
  }

  async chat(
    prompt: OpenAILLMPrompt | Array<OpenAILLMPrompt>,
  ): Promise<OpenAILLMResponse> {
    const finalPrompt = Array.isArray(prompt) ? prompt : [prompt];

    return this.generate(finalPrompt);
  }

  /**
   * this function to chat with vision
   */
  chatWithVision = async (
    prompts: Array<OpenAI.Chat.Completions.ChatCompletionMessageParam>,
  ) => {
    const completion = await this.instance.chat.completions.create({
      model: defaultVisionModel,
      messages: prompts,
      max_tokens: DEFAULT_MAX_TOKEN,
    });

    return this.processOpenAILLMResponse(completion);
  };

  /**
   * process openai response to our response
   * @param completion the completion is the response from openai
   * @returns { OpenAILLMResponse }
   */
  processOpenAILLMResponse(
    completion: OpenAI.Chat.Completions.ChatCompletion,
  ): OpenAILLMResponse {
    const generateText = completion.choices[0].message.content;

    const generations = [
      [
        {
          text: generateText,
          generationInfo: completion.choices[0],
        },
      ],
    ];

    return {
      generations,
      generateText,
      llmOutput: completion,
    };
  }

  /**
   * Prompt to Image
   * @param prompt the prompt of generate image
   * @returns {Promise<{ url: string; }>}
   */
  async draw(prompt: string): Promise<any> {
    return await this.instance.images.generate({
      model: defaultImageModel,
      n: 1,
      prompt,
      size: '1024x1024',
    });
  }
}
