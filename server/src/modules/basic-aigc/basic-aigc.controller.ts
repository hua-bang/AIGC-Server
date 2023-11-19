import { Body, Controller, Get, Post } from '@nestjs/common';
import { BasicAigcService } from './basic-aigc.service';
import { ChatModelName } from '../llms/typings';

@Controller('basic-aigc')
export class BasicAigcController {
  constructor(private readonly basicAigcService: BasicAigcService) {}

  @Get('/hello')
  async getHello() {
    return {
      message: await this.basicAigcService.chat('你好呀'),
    };
  }

  @Post('/chat')
  async chat(
    @Body('prompt') prompt: unknown,
    @Body('modelName') modelName: ChatModelName,
  ) {
    return this.basicAigcService.chat(prompt, modelName);
  }

  @Get('/chatWithVision')
  async chatWithVision(
    @Body('prompt') prompt: unknown,
    @Body('modelName') modelName: ChatModelName,
  ) {
    return this.basicAigcService.chatWithVision(prompt, modelName);
  }
}
