import {
  InputType,
  ObjectType,
  Field,
  ID,
  DateScalarMode,
} from '@nestjs/graphql';
import { IsAlphanumeric, IsEmail, MinLength, MaxLength } from 'class-validator';

class BaseUser {
  //   @Field(() => ID)
  //   id: string;

  @Field()
  @IsAlphanumeric()
  @MinLength(2)
  @MaxLength(40)
  name: string;

  @Field()
  @IsEmail()
  email: string;
}

@InputType()
export class BaseUserInput extends BaseUser {}

@ObjectType()
export class BaseUserType extends BaseUser {}
