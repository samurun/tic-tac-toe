import { useSession } from '@clerk/clerk-react';
import { Skeleton } from './ui/skeleton';
import { Link } from 'react-router-dom';
import { Badge } from './ui/badge';
import { BoltIcon } from 'lucide-react';
import AccountButton from './account-button';
import { useScore } from '@/features/api/use-score';

export default function Navbar() {
  const { isSignedIn, isLoaded } = useSession();
  const { data: score } = useScore();

  return (
    <div className='bg-background px-4 border-b sticky top-0 z-50'>
      <div className='flex justify-between items-center h-14'>
        <Link to={'/'}>
          <h1 className='text-2xl font-bold'>Tic-Tac-Toe</h1>
        </Link>
        {!isLoaded ? (
          <div>
            <Skeleton className='size-8 rounded-full' />
          </div>
        ) : isSignedIn ? (
          <nav className='flex items-center gap-2'>
            <Link to={'/history'} className='text-sm text-muted-foreground'>
              <Badge variant='outline' className='h-8'>
                <BoltIcon className='text-sky-600 size-4' />
                <span className='ml-1 text-base font-bold'>{score}</span>
              </Badge>
            </Link>
            <AccountButton />
          </nav>
        ) : null}
      </div>
    </div>
  );
}
