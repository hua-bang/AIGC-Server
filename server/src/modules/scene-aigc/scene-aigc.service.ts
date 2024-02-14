import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SceneModule } from 'src/entity/scene-module';

@Injectable()
export class SceneAigcService {
  constructor(
    @InjectRepository(SceneModule)
    private sceneModuleRepository: Repository<SceneModule>,
  ) {}

  getSceneList() {
    return this.sceneModuleRepository.find();
  }
}
