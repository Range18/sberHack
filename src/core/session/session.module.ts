import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TokenModule, UserModule],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
