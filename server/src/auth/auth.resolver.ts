import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input';
import { LoginResponse } from './dto/login-response';
import { GqlAuthGuard } from './gql-auth.guard';
import { User } from '../users/entities/user.entity';
import { CreateUserInput } from '../users/dto/create-user.input';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => LoginResponse)
  @UseGuards(GqlAuthGuard)
  login(@Args('loginInput') loginInput: LoginInput, @Context() context: any) {
    return this.authService.login(context.user);
  }

  @Mutation(() => User)
  signup(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.signup(createUserInput);
  }
}
