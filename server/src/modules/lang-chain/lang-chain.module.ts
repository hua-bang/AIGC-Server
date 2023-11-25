import { Module } from '@nestjs/common';
import { LangChainService } from './lang-chain.service';
import { LangChainController } from './lang-chain.controller';
import { LLMModule } from '../llms/llm.module';

@Module({
  imports: [LLMModule],
  controllers: [LangChainController],
  providers: [LangChainService],
})
export class LangChainModule {}
