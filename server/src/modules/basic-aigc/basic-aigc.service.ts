import { Injectable } from '@nestjs/common';
import { LLMService } from '../llms/llm.service';
import { ChatModelName } from '../llms/typings';
import { ChatConfig } from './typings/chat';
import { PrompterService } from '../prompter/prompter.service';

@Injectable()
export class BasicAigcService {
  constructor(
    private llmService: LLMService,
    private prompterService: PrompterService,
  ) {}

  async chat(
    prompt: unknown,
    type: ChatModelName = ChatModelName.OpenAI,
    config?: ChatConfig,
  ) {
    const prompts = this.prompterService.generatePrompt(
      config?.promptConfig?.id,
      prompt,
    );
    return this.llmService.getChatModel(type).chat(prompts);
  }

  async chatWithVision(
    prompt: unknown,
    type: ChatModelName = ChatModelName.OpenAI,
  ) {
    return this.llmService.getChatModel(type).chatWithVision?.(prompt);
  }
}
