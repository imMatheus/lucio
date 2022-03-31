import { ObjectType, Field, InputType, ID } from '@nestjs/graphql';
import { PrivacyEnum } from '@Types/enums/ClassroomPrivacy.enum';
import { ClassroomMember } from './classroomMember.interface';
import { Classroom as IClassroom } from './classroom.interface';
import { MemberType } from './member.entity';
import {
  MinLength,
  MaxLength,
  IsString,
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  IsEnum,
} from 'class-validator';

@InputType()
export class ClassroomInput {
  @Field(() => String)
  @MinLength(2)
  @MaxLength(30)
  @IsString()
  name: string;

  @Field(() => [String, String])
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  theme: [string, string];

  @Field(() => String)
  @IsString()
  @IsEnum(PrivacyEnum)
  privacy: PrivacyEnum;
}

@ObjectType()
export class ClassroomType implements IClassroom {
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

  @Field(() => [MemberType])
  members: ClassroomMember[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
