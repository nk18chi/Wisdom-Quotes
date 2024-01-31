import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Author {
  @Field(() => ID, { description: 'The unique identifier of Author' })
  id: string;
  @Field(() => String, { description: 'The name of Author' })
  name: string;
  @Field(() => User, { description: 'The user info of Author' })
  user: User;
}
