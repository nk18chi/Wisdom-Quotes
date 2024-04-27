import * as React from 'react';
import { Typography } from '@mui/material';
import BackgroundContainer from '@/components/Container/BackgroundContainer';
import ArticleForm from '@/components/ArticleForm/ArticleForm';

function AddArticlePage() {
  return (
    <BackgroundContainer>
      <Typography variant="h3" gutterBottom align="center">
        Add Article
      </Typography>
      <ArticleForm />
    </BackgroundContainer>
  );
}

export default AddArticlePage;
