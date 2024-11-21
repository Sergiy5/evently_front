import { useEffect, useState } from 'react';

import { parseDateWithTime } from '@/helpers/parseDateWithTime';
import { rangeDays } from '@/helpers/rangeDays';

interface useGetFilteredEventsByRangeProps {
  startRange: Date | null;
  endRange: Date | null;
  showCalendar: boolean;
  filteredEventsByType: Event[];
}

export function useGetFilteredEventsByRange({
  startRange,
  endRange,
  showCalendar,
  filteredEventsByType,
}: useGetFilteredEventsByRangeProps) {
  const [filteredEventsByRange, setFilteredEventsByRange] = useState<Event[]>(
    []
  );
  
  const getDateOnly = (date: string) => {
    return date.slice(0, 10);
  };

  const rangeDatesArray = rangeDays({ startRange, endRange });

  useEffect(() => {
    if (showCalendar) {
      const filteredArray = filteredEventsByType.filter(item =>
        rangeDatesArray.includes(
          getDateOnly(parseDateWithTime({ dateString: item.date.day }))
        )
      );
      setFilteredEventsByRange(filteredArray);
      return;
    }
    if (!showCalendar) {
      setFilteredEventsByRange([]);
      return;
    }
  }, [startRange, endRange, showCalendar, filteredEventsByType]);

  return { filteredEventsByRange, setFilteredEventsByRange };
}
