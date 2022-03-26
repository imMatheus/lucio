import {
  InputType,
  ObjectType,
  Field,
  ID,
  DateScalarMode,
} from '@nestjs/graphql';
import { IsAlphanumeric, IsEmail, MinLength, MaxLength } from 'class-validator';

class AdditionalUserInfo {
  @Field()
  @IsAlphanumeric()
  provider: string;

  @Field((type) => String, { nullable: true })
  @MinLength(2)
  @MaxLength(30)
  @IsAlphanumeric()
  bio: string;

  @Field((type) => String, { nullable: true })
  @MinLength(2)
  @MaxLength(30)
  @IsAlphanumeric()
  location: string;

  @Field((type) => String, { nullable: true })
  @MinLength(2)
  @MaxLength(30)
  @IsAlphanumeric()
  school: string;
}

@InputType()
export class AdditionalUserInfoInput extends AdditionalUserInfo {}

@ObjectType()
export class AdditionalUserInfoType extends AdditionalUserInfo {}
