import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateArticleInput {
  @Field(() => String, { description: 'The title of the article' })
  title: string;

  @Field(() => String, { description: 'The content of the article' })
  content: string;

  @Field(() => Boolean, { description: 'The flag to publish the article' })
  published: boolean;
}
