import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserAvatarService } from './user-avatar.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { type Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AvatarRdo } from '#src/core/user-avatars/rdo/avatar.rdo';
import { AuthGuard } from '#src/common/decorators/guards/auth-guard.decorator';
import { User } from '#src/common/decorators/User.decorator';
import type { UserRequest } from '#src/common/types/user-request.type';

@ApiTags('User Avatars')
@Controller('users/:userId/avatars')
export class UserAvatarController {
  constructor(private readonly userAvatarService: UserAvatarService) {}

  @UseInterceptors(FileInterceptor('file'))
  @AuthGuard()
  @Post()
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @User() user: UserRequest,
  ) {
    return new AvatarRdo(await this.userAvatarService.upload(file, user.id));
  }

  @Get('source')
  async GetImageStream(
    @Res({ passthrough: true }) res: Response,
    @Param('userId') userId: number,
  ) {
    const { buffer, mimetype } =
      await this.userAvatarService.getFileStream(userId);

    res.setHeader('Content-Type', mimetype);

    return buffer;
  }

  @Get()
  async findOne(@Param('userId') userId: number) {
    return new AvatarRdo(
      await this.userAvatarService.findOne({
        where: { user: { id: userId } },
      }),
    );
  }

  @Delete()
  async remove(@Param('userId') userId: number) {
    return await this.userAvatarService.deleteFile(userId);
  }
}
