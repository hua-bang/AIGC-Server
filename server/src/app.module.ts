import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicAigcModule } from './modules/basic-aigc/basic-aigc.module';
@Module({
  imports: [BasicAigcModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
