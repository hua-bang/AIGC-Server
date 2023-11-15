import { Module } from '@nestjs/common';
import { BasicAigcController } from './basic-aigc.controller';
import { BasicAigcService } from './basic-aigc.service';
import { LLMModule } from '../llms/llm.module';

@Module({
  controllers: [BasicAigcController],
  imports: [LLMModule],
  providers: [BasicAigcService],
})
export class BasicAigcModule {}
