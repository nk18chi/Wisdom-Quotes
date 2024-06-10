import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorInput {
  @Field(() => String)
  name: string;
}
