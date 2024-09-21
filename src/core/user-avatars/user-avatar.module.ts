import { Module } from '@nestjs/common';
import { UserAvatarService } from './user-avatar.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { UserAvatarEntity } from '#src/core/user-avatars/entities/user-avatar.entity';
import { UserAvatarController } from './user-avatar.controller';
import { MulterConfigService } from './multer-config.service';
import { UserModule } from '#src/core/users/user.module';
import { TokenModule } from '#src/core/token/token.module';
import { SessionModule } from '#src/core/session/session.module';

@Module({
  imports: [
    UserModule,
    TokenModule,
    SessionModule,
    TypeOrmModule.forFeature([UserAvatarEntity]),
    MulterModule.registerAsync({ useClass: MulterConfigService }),
  ],
  controllers: [UserAvatarController],
  providers: [UserAvatarService],
})
export class UserAvatarModule {}
