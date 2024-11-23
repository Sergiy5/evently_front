import { useEffect } from 'react';

import { addSelectedTypes } from '@/redux/filters/filtersSlice';
import { getSelectedTypes } from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export function useGetEventTypeFilter() {
  const dispatch = useAppDispatch();

  const selectedTypesLS = useAppSelector(getSelectedTypes);

  const addTypeFilter = (filter: string) => {
    if (!selectedTypesLS.includes(filter)) {
      dispatch(addSelectedTypes([...selectedTypesLS, filter]));
    }
    if (selectedTypesLS.includes(filter)) {
      if (selectedTypesLS.length === 1 && filter === 'Усі події') return;

      const newArray = selectedTypesLS.filter(item => item !== filter);
      dispatch(addSelectedTypes(newArray));
    }
    if (selectedTypesLS[0] === 'Усі події' && filter !== 'Усі події') {
      dispatch(addSelectedTypes([filter]));
    }
    if (filter === 'Усі події') {
      dispatch(addSelectedTypes(['Усі події']));
    }
  };

  useEffect(() => {
    if (selectedTypesLS.length === 0) {
      dispatch(addSelectedTypes(['Усі події']));
    }
  }, [selectedTypesLS]);

  useEffect(() => {
    if (selectedTypesLS.length > 0 && !selectedTypesLS.includes('Усі події')) {
      dispatch(addSelectedTypes(selectedTypesLS));
    }
  }, [selectedTypesLS]);

  return { selectedTypesLS, addTypeFilter };
}
