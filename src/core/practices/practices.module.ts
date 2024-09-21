import { Module } from '@nestjs/common';
import { PracticesService } from './practices.service';
import { PracticesController } from './practices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Practices } from '#src/core/practices/entities/practice.entity';
import { UserModule } from '#src/core/users/user.module';
import { TokenModule } from '#src/core/token/token.module';
import { SessionModule } from '#src/core/session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Practices]),
    UserModule,
    TokenModule,
    SessionModule,
  ],
  controllers: [PracticesController],
  providers: [PracticesService],
})
export class PracticesModule {}
