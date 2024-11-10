import { getAllEvents } from '@/redux/events/selectors';

import { useAppSelector } from '@/hooks/hooks';

import { AllEvents } from '@/components/allEvents/AllEvents';
import { FAQ } from '@/components/faq/FAQ';
import { Footer } from '@/components/footer/footer';
import { Hero } from '@/components/hero/Hero';
import { Main } from '@/components/main/Main';
import { Organizers } from '@/components/organizers/Organizers';
import { TopEvents } from '@/components/topEvents/TopEvents';
import { ShowAllButton } from '@/components/ui/ShowAllButton';

const Home: React.FC = () => {
  const allEvents = useAppSelector(getAllEvents);

  const shownEvents = 16;
  const notTopEvents = allEvents
    .filter(item => item.category !== 'TOP_EVENTS')
    .slice(0, shownEvents);
  const topEvents = allEvents?.filter(event => event.category === 'TOP_EVENTS');

  return (
    <Main className="flex flex-col gap-16">
      <Hero />
      <TopEvents filteredEvents={topEvents} />
      <AllEvents events={notTopEvents} />
      <ShowAllButton />
      <Organizers />
      <FAQ />
      <Footer />
    </Main>
  );
};

export default Home;
