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
  const selectedDatesLS = useAppSelector(getSelectedDates);

  const addDateFilter = (filter: string) => {
    if (!selectedDatesLS.includes(filter)) {
      dispatch(addSelectedDates([...selectedDatesLS, filter]));
      dispatch(setIsCalendarShown(false));
    }
    if (selectedDatesLS.includes(filter)) {
      const newArray = selectedDatesLS.filter(item => item !== filter);
      dispatch(addSelectedDates(newArray));
    }
  };

  useEffect(() => {
    isShownCalendar && dispatch(addSelectedDates([]));
  }, [isShownCalendar]);

  useEffect(() => {
    if (selectedDatesLS.length > 0) {
      dispatch(addSelectedDates(selectedDatesLS));
    }
  }, [selectedDatesLS]);

  return { addDateFilter, selectedDatesLS };
}
