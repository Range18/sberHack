import { Module } from '@nestjs/common';
import { UserPracticesService } from './user-practices.service';
import { UserPracticesController } from './user-practices.controller';
import { UserPractice } from '#src/core/active-practices/entities/user-practice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserPractice])],
  controllers: [UserPracticesController],
  providers: [UserPracticesService],
  exports: [UserPracticesService],
})
export class UserPracticesModule {}
