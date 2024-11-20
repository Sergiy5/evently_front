import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface useGetEventDateFilterProps {
  showCalendar: boolean;
  setShowCalendar: Dispatch<SetStateAction<boolean>>;
}

export function useGetEventDateFilter({
  showCalendar,
  setShowCalendar,
}: useGetEventDateFilterProps) {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

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

  return { addDateFilter, selectedDates, setSelectedDates };
}
