import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersService } from '../users/users.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [PassportModule, UsersService],
  providers: [AuthService, AuthResolver, LocalStrategy],
})
export class AuthModule {}
