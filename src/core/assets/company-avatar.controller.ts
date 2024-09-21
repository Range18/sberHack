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
import { CompanyAvatarService } from './company-avatar.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { type Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { GetFileRdo } from '#src/core/assets/rdo/get-file.rdo';

@ApiTags('Company Avatars')
@Controller('companies/:companyId/avatars')
export class CompanyAvatarController {
  constructor(private readonly assetsService: CompanyAvatarService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('companyId') companyId: number,
  ) {
    return new GetFileRdo(await this.assetsService.upload(file, companyId));
  }

  @Get('source')
  async GetImageStream(
    @Res({ passthrough: true }) res: Response,
    @Param('companyId') companyId: number,
  ) {
    const { buffer, mimetype } =
      await this.assetsService.getFileStream(companyId);

    res.setHeader('Content-Type', mimetype);

    return buffer;
  }

  @Get()
  async findOne(@Param('companyId') companyId: number) {
    return new GetFileRdo(
      await this.assetsService.findOne({
        where: { company: { id: companyId } },
        relations: { company: true },
      }),
    );
  }

  @Delete()
  async remove(@Param('companyId') companyId: number) {
    return await this.assetsService.deleteFile(companyId);
  }
}
