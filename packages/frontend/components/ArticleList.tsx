import * as React from 'react';
import lodash from 'lodash';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import styled from '@emotion/styled';
import { GET_ALL_ARTICLES } from '@/gql/article';
import graphqlClient from '@/service/graphqlClient';
import { Article } from '@/gql/types';

const ArticleListContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 12px;
  max-width: 75%;
  margin: auto;
`;

const columns = [
  { key: 'id', name: '#' },
  { key: 'createdAt', name: 'Date' },
  { key: 'title', name: 'Title' },
  { key: 'content', name: 'Content' },
  { key: 'author.name', name: 'Author' },
];

export default async function ArticleList() {
  const client = graphqlClient();
  const { articles }: { articles: Article[] } = await client.request(
    GET_ALL_ARTICLES,
    {},
  );

  console.log(articles);

  return (
    <ArticleListContainer>
      <Typography color="inherit" align="center" variant="h2">
        Articles
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key}>{column.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.map((article, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key}>
                  {lodash.get(article, column.key)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ArticleListContainer>
  );
}
