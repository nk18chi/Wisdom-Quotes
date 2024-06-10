import { expect, describe, vi, it, beforeEach } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import nextAuthReact from 'next-auth/react';
import AppBar from './AppBar';

describe('components/AppBar', () => {
  beforeEach(() => {
    vi.spyOn(nextAuthReact, 'useSession').mockReturnValue({
      data: { user: null },
    } as any);
  });

  it('should show website name', () => {
    render(<AppBar />);
    expect(screen.getByText('Sample App')).toBeDefined();
  });
  it('should take users to top page when clicking the website name', async () => {
    const history = createMemoryHistory();
    render(<AppBar />);
    fireEvent.click(screen.getByText('Sample App'));
    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });
  it('should show links for guest on navbar', () => {
    render(<AppBar />);
    expect(screen.getByText('Sign In')).toBeDefined();
    expect(screen.getByText('Sign Up')).toBeDefined();
  });
  it('should show links for signed in users on navbar when a user is logged in', () => {
    vi.spyOn(nextAuthReact, 'useSession').mockReturnValue({
      data: { user: { id: '1', name: 'John' } },
    } as any);
    render(<AppBar />);
    expect(screen.getByText('Profile')).toBeDefined();
    expect(screen.getByText('Sign Out')).toBeDefined();
  });
});
