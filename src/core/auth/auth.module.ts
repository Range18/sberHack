import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/user.module';
import { SessionModule } from '../session/session.module';
import { TokenModule } from '../token/token.module';
import { adminOptions } from '../admin-panel/admin.options';
import { Database, Resource } from '@adminjs/typeorm';
import AdminJS from 'adminjs';
import { AdminModule } from '@adminjs/nestjs';

@Module({
  imports: [
    AdminModule.createAdminAsync({
      useFactory: async () => {
        AdminJS.registerAdapter({
          Database,
          Resource,
        });
        return adminOptions;
      },
    }),
    UserModule,
    SessionModule,
    TokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
