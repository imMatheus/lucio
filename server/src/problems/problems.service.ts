import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateProblemInput } from './dto/create-problem.input';
import { UpdateProblemInput } from './dto/update-problem.input';
import { Problem, ProblemDocument } from './problems.schema';

@Injectable()
export class ProblemsService {
  constructor(
    @InjectModel(Problem.name) private problemModel: Model<ProblemDocument>,
  ) {}

  create(createProblemInput: CreateProblemInput) {
    return 'This action adds a new problem';
  }

  async findAll(): Promise<Problem[]> {
    return this.problemModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} problem`;
  }

  update(id: number, updateProblemInput: UpdateProblemInput) {
    return `This action updates a #${id} problem`;
  }

  remove(id: number) {
    return `This action removes a #${id} problem`;
  }
}
