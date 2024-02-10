import { CreateArticleInput } from './create-article.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {
  @Field(() => ID, { description: 'The id of the article' })
  id: string;

  @Field(() => String, {
    nullable: true,
    description: 'The title of the article',
  })
  title?: string;

  @Field(() => String, {
    nullable: true,
    description: 'The content of the article',
  })
  content?: string;

  @Field(() => Boolean, {
    nullable: true,
    description: 'The flag to publish the article',
  })
  published?: boolean;
}
