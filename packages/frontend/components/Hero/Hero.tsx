'use client';

import * as React from 'react';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useSession } from 'next-auth/react';

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 12px;
`;

export default function Hero() {
  const { data: session } = useSession();
  if (!session?.user) {
    return null;
  }
  return (
    <HeroContainer>
      <Typography color="inherit" align="center" variant="h2">
        {`Welcome Back, ${session?.user.name ?? 'Guest'}`}
      </Typography>
    </HeroContainer>
  );
}
