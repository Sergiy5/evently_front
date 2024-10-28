import { Main } from '@/components/main/Main';
import { TopEvents } from '@/components/topEvents/TopEvents';
import { AllEvents } from '@/components/allEvents/AllEvents';
import { Hero } from '@/components/hero/Hero';
import { Organizers } from '@/components/organizers/Organizers';
import { FAQ } from '@/components/faq/FAQ';
import { useEffect, useState } from 'react';
import { getEvents } from '@/utils/eventsHttp';
import { IEvent } from '@/types/components';

const Home: React.FC = () => {

  const [events, setEvents] = useState<IEvent[] | undefined>();
  const [topEvents, setTopEvents] = useState<IEvent[] | undefined>();
  
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await getEvents();
            console.log(response)
            setEvents(response);
            
          } catch (error) {
            console.log(error)
          }
        };

        fetchData();
      }, []);

  return (
    <Main className="flex flex-col gap-16">
      <Hero />
      <TopEvents  />
      <AllEvents events={events}/>
      <Organizers />
      <FAQ />
    </Main>
  );
};
export default Home;
