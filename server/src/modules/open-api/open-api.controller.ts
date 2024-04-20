import { AuthGuard } from './guards/auth-guard';
import { OpenApiService } from './open-api.service';
import { All, Controller, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { getFullUrl } from 'src/utils';

@UseGuards(AuthGuard)
@Controller('open-api')
export class OpenApiController {
  constructor(private readonly openApiService: OpenApiService) {}

  @All('call/*')
  proxy(@Req() req: Request, @Res() res: Response) {
    const fullUrl = getFullUrl(req);

    const index = fullUrl.indexOf('open-api/call');
    const newUrl = fullUrl.slice(0, index);
    return createProxyMiddleware({
      target: newUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/open-api/call': '',
      },
    })(req, res);
  }
}
