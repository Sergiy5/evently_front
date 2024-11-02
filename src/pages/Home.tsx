import { Main } from '@/components/main/Main';
import { TopEvents } from '@/components/topEvents/TopEvents';
import { AllEvents } from '@/components/allEvents/AllEvents';
import { Hero } from '@/components/hero/Hero';
import { Organizers } from '@/components/organizers/Organizers';
import { FAQ } from '@/components/faq/FAQ';
import { useEffect, useState } from 'react';
import { getEvents } from '@/utils/eventsHttp';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { selectUser } from '@/redux/auth/selectors';
import { likedEvents } from '@/redux/events/operations';

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[] | undefined>();

  const { id } = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    if (id) {
      console.log(likedEvents(id));

      dispatch(likedEvents(id));
    }
  }, [id, dispatch]);

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
