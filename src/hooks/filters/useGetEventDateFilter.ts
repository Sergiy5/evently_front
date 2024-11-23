import { useEffect } from 'react';

import {
  addSelectedDates,
  setIsCalendarShown,
} from '@/redux/filters/filtersSlice';
import {
  getIsCalendarShown,
  getSelectedDates,
} from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface useGetEventDateFilterProps {}

export function useGetEventDateFilter({}: useGetEventDateFilterProps) {
  const dispatch = useAppDispatch();

  const isShownCalendar = useAppSelector(getIsCalendarShown);
  const selectedDates = useAppSelector(getSelectedDates);

  const addDateFilter = (filter: string) => {
    if (!selectedDates.includes(filter)) {
      dispatch(addSelectedDates([...selectedDates, filter]));
      dispatch(setIsCalendarShown(false));
    }
    if (selectedDates.includes(filter)) {
      const newArray = selectedDates.filter(item => item !== filter);
      dispatch(addSelectedDates(newArray));
    }
  };

  useEffect(() => {
    isShownCalendar && dispatch(addSelectedDates([]));
  }, [isShownCalendar, dispatch]);

  useEffect(() => {
    if (selectedDates.length > 0) {
      dispatch(addSelectedDates(selectedDates));
    }
  }, [selectedDates, dispatch]);

  return { addDateFilter };
}
