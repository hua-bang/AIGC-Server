import { Controller, Get } from '@nestjs/common';
import { SceneAigcService } from './scene-aigc.service';

@Controller('scene-aigc')
export class SceneAigcController {
  constructor(private readonly sceneAigcService: SceneAigcService) {}

  @Get('/scene-list')
  getSceneList() {
    return this.sceneAigcService.getSceneList();
  }
}
