import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useSession, useUser, ClerkProvider } from '@clerk/clerk-react';
import { useScore } from '@/features/api/use-score';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Navbar from '@/components/navbar';

// Mock the modules
vi.mock('@clerk/clerk-react', async () => {
  const actual = await vi.importActual('@clerk/clerk-react');
  return {
    ...actual,
    useSession: vi.fn(),
    useUser: vi.fn(),
    ClerkProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});
vi.mock('@/features/api/use-score');
vi.mock('@/components/account-button', () => ({
  default: () => <div data-testid='account-button'>Account Button</div>,
}));

// Create a mock ClerkProvider
const MockClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return <ClerkProvider publishableKey='mock_key'>{children}</ClerkProvider>;
};

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MockClerkProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </MockClerkProvider>
  );
};

describe('Navbar', () => {
  beforeEach(() => {
    vi.mocked(useSession).mockReturnValue({
      isSignedIn: false,
      isLoaded: true,
    } as any);
    vi.mocked(useUser).mockReturnValue({
      user: null,
      isLoaded: true,
    } as any);
    vi.mocked(useScore).mockReturnValue({ data: 100 } as any);
  });

  it('renders the title', () => {
    renderWithProviders(<Navbar />);
    expect(screen.getByText('Tic-Tac-Toe')).toBeDefined();
  });

  it('shows skeleton when session is not loaded', () => {
    vi.mocked(useSession).mockReturnValue({
      isSignedIn: false,
      isLoaded: false,
    } as any);
    vi.mocked(useUser).mockReturnValue({
      user: null,
      isLoaded: false,
    } as any);
    renderWithProviders(<Navbar />);
    expect(screen.getByTestId('skeleton-container')).toBeDefined();
  });

  it('shows score and account button when signed in', () => {
    vi.mocked(useSession).mockReturnValue({
      isSignedIn: true,
      isLoaded: true,
    } as any);
    vi.mocked(useUser).mockReturnValue({
      user: { id: '123', fullName: 'Test User' },
      isLoaded: true,
    } as any);
    renderWithProviders(<Navbar />);
    expect(screen.getByText('100')).toBeDefined();
    expect(screen.getByTestId('account-button')).toBeDefined();
  });

  it('shows nothing when signed out', () => {
    vi.mocked(useSession).mockReturnValue({
      isSignedIn: false,
      isLoaded: true,
    } as any);
    vi.mocked(useUser).mockReturnValue({
      user: null,
      isLoaded: true,
    } as any);
    renderWithProviders(<Navbar />);
    expect(screen.queryByText('100')).toBeNull();
    expect(screen.queryByTestId('account-button')).toBeNull();
  });
});
