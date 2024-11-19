import { useEffect, useState } from 'react';

export function useGetEventTypeFilter() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Усі події']);

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
  }, [selectedTypes.length]);

  return { selectedTypes, addTypeFilter };
}
