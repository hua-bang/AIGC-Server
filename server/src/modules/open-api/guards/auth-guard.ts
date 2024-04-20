import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { OpenApiService } from '../open-api.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private openApiService: OpenApiService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const appId = request.headers['app_id'];
    const appSecret = request.headers['app_secret'];

    console.log('request', request);

    // 在这里可以添加更复杂的逻辑来验证 appId 和 appSecret
    if (!appId || !appSecret) {
      throw new UnauthorizedException('Missing app_id and/or app_secret');
    }

    const validate = this.validateCredentials(appId, appSecret);

    if (!validate) {
      throw new UnauthorizedException('Invalid app_id and/or app_secret');
    }

    return validate;
  }

  private validateCredentials(
    appId: string,
    appSecret: string,
  ): Promise<boolean> {
    return this.openApiService.checkAppIsValidate(appId, appSecret);
  }
}
