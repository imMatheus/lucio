import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDocument } from './users.schema';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserInput: CreateUserInput) {
    const hashed = bcrypt.hashSync(createUserInput.password, 10); // hash password

    const user = await this.userModel.create({
      ...createUserInput,
      password: hashed,
    });

    // needs to be added because graphql expects a "id" field and not "_id"
    user.id = user._id;

    return user;
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

  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async findByEmailAndPassword(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) return null;
    const passwordsEqual = bcrypt.compareSync(password, user.password); // make sure password matches

    if (passwordsEqual) return null;

    const userWithOutPassword = await this.userModel
      .findOne({ email }, { password: 0 })
      .exec();

    userWithOutPassword.id = userWithOutPassword._id;

    return userWithOutPassword;
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    console.log(updateUserInput);

    return this.userModel.findByIdAndUpdate(id, updateUserInput).exec();
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
