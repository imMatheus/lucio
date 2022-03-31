import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClassroomInput } from './dto/create-classroom.input';
import { UpdateClassroomInput } from './dto/update-classroom.input';
import { Classroom, ClassroomDocument } from './classrooms.schema';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectModel(Classroom.name)
    private classroomModel: Model<ClassroomDocument>,
  ) {}

  create(createClassroomInput: CreateClassroomInput) {
    return 'This action adds a new classroom';
  }

  findAll() {
    return this.classroomModel.find().exec();
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
