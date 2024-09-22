import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '#src/core/users/user.module';
import { CompaniesModule } from '#src/core/companies/companies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '#src/common/configs/database.config';
import { AuthModule } from '#src/core/auth/auth.module';
import { CompanyAvatarModule } from '#src/core/assets/company-avatar.module';
import { UserAvatarModule } from './core/user-avatars/user-avatar.module';
import { DirectionsModule } from '#src/core/directions/directions.module';
import { PracticesModule } from '#src/core/practices/practices.module';
import { PracticeRequestsModule } from '#src/core/practice-requests/practice-requests.module';
import { CvModule } from '#src/core/cvs/cv.module';
import { UserPracticesModule } from '#src/core/active-practices/user-practices.module';
import { PracticeDiariesModule } from '#src/core/practice-diaries/practice-diaries.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    CompaniesModule,
    AuthModule,
    CompanyAvatarModule,
    UserAvatarModule,
    DirectionsModule,
    PracticesModule,
    PracticeRequestsModule,
    CvModule,
    UserPracticesModule,
    PracticeDiariesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
