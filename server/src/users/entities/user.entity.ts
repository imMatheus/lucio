import { ObjectType, Field, ID, DateScalarMode } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  provider: string;

  @Field()
  bio: string;

  @Field()
  location: string;

  @Field()
  school: string;

  @Field()
  createdAt: DateScalarMode;

  @Field()
  updatedAt: DateScalarMode;

  @Field(() => Boolean)
  email_verified: string;
}
