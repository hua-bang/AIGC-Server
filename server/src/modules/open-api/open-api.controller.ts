import { AuthGuard } from './guards/auth-guard';
import { OpenApiService } from './open-api.service';
import { Controller, Get, UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
@Controller('open-api')
export class OpenApiController {
  constructor(private readonly openApiService: OpenApiService) {}

  @Get('/get-app')
  getSceneList() {
    return this.openApiService.getApp();
  }
}
