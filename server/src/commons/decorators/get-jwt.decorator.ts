import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetToken = createParamDecorator(
  (_data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return undefined;
    }

    return authHeader.split(' ')[1];
  },
);
