import { Body, Controller, Get, Post, Res, Sse } from '@nestjs/common';
import { BasicAigcService } from './basic-aigc.service';
import { ChatModelName } from '../llms/typings';
import { ChatConfig } from './typings/chat';
import { WeatherTool } from '../../utils/get-current-weather';
import { Response } from 'express';

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

  @Post('/chat/sse')
  async chatSSE(
    @Res() response: Response,
    @Body('prompt') prompt: unknown,
    @Body('modelName') modelName: ChatModelName,
    @Body('config') chatConfig?: ChatConfig,
  ) {
    response.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    const sendMessage = (data) => {
      response.write(`data: ${JSON.stringify(data)}\n\n`);
    };

    try {
      await this.basicAigcService.chatSSE(
        prompt,
        modelName,
        {
          onMessage: (data) => {
            sendMessage(data);
          },
          onComplete: () => {
            response.end();
          },
        },
        chatConfig,
      );
    } catch (err) {
      sendMessage({ error: err.response ?? JSON.stringify(err) });
      response.end();
    }
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
