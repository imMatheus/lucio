import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  name: string;

  @Field()
  password: string;
}
