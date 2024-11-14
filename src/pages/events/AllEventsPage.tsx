import { useEffect } from 'react';

import { useGetAllEventsQuery } from '@/redux/events/operations';

import { useGetEventTypeFilter } from '@/hooks/useGetEventTypeFilter';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { FilterEvents } from '@/components/filters/FilterEvents';
import { Footer } from '@/components/footer/footer';
import { Main } from '@/components/main/Main';

const AllEventsPage: React.FC = () => {
  const { data } = useGetAllEventsQuery();
  const { addTypeFilter, selectedTypes } = useGetEventTypeFilter();
  console.log(data);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Main className="flex flex-col gap-16">
      {data && (
        <div className="flex gap-[24px]">
          <FilterEvents
            addTypeFilter={addTypeFilter}
            selectedTypes={selectedTypes}
          />
          <AllEvents events={data} selectedTypes={selectedTypes} />
        </div>
      )}
      <Footer />
    </Main>
  );
};

export default AllEventsPage;
