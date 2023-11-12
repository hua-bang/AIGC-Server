import { Controller, Get } from '@nestjs/common';

@Controller('basic-aigc')
export class BasicAigcController {
  @Get('/hello')
  getHello() {
    return 'hello, world';
  }
}
