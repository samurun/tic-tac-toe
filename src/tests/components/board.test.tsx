import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Board from '@/components/board';
import { SquareValueType } from '@/types';

// Mock the Square component
vi.mock('@/components/squre', () => ({
  default: ({
    value,
    onSquareClick,
  }: {
    value: SquareValueType;
    onSquareClick: () => void;
  }) => <button onClick={onSquareClick}>{value}</button>,
}));

describe('Board', () => {
  const mockHandleClick = vi.fn();
  const squares: SquareValueType[] = [
    null,
    'X',
    'O',
    null,
    'X',
    null,
    'O',
    null,
    null,
  ];

  it('renders correct number of squares', () => {
    render(<Board squares={squares} handleClick={mockHandleClick} />);
    const squareElements = screen.getAllByRole('button');
    expect(squareElements.length).to.equal(9);
  });

  it('renders squares with correct values', () => {
    render(<Board squares={squares} handleClick={mockHandleClick} />);
    const squareElements = screen.getAllByRole('button');
    squareElements.forEach((square, index) => {
      expect(square.textContent).to.equal(squares[index] || '');
    });
  });

  it('calls handleClick with correct index when a square is clicked', () => {
    render(<Board squares={squares} handleClick={mockHandleClick} />);
    const squareElements = screen.getAllByRole('button');
    fireEvent.click(squareElements[0]);
    expect(mockHandleClick).toHaveBeenCalledWith(0);
    fireEvent.click(squareElements[8]);
    expect(mockHandleClick).toHaveBeenCalledWith(8);
  });

  it('has correct CSS classes', () => {
    const { container } = render(
      <Board squares={squares} handleClick={mockHandleClick} />
    );
    const boardDiv = container.firstChild as HTMLElement;
    expect(boardDiv.className).to.include('grid');
    expect(boardDiv.className).to.include('grid-cols-3');
    expect(boardDiv.className).to.include('gap-4');
    expect(boardDiv.className).to.include('mb-4');
  });
});
