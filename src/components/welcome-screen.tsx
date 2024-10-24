import { Grid3X3 } from 'lucide-react';
import { SignedOut, SignInButton } from '@clerk/clerk-react';
import { Button } from './ui/button';

const WelcomeScreen = () => {
  return (
    <div className='flex flex-col items-center justify-center text-white p-4'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <Grid3X3 className='mx-auto h-12 w-12 text-primary' />
          <h1 className='mt-6 text-4xl font-bold'>Tic-Tac-Toe Challenge</h1>
          <p className='mt-2 text-xl text-gray-400'>
            Challenge your skills against our intelligent bot!
          </p>
        </div>
        <div className='mt-8 space-y-4 text-center'>
          <p className='text-center text-gray-300'>
            Choose your difficulty, make your moves, and aim for victory in this
            classic game of strategy.
          </p>
          <SignedOut>
            <SignInButton>
              <Button>Sign In to Play</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
