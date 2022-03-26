import {
  InputType,
  ObjectType,
  Field,
  ID,
  DateScalarMode,
} from '@nestjs/graphql';
import { IsAlphanumeric, IsEmail, MinLength, MaxLength } from 'class-validator';

// for mutations
@InputType()
export class AdditionalUserInfoInput {
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

// for resolver
@ObjectType()
export class AdditionalUserInfoType {
  @Field()
  provider: string;

  @Field((type) => String, { nullable: true })
  bio: string;

  @Field((type) => String, { nullable: true })
  location: string;

  @Field((type) => String, { nullable: true })
  school: string;
}
