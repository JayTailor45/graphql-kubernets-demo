import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app/app.resolver';
import { join } from 'path';

@Module({
  imports: [GraphQLModule.forRoot({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    playground: false,
    plugins: [ ApolloServerPluginLandingPageLocalDefault()],
    driver: ApolloDriver,
    context: ({req}) => ({ headers: req.headers})
  })],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
