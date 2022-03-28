import { InputType, ObjectType, Field, ID } from '@nestjs/graphql';
import { IsAlphanumeric, IsEmail, MinLength, MaxLength } from 'class-validator';

// for mutations
@InputType()
export class BaseUserInput {
  @Field()
  @IsAlphanumeric()
  @MinLength(2)
  @MaxLength(40)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}

// for resolvers
@ObjectType()
export class BaseUserType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}
