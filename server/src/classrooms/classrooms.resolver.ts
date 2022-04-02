import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { ClassroomsService } from './classrooms.service';
import { ClassroomType } from './entities/classroom.entity';
import { CreateClassroomInput } from './dto/create-classroom.input';
import { UpdateClassroomInput } from './dto/update-classroom.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MyContext } from '@Types/MyContext';
@Resolver(() => ClassroomType)
export class ClassroomsResolver {
  constructor(private readonly classroomsService: ClassroomsService) {}

  @Mutation(() => ClassroomType)
  @UseGuards(JwtAuthGuard)
  createClassroom(
    @Args('createClassroomInput') createClassroomInput: CreateClassroomInput,
    @Context() context: MyContext,
  ) {
    const user = context.req.user;

    return this.classroomsService.create(createClassroomInput, user);
  }

  @Query(() => [ClassroomType], { name: 'classrooms' })
  @UseGuards(JwtAuthGuard)
  findAll(@Context() context: MyContext) {
    const user = context.req.user;

    return this.classroomsService.findAll(user.userId);
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
