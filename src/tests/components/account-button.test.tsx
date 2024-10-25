import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AccountButton from '@/components/account-button';
import { useClerk } from '@clerk/clerk-react';

// Mock the Clerk hooks
vi.mock('@clerk/clerk-react', () => ({
  useUser: vi.fn(() => ({
    user: {
      imageUrl: 'https://example.com/avatar.jpg',
      firstName: 'John',
      fullName: 'John Doe',
      emailAddresses: [{ emailAddress: 'john@example.com' }],
    },
  })),
  useClerk: vi.fn(() => ({
    signOut: vi.fn(),
  })),
}));

// Mock the UI components
vi.mock('@/components/ui/avatar', () => ({
  Avatar: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='avatar'>{children}</div>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid='avatar-image' />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='avatar-fallback'>{children}</div>
  ),
}));

vi.mock('@/components/ui/dropdown-menu', () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='dropdown-menu'>{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='dropdown-trigger'>{children}</div>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='dropdown-content'>{children}</div>
  ),
  DropdownMenuItem: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <div data-testid='dropdown-item' onClick={onClick}>
      {children}
    </div>
  ),
  DropdownMenuSeparator: () => <div data-testid='dropdown-separator' />,
}));

vi.mock('lucide-react', () => ({
  LogOut: () => <div data-testid='logout-icon' />,
}));

describe('AccountButton', () => {
  it('renders the avatars with correct image and fallback', () => {
    render(<AccountButton />);
    const avatarImages = screen.getAllByTestId('avatar-image');
    expect(avatarImages.length).to.equal(2);
    avatarImages.forEach((avatarImage) => {
      expect(avatarImage.getAttribute('src')).to.equal(
        'https://example.com/avatar.jpg'
      );
      expect(avatarImage.getAttribute('alt')).to.equal('John');
    });

    const avatarFallbacks = screen.getAllByTestId('avatar-fallback');
    expect(avatarFallbacks.length).to.equal(2);
    avatarFallbacks.forEach((avatarFallback) => {
      expect(avatarFallback.textContent).to.equal('J');
    });
  });

  it('renders the dropdown menu with user information', () => {
    render(<AccountButton />);
    const dropdownContent = screen.getByTestId('dropdown-content');
    expect(dropdownContent).to.exist;
    expect(dropdownContent.textContent).to.include('John Doe');
    expect(dropdownContent.textContent).to.include('john@example.com');
  });

  it('calls signOut when logout button is clicked', () => {
    const mockSignOut = vi.fn();
    vi.mocked(useClerk).mockReturnValue({ signOut: mockSignOut } as any);
    render(<AccountButton />);
    const logoutButton = screen.getAllByTestId('dropdown-item')[1];
    fireEvent.click(logoutButton);
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });
});
