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
import { GetFileRdo } from '#src/core/user-avatars/rdo/get-file.rdo';

@ApiTags('User Avatars')
@Controller('users/:userId/avatars')
export class UserAvatarController {
  constructor(private readonly userAvatarService: UserAvatarService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('userId') userId: number,
  ) {
    return new GetFileRdo(await this.userAvatarService.upload(file, userId));
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
    return new GetFileRdo(
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
