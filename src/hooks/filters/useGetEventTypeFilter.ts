import { useEffect } from 'react';

import { addSelectedTypes } from '@/redux/filters/filtersSlice';
import { getSelectedTypes } from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

interface useGetEventTypeFilterProps {}

export function useGetEventTypeFilter({}: useGetEventTypeFilterProps) {
  const dispatch = useAppDispatch();

  const selectedTypes = useAppSelector(getSelectedTypes);

  const addTypeFilter = (filter: string) => {
    if (!selectedTypes.includes(filter)) {
      dispatch(addSelectedTypes([...selectedTypes, filter]));
    }
    if (selectedTypes.includes(filter)) {
      if (selectedTypes.length === 1 && filter === 'Усі події') return;

      const newArray = selectedTypes.filter(item => item !== filter);
      dispatch(addSelectedTypes(newArray));
    }
    if (selectedTypes[0] === 'Усі події' && filter !== 'Усі події') {
      dispatch(addSelectedTypes([filter]));
    }
    if (filter === 'Усі події') {
      dispatch(addSelectedTypes(['Усі події']));
    }
  };

  useEffect(() => {
    if (selectedTypes.length === 0) {
      dispatch(addSelectedTypes(['Усі події']));
    }
  }, [selectedTypes, dispatch]);

  useEffect(() => {
    if (selectedTypes.length > 0 && !selectedTypes.includes('Усі події')) {
      dispatch(addSelectedTypes(selectedTypes));
    }
  }, [selectedTypes, dispatch]);

  return { addTypeFilter };
}
