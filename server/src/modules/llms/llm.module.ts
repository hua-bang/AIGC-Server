import { Module } from '@nestjs/common';
import { OpenAILLM } from './models/open-ai/llm';
import { LLMService } from './llm.service';
import { CompletionGenerator } from './models/open-ai/completion-generator';

@Module({
  providers: [OpenAILLM, LLMService, CompletionGenerator],
  exports: [LLMService],
})
export class LLMModule {}
