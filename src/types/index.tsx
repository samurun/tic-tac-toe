export type SquareValueType = 'X' | 'O' | null;

export type GameModeType = 'easy' | 'hard';

export type HistoryType = {
  createdAt: string;
  reward: number;
  winner: SquareValueType;
};
