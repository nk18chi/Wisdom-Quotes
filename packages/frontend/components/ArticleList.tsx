import * as React from 'react';
import lodash from 'lodash';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import styled from '@emotion/styled';

const ArticleListContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;
  gap: 12px;
  max-width: 75%;
  margin: auto;
`;

const table = {
  columns: [
    { key: 'id', name: '#' },
    { key: 'createdAt', name: 'Date' },
    { key: 'title', name: 'Title' },
    { key: 'content', name: 'Content' },
    { key: 'author.name', name: 'Author' },
  ],
  rows: [
    {
      id: '1',
      createdAt: new Date().toDateString(),
      title: 'Hello World!',
      content: 'This is my first post.',
      author: {
        name: 'John Smith',
      },
    },
    {
      id: '2',
      createdAt: new Date().toDateString(),
      title: 'Hello World! Part 2',
      content: 'This is my second post.',
      author: {
        name: 'John Smith',
      },
    },
  ],
};

export default function ArticleList() {
  return (
    <ArticleListContainer>
      <Typography color="inherit" align="center" variant="h2">
        Articles
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            {table.columns.map((column) => (
              <TableCell key={column.key}>{column.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {table.rows.map((row, index) => (
            <TableRow key={index}>
              {table.columns.map((column) => (
                <TableCell key={column.key}>
                  {lodash.get(row, column.key)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ArticleListContainer>
  );
}
