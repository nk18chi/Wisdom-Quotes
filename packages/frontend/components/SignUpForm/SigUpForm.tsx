'use client';

import * as React from 'react';
import { Box, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '@nk18chi/components';
import { useRouter } from 'next/navigation';
import { Cancel } from '@mui/icons-material/';
import graphqlClient from '@/service/graphqlClient';
import { SIGN_UP } from '@/gql/user';

interface ISignUpFormInput {
  email: string;
  password: string;
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISignUpFormInput>();
  const router = useRouter();
  const [requestErrors, setRequestErrors] = React.useState<string[]>([]);
  const onSubmit: SubmitHandler<ISignUpFormInput> = async (data) => {
    const client = graphqlClient();
    try {
      const res: any = await client.request(SIGN_UP, {
        input: data,
      });
      if (res.error) {
        setRequestErrors([res.error]);
        return;
      }
      router.push('/sign-in');
    } catch (error: any) {
      setRequestErrors(['Something went wrong']);
    }
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
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Entered value does not match email format',
            },
          })}
          autoComplete="email"
          autoFocus
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
          label={isSubmitting ? 'In progress…' : 'Sign Up'}
          disabled={isSubmitting}
        />
      </Box>
    </React.Fragment>
  );
}
