import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpdateArticleFilter {
  @Field(() => ID, { description: 'The id of the article' })
  id: string;
}
