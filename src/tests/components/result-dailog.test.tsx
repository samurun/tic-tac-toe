import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { useUser } from '@clerk/clerk-react';
import ResultDialog from '@/components/result-dailog';

// Mock the useUser hook
vi.mock('@clerk/clerk-react', () => ({
  useUser: vi.fn(),
}));

describe('ResultDialog', () => {
  const mockSetOpen = vi.fn();
  const mockHandleReset = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useUser).mockReturnValue({
      isLoaded: true,
      isSignedIn: true,
      user: {
        id: 'test-id',
        firstName: 'John',
        primaryEmailAddress: { emailAddress: 'john@example.com' },
      } as any,
    });
  });

  it('renders correctly when X wins', () => {
    render(
      <ResultDialog
        open={true}
        setOpen={mockSetOpen}
        winner='X'
        handleReset={mockHandleReset}
      />
    );

    expect(screen.getByText('Congratulations, John!')).toBeDefined();
    expect(screen.getByText("You're the winner of this round.")).toBeDefined();
    expect(screen.getByText('+1 points')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Restart game' })).toBeDefined();
  });

  it('renders correctly when O wins', () => {
    render(
      <ResultDialog
        open={true}
        setOpen={mockSetOpen}
        winner='O'
        handleReset={mockHandleReset}
      />
    );

    expect(screen.getByText('Better luck next time, Player!')).toBeDefined();
    expect(
      screen.getByText("Don't give up, you'll do better in the next round.")
    ).toBeDefined();
    expect(screen.getByText('-1 points')).toBeDefined();
  });

  it('renders correctly for a draw', () => {
    render(
      <ResultDialog
        open={true}
        setOpen={mockSetOpen}
        winner={null}
        handleReset={mockHandleReset}
      />
    );

    expect(screen.getByText('Great game')).toBeDefined();
    expect(
      screen.getByText("It's a draw! Great game, both players!")
    ).toBeDefined();
    expect(screen.getByText('0 points')).toBeDefined();
  });

  it('calls setOpen and handleReset when restart button is clicked', () => {
    render(
      <ResultDialog
        open={true}
        setOpen={mockSetOpen}
        winner='X'
        handleReset={mockHandleReset}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Restart game' }));

    expect(mockSetOpen).toHaveBeenCalledWith(false);
    expect(mockHandleReset).toHaveBeenCalled();
  });
});
