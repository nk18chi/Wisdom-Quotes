import { allow, rule, shield } from 'graphql-shield';

const isAuthenticated = rule()(async (_, __, context) => {
  return !!context.user;
});

export const permissions = shield({
  Query: {
    '*': isAuthenticated,
    author: allow,
    user: allow,
    article: allow,
    articles: allow,
  },
  Mutation: {
    '*': isAuthenticated,
    createUser: allow,
    login: allow,
  },
});
