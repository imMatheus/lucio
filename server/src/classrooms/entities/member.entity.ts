import { ObjectType, Field, ID } from '@nestjs/graphql';
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
