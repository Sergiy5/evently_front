import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { addSelectedDates } from '@/redux/filter/FilterSlice';
import { getSelectedDates } from '@/redux/filter/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface useGetEventDateFilterProps {
  showCalendar: boolean;
  setShowCalendar: Dispatch<SetStateAction<boolean>>;
}

export function useGetEventDateFilter({
  showCalendar,
  setShowCalendar,
}: useGetEventDateFilterProps) {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const selectedDatesLS = useAppSelector(getSelectedDates);

  const addDateFilter = (filter: string) => {
    if (!selectedDates.includes(filter)) {
      setSelectedDates([...selectedDates, filter]);
      setShowCalendar(false);
    }
    if (selectedDates.includes(filter)) {
      const newArray = selectedDates.filter(item => item !== filter);
      setSelectedDates(newArray);
    }
  };

  useEffect(() => {
    showCalendar && setSelectedDates([]);
  }, [showCalendar]);

  useEffect(() => {
    if (selectedDatesLS.length > 0) {
      setSelectedDates(selectedDatesLS);
    }
  }, [selectedDatesLS]);

  useEffect(() => {
    dispatch(addSelectedDates(selectedDates));
  }, [selectedDates, dispatch]);

  return { addDateFilter, selectedDatesLS, setSelectedDates };
}
