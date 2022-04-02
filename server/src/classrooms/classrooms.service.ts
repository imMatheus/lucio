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
import { UserJwt } from '../auth/user-jwt.interface';
@Injectable()
export class ClassroomsService {
  constructor(
    @InjectModel(Classroom.name)
    private classroomModel: Model<ClassroomDocument>,
  ) {}

  async create(createClassroomInput: CreateClassroomInput, user: UserJwt) {
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
      owner: user.userId,
      code: code,
      members: [
        {
          role: RoleEnum.OWNER,
          userId: user.userId,
          email: user.email,
          name: user.username,
          joinedAt: new Date(),
        },
      ],
      theme: validateThemeColors(createClassroomInput.theme),
    };

    return this.classroomModel.create(data);
  }

  // takes in user id, and finds all classrooms where that user is a part of the members array
  findAll(id: string) {
    return this.classroomModel.find({ 'members.userId': id }).exec();
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
