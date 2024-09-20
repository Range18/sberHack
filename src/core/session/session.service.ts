import { HttpStatus, Injectable } from '@nestjs/common';
import { TokenPayload } from './types/user.payload';
import { TokenService } from '../token/token.service';
import { jwtConfig } from '#src/common/configs/config';
import { UserService } from '../users/user.service';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { CreateSession } from './create-session.type';
import { LoggedUserRdo } from '../users/rdo/logged-user.rdo';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import UserExceptions = AllExceptions.UserExceptions;

@Injectable()
export class SessionService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService,
  ) {}

  async createSession(payload: CreateSession): Promise<LoggedUserRdo> {
    const user = await this.userService.findOne({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new ApiException(
        HttpStatus.NOT_FOUND,
        'UserExceptions',
        UserExceptions.UserNotFound,
      );
    }

    const expireAt = new Date(Date.now() + jwtConfig.accessExpire.ms());

    return {
      accessToken: await this.tokenService.signAsync({
        userId: payload.userId,
      } as TokenPayload),
      sessionExpireAt: expireAt,
      email: user.email,
    };
  }

  async refreshSession(tokenOrEntity: string): Promise<LoggedUserRdo> {
    const userUUID = (
      await this.tokenService.verifyAsync<TokenPayload>(tokenOrEntity)
    ).userId;

    return await this.createSession({ userId: userUUID });
  }
}
