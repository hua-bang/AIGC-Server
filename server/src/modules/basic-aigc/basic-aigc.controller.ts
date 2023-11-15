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
    @Body('prompt') prompt: string,
    @Body('modelType') modelName: ChatModelName,
  ) {
    return this.basicAigcService.chat(prompt, modelName);
  }
}
