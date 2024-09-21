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
import { CvService } from './cv.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { type Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '#src/common/decorators/guards/auth-guard.decorator';
import type { UserRequest } from '#src/common/types/user-request.type';
import { User } from '#src/common/decorators/User.decorator';
import { CvRdo } from '#src/core/cvs/rdo/cv.rdo';

@ApiTags('CVs')
@Controller()
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @UseInterceptors(FileInterceptor('file'))
  @AuthGuard()
  @Post('users/cvs')
  async uploadImage(
    @User() user: UserRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return new CvRdo(await this.cvService.upload(file, user.id));
  }

  @Get('users/:userId/cvs/source')
  async GetImageStream(
    @Res({ passthrough: true }) res: Response,
    @Param('userId') userId: number,
  ) {
    const { buffer, mimetype } = await this.cvService.getFileStream(userId);

    res.setHeader('Content-Type', mimetype);

    return buffer;
  }

  @Get('users/:userId/cvs')
  async findOne(@Param('userId') userId: number) {
    return new CvRdo(
      await this.cvService.findOne({
        where: { user: { id: userId } },
        relations: { user: true },
      }),
    );
  }

  @Delete('users/:userId/cvs')
  async remove(@Param('userId') userId: number) {
    return await this.cvService.deleteFile(userId);
  }
}
