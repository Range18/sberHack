import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from '#src/core/companies/entities/company.entity';
import { UserModule } from '#src/core/users/user.module';
import { TokenModule } from '#src/core/token/token.module';
import { SessionModule } from '#src/core/session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Company]),
    UserModule,
    TokenModule,
    SessionModule,
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
