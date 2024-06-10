import { expect, describe, vi, it, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from './Hero';
import nextAuthReact from 'next-auth/react';

describe('components/Hero', () => {
  beforeEach(() => {
    vi.spyOn(nextAuthReact, 'useSession').mockReturnValue({
      data: { user: { id: '1', name: 'John' } },
    } as any);
  });
  it('should show user name in heading', () => {
    render(<Hero />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Welcome Back, John' }),
    ).toBeDefined();
  });
  it('should show "Guest" as user name in heading if a user does not have an author account yet', () => {
    vi.spyOn(nextAuthReact, 'useSession').mockReturnValue({
      data: { user: { id: '1', name: null } },
    } as any);
    render(<Hero />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Welcome Back, Guest' }),
    ).toBeDefined();
  });
  it('should hide this component if a user is not logged in', () => {
    vi.spyOn(nextAuthReact, 'useSession').mockReturnValue({
      data: { user: null },
    } as any);
    const { container } = render(<Hero />);
    expect(container.innerHTML).toEqual('');
  });
});
