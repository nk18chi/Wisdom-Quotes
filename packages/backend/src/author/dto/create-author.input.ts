import { InputType, Field, ID, OmitType } from '@nestjs/graphql';

@InputType()
export class CreateAuthorInput {
  @Field(() => String, { description: 'The name of Author' })
  name: string;

  @Field(() => ID, { description: 'The id of User' })
  userId: string;
}

@InputType()
export class CreateAuthorResolverInput extends OmitType(CreateAuthorInput, [
  'userId',
] as const) {}
