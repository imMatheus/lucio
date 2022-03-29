import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomsResolver } from './classrooms.resolver';
import { ClassRoom, ClassRoomSchema } from './classrooms.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ClassRoom.name, schema: ClassRoomSchema },
    ]),
  ],
  providers: [ClassroomsResolver, ClassroomsService],
})
export class ClassroomsModule {}
