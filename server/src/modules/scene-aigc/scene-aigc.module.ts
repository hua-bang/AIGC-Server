import { Module } from '@nestjs/common';
import { SceneAigcService } from './scene-aigc.service';
import { SceneAigcController } from './scene-aigc.controller';

@Module({
  controllers: [SceneAigcController],
  providers: [SceneAigcService]
})
export class SceneAigcModule {}
