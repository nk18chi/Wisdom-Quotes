import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class FindArticlesFilter {
  @Field(() => Boolean, {
    description: 'Filter by published status',
    nullable: true,
  })
  published?: boolean;

  @Field(() => ID, { description: 'The id of the author', nullable: true })
  authorId?: string;
}
