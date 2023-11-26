import { Injectable } from '@nestjs/common';

import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { BaseLLMWrapper } from './base-llm-wrapper';
import { ChatLLM } from '../llms/base/chat-llm';
import { LangChainToolkit } from './lang-chain-toolkit';

@Injectable()
export class LangChainService {
  constructor(private toolkit: LangChainToolkit) {}

  async agent(prompt: string, llm: ChatLLM) {
    const tools = this.toolkit.getTools();

    const model = new BaseLLMWrapper(llm);

    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: 'chat-conversational-react-description',
      verbose: true,
    });

    return await executor.call({ input: prompt });
  }
}
