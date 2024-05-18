import { Injectable } from '@nestjs/common';
import { ChatLLM } from './base/chat-llm';
import { OpenAILLM } from './models/open-ai/llm';
import { ChatModelName } from './typings';
import { WenXinLLM } from './models/wen-xin/llm';
import { DrawLLM } from './base/draw-llm';
import { MoonShotLLM } from './models/moon-shot/llm';

@Injectable()
export class LLMService {
  constructor(
    private openAILLM: OpenAILLM,
    private wenXinLLM: WenXinLLM,
    private moonShotLLM: MoonShotLLM,
  ) {}

  getChatModel(modelName: ChatModelName): ChatLLM {
    if (modelName === ChatModelName.OpenAI) {
      return this.openAILLM;
    }

    if (modelName === ChatModelName.WenXin) {
      return this.wenXinLLM;
    }

    if (modelName === ChatModelName.MoonShot) {
      return this.moonShotLLM;
    }

    return null;
  }

  getDrawModel(): DrawLLM<any, any> {
    return this.openAILLM;
  }

  getFunctionCallModel() {
    return this.openAILLM;
  }
}
