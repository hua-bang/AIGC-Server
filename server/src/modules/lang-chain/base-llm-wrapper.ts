import {
  BaseLLMParams,
  BaseLLM as LangChainBaseLLM,
} from 'langchain/llms/base';
import { BaseLLM } from '../llms/base';
import { LLMResult } from 'langchain/dist/schema';

export class BaseLLMWrapper extends LangChainBaseLLM {
  llm: BaseLLM<any, any>;

  constructor(llm: BaseLLM<any, any>, params?: BaseLLMParams) {
    super(params || {});
    this.llm = llm;
  }

  // Implement the required abstract method _generate
  async _generate(prompts: string[]): Promise<LLMResult> {
    return await this.llm.generate(prompts);
  }

  _llmType(): string {
    return 'base-llm-wrapper';
  }
}
