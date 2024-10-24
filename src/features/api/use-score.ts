import { HistoryType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function useScore() {
  const query = useQuery({
    queryKey: ['score'],
    queryFn: async () => {
      const storedHistory = localStorage.getItem('history');
      const history: HistoryType[] = storedHistory
        ? JSON.parse(storedHistory)
        : [];

      let xWinStreak = 0;
      const totalScore =
        history?.reduce((sum, entry) => {
          if (entry.winner === 'X') {
            xWinStreak++;
            // Add bonus of 10 points for every 3rd consecutive X win
            const bonus = xWinStreak % 3 === 0 ? 1 : 0;
            return sum + Math.abs(entry.reward) + bonus;
          }
          if (entry.winner === 'O') {
            xWinStreak = 0; // Reset X win streak
            return sum - Math.abs(entry.reward);
          }
          xWinStreak = 0; // Reset X win streak for draws or other cases
          return sum;
        }, 0) ?? 0;

      return totalScore;
    },
  });

  return query;
}
