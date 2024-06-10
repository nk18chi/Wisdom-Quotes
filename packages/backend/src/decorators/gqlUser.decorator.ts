import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GqlUser = createParamDecorator((_, context) => {
  const ctx = GqlExecutionContext.create(context);
  const { user } = ctx.getContext();
  return { _id: user.userId };
});
