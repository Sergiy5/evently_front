import { useEffect, useState } from 'react';

import { getIsCalendarShown } from '@/redux/filters/selectors';
import { useAppSelector } from '@/redux/hooks';

import { parseDateWithTime } from '@/helpers/parseDateWithTime';

interface useGetFilteredEventsByRangeProps {
  filteredEventsByType: Event[];
  rangeDatesArray: string[];
}

export function useGetFilteredEventsByRange({
  filteredEventsByType,
  rangeDatesArray,
}: useGetFilteredEventsByRangeProps) {
  const [filteredEventsByRange, setFilteredEventsByRange] = useState<Event[]>(
    []
  );

  const isShownCalendar = useAppSelector(getIsCalendarShown);

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
  }, [isShownCalendar, filteredEventsByType, rangeDatesArray]);

  return { filteredEventsByRange, setFilteredEventsByRange };
}
