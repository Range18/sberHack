import { Module } from '@nestjs/common';
import { PracticeRequestsService } from './practice-requests.service';
import { PracticeRequestsController } from './practice-requests.controller';

@Module({
  controllers: [PracticeRequestsController],
  providers: [PracticeRequestsService],
})
export class PracticeRequestsModule {}
