import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProblemsService } from './problems.service';
import { Problem } from './entities/problem.entity';
import { CreateProblemInput } from './dto/create-problem.input';
import { UpdateProblemInput } from './dto/update-problem.input';

@Resolver(() => Problem)
export class ProblemsResolver {
  constructor(private readonly problemsService: ProblemsService) {}

  @Mutation(() => Problem)
  createProblem(
    @Args('createProblemInput') createProblemInput: CreateProblemInput,
  ) {
    return this.problemsService.create(createProblemInput);
  }

  @Query(() => [Problem], { name: 'problems' })
  findAll() {
    return this.problemsService.findAll();
  }

  @Query(() => Problem, { name: 'problem' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.problemsService.findOne(id);
  }

  @Mutation(() => Problem)
  updateProblem(
    @Args('updateProblemInput') updateProblemInput: UpdateProblemInput,
  ) {
    return this.problemsService.update(
      updateProblemInput.id,
      updateProblemInput,
    );
  }

  @Mutation(() => Problem)
  removeProblem(@Args('id', { type: () => Int }) id: number) {
    return this.problemsService.remove(id);
  }
}
