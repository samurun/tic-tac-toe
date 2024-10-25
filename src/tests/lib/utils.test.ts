import { describe, it, expect } from 'vitest';
import { SquareValueType } from '@/types';
import { calculateReward, calculateWinner } from '@/lib/utils';

describe('utils', () => {
  describe('calculateWinner', () => {
    it('should return null for an empty board', () => {
      const squares: SquareValueType[] = Array(9).fill(null);
      expect(calculateWinner(squares)).toBeNull();
    });

    it('should return null for a board with no winner', () => {
      const squares: SquareValueType[] = [
        'X',
        'O',
        'X',
        'X',
        'O',
        null,
        'O',
        null,
        null,
      ];
      expect(calculateWinner(squares)).toBeNull();
    });

    it('should return X for a horizontal X win', () => {
      const squares: SquareValueType[] = [
        'X',
        'X',
        'X',
        'O',
        'O',
        null,
        null,
        null,
        null,
      ];
      expect(calculateWinner(squares)).toBe('X');
    });

    it('should return O for a vertical O win', () => {
      const squares: SquareValueType[] = [
        'X',
        'O',
        'X',
        null,
        'O',
        'X',
        null,
        'O',
        null,
      ];
      expect(calculateWinner(squares)).toBe('O');
    });

    it('should return X for a diagonal X win', () => {
      const squares: SquareValueType[] = [
        'X',
        'O',
        null,
        null,
        'X',
        'O',
        null,
        null,
        'X',
      ];
      expect(calculateWinner(squares)).toBe('X');
    });
  });

  describe('calculateReward', () => {
    it('should return 0 for no winner', () => {
      expect(calculateReward(null)).toBe(0);
    });

    it('should return 1 for X winner', () => {
      expect(calculateReward('X')).toBe(1);
    });

    it('should return -1 for O winner', () => {
      expect(calculateReward('O')).toBe(-1);
    });
  });
});
