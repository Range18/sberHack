import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { type Response } from 'express';
import { LoggedUserRdo } from '../users/rdo/logged-user.rdo';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '#src/common/decorators/guards/auth-guard.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoggedUserRdo> {
    const loginRdo = await this.authService.login(loginUserDto);

    response.status(200);

    response.cookie('token', loginRdo.accessToken, {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      expires: loginRdo.sessionExpireAt,
    });

    return loginRdo;
  }

  @AuthGuard()
  @Delete('logout')
  async logout(): Promise<void> {}
}
