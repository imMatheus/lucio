import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ClassroomsService } from './classrooms.service';
import { ClassroomType } from './entities/classroom.entity';
import { CreateClassroomInput } from './dto/create-classroom.input';
import { UpdateClassroomInput } from './dto/update-classroom.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver(() => ClassroomType)
export class ClassroomsResolver {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Mutation(() => ClassroomType)
  createClassroom(
    @Args('createClassroomInput') createClassroomInput: CreateClassroomInput,
  ) {
    return this.classroomsService.create(createClassroomInput);
  }

  @Query(() => [ClassroomType], { name: 'classrooms' })
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context: any) {
    console.log('********************************');

    console.log(context.req.user);

    return this.classroomsService.findAll();
  }

  @Query(() => ClassroomType, { name: 'classroom' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.classroomsService.findOne(id);
  }

  @Mutation(() => ClassroomType)
  updateClassroom(
    @Args('updateClassroomInput') updateClassroomInput: UpdateClassroomInput,
  ) {
    return this.classroomsService.update(
      updateClassroomInput.id,
      updateClassroomInput,
    );
  }

  @Mutation(() => ClassroomType)
  removeClassroom(@Args('id', { type: () => Int }) id: number) {
    return this.classroomsService.remove(id);
  }
}
