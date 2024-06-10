import { gql } from 'graphql-request';

export const LOGIN = gql`
  mutation Login($input: LoginUserInput!) {
    login(input: $input) {
      email
      id
      authorId
      name
      token
    }
  }
`;

export const GET_AUTHOR_ID_BY_USER_ID = gql`
  query User($userId: String!) {
    user(id: $userId) {
      author {
        id
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      email
    }
  }
`;
