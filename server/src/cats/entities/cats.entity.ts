import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Cat {
  @Field(() => ID)
  id: string;

  @Field(() => String, { description: 'Name of cat' })
  name: string;

  @Field(() => Int, { description: 'Age of cat' })
  age: number;

  @Field(() => String, { description: 'Breed of cat' })
  breed: string;
}
