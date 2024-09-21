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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
