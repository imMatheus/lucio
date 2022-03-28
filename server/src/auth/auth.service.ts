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
    console.log('122');

    const user = await this.usersService.findByName(name);
    const hashed = bcrypt.hashSync(password, 10); // hash password

    if (user && user.password === hashed) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(loginInput: LoginInput): Promise<LoginResponse> {
    console.log('32');
    const user = await this.usersService.findByName(loginInput.name);
    console.log(user);

    const { password, ...result } = user;

    return {
      access_token: 'jt',
      user: result as User,
    };
  }
}
