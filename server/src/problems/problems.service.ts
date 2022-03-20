import { Injectable } from '@nestjs/common';
import { CreateProblemInput } from './dto/create-problem.input';
import { UpdateProblemInput } from './dto/update-problem.input';

@Injectable()
export class ProblemsService {
  create(createProblemInput: CreateProblemInput) {
    return 'This action adds a new problem';
  }

  findAll() {
    return `This action returns all problems`;
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
