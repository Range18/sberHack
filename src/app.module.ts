import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '#src/core/users/user.module';
import { CompaniesModule } from '#src/core/companies/companies.module';

@Module({
  imports: [UserModule, CompaniesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
