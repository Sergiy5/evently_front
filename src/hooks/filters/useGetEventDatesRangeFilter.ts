import { useEffect } from 'react';

import { addRangeDatesArray } from '@/redux/filters/filtersSlice';
import {
  getEndDay,
  getIsCalendarShown,
  getRangeDatesArray,
  getStartDay,
} from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { rangeDays } from '@/helpers/rangeDays';

interface useGetEventDatesRangeFilterProps {}

export function useGetEventDatesRangeFilter({}: useGetEventDatesRangeFilterProps) {
  const dispatch = useAppDispatch();

  const rangeDatesArray = useAppSelector(getRangeDatesArray);
  const isShownCalendar = useAppSelector(getIsCalendarShown);
  const startRange = useAppSelector(getStartDay);
  const endRange = useAppSelector(getEndDay);

  useEffect(() => {
    if (isShownCalendar && startRange && startRange) {
      dispatch(addRangeDatesArray(rangeDays({ startRange, endRange })));
    }
    if (!isShownCalendar) {
      dispatch(addRangeDatesArray([]));
    }
  }, [isShownCalendar, startRange, endRange]);

  return { rangeDatesArray };
}
