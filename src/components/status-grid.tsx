import { getHistory } from '@/features/api/get-history';

export default function StatusGrid() {
  const { data: history } = getHistory();

  const playerWinCount =
    history?.filter((item) => item.winner === 'X').length || 0; // Count the number of times the player has won
  const drawCount = history?.filter((item) => item.winner === null).length || 0; // Count the number of draws
  const computerWinCount =
    history?.filter((item) => item.winner === 'O').length || 0; // Count the number of times the computer has won

  return (
    <div className='grid grid-cols-3 justify-between'>
      <div className='text-center'>
        <p className='text-muted-foreground'>Player (X)</p>
        <p className='font-semibold text-3xl'>{playerWinCount}</p>
      </div>
      <div className='text-center'>
        <p className='text-muted-foreground'>Tie</p>
        <p className='font-semibold text-3xl'>{drawCount}</p>
      </div>
      <div className='text-center'>
        <p className='text-muted-foreground'>Computer (O)</p>
        <p className='font-semibold text-3xl'>{computerWinCount}</p>
      </div>
    </div>
  );
}
