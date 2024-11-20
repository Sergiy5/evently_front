import { useState } from 'react';

export function useGetEventPriceFilter() {
  const [selectedPrices, setSelectedPrices] = useState<number[]>([]);

  const addPriceFilter = (filter: number) => {
    if (!selectedPrices.includes(filter)) {
      setSelectedPrices([...selectedPrices, filter]);
    }
    if (selectedPrices.includes(filter)) {
      const newArray = selectedPrices.filter(item => item !== filter);
      setSelectedPrices(newArray);
    }
  };

  return { addPriceFilter, selectedPrices, setSelectedPrices };
}
