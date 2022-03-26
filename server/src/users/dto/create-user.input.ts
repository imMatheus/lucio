import {
  InputType,
  Field,
  PartialType,
  OmitType,
  IntersectionType,
} from '@nestjs/graphql';
import { IsAlphanumeric, IsEmail, MinLength, MaxLength } from 'class-validator';
import { User } from '../entities/user.entity';
import { BaseUserInput } from '../entities/baseUser.entity';
import { AdditionalUserInfoInput } from '../entities/additionalUserInfo.entity';
// IntersectionType(
// PartialType(AdditionalUserInfo),
@InputType()
export class CreateUserInput extends BaseUserInput {
  @Field()
  @MinLength(6)
  password: string;
}
