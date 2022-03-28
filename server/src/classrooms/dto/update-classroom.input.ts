import { CreateClassroomInput } from './create-classroom.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateClassroomInput extends PartialType(CreateClassroomInput) {
  @Field(() => Int)
  id: number;
}
