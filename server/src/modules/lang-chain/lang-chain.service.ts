import { Injectable } from '@nestjs/common';

import { initializeAgentExecutorWithOptions } from 'langchain/agents';
import { Calculator } from 'langchain/tools/calculator';
import { BaseLLMWrapper } from './base-llm-wrapper';
import { ChatLLM } from '../llms/base/chat-llm';

@Injectable()
export class LangChainService {
  async agent(prompt: string, llm: ChatLLM) {
    const tools = [new Calculator()];

    const model = new BaseLLMWrapper(llm);

    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: 'chat-conversational-react-description',
      verbose: true,
    });

    return await executor.call({ input: prompt });
  }
}
