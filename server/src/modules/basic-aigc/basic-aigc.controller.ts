import { Body, Controller, Get, Post } from '@nestjs/common';
import { BasicAigcService } from './basic-aigc.service';
import { ChatModelName } from '../llms/typings';
import { ChatConfig } from './typings/chat';
import { WeatherTool } from '../../utils/get-current-weather';

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
    @Body('config') chatConfig?: ChatConfig,
  ) {
    return this.basicAigcService.chat(prompt, modelName, chatConfig);
  }

  @Post('/chatWithVision')
  async chatWithVision(
    @Body('prompt') prompt: unknown,
    @Body('modelName') modelName: ChatModelName,
  ) {
    return this.basicAigcService.chatWithVision(prompt, modelName);
  }

  @Post('/generate-image')
  async generateImg(@Body('prompt') prompt: unknown) {
    return this.basicAigcService.chatWithGenerateImage(prompt);
  }

  @Post('/runAgent')
  async runAgent(
    @Body('prompt') prompt: string,
    @Body('type') type: ChatModelName,
  ) {
    return this.basicAigcService.runAgent(prompt, type);
  }

  @Post('/runFunctionCall')
  async runFunctionCall(@Body('prompt') prompt: unknown) {
    return this.basicAigcService.runFunctionCall(prompt, [WeatherTool]);
  }
}
