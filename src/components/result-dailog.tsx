import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Frown, Trophy } from 'lucide-react';
import { Button } from './ui/button';
import { useUser } from '@clerk/clerk-react';
import { SquareValueType } from '@/types';

type ResultDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  winner: SquareValueType;
  handleReset: () => void;
};

export default function ResultDialog({
  open,
  setOpen,
  handleReset,
  winner,
}: ResultDialogProps) {
  const { user } = useUser();

  // Set the title and description based on the winner
  const title =
    winner === 'X'
      ? `Congratulations, ${user?.firstName}!`
      : winner === 'O'
      ? 'Better luck next time, Player!'
      : 'Great game';

  const description =
    winner === 'X'
      ? `You're the winner of this round.`
      : winner === 'O'
      ? "Don't give up, you'll do better in the next round."
      : "It's a draw! Great game, both players!";

  // Set the reward based on the winner
  const reward =
    winner === 'X' ? (
      <span className='text-emerald-500 text-4xl font-bold'>+1 points</span>
    ) : winner === 'O' ? (
      <span className='text-amber-500 text-4xl font-bold'>-1 points</span>
    ) : (
      <span className='text-gray-500 text-4xl font-bold'>0 points</span>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='max-w-sm'>
        <DialogHeader>
          <DialogTitle className='text-center flex items-center justify-center gap-2 text-balance'>
            {winner === 'X' ? (
              <Trophy className='h-6 w-6 text-yellow-500' />
            ) : (
              <Frown className='h-6 w-6 text-blue-500' />
            )}
            {title}
          </DialogTitle>
          <DialogDescription className='text-center'>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col items-center gap-4 py-4'>
          <div className='text-2xl font-bold'>{reward}</div>
          <Button
            variant='secondary'
            onClick={() => {
              setOpen(false);
              handleReset();
            }}
          >
            Restart game
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
