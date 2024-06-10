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
import { GET_ALL_ARTICLES } from '@/gql/article';
import graphqlClient from '@/service/graphqlClient';
import { Article } from '@/gql/types';
import ArticleListContainer from './ListContainer';
import { DateTime } from 'luxon';

const columns = [
  { key: 'id', name: '#' },
  { key: 'createdAt', name: 'Date' },
  { key: 'title', name: 'Title' },
  { key: 'content', name: 'Content' },
  { key: 'author.name', name: 'Author' },
  { key: 'link', name: 'Link' },
];

export default async function ArticleList() {
  const client = graphqlClient();
  const { articles }: { articles: Article[] } = await client.request(
    GET_ALL_ARTICLES,
    {
      filter: {
        published: true,
      },
    },
  );
  const normalizedArticles = articles.map((article) => ({
    ...article,
    link: <a href={`/article/${article.id}`}>Detail</a>,
    createdAt: DateTime.fromISO(article.createdAt).toLocaleString(
      DateTime.DATE_MED,
    ),
  }));

  return (
    <ArticleListContainer>
      <Typography color="inherit" align="center" variant="h2">
        All Articles
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
          {normalizedArticles.map((article, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column.key} className="truncate max-w-md">
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
