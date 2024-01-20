import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicAigcModule } from './modules/basic-aigc/basic-aigc.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './commons/interceptors/response-interceptor';
import { HttpExceptionFilter } from './commons/exception-filters/http-exception-filter';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getEnvConfig } from './utils/env';

const ImportsConfig = [
  BasicAigcModule,
  // load config
  ConfigModule.forRoot(),
];

if (getEnvConfig('USERNAME')) {
  ImportsConfig.push(
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: getEnvConfig('HOST'),
      port: getEnvConfig('PORT'),
      username: getEnvConfig('USERNAME'),
      password: getEnvConfig('PASSWORD'),
      database: getEnvConfig('DATABASE'),
    }),
  );
}

@Module({
  imports: ImportsConfig,
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
