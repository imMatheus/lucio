import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateClassroomInput } from './dto/create-classroom.input';
import { UpdateClassroomInput } from './dto/update-classroom.input';
import { Classroom, ClassroomDocument } from './classrooms.schema';
import { BaseClassroom as IClassroom } from './entities/classroom.interface';
import { generateClassroomCode } from '@Utils/generateClassroomCode';
import { validateThemeColors } from '@Utils/validateThemeColors';
import { RoleEnum } from '@/Types/enums/ClassroomRole.enum';

@Injectable()
export class ClassroomsService {
  constructor(
    @InjectModel(Classroom.name)
    private classroomModel: Model<ClassroomDocument>,
  ) {}

  async create(createClassroomInput: CreateClassroomInput) {
    let code: string;
    let isUniqueCode = false;

    // makes sure code is unique
    while (!isUniqueCode) {
      code = generateClassroomCode();
      isUniqueCode =
        (await this.classroomModel.findOne({ code }).exec()) === null;
    }

    const data: IClassroom = {
      ...createClassroomInput,
      owner: '621644aea84dd644878aa7f6',
      code: generateClassroomCode(),
      members: [
        {
          role: RoleEnum.OWNER,
          userId: '621644aea84dd644878aa7f6',
          email: 'asdasd@asdad.com',
          name: 'sss',
          joinedAt: new Date(),
        },
      ],
      theme: validateThemeColors(createClassroomInput.theme),
    };

    return this.classroomModel.create(data);
  }

  findAll() {
    return this.classroomModel.find().exec();
  }

  findOne(id: string) {
    return this.classroomModel.findById(id).exec();
  }

  update(id: number, updateClassroomInput: UpdateClassroomInput) {
    return `This action updates a #${id} classroom`;
  }

  remove(id: number) {
    return `This action removes a #${id} classroom`;
  }
}
