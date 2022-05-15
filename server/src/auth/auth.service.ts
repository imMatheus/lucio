import { UsersService } from '../users/users.service';
import { Injectable } from '@nestjs/common';
import { LoginResponse } from './dto/login-response';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserInput } from '../users/dto/create-user.input';
import { IPayload } from './jwt.strategy';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log('16');
    const user = await this.usersService.findByEmailAndPassword(
      email,
      password,
    );

    console.log(user);

    return user;
  }

  async login(user: User): Promise<LoginResponse> {
    console.log('25');
    const sign: IPayload = {
      name: user.name,
      sub: user.id,
      email: user.email,
    };
    return {
      // access_token: 'jwtlol',
      access_token: this.jwtService.sign(sign),
      user: user ? (user as User) : null,
    };
  }

  async signup(createUserInput: CreateUserInput): Promise<LoginResponse> {
    console.log('server signup');
    const user = await this.usersService.create(createUserInput);
    console.log(user);

    const sign: IPayload = {
      name: user.name,
      sub: user.id,
      email: user.email,
    };

    return {
      // access_token: 'jwtlol',
      access_token: this.jwtService.sign(sign),
      user: user ? (user as User) : null,
    };
  }
}
