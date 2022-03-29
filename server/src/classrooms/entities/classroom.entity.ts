import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PrivacyEnum } from '@Types/enums/ClassRoomPrivacy.enum';

@ObjectType()
export class Classroom {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  code: string;

  @Field(() => [String, String])
  theme: [string, string];

  @Field()
  privacy: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
