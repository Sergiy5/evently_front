import { useEffect, useState } from 'react';

import { rangeDays } from '@/helpers/rangeDays';

interface useGetFilteredEventsByRangeProps {
  startRange: Date | null;
  endRange: Date | null;
}

export function useGetFilteredEventsByRange({
  startRange,
  endRange,
}: useGetFilteredEventsByRangeProps) {
  const [filteredEventsByRange, setFilteredEventsByRange] = useState<Event[]>(
    []
  );

  const rangeDatesArray = rangeDays({ startRange, endRange });

  useEffect(() => {
    if (filteredEventsByRange.length > 0) {
      setFilteredEventsByDate([]);
    }
  }, [filteredEventsByRange.length]);

  return { filteredEventsByRange };
}
