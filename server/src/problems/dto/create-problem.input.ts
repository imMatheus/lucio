import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProblemInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
