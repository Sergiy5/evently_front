import { useEffect } from 'react';

import { getALlEvents } from '@/redux/events/selectors';

import { useAppSelector } from '@/hooks/hooks';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { Footer } from '@/components/footer/footer';
import { Main } from '@/components/main/Main';

const AllEventsPage: React.FC = () => {
  const allEvents = useAppSelector(getALlEvents);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Main className="flex flex-col gap-16">
      <AllEvents events={allEvents} />
      <Footer />
    </Main>
  );
};

export default AllEventsPage;
