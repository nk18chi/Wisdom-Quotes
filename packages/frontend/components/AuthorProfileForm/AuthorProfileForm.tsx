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
import { CREATE_ARTICLE, UPDATE_ARTICLE } from '@/gql/article';
import { UpdateAuthorFilter } from '@/gql/types';
import { ArticleAction } from '@/enum/article.enum';
import { CREATE_AUTHOR, UPDATE_AUTHOR } from '@/gql/author';

interface IAuthorProfileFormInput {
  name: string;
}

export default function AuthorProfileForm() {
  const { data: session } = useSession();
  const client = graphqlClient(session?.accessToken);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IAuthorProfileFormInput>({
    defaultValues: {
      name: session?.user.name ?? '',
    },
  });
  const router = useRouter();
  const [requestErrors, setRequestErrors] = React.useState<string[]>([]);
  const onSubmit: SubmitHandler<IAuthorProfileFormInput> = async (data) => {
    let res: any;
    if (!session?.user.authorId) {
      res = await client.request(CREATE_AUTHOR, {
        input: data,
      });
    } else {
      res = await client.request(UPDATE_AUTHOR, {
        input: data,
      });
    }
    if (res.error) {
      setRequestErrors([res.error]);
      return;
    }
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
          {...register('name', {
            required: 'Name is required',
          })}
          autoFocus
          fullWidth
          label="Author Name"
          margin="normal"
          name="name"
          required
          error={!!errors.name}
          helperText={!!errors.name ? errors.name.message : ''}
        />
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
          label={isSubmitting ? 'In progress…' : 'Save'}
          disabled={isSubmitting}
        />
      </Box>
    </React.Fragment>
  );
}
