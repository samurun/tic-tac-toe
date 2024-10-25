import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Square from '@/components/squre';

describe('Square', () => {
  it('renders with the correct value', () => {
    render(<Square value='X' onSquareClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button.textContent).to.equal('X');
  });

  it('has the correct CSS classes', () => {
    render(<Square value='O' onSquareClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button.className).to.include('aspect-square');
    expect(button.className).to.include('w-full');
    expect(button.className).to.include('h-full');
    expect(button.className).to.include('text-4xl');
    expect(button.className).to.include('font-bold');
    expect(button.className).to.include('shadow-none');
  });

  it('calls onSquareClick when clicked', () => {
    const mockOnClick = vi.fn();
    render(<Square value={null} onSquareClick={mockOnClick} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('renders with null value', () => {
    render(<Square value={null} onSquareClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button.textContent).to.equal('');
  });
});
