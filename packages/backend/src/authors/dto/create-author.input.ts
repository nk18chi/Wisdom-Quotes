import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field(() => String, { description: 'The name of Author' })
  name: string;

  @Field(() => ID, { description: 'The id of User' })
  userId: string;
}
