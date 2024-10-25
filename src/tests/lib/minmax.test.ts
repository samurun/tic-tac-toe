import { describe, expect, it } from 'vitest';
import { SquareValueType } from '@/types';
import { minimax } from '@/lib/minmax';

describe('minimax', () => {
  // Helper function to create a board
  const createBoard = (squares: SquareValueType[]): SquareValueType[] =>
    squares;

  it('should return 10 minus depth for a winning board for O', () => {
    const board = createBoard([
      'O',
      'O',
      'O',
      'X',
      'X',
      null,
      null,
      null,
      null,
    ]);
    expect(minimax(board, 0, true)).toBe(10);
    expect(minimax(board, 1, true)).toBe(9);
  });

  it('should return -10 for a winning board for X', () => {
    const board = createBoard([
      'X',
      'X',
      'X',
      'O',
      'O',
      null,
      null,
      null,
      null,
    ]);
    expect(minimax(board, 0, false)).toBe(-10);
  });

  it('should return 0 for a draw', () => {
    const board = createBoard(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']);
    expect(minimax(board, 0, true)).toBe(0);
  });

  it('should choose the winning move for O', () => {
    const board = createBoard([
      'O',
      'O',
      null,
      'X',
      'X',
      null,
      null,
      null,
      null,
    ]);
    expect(minimax(board, 0, true)).toBe(9);
  });

  it('should block X from winning', () => {
    const board = createBoard([
      'X',
      'X',
      null,
      'O',
      'O',
      null,
      null,
      null,
      null,
    ]);
    expect(minimax(board, 0, true)).toBeGreaterThan(-10);
  });

  it('should return a value between -10 and 10 for an empty board', () => {
    const board = createBoard([
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ]);
    const result = minimax(board, 0, true);
    expect(result).toBeGreaterThanOrEqual(-10);
    expect(result).toBeLessThanOrEqual(10);
  });
});
