import { useEffect, useState } from 'react';

import { rangeDays } from '@/helpers/rangeDays';

interface useGetEventDatesRangeFilterProps {
  showCalendar: boolean;
  startRange: Date | undefined;
  endRange: Date | undefined;
}

export function useGetEventDatesRangeFilter({
  showCalendar,
  startRange,
  endRange,
}: useGetEventDatesRangeFilterProps) {
  const [rangeDatesArray, setRangeDatesArray] = useState<string[]>([]);

  useEffect(() => {
    if (showCalendar) {
      setRangeDatesArray(rangeDays({ startRange, endRange }));
    }
    if (!showCalendar) {
      setRangeDatesArray([]);
    }
  }, [showCalendar, startRange, endRange]);

  return { rangeDatesArray };
}
