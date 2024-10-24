import { useEffect, useState } from 'react';

import './App.css';
import { Card } from './components/ui/card';
import { calculateReward, calculateWinner } from './lib/utils';
import { useUser } from '@clerk/clerk-react';
import Board from './components/board';

import ResultDialog from './components/result-dailog';
import { GameModeType, HistoryType, SquareValueType } from './types';
import StatusGrid from './components/status-grid';
import { useQueryClient } from '@tanstack/react-query';
import { useHistory } from './features/api/use-history';
import SettingsButton from './components/settings-button';
import { makeEasyBotMove, makeHardBotMove } from './lib/bot';
import WelcomeScreen from './components/welcome-screen';
import { Loader } from 'lucide-react';

function App() {
  const queryClient = useQueryClient();

  // Initialize the board with null values
  const [squares, setSquares] = useState<SquareValueType[]>(
    Array(9).fill(null)
  );

  // Initialize the game mode from localStorage or default to 'easy'
  const [mode, setMode] = useState<GameModeType>(() => {
    const savedMode = localStorage.getItem('gameMode');
    return (savedMode as GameModeType) || 'easy';
  });

  // Track if the game is in progress
  const [gameInProgress, setGameInProgress] = useState(false);

  // Initialize the next player
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);

  const { addHistory } = useHistory();

  // Get the user
  const user = useUser();

  useEffect(() => {
    if (
      !xIsNext &&
      !calculateWinner(squares) &&
      squares.some((square) => square === null)
    ) {
      const timerId = setTimeout(() => {
        makeBotMove();
      }, 500); // Delay the bot move by 500ms
      return () => clearTimeout(timerId);
    }
  }, [squares, xIsNext]);

  // Make a move for the bot
  function makeBotMove() {
    if (mode === 'easy') {
      makeEasyBotMove({ squares, handleClick });
    } else {
      makeHardBotMove({ squares, handleClick });
    }
  }

  function handleClick(i: number) {
    // If there is a winner or the square is already filled, do nothing
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice(); // Create a copy of the squares array
    nextSquares[i] = xIsNext ? 'X' : 'O'; // Set the next player's mark on the clicked square
    setSquares(nextSquares); // Update the squares state
    setXIsNext(!xIsNext); // Toggle the next player
    setGameInProgress(true); // Set the game in progress
  }

  // Reset the board
  function handleReset() {
    setSquares(Array(9).fill(null)); // Reset the squares state
    setXIsNext(true); // Reset the next player
    setGameInProgress(false); // Reset the game in progress
  }

  const winner = calculateWinner(squares); // Calculate the winner

  useEffect(() => {
    // If there is a winner or all squares are filled, add the result to the history
    if (winner || squares.every(Boolean)) {
      // Add the result to the history
      const newEntry: HistoryType = {
        winner: winner || null,
        createdAt: new Date().toISOString(),
        reward: calculateReward(winner),
      };

      addHistory.mutate(newEntry); // Add the result to the history
      setStatus(winner ? `Winner: ${winner}` : 'Draw'); // Set the status
      setOpen(true); // Open the result dialog
      queryClient.invalidateQueries({ queryKey: ['score', 'history'] }); // Invalidate the score and history queries
    } else {
      setStatus(`Next player: ${xIsNext ? 'X' : 'O'}`);
    }
  }, [winner, squares]);

  if (!user.isLoaded) {
    return (
      <div className='flex justify-center items-center min-h-[calc(100vh-57px)]'>
        <Loader className=' animate-spin' />
      </div>
    );
  }

  return (
    <div>
      <ResultDialog
        open={open}
        setOpen={() => {
          setOpen(false);
          handleReset();
        }}
        winner={winner}
        handleReset={handleReset}
      />

      <div className='flex flex-col items-center justify-center min-h-[calc(100vh-57px)]'>
        {user.isSignedIn ? (
          <div>
            <Card className='p-6 rounded-lg shadow-lg relative'>
              <div className='flex justify-between items-center mb-4'>
                <p className='text-xl font-semibold text-center relative'>
                  {status}
                </p>
                <SettingsButton
                  disabled={gameInProgress}
                  mode={mode}
                  handleModeChange={(newMode: GameModeType) => setMode(newMode)}
                />
              </div>
              <Board squares={squares} handleClick={handleClick} />
              <StatusGrid />
            </Card>
          </div>
        ) : (
          <WelcomeScreen />
        )}
      </div>
    </div>
  );
}

export default App;
