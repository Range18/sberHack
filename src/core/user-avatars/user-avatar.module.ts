import { Module } from '@nestjs/common';
import { UserAvatarService } from './user-avatar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UserAvatarEntity } from '#src/core/user-avatars/entities/user-avatar.entity';
import { UserAvatarController } from './user-avatar.controller';
import { MulterConfigService } from './multer-config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAvatarEntity]),
    MulterModule.registerAsync({ useClass: MulterConfigService }),
  ],
  controllers: [UserAvatarController],
  providers: [UserAvatarService],
})
export class UserAvatarModule {}
