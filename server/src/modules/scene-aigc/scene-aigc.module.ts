import { Module } from '@nestjs/common';
import { SceneAigcService } from './scene-aigc.service';
import { SceneAigcController } from './scene-aigc.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SceneModule } from 'src/entity/scene-module';

@Module({
  imports: [TypeOrmModule.forFeature([SceneModule])],
  controllers: [SceneAigcController],
  providers: [SceneAigcService],
})
export class SceneAigcModule {}
