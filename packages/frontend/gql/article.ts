import { gql } from 'graphql-request';

export const GET_ALL_ARTICLES = gql`
  query Articles($filter: FindArticlesFilter!) {
    articles(filter: $filter) {
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
