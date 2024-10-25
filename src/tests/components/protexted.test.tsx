import Protected from '@/components/protected';
import { useUser } from '@clerk/clerk-react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, vi, expect } from 'vitest';

// Mock the @clerk/clerk-react module
vi.mock('@clerk/clerk-react', () => ({
  useUser: vi.fn(),
}));

describe('Protected', () => {
  it('renders children when user is signed in', () => {
    (useUser as ReturnType<typeof vi.fn>).mockReturnValue({ isSignedIn: true });
    render(
      <MemoryRouter>
        <Protected>
          <div data-testid='protected-content'>Protected Content</div>
        </Protected>
      </MemoryRouter>
    );

    expect(screen.getByTestId('protected-content')).toBeDefined();
  });

  it('redirects to home when user is not signed in', () => {
    (useUser as ReturnType<typeof vi.fn>).mockReturnValue({
      isSignedIn: false,
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Protected>
          <div data-testid='protected-content'>Protected Content</div>
        </Protected>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('protected-content')).toBeNull();
    expect(container.innerHTML).toBe('');
  });
});
