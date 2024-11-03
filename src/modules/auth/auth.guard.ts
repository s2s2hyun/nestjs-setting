import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { ip2long } from '@/utils/iputils';

// JWT payload 타입 정의
interface JwtPayloadCustom {
  id: number;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const path = request.path;

    // 로그인 관련 경로는 검증하지 않음
    if (
      path === '/v1/users/authorize/token' ||
      path === '/v1/users/authorize'
    ) {
      return true;
    }

    request.loginUser = {
      id: 0,
      ip: ip2long(
        request.headers['x-forwarded-for'] || request.connection.remoteAddress,
      ),
    };

    let accessToken = request.headers['authorization'];

    if (!accessToken) {
      return true;
    }

    accessToken = accessToken.replace('Bearer ', '');

    try {
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_SECRET,
      ) as JwtPayloadCustom; // 타입 단언
      request.loginUser.id = decoded.id;
      return true;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException({
          code: 'AUTH0001',
          error: 'TokenExpired',
        });
      }
      throw new UnauthorizedException({
        status: 401,
        code: 'AUTH0002',
        error: 'TokenExpired',
      });
    }
  }
}
