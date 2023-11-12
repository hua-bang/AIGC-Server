import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { isObject } from 'src/utils/isObject';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    let code = 500;

    if (isObject(exceptionResponse)) {
      code = exceptionResponse.code || code;
    }

    response.status(status).json({
      code, // 使用异常中的 code
      message: '服务器异常', // 使用异常中的消息
      data: null, // 异常情况下，数据通常为空
    });
  }
}
