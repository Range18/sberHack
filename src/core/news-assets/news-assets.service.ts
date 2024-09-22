import { HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { unlink } from 'fs/promises';
import { join } from 'path';
import { createReadStream } from 'fs';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { storageConfig } from '#src/common/configs/storage.config';
import { NewsAssetsEntity } from '#src/core/news-assets/entities/news-assets.entity';
import NotFoundExceptions = AllExceptions.NotFoundExceptions;

@Injectable()
export class NewsAssetsService extends BaseEntityService<
  NewsAssetsEntity,
  'NotFoundExceptions'
> {
  constructor(
    @InjectRepository(NewsAssetsEntity)
    private readonly assetsRepository: Repository<NewsAssetsEntity>,
  ) {
    super(
      assetsRepository,
      new ApiException<'NotFoundExceptions'>(
        HttpStatus.NOT_FOUND,
        'NotFoundExceptions',
        NotFoundExceptions.NotFound,
      ),
    );
  }

  async upload(file: Express.Multer.File, newsId: number) {
    return await this.save({
      name: file.filename,
      mimetype: file.mimetype,
      news: { id: newsId },
    });
  }

  async getFileStream(name: string) {
    const image = await this.findOne({ where: { name } });

    if (!image) {
      new ApiException<'NotFoundExceptions'>(
        HttpStatus.NOT_FOUND,
        'NotFoundExceptions',
        NotFoundExceptions.NotFound,
      );
    }

    try {
      const stream = createReadStream(join(storageConfig.rootPath, image.name));

      return { buffer: new StreamableFile(stream), mimetype: image.mimetype };
    } catch (error) {
      new ApiException<'NotFoundExceptions'>(
        HttpStatus.NOT_FOUND,
        'NotFoundExceptions',
        NotFoundExceptions.NotFound,
      );
    }
  }

  async deleteFile(name: string) {
    const image = await this.findOne({ where: { name } });

    if (!image) {
      new ApiException<'NotFoundExceptions'>(
        HttpStatus.NOT_FOUND,
        'NotFoundExceptions',
        NotFoundExceptions.NotFound,
      );
    }

    try {
      await unlink(join(storageConfig.rootPath, image.name));
    } catch (error) {
      new ApiException<'NotFoundExceptions'>(
        HttpStatus.NOT_FOUND,
        'NotFoundExceptions',
        NotFoundExceptions.NotFound,
      );
    }
  }
}
