import {
  ObjectType,
  Field,
  ID,
  DateScalarMode,
  IntersectionType,
} from '@nestjs/graphql';
import { IsAlphanumeric, IsEmail, MinLength, MaxLength } from 'class-validator';
import { BaseUserType } from './baseUser.entity';
import { AdditionalUserInfoType } from './additionalUserInfo.entity';
@ObjectType()
export class User extends IntersectionType(
  BaseUserType,
  AdditionalUserInfoType,
) {
  @Field()
  createdAt: DateScalarMode;

  @Field()
  updatedAt: DateScalarMode;

  @Field(() => Boolean)
  email_verified: string;
}
