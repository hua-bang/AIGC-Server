import { Controller } from '@nestjs/common';
import { PrompterService } from './prompter.service';

@Controller('prompter')
export class PrompterController {
  constructor(private readonly prompterService: PrompterService) {}
}
