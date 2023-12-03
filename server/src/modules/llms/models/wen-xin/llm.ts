import { Injectable } from '@nestjs/common';
import { WenXinAccessToken } from './access-token';
import axios from 'axios';
import { ChatLLM } from '../../base/chat-llm';
import { WenXinLLMPrompt, WenXinLLMResponse } from './typings';
import { CHAT_API_URL } from './constants';
import { PromptGenerator } from './prompt-generator';

@Injectable()
export class WenXinLLM implements ChatLLM<WenXinLLMPrompt, WenXinLLMResponse> {
  private accessToken: WenXinAccessToken;
  private promptGenerator: PromptGenerator;
  public modelName = 'ERNIE-Bot-turbo';

  constructor() {
    this.accessToken = new WenXinAccessToken();
    this.promptGenerator = new PromptGenerator();
  }

  /**
   * call wenxin llm api to generate text
   * @param prompts the prompt to generate text
   * @returns WenXinLLMResponse, include the generate text and the llm output
   */
  async generate(prompts: WenXinLLMPrompt[]): Promise<WenXinLLMResponse> {
    const accessToken = await this.accessToken.getToken();

    const url = `${CHAT_API_URL}?access_token=${accessToken}`;

    const response = await axios.post(url, {
      messages: this.promptGenerator.generatePrompts(prompts),
    });

    const { result } = response.data;

    const generations = [
      [
        {
          text: result,
          generationInfo: response.data,
        },
      ],
    ];

    return {
      generations,
      generateText: result,
      llmOutput: response.data,
    };
  }

  async chat(prompts: WenXinLLMPrompt[]) {
    return this.generate(prompts);
  }

  async call(prompt: WenXinLLMPrompt): Promise<WenXinLLMResponse> {
    return this.generate([prompt]);
  }
}
