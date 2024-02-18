import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import AppBar from '../AppBar';

test('components/AppBar', () => {
  render(<AppBar />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'Hello' }),
  ).toBeDefined();
});
