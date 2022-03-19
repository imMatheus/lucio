import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AuthorsModule } from './authors/authors.module';
import { CatsModule } from './cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      // typePaths: ['./**/*.graphql'],
      // autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // sortSchema: true,
    }),

    ConfigModule.forRoot({
      // changes default env file that nest looks for
      envFilePath: '.env.local',
    }),
    // env variabel from .env.local file
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthorsModule,
    CatsModule,
  ],
  controllers: [AppController],
  // controllers: [AppController, AuthorController],
  providers: [AppService],
  // providers: [AppService, AuthorsService],
})
export class AppModule {}
