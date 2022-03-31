import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomsResolver } from './classrooms.resolver';
import { Classroom, ClassroomSchema } from './classrooms.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Classroom.name, schema: ClassroomSchema },
    ]),
  ],
  providers: [ClassroomsResolver, ClassroomsService],
})
export class ClassroomsModule {}
