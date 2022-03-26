import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { MinLength, MaxLength, IsString } from 'class-validator';

// for mutations
@InputType()
export class AdditionalUserInfoInput {
  @Field(() => String, { nullable: true })
  @MinLength(2)
  @MaxLength(30)
  @IsString()
  bio: string;

  @Field(() => String, { nullable: true })
  @MinLength(2)
  @MaxLength(30)
  @IsString()
  location: string;

  @Field(() => String, { nullable: true })
  @MinLength(2)
  @MaxLength(30)
  @IsString()
  school: string;
}

// for resolver
@ObjectType()
export class AdditionalUserInfoType {
  @Field()
  provider: string;

  @Field(() => String, { nullable: true })
  bio: string;

  @Field(() => String, { nullable: true })
  location: string;

  @Field(() => String, { nullable: true })
  school: string;
}
