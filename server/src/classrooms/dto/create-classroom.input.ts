import { InputType } from '@nestjs/graphql';
import { ClassroomInput } from '../entities/classroom.entity';
@InputType()
export class CreateClassroomInput extends ClassroomInput {}
