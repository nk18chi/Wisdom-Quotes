import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '../ProductHero';

test('components/Hero', () => {
  render(<Hero title="Hello" />);
  expect(
    screen.getByRole('heading', { level: 1, name: 'Hello' }),
  ).toBeDefined();
});
