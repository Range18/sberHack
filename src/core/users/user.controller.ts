import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { type UserRequest } from '#src/common/types/user-request.type';
import { User } from '#src/common/decorators/User.decorator';
import { AuthGuard } from '#src/common/decorators/guards/auth-guard.decorator';
import { GetUserRdo } from '#src/core/users/rdo/get-user.rdo';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @AuthGuard()
  @Get('me')
  async getUserMe(@User() user: UserRequest) {
    return new GetUserRdo(
      await this.userService.findOne({
        where: { id: user.id },
      }),
    );
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.userService.formatToRdo(
      await this.userService.findOne(
        {
          where: { id },
        },
        true,
      ),
    );
  }

  @Get('/students/count')
  async studentsCount() {
    return await this.userService.count();
  }
}
