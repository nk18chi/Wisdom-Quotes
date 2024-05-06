import { gql } from 'graphql-request';

export const CREATE_AUTHOR = gql`
  mutation CreateAuthor($input: CreateAuthorResolverInput!) {
    createAuthor(input: $input) {
      id
    }
  }
`;

export const UPDATE_AUTHOR = gql`
  mutation UpdateAuthor($input: UpdateAuthorInput!) {
    updateAuthor(input: $input) {
      id
    }
  }
`;
