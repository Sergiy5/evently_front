import { useEffect, useState } from 'react';

import { addSelectedTypes } from '@/redux/filter/FilterSlice';
import { getSelectedTypes } from '@/redux/filter/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export function useGetEventTypeFilter() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const selectedTypesLS = useAppSelector(getSelectedTypes);
  console.log(selectedTypesLS);

  const addTypeFilter = (filter: string) => {
    if (!selectedTypes.includes(filter)) {
      setSelectedTypes([...selectedTypes, filter]);
    }
    if (selectedTypes.includes(filter)) {
      if (selectedTypes.length === 1 && filter === 'Усі події') return;

      const newArray = selectedTypes.filter(item => item !== filter);
      setSelectedTypes(newArray);
    }
    if (selectedTypes[0] === 'Усі події' && filter !== 'Усі події') {
      setSelectedTypes([filter]);
    }
    if (filter === 'Усі події') {
      setSelectedTypes(['Усі події']);
    }
  };

  useEffect(() => {
    if (selectedTypes.length === 0) {
      setSelectedTypes(['Усі події']);
    }
  }, [selectedTypes]);

  useEffect(() => {
    if (selectedTypesLS.length > 0 && !selectedTypesLS.includes('Усі події')) {
      setSelectedTypes(selectedTypesLS);
    }
  }, [selectedTypesLS]);

  useEffect(() => {
    dispatch(addSelectedTypes(selectedTypes));
  }, [selectedTypes, dispatch]);

  return { selectedTypesLS, addTypeFilter };
}
