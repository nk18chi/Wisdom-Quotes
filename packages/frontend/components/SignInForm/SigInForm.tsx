'use client';

import * as React from 'react';
import { Box, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@nk18chi/components';
import graphqlClient from '@/service/graphqlClient';
import { LOGIN } from '@/gql/user';
import { useRouter } from 'next/navigation';
import { Cancel } from '@mui/icons-material/';
import { signIn } from 'next-auth/react';

interface ISignInFormInput {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISignInFormInput>();
  const router = useRouter();
  const [requestErrors, setRequestErrors] = React.useState<string[]>([]);
  const onSubmit: SubmitHandler<ISignInFormInput> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res: any = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (res.error) {
      setRequestErrors([res.error]);
      return;
    }
    router.push('/');
  };

  console.log('error', requestErrors);

  return (
    <React.Fragment>
      <Box
        onSubmit={handleSubmit(onSubmit)}
        component="form"
        noValidate
        sx={{ mt: 2 }}
      >
        <TextField
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          })}
          autoComplete="email"
          autoFocus
          // disabled={submitting || sent}
          fullWidth
          label="Email"
          margin="normal"
          name="email"
          required
          error={!!errors.email}
          helperText={!!errors.email ? errors.email.message : ''}
        />
        <TextField
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'min length is 5',
            },
          })}
          fullWidth
          // disabled={submitting || sent}
          required
          name="password"
          autoComplete="current-password"
          label="Password"
          type="password"
          margin="normal"
          error={!!errors.password}
          helperText={!!errors.password ? errors.password.message : ''}
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
          label={isSubmitting ? 'In progress…' : 'Sign In'}
          disabled={isSubmitting}
        />
      </Box>
    </React.Fragment>
  );
}
