import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import jwt from 'jsonwebtoken';

export const GqlUser = createParamDecorator((_, context) => {
  const ctx = GqlExecutionContext.create(context);
  const { req } = ctx.getContext();
  try {
    const payload = jwt.verify(
      req.headers.authorization,
      process.env.TOKEN_SECRET_KEY as string,
    ) as { userId: string };
    return { _id: payload.userId };
  } catch {
    return null;
  }
});
