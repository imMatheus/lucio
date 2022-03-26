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
export class UpdateUserInput extends PartialType(AdditionalUserInfoInput) {
  @Field(() => ID)
  id: string;
}

// @InputType()
// export class UpdateUserInput extends IntersectionType(
//   PartialType(OmitType(BaseUserInput, ['email'] as const)),
//   PartialType(AdditionalUserInfoInput),
// ) {
//   @Field(() => ID)
//   id: string;
// }
