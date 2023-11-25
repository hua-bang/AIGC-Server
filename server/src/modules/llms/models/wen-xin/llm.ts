import { Injectable } from '@nestjs/common';
import { WenXinAccessToken } from './access-token';
import axios from 'axios';
import { ChatLLM } from '../../base/chat-llm';
import { WenXinLLMPrompt, WenXinLLMResponse } from './typings';
import { CHAT_API_URL } from './constants';

@Injectable()
export class WenXinLLM extends ChatLLM<WenXinLLMPrompt, WenXinLLMResponse> {
  private accessToken: WenXinAccessToken;
  constructor() {
    super();
    this.accessToken = new WenXinAccessToken();
    this.modelName = 'ERNIE-Bot-turbo';
  }

  async generate(prompts: WenXinLLMPrompt[]): Promise<WenXinLLMResponse> {
    const accessToken = await this.accessToken.getToken();

    const url = `${CHAT_API_URL}?access_token=${accessToken}`;
    const response = await axios.post(url, {
      messages: prompts,
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
}
