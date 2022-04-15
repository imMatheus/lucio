import { UseGuards } from '@nestjs/common';
import { Args, Context, Query, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input';
import { LoginResponse } from './dto/login-response';
import { GqlAuthGuard } from './gql-auth.guard';
import { User } from '../users/entities/user.entity';
import { CreateUserInput } from '../users/dto/create-user.input';
import { MyContext } from '@Types/MyContext';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from '../users/users.service';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginInput') loginInput: LoginInput, @Context() context: any) {
    return this.authService.login(context.user);
  }

  @Query(() => User, { name: 'me' })
  @UseGuards(JwtAuthGuard)
  me(@Context() context: MyContext) {
    const user = context.req.user;

    return this.usersService.findOne(user.userId);
  }

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  signup(@Args('signupInput') createUserInput: CreateUserInput) {
    return this.authService.signup(createUserInput);
  }
}
