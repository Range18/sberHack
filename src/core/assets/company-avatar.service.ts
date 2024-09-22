import { HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { CompanyAvatarEntity } from '#src/core/assets/entities/company-avatar.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { unlink } from 'fs/promises';
import { join } from 'path';
import { createReadStream } from 'fs';
import { BaseEntityService } from '#src/common/base-entity/base-entity.service';
import { AllExceptions } from '#src/common/exception-handler/exeption-types/all-exceptions';
import { ApiException } from '#src/common/exception-handler/api-exception';
import { storageConfig } from '#src/common/configs/storage.config';
import NotFoundExceptions = AllExceptions.NotFoundExceptions;

@Injectable()
export class CompanyAvatarService extends BaseEntityService<
  CompanyAvatarEntity,
  'NotFoundExceptions'
> {
  constructor(
    @InjectRepository(CompanyAvatarEntity)
    private readonly assetsRepository: Repository<CompanyAvatarEntity>,
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

  async upload(file: Express.Multer.File, companyId: number) {
    const avatar = await this.findOne({
      where: { company: { id: companyId } },
    });

    if (avatar) {
      await this.deleteFile(companyId);
    }

    return await this.save({
      name: file.filename,
      mimetype: file.mimetype,
      company: { id: companyId },
    });
  }

  async getFileStream(id: number) {
    const image = await this.findOne({ where: { company: { id } } });

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
      throw new ApiException<'NotFoundExceptions'>(
        HttpStatus.NOT_FOUND,
        'NotFoundExceptions',
        NotFoundExceptions.NotFound,
      );
    }
  }

  async deleteFile(id: number) {
    const image = await this.findOne({ where: { company: { id } } });

    if (!image) {
      new ApiException<'NotFoundExceptions'>(
        HttpStatus.NOT_FOUND,
        'NotFoundExceptions',
        NotFoundExceptions.NotFound,
      );
    }

    await this.removeOne(image);

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
