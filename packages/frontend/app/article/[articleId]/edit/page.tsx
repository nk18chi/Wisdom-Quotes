import * as React from 'react';
import { Typography } from '@mui/material';
import BackgroundContainer from '@/components/Container/BackgroundContainer';
import ArticleForm from '@/components/ArticleForm/ArticleForm';
import { notFound } from 'next/navigation';
import graphqlClient from '@/service/graphqlClient';
import { Article } from '@/gql/types';
import { GET_ONE_ARTICLE } from '@/gql/article';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { ArticleAction } from '@/enum/article.enum';

interface AddArticlePageProps {
  params: {
    articleId: string;
  };
}
async function AddArticlePage({ params }: AddArticlePageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) {
    return notFound();
  }
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
  if (!article || session?.user.id !== article.author.user.id) {
    return notFound();
  }
  return (
    <BackgroundContainer>
      <Typography variant="h3" gutterBottom align="center">
        Edit Article
      </Typography>
      <ArticleForm
        type={ArticleAction.UPDATE}
        defaultValues={{
          title: article.title,
          content: article.content,
          published: article.published,
        }}
        filter={{ id: params.articleId }}
      />
    </BackgroundContainer>
  );
}

export default AddArticlePage;
