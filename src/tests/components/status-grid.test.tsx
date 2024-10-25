import StatusGrid from '@/components/status-grid';
import { getHistory } from '@/features/api/get-history';
import { HistoryType } from '@/types';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

const mockHistory: HistoryType[] = [
  { winner: 'X', createdAt: new Date().toISOString(), reward: 10 },
  { winner: 'O', createdAt: new Date().toISOString(), reward: 10 },
  { winner: null, createdAt: new Date().toISOString(), reward: 10 },
  { winner: 'X', createdAt: new Date().toISOString(), reward: 10 },
  { winner: 'O', createdAt: new Date().toISOString(), reward: 10 },
  { winner: 'X', createdAt: new Date().toISOString(), reward: 10 },
];

vi.mock('@/features/api/get-history', () => ({
  getHistory: vi.fn(),
}));

describe('StatusGrid', () => {
  it('renders correct counts for player wins, draws, and computer wins', () => {
    // Mock data

    // Set up the mock return value
    vi.mocked(getHistory).mockReturnValue({
      data: mockHistory,
      isSuccess: true,
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<StatusGrid />);

    // Log the entire document body for debugging
    console.log(document.body.innerHTML);

    expect(screen.getByText('3')).toBeDefined(); // Player (X) wins
    expect(screen.getByText('1')).toBeDefined(); // Ties 1
    expect(screen.getByText('2')).toBeDefined(); // Computer (2) wins
  });
});
