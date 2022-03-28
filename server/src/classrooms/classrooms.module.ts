import { Module } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { ClassroomsResolver } from './classrooms.resolver';

@Module({
  providers: [ClassroomsResolver, ClassroomsService]
})
export class ClassroomsModule {}
