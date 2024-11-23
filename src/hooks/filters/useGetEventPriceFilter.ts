import { useEffect } from 'react';

import { addSelectedPrices } from '@/redux/filters/filtersSlice';
import { getSelectedPrices } from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export function useGetEventPriceFilter() {
  const dispatch = useAppDispatch();

  const selectedPrices = useAppSelector(getSelectedPrices);

  const addPriceFilter = (filter: number) => {
    if (!selectedPrices.includes(filter)) {
      dispatch(addSelectedPrices([...selectedPrices, filter]));
    }
    if (selectedPrices.includes(filter)) {
      const newArray = selectedPrices.filter(item => item !== filter);
      dispatch(addSelectedPrices(newArray));
    }
  };

  useEffect(() => {
    if (selectedPrices.length > 0) {
      dispatch(addSelectedPrices(selectedPrices));
    }
  }, [selectedPrices, dispatch]);

  return { addPriceFilter, selectedPrices };
}
