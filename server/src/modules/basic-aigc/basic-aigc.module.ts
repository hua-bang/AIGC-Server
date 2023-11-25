import { Module } from '@nestjs/common';
import { BasicAigcController } from './basic-aigc.controller';
import { BasicAigcService } from './basic-aigc.service';
import { LLMModule } from '../llms/llm.module';
import { PrompterModule } from '../prompter/prompter.module';
import { LangChainModule } from '../lang-chain/lang-chain.module';

@Module({
  controllers: [BasicAigcController],
  imports: [LLMModule, PrompterModule, LangChainModule],
  providers: [BasicAigcService],
})
export class BasicAigcModule {}
