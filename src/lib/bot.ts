import { SquareValueType } from '@/types';
import { minimax } from './minmax';

export function makeEasyBotMove({
  squares,
  handleClick,
}: {
  squares: SquareValueType[];
  handleClick: (index: number) => void;
}) {
  // Find all empty squares
  const emptySquares = squares.reduce((acc, square, index) => {
    if (square === null) acc.push(index);
    return acc;
  }, [] as number[]);

  // If there are no empty squares, return without making a move
  if (emptySquares.length === 0) {
    return;
  }

  // Select a random empty square
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  handleClick(emptySquares[randomIndex]);
}

export function makeHardBotMove({
  squares,
  handleClick,
}: {
  squares: SquareValueType[];
  handleClick: (index: number) => void;
}) {
  // Check if there are any empty squares
  if (!squares.some((square) => square === null)) {
    return; // No empty squares, so don't make a move
  }

  // Implement minimax algorithm for hard mode
  const bestMove = findBestMove(squares);
  handleClick(bestMove);
}

function findBestMove(board: SquareValueType[]): number {
  let bestScore = -Infinity;
  let bestMove = -1;

  // Loop through all squares
  for (let i = 0; i < board.length; i++) {
    // If the square is empty
    if (board[i] === null) {
      // Try placing 'O' on the empty square
      board[i] = 'O';
      // Calculate the score for this move
      let score = minimax(board, 0, false);
      // Reset the square to null
      board[i] = null;
      // If the score is better than the best score, update the best score and best move
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}
