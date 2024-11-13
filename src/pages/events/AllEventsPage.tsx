import { useEffect, useState } from 'react';

import { useGetAllEventsQuery } from '@/redux/events/operations';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { FilterEvents } from '@/components/filters/FilterEvents';
import { Footer } from '@/components/footer/footer';
import { Main } from '@/components/main/Main';

const AllEventsPage: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['Усі події']);
  console.log(selectedTypes);

  const { data } = useGetAllEventsQuery();
  console.log(data);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Main className="flex flex-col gap-16">
      {data && (
        <div className="flex">
          <FilterEvents
            selectedTypes={selectedTypes}
            addTypeFilter={addTypeFilter}
          />
          <AllEvents events={data} />
        </div>
      )}
      <Footer />
    </Main>
  );
};

export default AllEventsPage;
