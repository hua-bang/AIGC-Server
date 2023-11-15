import { Injectable } from '@nestjs/common';
import { LLMService } from '../llms/llm.service';
import { ChatModelName } from '../llms/typings';

@Injectable()
export class BasicAigcService {
  constructor(private llmService: LLMService) {}

  async chat(message: string, type: ChatModelName = ChatModelName.OpenAI) {
    return this.llmService.getChatModel(type).call(message);
  }
}
