import { Module } from '@nestjs/common';
import { OpenApiService } from './open-api.service';
import { OpenApiController } from './open-api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { App } from 'src/entity/app';

@Module({
  imports: [TypeOrmModule.forFeature([App])],
  controllers: [OpenApiController],
  providers: [OpenApiService],
})
export class OpenApiModule {}
