import { gql } from 'graphql-request';

export const GET_ALL_ARTICLES = gql`
  {
    articles {
      content
      id
      published
      title
      createdAt
      author {
        name
      }
    }
  }
`;
