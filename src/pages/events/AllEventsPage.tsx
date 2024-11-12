import { useEffect } from 'react';

import { useGetAllEventsQuery } from '@/redux/events/operations';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { FilterEvents } from '@/components/filters/FilterEvents';
import { Footer } from '@/components/footer/footer';
import { Main } from '@/components/main/Main';

const AllEventsPage: React.FC = () => {
  const { data } = useGetAllEventsQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Main className="flex flex-col gap-16">
      {data && (
        <div className="flex">
          <FilterEvents />
          <AllEvents events={data} />
        </div>
      )}
      <Footer />
    </Main>
  );
};

export default AllEventsPage;
