'use client';

import * as React from 'react';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

const Container = styled(Box)`
  background-color: #fff5f8;
  max-width: 600px;
  margin: 32px auto;
  padding: 32px;
  text-align: center;
`;

export default function BackgroundContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
