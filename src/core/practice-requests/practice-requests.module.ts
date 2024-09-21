import { Module } from '@nestjs/common';
import { PracticeRequestsService } from './practice-requests.service';
import { PracticeRequestsController } from './practice-requests.controller';
import { PracticeRequest } from './entities/practice-request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PracticeRequest])],
  controllers: [PracticeRequestsController],
  providers: [PracticeRequestsService],
})
export class PracticeRequestsModule {}
