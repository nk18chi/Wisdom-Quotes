import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Author {
  @Field(() => String, { description: 'Example field (placeholder)' })
  exampleField: string;
}
