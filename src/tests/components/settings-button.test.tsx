import SettingsButton from '@/components/settings-button';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock the components from './ui' folder
vi.mock('../ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock('../ui/popover', () => ({
  Popover: ({ children }: any) => <div data-testid='popover'>{children}</div>,
  PopoverTrigger: ({ children }: any) => (
    <div data-testid='popover-trigger'>{children}</div>
  ),
  PopoverContent: ({ children }: any) => (
    <div data-testid='popover-content'>{children}</div>
  ),
}));

vi.mock('../ui/radio-group', () => ({
  RadioGroup: ({ children, onValueChange }: any) => (
    <div
      data-testid='radio-group'
      onChange={(e: any) => onValueChange(e.target.value)}
    >
      {children}
    </div>
  ),
  RadioGroupItem: ({ value }: any) => <input type='radio' value={value} />,
}));

vi.mock('../ui/label', () => ({
  Label: ({ children }: any) => <label>{children}</label>,
}));

describe('SettingsButton', () => {
  const mockHandleModeChange = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    render(
      <SettingsButton
        disabled={false}
        mode='easy'
        handleModeChange={mockHandleModeChange}
      />
    );
    expect(screen.getByRole('button')).toBeDefined();
    expect(screen.getByText('Open game settings')).toBeDefined();
  });

  it('disables the button when disabled prop is true', () => {
    render(
      <SettingsButton
        disabled={true}
        mode='easy'
        handleModeChange={mockHandleModeChange}
      />
    );
    const button = screen.getByRole('button');
    expect(button.getAttribute('disabled')).to.equal('');
  });
});
