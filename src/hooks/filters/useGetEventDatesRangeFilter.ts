import { useEffect } from 'react';

import { addRangeDatesArray } from '@/redux/filters/filtersSlice';
import {
  getIsCalendarShown,
  getRangeDatesArray,
} from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { rangeDays } from '@/helpers/rangeDays';

interface useGetEventDatesRangeFilterProps {
  startRange: Date | undefined;
  endRange: Date | undefined;
}

export function useGetEventDatesRangeFilter({
  startRange,
  endRange,
}: useGetEventDatesRangeFilterProps) {
  const dispatch = useAppDispatch();

  const rangeDatesArray = useAppSelector(getRangeDatesArray);
  const isShownCalendar = useAppSelector(getIsCalendarShown);

  useEffect(() => {
    if (isShownCalendar) {
      dispatch(addRangeDatesArray(rangeDays({ startRange, endRange })));
    }
    if (!isShownCalendar) {
      dispatch(addRangeDatesArray([]));
    }
  }, [isShownCalendar, startRange, endRange]);

  return { rangeDatesArray };
}
