import { OpenApiService } from './open-api.service';
import { Controller, Get } from '@nestjs/common';

@Controller('open-api')
export class OpenApiController {
  constructor(private readonly openApiService: OpenApiService) {}

  @Get('/get-app')
  getSceneList() {
    return this.openApiService.getApp();
  }
}
