import { HistoryType } from '@/types';
import { useQuery } from '@tanstack/react-query';

export function getHistory() {
  const query = useQuery({
    queryKey: ['history'],
    queryFn: async () => {
      const getHistory = localStorage.getItem('history');
      const history: HistoryType[] = getHistory ? JSON.parse(getHistory) : [];

      // Process history to add consecutive wins and adjust rewards
      const processedHistory = history?.reduce(
        (acc: (HistoryType & { bonus?: number })[], current, index, array) => {
          let consecutiveWins = 0;
          let adjustedReward = current.reward;

          if (current.winner === 'X') {
            // Count consecutive wins
            for (let i = index; i >= 0 && array[i].winner === 'X'; i--) {
              consecutiveWins++;
            }
          }

          acc.push({
            ...current,
            reward: adjustedReward,
            // Add bonus for every 3 consecutive wins
            bonus: consecutiveWins !== 0 && consecutiveWins % 3 === 0 ? 1 : 0,
          });

          return acc;
        },
        []
      );

      // Sort the history array by createdAt in descending order (most recent first)
      const sortedHistory = processedHistory?.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return sortedHistory;
    },
  });

  return query;
}
