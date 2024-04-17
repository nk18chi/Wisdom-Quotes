import { gql } from 'graphql-request';

export const LOGIN = gql`
  mutation Login($input: LoginUserInput!) {
    login(input: $input) {
      email
      id
      name
      token
    }
  }
`;
