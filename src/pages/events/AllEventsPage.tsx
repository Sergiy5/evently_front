import { useEffect } from 'react';

import { useGetAllEventsQuery } from '@/redux/events/operations';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { Footer } from '@/components/footer/footer';
import { Main } from '@/components/main/Main';

const AllEventsPage: React.FC = () => {
  const { data } = useGetAllEventsQuery();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Main className="flex flex-col gap-16">
      {data && <AllEvents events={data} />}
      <Footer />
    </Main>
  );
};

export default AllEventsPage;
