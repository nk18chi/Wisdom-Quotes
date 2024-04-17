import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class LoginUser {
  @Field(() => ID, { description: 'The unique identifier of user' })
  id: string;

  @Field(() => String, { description: 'The name of Author', nullable: true })
  name?: string | null;

  @Field(() => String, { description: 'The email of User' })
  email: string;

  @Field(() => String, { description: 'The token of User' })
  token: string;
}
