import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    const token = authHeader?.split(' ')[1]; // 'Bearer <token>'

    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    try {
      const decoded = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
      request.user = decoded;
      return true;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
