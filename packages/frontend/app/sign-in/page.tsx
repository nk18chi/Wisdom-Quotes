import * as React from 'react';
import { Link, Typography } from '@mui/material';
import FormContainer from '@/components/SignInForm/FormContainer';
import SignInForm from '@/components/SignInForm/SigInForm';

function SignIn() {
  return (
    <FormContainer>
      <Typography variant="h3" gutterBottom align="center">
        Sign In
      </Typography>
      <Typography variant="body2" align="center">
        {'Not a member yet? '}
        <Link href="/sign-up/" align="center" underline="always">
          Sign Up here
        </Link>
      </Typography>
      <SignInForm />
    </FormContainer>
  );
}

export default SignIn;
