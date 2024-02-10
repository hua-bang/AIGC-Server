import { Controller, Get } from '@nestjs/common';
import { PrompterService } from './prompter.service';

@Controller('prompter')
export class PrompterController {
  constructor(private readonly prompterService: PrompterService) {}

  @Get('/scene-list')
  async list() {
    return this.prompterService.getSceneList();
  }
}
