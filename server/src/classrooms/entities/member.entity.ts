import { ObjectType, InputType, Field, ID } from '@nestjs/graphql';
import { ClassroomMember } from './classroomMember.interface';
import { RoleEnum } from '@Types/enums/ClassroomRole.enum';

@ObjectType()
export class MemberType implements ClassroomMember {
  @Field()
  joinedAt: Date;

  @Field()
  role: RoleEnum;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => ID)
  userId: string;
}
