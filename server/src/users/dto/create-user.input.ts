import { InputType, Field } from '@nestjs/graphql';
import { IsAlphanumeric, IsEmail, MinLength, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsAlphanumeric()
  @MinLength(2)
  @MaxLength(40)
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;
}
