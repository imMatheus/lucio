import {
  InputType,
  Field,
  IntersectionType,
  PartialType,
} from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { BaseUserInput } from '../entities/baseUser.entity';
import { AdditionalUserInfoInput } from '../entities/additionalUserInfo.entity';

@InputType()
export class CreateUserInput extends IntersectionType(
  BaseUserInput,
  PartialType(AdditionalUserInfoInput),
) {
  @Field()
  @MinLength(6)
  password: string;
}
