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
import { NewsAssetsService } from './news-assets.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { type Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { NewsAssetRdo } from '#src/core/news-assets/rdo/news-asset.rdo';

@ApiTags('News Images')
@Controller()
export class NewsAssetsController {
  constructor(private readonly assetsService: NewsAssetsService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('news/:newsId/images')
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('newsId') newsId: number,
  ) {
    return new NewsAssetRdo(await this.assetsService.upload(file, newsId));
  }

  @Get('news/images/:name/source')
  async GetImageStream(
    @Res({ passthrough: true }) res: Response,
    @Param('name') name: string,
  ) {
    const { buffer, mimetype } = await this.assetsService.getFileStream(name);

    res.setHeader('Content-Type', mimetype);

    return buffer;
  }

  @Get('news/images/:name')
  async findOne(@Param('name') name: string) {
    return new NewsAssetRdo(
      await this.assetsService.findOne({
        where: { name },
      }),
    );
  }

  @Delete('news/images/:name')
  async remove(@Param('name') name: string) {
    return await this.assetsService.deleteFile(name);
  }
}
