import { useEffect, useState } from 'react';

import { parseDateWithTime } from '@/helpers/parseDateWithTime';

interface useGetFilteredEventsByRangeProps {
  showCalendar: boolean;
  filteredEventsByType: Event[];
  rangeDatesArray: string[];
}

export function useGetFilteredEventsByRange({
  showCalendar,
  filteredEventsByType,
  rangeDatesArray,
}: useGetFilteredEventsByRangeProps) {
  const [filteredEventsByRange, setFilteredEventsByRange] = useState<Event[]>(
    []
  );

  const getDateOnly = (date: string) => {
    return date.slice(0, 10);
  };

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
  }, [showCalendar, filteredEventsByType]);

  return { filteredEventsByRange, setFilteredEventsByRange };
}
