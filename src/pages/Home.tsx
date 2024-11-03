import { useEffect, useState } from 'react';

import { getEvents } from '@/utils/eventsHttp';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { FAQ } from '@/components/faq/FAQ';
import { Hero } from '@/components/hero/Hero';
import { Main } from '@/components/main/Main';
import { Organizers } from '@/components/organizers/Organizers';
import { TopEvents } from '@/components/topEvents/TopEvents';

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[] | []>([]);

  const topEvents = events?.filter(event => event.category === 'TOP_EVENTS');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEvents();
        setEvents(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Main className="flex flex-col gap-16">
      <Hero />
      <TopEvents filteredEvents={topEvents} />
      <AllEvents events={events} />
      <Organizers />
      <FAQ />
    </Main>
  );
};

export default Home;
