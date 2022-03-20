import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsResolver } from './problems.resolver';

@Module({
  providers: [ProblemsResolver, ProblemsService]
})
export class ProblemsModule {}
