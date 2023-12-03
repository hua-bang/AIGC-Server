import { Injectable } from '@nestjs/common';
import { ChatLLM } from './base/chat-llm';
import { OpenAILLM } from './models/open-ai/llm';
import { ChatModelName } from './typings';
import { WenXinLLM } from './models/wen-xin/llm';
import { DrawLLM } from './base/draw-llm';

@Injectable()
export class LLMService {
  constructor(private openAILLM: OpenAILLM, private wenXinLLM: WenXinLLM) {}

  getChatModel(modelName: ChatModelName): ChatLLM {
    if (modelName === ChatModelName.OpenAI) {
      return this.openAILLM;
    }

    if (modelName === ChatModelName.WenXin) {
      return this.wenXinLLM;
    }

    return null;
  }

  getDrawModel(): DrawLLM<any, any> {
    return this.openAILLM;
  }
}
