import { useEffect, useState } from 'react';

import { addSelectedPrices } from '@/redux/filters/filtersSlice';
import { getSelectedPrices } from '@/redux/filters/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

export function useGetEventPriceFilter() {
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);

  const dispatch = useAppDispatch();

  const selectedPricesLS = useAppSelector(getSelectedPrices);

  const addPriceFilter = (filter: number) => {
    if (!selectedPrices.includes(filter)) {
      setSelectedPrices([...selectedPrices, filter]);
    }
    if (selectedPrices.includes(filter)) {
      const newArray = selectedPrices.filter(item => item !== filter);
      setSelectedPrices(newArray);
    }
  };

  useEffect(() => {
    if (selectedPricesLS.length > 0) {
      setSelectedPrices(selectedPricesLS);
    }
  }, [selectedPricesLS]);

  useEffect(() => {
    dispatch(addSelectedPrices(selectedPrices));
  }, [selectedPrices, dispatch]);

  return { addPriceFilter, selectedPricesLS, setSelectedPrices };
}
