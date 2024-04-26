import { GraphQLClient } from 'graphql-request';

export default function graphqlClient(token?: string) {
  return new GraphQLClient(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    headers: {
      ...(token && { authorization: `${token}` }),
    },
  });
}
