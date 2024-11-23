import { useEffect, useState } from 'react';

import { parseDateWithTime } from '@/helpers/parseDateWithTime';

interface useGetFilteredEventsByRangeProps {
  isShownCalendar: boolean;
  filteredEventsByType: Event[];
  rangeDatesArray: string[];
}

export function useGetFilteredEventsByRange({
  isShownCalendar,
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
    if (isShownCalendar) {
      const filteredArray = filteredEventsByType.filter(item =>
        rangeDatesArray.includes(
          getDateOnly(parseDateWithTime({ dateString: item.date.day }))
        )
      );
      setFilteredEventsByRange(filteredArray);
      return;
    }
    if (!isShownCalendar) {
      setFilteredEventsByRange([]);
      return;
    }
  }, [isShownCalendar, filteredEventsByType]);

  return { filteredEventsByRange, setFilteredEventsByRange };
}
