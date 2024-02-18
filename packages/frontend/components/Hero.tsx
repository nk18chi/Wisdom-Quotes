import * as React from 'react';
import { Button } from '@nk18chi/components';
import { Typography } from '@mui/material';
import styled from '@emotion/styled';

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 12px;
`;

export default function Hero() {
  return (
    <HeroContainer>
      <Typography color="inherit" align="center" variant="h2">
        Welcome Back, NAME
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/premium-themes/onepirate/sign-up/"
        sx={{ minWidth: 200 }}
        label="Add Article"
      />
    </HeroContainer>
  );
}
