import { SquareValueType } from '@/types';
import { Button } from './ui/button';

export default function Square({
  value,
  onSquareClick,
}: {
  value: SquareValueType;
  onSquareClick: () => void;
}) {
  return (
    <Button
      className='aspect-square w-full h-full text-4xl font-bold shadow-none'
      variant='outline'
      onClick={onSquareClick}
    >
      {value}
    </Button>
  );
}
