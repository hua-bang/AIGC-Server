import { Module } from '@nestjs/common';
import { LangChainService } from './lang-chain.service';
import { LLMModule } from '../llms/llm.module';
import { LangChainToolkit } from './lang-chain-toolkit';

@Module({
  imports: [LLMModule],
  providers: [LangChainService, LangChainToolkit],
  exports: [LangChainService],
})
export class LangChainModule {}
