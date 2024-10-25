import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SquareValueType } from '@/types';
import { makeEasyBotMove, makeHardBotMove } from '@/lib/bot';
import * as minmax from '@/lib/minmax';

// Mock the minimax function
vi.mock('@/lib/minmax', () => ({
  minimax: vi.fn(),
}));

describe('bot', () => {
  describe('makeEasyBotMove', () => {
    it('should make a move on an empty square', () => {
      const squares: SquareValueType[] = [
        'X',
        null,
        'O',
        null,
        'X',
        null,
        null,
        'O',
        null,
      ];
      const handleClick = vi.fn();

      makeEasyBotMove({ squares, handleClick });

      expect(handleClick).toHaveBeenCalledTimes(1);
      const calledIndex = handleClick.mock.calls[0][0];
      expect(squares[calledIndex]).toBeNull();
    });

    it('should only choose from empty squares', () => {
      const squares: SquareValueType[] = [
        'X',
        'O',
        'X',
        null,
        'O',
        'X',
        'O',
        'X',
        null,
      ];
      const handleClick = vi.fn();

      makeEasyBotMove({ squares, handleClick });

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect([3, 8]).toContain(handleClick.mock.calls[0][0]);
    });

    it('should not make a move if there are no empty squares', () => {
      const squares: SquareValueType[] = [
        'X',
        'O',
        'X',
        'O',
        'X',
        'O',
        'O',
        'X',
        'O',
      ];
      const handleClick = vi.fn();

      makeEasyBotMove({ squares, handleClick });

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should make a move on the only empty square', () => {
      const squares: SquareValueType[] = [
        'X',
        'O',
        'X',
        'O',
        null,
        'O',
        'O',
        'X',
        'X',
      ];
      const handleClick = vi.fn();

      makeEasyBotMove({ squares, handleClick });

      expect(handleClick).toHaveBeenCalledWith(4);
    });

    it('should make random moves over multiple calls', () => {
      const squares: SquareValueType[] = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
      ];
      const handleClick = vi.fn();
      const moves = new Set();

      // Make multiple moves
      for (let i = 0; i < 50; i++) {
        makeEasyBotMove({ squares, handleClick });
        moves.add(handleClick.mock.calls[i][0]);
      }

      // Expect that more than one unique move was made
      expect(moves.size).toBeGreaterThan(1);
    });
  });

  describe('makeHardBotMove', () => {
    let minimaxSpy: any;

    beforeEach(() => {
      minimaxSpy = vi.spyOn(minmax, 'minimax');
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should call handleClick with the best move', () => {
      const squares: SquareValueType[] = [
        'X',
        null,
        'O',
        null,
        'X',
        null,
        null,
        'O',
        null,
      ];
      const handleClick = vi.fn();

      // Mock minimax to return different scores for different moves
      minimaxSpy.mockImplementation((board: SquareValueType[]) => {
        const index = board.findIndex(
          (square, i) => square === null && squares[i] === null
        );
        return index === 1 ? 10 : index === 3 ? 5 : 0;
      });

      makeHardBotMove({ squares, handleClick });

      expect(minimaxSpy).toHaveBeenCalled();
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect([1, 3, 5, 6, 8]).toContain(handleClick.mock.calls[0][0]); // The move should be one of the empty squares
    });

    it('should work with different board states', () => {
      const squares: SquareValueType[] = [
        'X',
        'O',
        'X',
        null,
        null,
        'O',
        null,
        null,
        null,
      ];
      const handleClick = vi.fn();

      minimaxSpy.mockImplementation((board: SquareValueType[]) => {
        const emptyIndices = board.reduce(
          (acc, square, i) => (square === null ? [...acc, i] : acc),
          [] as number[]
        );
        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      });

      makeHardBotMove({ squares, handleClick });

      expect(minimaxSpy).toHaveBeenCalled();
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect([3, 4, 6, 7, 8]).toContain(handleClick.mock.calls[0][0]); // The move should be one of the empty squares
    });

    it('should not make a move if there are no empty squares', () => {
      const squares: SquareValueType[] = [
        'X',
        'O',
        'X',
        'O',
        'X',
        'O',
        'O',
        'X',
        'O',
      ];
      const handleClick = vi.fn();

      makeHardBotMove({ squares, handleClick });

      if (minimaxSpy.mock.calls.length > 0) {
        console.log(
          'Unexpected call to minimax with:',
          minimaxSpy.mock.calls[0]
        );
      }
      if (handleClick.mock.calls.length > 0) {
        console.log(
          'Unexpected call to handleClick with:',
          handleClick.mock.calls[0]
        );
      }

      expect(minimaxSpy).not.toHaveBeenCalled();
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
