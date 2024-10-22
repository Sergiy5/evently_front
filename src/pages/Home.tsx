import { Main } from '@/components/main/Main';
import { TopEvents } from '@/components/topEvents/TopEvents';
import { AllEvents } from '@/components/allEvents/AllEvents';
import { Hero } from '@/components/hero/Hero';
import { Organizers } from '@/components/organizers/Organizers';
import { FAQ } from '@/components/faq/FAQ';

const Home: React.FC = () => {
  return (
    <Main>
      <Hero />
      <TopEvents events={4} />
      <AllEvents />
      <Organizers />
      <FAQ />
    </Main>
  );
};
export default Home;
