import { Injectable } from '@nestjs/common';
import { MockScene } from './mock/scene';

@Injectable()
export class SceneAigcService {
  getSceneList() {
    return MockScene;
  }
}
