import {
  ObjectType,
  InterfaceType,
  Field,
  registerEnumType,
  Int,
  ID,
} from '@nestjs/graphql';
import { InputEnum, InputType, Difficulty } from '@Types/problem';

// Graphql interfaces
@InterfaceType()
export abstract class Input {
  @Field()
  input: string;

  @Field(() => InputEnum)
  inputType: InputEnum;
}

@InterfaceType()
export abstract class SampleCase {
  @Field(() => Input)
  inputs: InputType[];

  @Field(() => [String])
  outputs: string[];
}

@InterfaceType()
export abstract class SubmitCase {
  @Field(() => [String])
  inputs: string[];

  @Field(() => [String])
  outputs: string[];
}

// register enums for nest.js
registerEnumType(Difficulty, {
  name: 'Difficulty',
});
registerEnumType(InputEnum, {
  name: 'InputEnum',
});

// final type to be used for graphql
@ObjectType()
export class Problem {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  markdown: string;

  @Field(() => Difficulty)
  difficulty: Difficulty;

  @Field(() => [SampleCase])
  sampleCases: SampleCase[];

  @Field(() => [SubmitCase])
  submitCases: SubmitCase[];

  @Field(() => [Input])
  inputs: Input[];
}
