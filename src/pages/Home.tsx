import { Main } from '@/components/main/Main';
import { Container } from '@/components/container/Container';
import { TopEvents } from '@/components/topEvents/TopEvents';
import { AllEvents } from '@/components/allEvents/AllEvents';
import { Hero } from '@/components/hero/Hero';

const Home: React.FC = () => {
  return (
    <Main>
      <Hero />
      <TopEvents events={4} />
      <AllEvents />
      <Container>
        <div className="h-auto"></div>
      </Container>
    </Main>
  );
};
export default Home;
