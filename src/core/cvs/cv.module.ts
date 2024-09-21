import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { CVs } from '#src/core/cvs/entities/cv.entity';
import { CvController } from '#src/core/cvs/cv.controller';
import { MulterConfigService } from './multer-config.service';
import { UserModule } from '#src/core/users/user.module';
import { TokenModule } from '#src/core/token/token.module';
import { SessionModule } from '#src/core/session/session.module';

@Module({
  imports: [
    UserModule,
    TokenModule,
    SessionModule,
    TypeOrmModule.forFeature([CVs]),
    MulterModule.registerAsync({ useClass: MulterConfigService }),
  ],
  controllers: [CvController],
  providers: [CvService],
})
export class CvModule {}
