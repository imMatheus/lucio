import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
// import { Cat } from './cats.schema';
import { CatsService } from './cats.service';
import { Cat } from './entities/cats.entity';
import { CreateCatInput } from './dto/create-cat.input';

@Resolver()
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query(() => [Cat])
  cats() {
    return this.catsService.findAll();
  }

  @Mutation(() => Cat)
  createCat(@Args('input') input: CreateCatInput) {
    return this.catsService.create(input);
  }
}
