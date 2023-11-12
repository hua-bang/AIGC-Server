import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * 响应拦截器, 功能如下：
 * - 格式化返回的值
 */
@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(_context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        code: 0, // 默认成功的 code
        message: 'Success', // 默认消息
        data: data, // 控制器返回的数据
      })),
    );
  }
}
