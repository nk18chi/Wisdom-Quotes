import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateAuthorFilter {
  @Field(() => String)
  userId: string;
}
