import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SignedInUser {
  @Field(() => String, { description: 'The _id of GqlUser' })
  _id: string;
}
