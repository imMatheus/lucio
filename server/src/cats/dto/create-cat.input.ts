import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCatInput {
  @Field(() => String, { description: 'Name of cat' })
  name: string;

  @Field(() => Int, { description: 'Age of cat' })
  age: number;

  @Field(() => String, { description: 'Breed of cat' })
  breed: string;
}
