import * as React from 'react';
import { Link, Typography } from '@mui/material';
import BackgroundContainer from '@/components/Container/BackgroundContainer';
import SignUpForm from '@/components/SignUpForm/SigUpForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

async function SignUp() {
  const session = await getServerSession(authOptions);
  if (session?.user.id) {
    redirect('/');
  }
  return (
    <BackgroundContainer>
      <Typography variant="h3" gutterBottom align="center">
        Sign Up
      </Typography>
      <Typography variant="body2" align="center">
        <Link href="/sign-in/" align="center" underline="always">
          Already have an account?
        </Link>
      </Typography>
      <SignUpForm />
    </BackgroundContainer>
  );
}

export default SignUp;
