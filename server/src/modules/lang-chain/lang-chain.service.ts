import { Injectable } from '@nestjs/common';

import { LLMService } from '../llms/llm.service';
import { ChatModelName } from '../llms/typings';

import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { Calculator } from 'langchain/tools/calculator';
import { BaseLLMWrapper } from './base-llm-wrapper';

@Injectable()
export class LangChainService {
  constructor(private llmService: LLMService) {}

  async agent(prompt: string) {
    const tools = [new Calculator()];

    const llm = this.llmService.getChatModel(ChatModelName.OpenAI);

    const model = new BaseLLMWrapper(llm, {});

    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: 'chat-conversational-react-description',
      verbose: true,
    });

    return await executor.call({ input: prompt });
  }
}
