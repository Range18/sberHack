import { Module } from '@nestjs/common';
import { NewsAssetsService } from './news-assets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { NewsAssetsEntity } from '#src/core/news-assets/entities/news-assets.entity';
import { MulterConfigService } from '#src/core/news-assets/multer-config.service';
import { NewsAssetsController } from '#src/core/news-assets/news-assets.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([NewsAssetsEntity]),
    MulterModule.registerAsync({ useClass: MulterConfigService }),
  ],
  controllers: [NewsAssetsController],
  providers: [NewsAssetsService],
})
export class NewsAssetsModule {}
