import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PrivacyEnum } from '@Types/enums/ClassRoomPrivacy.enum';
import { ClassRoomMember } from './classroomMember.interface';
import { RoleEnum } from '@Types/enums/ClassRoomRole.enum';

@ObjectType()
export class Member implements ClassRoomMember {
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
  code: string;

  @Field(() => [String, String])
  theme: [string, string];

  @Field()
  privacy: PrivacyEnum;

  @Field(() => [Member])
  members: ClassRoomMember[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
