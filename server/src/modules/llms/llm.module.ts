import { Module } from '@nestjs/common';
import { OpenAILLM } from './models/open-ai/llm';
import { LLMService } from './llm.service';
import { CompletionGenerator } from './models/open-ai/completion-generator';
import { WenXinLLM } from './models/wen-xin/llm';

@Module({
  providers: [OpenAILLM, LLMService, CompletionGenerator, WenXinLLM],
  exports: [LLMService],
})
export class LLMModule {}
