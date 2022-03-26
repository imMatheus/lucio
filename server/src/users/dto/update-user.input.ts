import { CreateUserInput } from './create-user.input';
import { InputType, Field, ID, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  id: string;
}
