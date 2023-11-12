import { Module } from '@nestjs/common';
import { BasicAigcController } from './basic-aigc.controller';
import { BasicAigcService } from './basic-aigc.service';

@Module({
  controllers: [BasicAigcController],
  providers: [BasicAigcService],
})
export class BasicAigcModule {}
