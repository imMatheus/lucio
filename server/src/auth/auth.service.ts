import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';
import { LoginResponse } from './dto/login-response';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../users/dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByNameAndPassword(
      username,
      password,
    );

    return user;
  }

  async login(user: User): Promise<LoginResponse> {
    return {
      // access_token: 'jwtlol',
      access_token: this.jwtService.sign({ username: user.name, sub: user.id }),
      user: user ? (user as User) : null,
    };
  }

  async signup(createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }
}
