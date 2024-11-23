import { useEffect, useState } from 'react';

import { getIsCalendarShown } from '@/redux/filters/selectors';
import { useAppSelector } from '@/redux/hooks';

import { rangeDays } from '@/helpers/rangeDays';

interface useGetEventDatesRangeFilterProps {
  startRange: Date | undefined;
  endRange: Date | undefined;
}

export function useGetEventDatesRangeFilter({
  startRange,
  endRange,
}: useGetEventDatesRangeFilterProps) {
  const [rangeDatesArray, setRangeDatesArray] = useState<string[]>([]);

  const isShownCalendar = useAppSelector(getIsCalendarShown);

  useEffect(() => {
    if (isShownCalendar) {
      setRangeDatesArray(rangeDays({ startRange, endRange }));
    }
    if (!isShownCalendar) {
      setRangeDatesArray([]);
    }
  }, [isShownCalendar, startRange, endRange]);

  return { rangeDatesArray };
}
