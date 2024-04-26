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
import { Article, LoginUser } from '@/gql/types';
import ArticleListContainer from './ListContainer';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { GET_AUTHOR_ID_BY_USER_ID } from '@/gql/user';
import AddArticleButton from './AddArticleButton';

const columns = [
  { key: 'id', name: '#' },
  { key: 'createdAt', name: 'Date' },
  { key: 'title', name: 'Title' },
  { key: 'content', name: 'Content' },
  { key: 'author.name', name: 'Author' },
];

export default async function OwnArticleList() {
  const session: { user: LoginUser } | null =
    await getServerSession(authOptions);
  if (!session?.user.id) {
    return null;
  }

  const client = graphqlClient();
  const { user } = await client.request<{
    user: { author?: { id: string } };
  }>(GET_AUTHOR_ID_BY_USER_ID, {
    userId: session.user.id,
  });
  if (!user?.author?.id) {
    return null;
  }
  const { articles }: { articles: Article[] } = await client.request(
    GET_ALL_ARTICLES,
    {
      filter: {
        authorId: user.author.id,
      },
    },
  );

  return (
    <ArticleListContainer>
      <Typography color="inherit" align="center" variant="h2">
        Your Articles
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
      <AddArticleButton />
    </ArticleListContainer>
  );
}
