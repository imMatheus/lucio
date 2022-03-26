import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';
import { LoginInput } from './dto/login-input';
import { LoginResponse } from './dto/login-response';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.usersService.findByName(name);
    const hashed = bcrypt.hashSync(password, 10); // hash password

    if (user && user.password === hashed) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginInput: LoginInput): Promise<LoginResponse> {
    const user = await this.usersService.findByName(loginInput.name);
    const { password, ...result } = user;

    return {
      access_token: 'jwt',
      user: result as User,
    };
  }
}
