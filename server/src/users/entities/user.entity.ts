import {
  ObjectType,
  Field,
  DateScalarMode,
  IntersectionType,
} from '@nestjs/graphql';
import { BaseUserType } from './baseUser.entity';
import { AdditionalUserInfoType } from './additionalUserInfo.entity';
@ObjectType()
export class User extends IntersectionType(
  BaseUserType,
  AdditionalUserInfoType,
) {
  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Boolean)
  email_verified: boolean;
}
