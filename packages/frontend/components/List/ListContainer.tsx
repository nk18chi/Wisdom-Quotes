'use client';

import * as React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 12px;
  max-width: 75%;
  margin: auto;
`;

const columns = [
  { key: 'id', name: '#' },
  { key: 'createdAt', name: 'Date' },
  { key: 'title', name: 'Title' },
  { key: 'content', name: 'Content' },
  { key: 'author.name', name: 'Author' },
];

export default function ArticleListContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Container>{children}</Container>;
}
