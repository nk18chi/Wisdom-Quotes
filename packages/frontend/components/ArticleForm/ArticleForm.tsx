'use client';

import * as React from 'react';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@nk18chi/components';
import { useRouter } from 'next/navigation';
import { Cancel } from '@mui/icons-material/';
import { useSession } from 'next-auth/react';
import graphqlClient from '@/service/graphqlClient';
import { CREATE_ARTICLE } from '@/gql/article';

interface IArticleFormInput {
  title: string;
  content: string;
  published: boolean;
}

export default function ArticleForm() {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IArticleFormInput>();
  const router = useRouter();
  const [requestErrors, setRequestErrors] = React.useState<string[]>([]);
  const onSubmit: SubmitHandler<IArticleFormInput> = async (data) => {
    const client = graphqlClient(session?.accessToken);
    await client.request(CREATE_ARTICLE, {
      input: data,
    });
    router.push('/');
  };

  return (
    <React.Fragment>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        sx={{ mt: 2 }}
      >
        <TextField
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 5,
              message: 'min length is 5',
            },
          })}
          autoFocus
          fullWidth
          label="Title"
          margin="normal"
          name="title"
          required
          error={!!errors.title}
          helperText={!!errors.title ? errors.title.message : ''}
        />
        <TextField
          {...register('content', {
            required: 'Content is required',
            minLength: {
              value: 20,
              message: 'min length is 20',
            },
          })}
          multiline
          rows={5}
          fullWidth
          required
          name="content"
          label="content"
          type="text"
          margin="normal"
          error={!!errors.content}
          helperText={!!errors.content ? errors.content.message : ''}
        />
        <FormGroup>
          <FormControlLabel
            label="Published"
            control={<Checkbox defaultChecked {...register('published')} />}
          />
        </FormGroup>
        {requestErrors.map((error, i) => (
          <Box component="p" key={i} sx={{ color: 'error.main' }}>
            <Cancel sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
            {error}
          </Box>
        ))}
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          size="large"
          sx={{ minWidth: 200, mt: 2 }}
          label={isSubmitting ? 'In progress…' : 'Add Article'}
          disabled={isSubmitting}
        />
      </Box>
    </React.Fragment>
  );
}
