import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class GenerateAuthenticationTokenInput {
  @Field(() => String, { description: 'The unique identifier of User' })
  userId: string;

  @Field(() => String || Int, {
    description: 'The expiration time of token, 1h or 3600',
    nullable: true,
  })
  expiryTime?: string;
}
