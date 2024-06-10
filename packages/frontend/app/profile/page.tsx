import * as React from 'react';
import { Typography } from '@mui/material';
import BackgroundContainer from '@/components/Container/BackgroundContainer';
import ArticleForm from '@/components/ArticleForm/ArticleForm';
import { ArticleAction } from '@/enum/article.enum';
import AuthorProfileForm from '@/components/AuthorProfileForm/AuthorProfileForm';

function UpdateProfilePage() {
  return (
    <BackgroundContainer>
      <Typography variant="h3" gutterBottom align="center">
        Profile
      </Typography>
      <AuthorProfileForm />
    </BackgroundContainer>
  );
}

export default UpdateProfilePage;
