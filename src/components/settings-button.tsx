import { Brain, Settings, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { GameModeType } from '@/types';
import { cn } from '@/lib/utils';

type SettingsButtonProps = {
  disabled: boolean;
  mode: GameModeType;
  handleModeChange: (mode: GameModeType) => void;
};
export default function SettingsButton({
  disabled,
  mode,
  handleModeChange,
}: SettingsButtonProps) {
  // Handle the change of the game mode
  const handleChange = (newMode: GameModeType) => {
    handleModeChange(newMode);
    localStorage.setItem('gameMode', newMode);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant='ghost'
          size='icon'
          className='rounded-full absolute top-4 right-4'
        >
          <Settings className='h-5 w-5' />
          <span className='sr-only'>Open game settings</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className=' w-58'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Game Difficulty</h4>
            <p className='text-sm text-muted-foreground'>
              Choose computer difficulty.
            </p>
          </div>
          <RadioGroup
            value={mode}
            onValueChange={(mode: GameModeType) => {
              handleChange(mode);
            }}
          >
            <div
              className={cn(
                'flex items-center space-x-2 rounded-md border p-2 hover:bg-muted',
                mode === 'easy' && 'border-yellow-500'
              )}
            >
              <RadioGroupItem value='easy' id='easy' />
              <Label
                htmlFor='easy'
                className='flex flex-1 items-center justify-between'
              >
                <div className='flex items-center gap-2'>
                  <Zap className='h-4 w-4 text-yellow-500' />
                  <span>Easy</span>
                </div>
              </Label>
            </div>
            <div
              className={cn(
                'flex items-center space-x-2 rounded-md border p-2 hover:bg-muted',
                mode === 'hard' && 'border-red-500'
              )}
            >
              <RadioGroupItem value='hard' id='hard' />
              <Label
                htmlFor='hard'
                className='flex flex-1 items-center justify-between'
              >
                <div className='flex items-center gap-2'>
                  <Brain className='h-4 w-4 text-red-500' />
                  <span>Hard</span>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}
