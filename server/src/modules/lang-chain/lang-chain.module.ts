import { Module } from '@nestjs/common';
import { LangChainService } from './lang-chain.service';
import { LLMModule } from '../llms/llm.module';

@Module({
  imports: [LLMModule],
  providers: [LangChainService],
  exports: [LangChainService],
})
export class LangChainModule {}
