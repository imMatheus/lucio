import { ObjectType, Field, IntersectionType } from '@nestjs/graphql';
import { BaseUserType } from './baseUser.entity';
import { AdditionalUserInfoType } from './additionalUserInfo.entity';

@ObjectType()
export class User extends IntersectionType(
  BaseUserType,
  AdditionalUserInfoType,
) {
  @Field(() => Boolean)
  email_verified: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
