'use client';

import * as React from 'react';
import { Box, Link, AppBar as MuiAppBar, Toolbar } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

const GuestUserLinks = () => {
  return (
    <>
      <Link
        color="inherit"
        variant="h6"
        underline="none"
        href="/sign-in"
        sx={rightLink}
      >
        {'Sign In'}
      </Link>
      <Link
        variant="h6"
        underline="none"
        href="/sign-up/"
        sx={{ ...rightLink, color: 'secondary.main' }}
      >
        {'Sign Up'}
      </Link>
    </>
  );
};

const SignedInUserLinks = () => {
  return (
    <>
      <Link
        color="inherit"
        variant="h6"
        underline="none"
        href="/profile"
        sx={rightLink}
      >
        {'Profile'}
      </Link>
      <Link
        component="button"
        variant="h6"
        underline="none"
        onClick={() => signOut()}
        sx={{ ...rightLink, color: 'secondary.main' }}
      >
        {'Sign Out'}
      </Link>
    </>
  );
};

const AppBar = () => {
  const { data: session } = useSession();
  return (
    <div>
      <MuiAppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'Sample App'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {session?.user ? <SignedInUserLinks /> : <GuestUserLinks />}
          </Box>
        </Toolbar>
      </MuiAppBar>
      <Toolbar />
    </div>
  );
};

export default AppBar;
