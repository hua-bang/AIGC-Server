import { Injectable } from '@nestjs/common';
import { ChatLLM } from './base/chat-llm';
import { OpenAILLM } from './models/open-ai/llm';
import { ChatModelName } from './typings';

@Injectable()
export class LLMService {
  constructor(private openAILLM: OpenAILLM) {}

  getChatModel(modelName: ChatModelName): ChatLLM {
    if (modelName === ChatModelName.OpenAI) {
      return this.openAILLM;
    }
    return null;
  }
}
