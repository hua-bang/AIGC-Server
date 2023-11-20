import { Module } from '@nestjs/common';
import { PrompterService } from './prompter.service';
import { PrompterController } from './prompter.controller';

@Module({
  controllers: [PrompterController],
  providers: [PrompterService],
  exports: [PrompterService],
})
export class PrompterModule {}
