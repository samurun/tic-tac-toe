import { SquareValueType } from '@/types';
import Square from './squre';

type BoardProps = {
  squares: SquareValueType[];
  handleClick: (i: number) => void;
};
export default function Board({ squares, handleClick }: BoardProps) {
  return (
    <div className='grid grid-cols-3 gap-4 mb-4'>
      {squares.map((value, i) => (
        <Square key={i} value={value} onSquareClick={() => handleClick(i)} />
      ))}
    </div>
  );
}
