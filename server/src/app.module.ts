import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ProblemsModule } from './problems/problems.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
    }),

    ConfigModule.forRoot({
      // changes default env file that nest looks for
      envFilePath: '.env.local',
    }),
    // env variabel from .env.local file
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ProblemsModule,
    UsersModule,
  ],
  controllers: [AppController],
  // controllers: [AppController, AuthorController],
  providers: [AppService],
  // providers: [AppService, AuthorsService],
})
export class AppModule {}
