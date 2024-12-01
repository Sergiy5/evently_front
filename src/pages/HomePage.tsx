import { useEffect } from 'react';

import { useLazyGetAllEventsQuery } from '@/redux/events/operations';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { Container } from '@/components/container/Container';
import { FAQ } from '@/components/faq/FAQ';
import { Footer } from '@/components/footer/footer';
import { Hero } from '@/components/hero/Hero';
import { Main } from '@/components/main/Main';
import { Organizers } from '@/components/organizers/Organizers';
import { TopEvents } from '@/components/topEvents/TopEvents';
import { ShowAllButton } from '@/components/allEvents/ShowAllButton';

const HomePage: React.FC = () => {
  const [trigger, { data: events, isLoading }] = useLazyGetAllEventsQuery();

  const shownEvents = 16;
  const notTopEvents = events
    ?.filter(item => item.category !== 'TOP_EVENTS')
    .slice(0, shownEvents);
  const topEvents = events?.filter(event => event.category === 'TOP_EVENTS');

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Main className="flex flex-col gap-16 z-10">
      <Hero />
      {isLoading ? (
        <div>loading</div>
      ) : (
        <>
          <TopEvents filteredEvents={topEvents} />
          {notTopEvents && (
            <Container>
              <AllEvents events={notTopEvents} title="Усі події" />
            </Container>
          )}
          <ShowAllButton />
        </>
      )}
      <Organizers />
      <FAQ />
      <Footer />
    </Main>
  );
};

export default HomePage;
