import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '#src/core/users/user.module';
import { CompaniesModule } from '#src/core/companies/companies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '#src/common/configs/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, CompaniesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
