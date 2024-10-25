import { it, expect, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import WelcomeScreen from '@/components/welcome-screen';
import Providers from '@/components/providers';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

const mockSignIn = vi.fn();

// Mock the Clerk components
vi.mock('@clerk/clerk-react', () => ({
  SignedOut: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='signed-out'>{children}</div>
  ),
  SignInButton: ({ children }: { children: React.ReactNode }) => (
    <button data-testid='sign-in-button' onClick={mockSignIn}>
      {children}
    </button>
  ),
  ClerkProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='clerk-provider'>{children}</div>
  ),
}));

describe('WelcomeScreen', () => {
  it('renders the welcome screen with correct content', () => {
    render(
      <MemoryRouter>
        <Providers>
          <WelcomeScreen />
        </Providers>
      </MemoryRouter>
    );

    // Check for the main heading
    expect(
      screen.getByRole('heading', { name: /Tic-Tac-Toe Challenge/ })
    ).toBeInTheDocument();

    // Check for the subheading
    expect(
      screen.getByText(/Challenge your skills against our intelligent bot!/i)
    ).toBeInTheDocument();

    // Check for the description
    expect(
      screen.getByText(
        /Choose your difficulty, make your moves, and aim for victory in this classic game of strategy./i
      )
    ).toBeInTheDocument();

    // Check for the Sign In button text
    expect(screen.getByTestId('signed-out')).toBeInTheDocument();

    // Check that the SignInButton component is rendered and clickable
    const signInButton = screen.getByTestId('sign-in-button');
    expect(signInButton).toBeInTheDocument();

    // Simulate a click on the SignInButton
    fireEvent.click(signInButton);

    // Check that the mockSignIn function was called
    expect(mockSignIn).toHaveBeenCalledTimes(1);
  });
});
