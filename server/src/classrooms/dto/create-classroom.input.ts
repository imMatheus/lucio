import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateClassroomInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
