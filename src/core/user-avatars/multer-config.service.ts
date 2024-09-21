import { Injectable } from '@nestjs/common';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import multer from 'multer';
import { Request } from 'express';
import { extname } from 'path';
import { uid } from 'uid/secure';
import { storageConfig } from '#src/common/configs/storage.config';

@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): Promise<MulterModuleOptions> | MulterModuleOptions {
    return {
      storage: multer.diskStorage({
        destination: (req, file, callback) => {
          return callback(null, storageConfig.rootPath);
        },
        filename(
          req: Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          callback(null, `${uid(16)}${extname(file.originalname)}`);
        },
      }),
    };
  }
}
