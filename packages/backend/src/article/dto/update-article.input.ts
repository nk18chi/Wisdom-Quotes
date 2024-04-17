import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateArticleInput {
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
