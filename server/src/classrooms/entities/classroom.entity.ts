import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Classroom {
  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
