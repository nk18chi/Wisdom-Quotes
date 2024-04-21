import { ObjectType, Field } from '@nestjs/graphql';
import { Author } from '../../author/entities/author.entity';

@ObjectType()
export class User {
  @Field(() => String, { description: 'The email of User' })
  email: number;

  @Field(() => Author, { description: 'The author of User', nullable: true })
  author?: Author;

  @Field(() => Date, { description: 'The creation date of the User' })
  createdAt: string;

  @Field(() => Date, { description: 'The updated date of the User' })
  updatedAt: string;
}
