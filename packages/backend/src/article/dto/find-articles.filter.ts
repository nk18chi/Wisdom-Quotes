import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class FindArticlesFilter {
  @Field(() => ID, { description: 'The id of the author', nullable: true })
  authorId?: string;
}
