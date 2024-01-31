import { CreateArticleInput } from './create-article.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {
  @Field(() => ID, { description: 'The id of the article' })
  id: string;

  @Field(() => String, { description: 'The title of the article' })
  title: string;

  @Field(() => String, { description: 'The content of the article' })
  content: string;

  @Field(() => Boolean, { description: 'The flag to publish the article' })
  published: boolean;
}
