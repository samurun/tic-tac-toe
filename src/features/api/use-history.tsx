import { HistoryType } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useHistory() {
  const queryClient = useQueryClient();
  const addHistory = useMutation({
    mutationKey: ['add-history'],
    mutationFn: async (newEntry: HistoryType) => {
      const storedHistory = localStorage.getItem('history');
      const history: HistoryType[] = storedHistory
        ? JSON.parse(storedHistory)
        : [];
      localStorage.setItem(
        'history',
        JSON.stringify([...(history || []), newEntry])
      );
      return { success: true };
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['history'] });
      queryClient.invalidateQueries({ queryKey: ['score'] });
    },
  });

  const resetHistory = useMutation({
    mutationKey: ['reset-history'],
    mutationFn: async () => {
      localStorage.setItem('history', JSON.stringify([]));
      return { success: true };
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['history'] });
      queryClient.invalidateQueries({ queryKey: ['score'] });
    },
  });

  return { addHistory, resetHistory };
}
