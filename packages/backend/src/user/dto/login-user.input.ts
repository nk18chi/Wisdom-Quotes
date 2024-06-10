import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginUserInput {
  @Field(() => String, { description: 'The email of User' })
  email: string;

  @Field(() => String, { description: 'The password of User' })
  password: string;
}
