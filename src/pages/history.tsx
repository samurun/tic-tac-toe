import { Button, buttonVariants } from '@/components/ui/button';
import { getHistory } from '@/features/api/get-history';
import { useHistory } from '@/features/api/use-history';
import { useScore } from '@/features/api/use-score';
import { cn } from '@/lib/utils';
import { SquareValueType } from '@/types';
import { Link } from 'react-router-dom';

export default function History() {
  const { resetHistory } = useHistory();
  const { data: history } = getHistory();
  const { data: score } = useScore();

  // Calculate summary statistics
  const totalGames = history?.length;
  const wins = history?.filter((item) => item.winner === 'X').length;
  const losses = history?.filter((item) => item.winner === 'O').length;
  const draws = history?.filter((item) => item.winner === null).length;

  // Display reward with bonus
  function getRewardDisplay(
    winner: SquareValueType,
    reward: number,
    bonus?: number
  ): React.ReactNode {
    if (winner === 'X') {
      return (
        <p className='text-2xl font-bold text-emerald-500'>
          +{reward}
          {bonus ? (
            <sup className='ml-0.5 rounded bg-secondary px-1.5 py-0.5 text-base font-bold leading-none text-secondary-foreground'>
              +{bonus}
            </sup>
          ) : null}
        </p>
      );
    }
    if (winner === 'O')
      return <p className='text-xl font-bold text-amber-500'>{reward}</p>;
    return <p className='text-xl font-bold'></p>;
  }

  return (
    <div className='container my-10 divide-y'>
      <div className='flex flex-col md:flex-row gap-8 md:divide-x'>
        <div className='mb-6 w-full md:max-w-80'>
          <h2 className='text-2xl font-bold mb-4'>Summary</h2>
          <div className='grid grid-cols-2 gap-2'>
            <p className='text-muted-foreground'>Total Games:</p>
            <p className='font-bold text-xl text-end'>{totalGames}</p>
            <p className='text-muted-foreground'>Wins:</p>
            <p className='font-bold text-xl text-emerald-500 text-end'>
              {wins}
            </p>
            <p className='text-muted-foreground'>Losses:</p>
            <p className='font-bold text-xl text-amber-500 text-end'>
              {losses}
            </p>
            <p className='text-muted-foreground'>Draws:</p>
            <p className='font-bold text-xl text-end'>{draws}</p>
            <p className='text-muted-foreground'>Net Reward:</p>
            <p
              className={`font-bold text-xl text-end ${
                Number(score) >= 0 ? 'text-emerald-500' : 'text-amber-500'
              }`}
            >
              {Number(score) >= 1 ? '+' : ''}
              {score}
            </p>
          </div>
        </div>
        <div className='w-full md:pl-4'>
          <div className='flex gap-4'>
            <h2 className='text-2xl font-bold mb-4'>Game History</h2>
            <Button
              variant='link'
              size='sm'
              onClick={() => {
                resetHistory.mutate();
              }}
            >
              Clear
            </Button>
          </div>
          <div className='divide-y'>
            {history?.length ? (
              history.map((item) => (
                <div
                  key={item.createdAt}
                  className='grid grid-cols-3 gap-2 p-2'
                >
                  <div className='flex flex-col text-center'>
                    <p className='text-muted-foreground'>Winner: </p>
                    <p className='text-xl font-bold capitalize'>
                      {item.winner === 'X' ? (
                        <span className='text-emerald-500'>X</span>
                      ) : item.winner === 'O' ? (
                        <span className='text-amber-500'>O</span>
                      ) : (
                        <span>Draw</span>
                      )}
                    </p>
                  </div>
                  <div className='flex flex-col text-center'>
                    <p className='text-muted-foreground'>Reward</p>
                    {getRewardDisplay(item.winner, item.reward, item.bonus)}
                  </div>
                  <div className='flex flex-col text-center'>
                    <p className='text-muted-foreground'>CreatedAt: </p>
                    <p className='font-semibold'>
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className='w-full text-center p-4 space-y-2'>
                <p>No history yet</p>
                <Link
                  to={'/'}
                  className={cn(buttonVariants({ variant: 'secondary' }))}
                >
                  Play a game
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
