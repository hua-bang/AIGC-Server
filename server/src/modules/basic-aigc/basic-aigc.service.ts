import { HttpException, Injectable } from '@nestjs/common';
import { LLMService } from '../llms/llm.service';
import { ChatModelName } from '../llms/typings';
import { ChatConfig } from './typings/chat';
import { PrompterService } from '../prompter/prompter.service';
import { LangChainService } from '../lang-chain/lang-chain.service';
import { Tool } from '../../typings/tool';

@Injectable()
export class BasicAigcService {
  constructor(
    private llmService: LLMService,
    private prompterService: PrompterService,
    private langChainService: LangChainService,
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

  async chatSSE(
    prompt: unknown,
    type: ChatModelName = ChatModelName.OpenAI,
    sseOptions: {
      onMessage: (data: Record<string, any>) => void;
      onComplete: () => void;
    },
    config?: ChatConfig,
  ) {
    const prompts = this.prompterService.generatePrompt(
      config?.promptConfig?.id,
      prompt,
    );
    const res = this.llmService
      .getChatModel(type)
      .chatSSE?.(prompts, sseOptions);

    if (!res) {
      throw new HttpException('the model is not support sse', 200);
    }

    return res;
  }

  async chatWithVision(
    prompt: unknown,
    type: ChatModelName = ChatModelName.OpenAI,
  ) {
    return this.llmService.getChatModel(type).chatWithVision?.(prompt);
  }

  async chatWithGenerateImage(prompt: unknown) {
    return this.llmService.getDrawModel().drawWithChat(prompt);
  }

  async generateImage(prompt: string) {
    return this.llmService.getDrawModel().draw(prompt);
  }

  async runAgent(prompt: string, type: ChatModelName = ChatModelName.OpenAI) {
    const llm = this.llmService.getChatModel(type);
    return this.langChainService.agent(prompt, llm);
  }

  async runFunctionCall(prompt: unknown, tools: Tool[]) {
    return this.llmService
      .getFunctionCallModel()
      .functionCall(prompt as any, tools);
  }
}
