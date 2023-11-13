import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicAigcModule } from './modules/basic-aigc/basic-aigc.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './commons/interceptors/response-interceptor';
import { HttpExceptionFilter } from './commons/exception-filters/http-exception-filter';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    BasicAigcModule,
    // load config
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
