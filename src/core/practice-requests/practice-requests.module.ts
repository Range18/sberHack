import { Module } from '@nestjs/common';
import { PracticeRequestsService } from './practice-requests.service';
import { PracticeRequestsController } from './practice-requests.controller';
import { PracticeRequest } from './entities/practice-request.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '#src/core/users/user.module';
import { TokenModule } from '#src/core/token/token.module';
import { SessionModule } from '#src/core/session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PracticeRequest]),
    UserModule,
    TokenModule,
    SessionModule,
  ],
  controllers: [PracticeRequestsController],
  providers: [PracticeRequestsService],
})
export class PracticeRequestsModule {}
