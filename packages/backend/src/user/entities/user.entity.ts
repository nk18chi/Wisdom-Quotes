import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { description: 'The email of User' })
  email: number;

  @Field(() => Date, { description: 'The creation date of the User' })
  createdAt: string;

  @Field(() => Date, { description: 'The updated date of the User' })
  updatedAt: string;
}
