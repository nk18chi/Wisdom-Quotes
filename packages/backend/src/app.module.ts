import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthorModule } from './author/author.module';
import { UserModule } from './user/user.module';
import { ArticleModule } from './article/article.module';
import { applyMiddleware } from 'graphql-middleware';
import { GraphQLSchema } from 'graphql';
import { permissions } from './graphql-shield/permission';
import jwt from 'jsonwebtoken';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }) => ({
        user: req.headers.authorization
          ? jwt.verify(
              req.headers.authorization,
              process.env.TOKEN_SECRET_KEY as string,
            )
          : null,
      }),
      transformSchema: (schema: GraphQLSchema) => {
        schema = applyMiddleware(schema, permissions);
        return schema;
      },
    }),
    AuthorModule,
    UserModule,
    ArticleModule,
  ],
})
export class AppModule {}
