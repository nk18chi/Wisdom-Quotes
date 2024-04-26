import * as React from 'react';
import { Typography } from '@mui/material';
import FormContainer from '@/components/SignInForm/FormContainer';
import ArticleForm from '@/components/ArticleForm/ArticleForm';

function AddArticlePage() {
  return (
    <FormContainer>
      <Typography variant="h3" gutterBottom align="center">
        Add Article
      </Typography>
      <ArticleForm />
    </FormContainer>
  );
}

export default AddArticlePage;
