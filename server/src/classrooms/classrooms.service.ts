import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClassroomInput } from './dto/create-classroom.input';
import { UpdateClassroomInput } from './dto/update-classroom.input';
import { ClassRoom, ClassRoomDocument } from './classrooms.schema';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectModel(ClassRoom.name)
    private classRoomModel: Model<ClassRoomDocument>,
  ) {}

  create(createClassroomInput: CreateClassroomInput) {
    return 'This action adds a new classroom';
  }

  findAll() {
    return this.classRoomModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} classroom`;
  }

  update(id: number, updateClassroomInput: UpdateClassroomInput) {
    return `This action updates a #${id} classroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} classroom`;
  }
}
