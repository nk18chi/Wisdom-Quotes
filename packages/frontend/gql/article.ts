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

export const GET_ONE_ARTICLE = gql`
  query Article($articleId: String!) {
    article(id: $articleId) {
      id
      content
      createdAt
      published
      title
      updatedAt
      author {
        name
        user {
          id
        }
      }
    }
  }
`;

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($input: CreateArticleInput!) {
    createArticle(input: $input) {
      id
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle(
    $filter: UpdateArticleFilter!
    $input: UpdateArticleInput!
  ) {
    updateArticle(filter: $filter, input: $input) {
      id
    }
  }
`;
