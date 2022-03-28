import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProblemsService } from './problems.service';
import { ProblemsResolver } from './problems.resolver';
import { Problem, ProblemSchema } from './problems.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Problem.name, schema: ProblemSchema }]),
  ],
  providers: [ProblemsResolver, ProblemsService],
})
export class ProblemsModule {}
