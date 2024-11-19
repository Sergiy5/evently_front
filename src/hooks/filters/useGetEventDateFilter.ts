import { useState } from 'react';

export function useGetEventDateFilter() {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  const addDateFilter = (filter: string) => {
    if (!selectedDates.includes(filter)) {
      setSelectedDates([...selectedDates, filter]);
    }
    if (selectedDates.includes(filter)) {
      const newArray = selectedDates.filter(item => item !== filter);
      setSelectedDates(newArray);
    }
  };

  return { addDateFilter, selectedDates, setSelectedDates };
}
