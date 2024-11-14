import { useGetAllEventsQuery } from '@/redux/events/operations';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { Container } from '@/components/container/Container';
import { FAQ } from '@/components/faq/FAQ';
import { Footer } from '@/components/footer/footer';
import { Hero } from '@/components/hero/Hero';
import { Main } from '@/components/main/Main';
import { Organizers } from '@/components/organizers/Organizers';
import { TopEvents } from '@/components/topEvents/TopEvents';
import { ShowAllButton } from '@/components/ui/ShowAllButton';

const Home: React.FC = () => {
  const { data } = useGetAllEventsQuery();

  const shownEvents = 16;
  const notTopEvents =
    data &&
    data.filter(item => item.category !== 'TOP_EVENTS').slice(0, shownEvents);
  const topEvents = data?.filter(event => event.category === 'TOP_EVENTS');

  return (
    <Main className="flex flex-col gap-16">
      <Hero />

      <TopEvents filteredEvents={topEvents} />

      {notTopEvents && (
        <Container>
          <AllEvents events={notTopEvents} />
        </Container>
      )}
      <ShowAllButton />
      <Organizers />
      <FAQ />
      <Footer />
    </Main>
  );
};

export default Home;
