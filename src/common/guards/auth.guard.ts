import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { Request } from 'express';
import { ApiException } from '../exception-handler/api-exception';
import { AllExceptions } from '../exception-handler/exeption-types/all-exceptions';
import { jwtConfig } from '../configs/config';
import { RequestExtended } from '../types/request-extended.type';
import { UserRequest } from '../types/user-request.type';
import { userProperty } from '../constants/request-custom-properties';
import AuthExceptions = AllExceptions.AuthExceptions;
import { UserService } from '#src/core/users/user.service';
import { SessionService } from '#src/core/session/session.service';
import { TokenService } from '#src/core/token/token.service';
import { TokenPayload } from '#src/core/session/types/user.payload';

@Injectable()
export class AuthGuardClass implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
    private readonly tokenService: TokenService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestExtended>();

    const accessToken = this.extractAccessToken(request);

    if (!accessToken) {
      throw new ApiException(
        HttpStatus.UNAUTHORIZED,
        'AuthExceptions',
        AuthExceptions.InvalidAccessToken,
      );
    }

    const payload: TokenPayload = await this.tokenService
      .verifyAsync<TokenPayload>(accessToken, {
        secret: jwtConfig.secret,
      })
      .catch((error) => {
        if (error.name === 'TokenExpiredError') {
          throw new ApiException(
            HttpStatus.UNAUTHORIZED,
            'AuthExceptions',
            AuthExceptions.ExpiredToken,
          );
        }

        throw new ApiException(
          HttpStatus.UNAUTHORIZED,
          'AuthExceptions',
          AuthExceptions.InvalidAccessToken,
        );
      });

    request[userProperty] = {
      id: payload.userId,
    } as UserRequest;

    return true;
  }

  private extractAccessToken(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' || type === 'AccessToken' || type === 'Token'
      ? token
      : undefined;
  }
}
