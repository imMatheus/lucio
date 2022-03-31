import {
  InputType,
  Field,
  ID,
  PartialType,
  OmitType,
  IntersectionType,
} from '@nestjs/graphql';
import { BaseUserInput } from '../entities/baseUser.entity';
import { AdditionalUserInfoInput } from '../entities/additionalUserInfo.entity';

@InputType()
export class UpdateUserInput extends IntersectionType(
  PartialType(OmitType(BaseUserInput, ['email'] as const)), // all field from BaseUserInput except email
  PartialType(AdditionalUserInfoInput), // makes all fields optional
) {
  @Field(() => ID)
  id: string;
}
