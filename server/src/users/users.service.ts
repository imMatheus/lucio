import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  create(createUserInput: CreateUserInput) {
    const hashed = bcrypt.hashSync(createUserInput.password, 10); // hash password

    return this.userModel.create({ ...createUserInput, password: hashed });
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  findByName(name: string) {
    return this.userModel.findOne({ name }).exec();
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    console.log(updateUserInput);

    return this.userModel.findByIdAndUpdate(id, updateUserInput).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
