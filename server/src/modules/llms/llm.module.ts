import { Module } from '@nestjs/common';
import { OpenAILLM } from './models/open-ai/llm';
import { LLMService } from './llm.service';

@Module({
  providers: [OpenAILLM, LLMService],
  exports: [LLMService],
})
export class LLMModule {}
