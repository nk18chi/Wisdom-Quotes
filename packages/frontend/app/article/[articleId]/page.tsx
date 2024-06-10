import * as React from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import BackgroundContainer from '@/components/Container/BackgroundContainer';
import ArticleForm from '@/components/ArticleForm/ArticleForm';
import graphqlClient from '@/service/graphqlClient';
import { GET_ONE_ARTICLE } from '@/gql/article';
import { NextRequest } from 'next/server';
import { notFound } from 'next/navigation';
import { Article } from '@/gql/types';
import { DateTime } from 'luxon';

interface ArticlePageProps {
  params: {
    articleId: string;
  };
}

async function ArticlePage({ params }: ArticlePageProps) {
  if (!params.articleId) {
    return notFound();
  }
  const client = graphqlClient();
  const { article } = await client.request<{ article: Article }>(
    GET_ONE_ARTICLE,
    {
      articleId: params.articleId,
    },
  );
  if (!article || !article.published) {
    return notFound();
  }
  return (
    <BackgroundContainer>
      <Typography variant="h1" gutterBottom align="center" className="text-3xl">
        {article.title}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar alt={article.author.name} />
          <p className="text-left">{article.author.name}</p>{' '}
        </Stack>
        <p className="text-left">
          Creation Date:{' '}
          {DateTime.fromISO(article.createdAt).toLocaleString(
            DateTime.DATE_MED,
          )}
        </p>
      </Stack>

      <p className="whitespace-pre-line text-left">{article.content}</p>
      <p className="text-left">
        Last Updated Date:{' '}
        {DateTime.fromISO(article.updatedAt).toLocaleString(DateTime.DATE_MED)}
      </p>
    </BackgroundContainer>
  );
}

export default ArticlePage;
