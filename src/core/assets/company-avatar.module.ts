import { Module } from '@nestjs/common';
import { CompanyAvatarService } from './company-avatar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyAvatarEntity } from '#src/core/assets/entities/company-avatar.entity';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from '#src/core/assets/multer-config.service';
import { CompanyAvatarController } from '#src/core/assets/company-avatar.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyAvatarEntity]),
    MulterModule.registerAsync({ useClass: MulterConfigService }),
  ],
  controllers: [CompanyAvatarController],
  providers: [CompanyAvatarService],
})
export class CompanyAvatarModule {}
