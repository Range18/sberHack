import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { CVs } from '#src/core/cvs/entities/cv.entity';
import { CvController } from '#src/core/cvs/cv.controller';
import { MulterConfigService } from './multer-config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CVs]),
    MulterModule.registerAsync({ useClass: MulterConfigService }),
  ],
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}
