import { Body, Controller, Get, Post } from '@nestjs/common';
import { OpenAILLM } from '../llms/open-ai-llm';

@Controller('basic-aigc')
export class BasicAigcController {
  @Get('/hello')
  async getHello() {
    const openAILLM = new OpenAILLM({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_PATH,
    });

    return {
      message: await openAILLM.invoke('你好呀'),
    };
  }

  @Post('/chat')
  async chat(@Body('prompt') prompt: string) {
    const openAILLM = new OpenAILLM({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: process.env.OPENAI_BASE_PATH,
    });

    return {
      message: await openAILLM.invoke(prompt),
    };
  }
}
