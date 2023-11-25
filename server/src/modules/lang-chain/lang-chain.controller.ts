import { Controller, Get } from '@nestjs/common';
import { LangChainService } from './lang-chain.service';

@Controller('/lang-chain')
export class LangChainController {
  constructor(private readonly langChainService: LangChainService) {}

  @Get('/run')
  runAgent() {
    return this.langChainService.agent();
  }
}
