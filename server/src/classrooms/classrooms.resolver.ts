import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClassroomsService } from './classrooms.service';
import { Classroom } from './entities/classroom.entity';
import { CreateClassroomInput } from './dto/create-classroom.input';
import { UpdateClassroomInput } from './dto/update-classroom.input';

@Resolver(() => Classroom)
export class ClassroomsResolver {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Mutation(() => Classroom)
  createClassroom(@Args('createClassroomInput') createClassroomInput: CreateClassroomInput) {
    return this.classroomsService.create(createClassroomInput);
  }

  @Query(() => [Classroom], { name: 'classrooms' })
  findAll() {
    return this.classroomsService.findAll();
  }

  @Query(() => Classroom, { name: 'classroom' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.classroomsService.findOne(id);
  }

  @Mutation(() => Classroom)
  updateClassroom(@Args('updateClassroomInput') updateClassroomInput: UpdateClassroomInput) {
    return this.classroomsService.update(updateClassroomInput.id, updateClassroomInput);
  }

  @Mutation(() => Classroom)
  removeClassroom(@Args('id', { type: () => Int }) id: number) {
    return this.classroomsService.remove(id);
  }
}
