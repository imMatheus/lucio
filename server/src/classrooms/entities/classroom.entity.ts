import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PrivacyEnum } from '@Types/enums/ClassroomPrivacy.enum';
import { ClassroomMember } from './classroomMember.interface';
import { RoleEnum } from '@Types/enums/ClassroomRole.enum';

@ObjectType()
export class Member implements ClassroomMember {
  @Field()
  joinedAt: Date;

  @Field()
  role: RoleEnum;

  @Field()
  userId: string;
}

@ObjectType()
export class Classroom {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  owner: string;

  @Field()
  code: string;

  @Field(() => [String, String])
  theme: [string, string];

  @Field()
  privacy: PrivacyEnum;

  @Field(() => [Member])
  members: ClassroomMember[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
