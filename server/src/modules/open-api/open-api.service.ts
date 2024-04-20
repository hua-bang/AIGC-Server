import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { App } from 'src/entity/app';
import { Repository } from 'typeorm';

@Injectable()
export class OpenApiService {
  constructor(
    @InjectRepository(App)
    private appRepository: Repository<App>,
  ) {}

  getApp() {
    return this.appRepository.find();
  }

  async checkAppIsValidate(appId: string, appSecret: string) {
    const count = await this.appRepository.count({
      where: {
        id: appId,
        appSecret,
      },
    });
    return Boolean(count);
  }
}
