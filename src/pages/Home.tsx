import { Main } from "@/components/Main";
import { Container } from "@/components/Container";
import { TopEvents } from "@/components/TopEvents";
import { AllEvents } from "@/components/AllEvents";
import { Hero } from "@/components/Hero";

const Home: React.FC = () => {

  return (
    <Main>
      <Hero />
      <TopEvents events={4} />
      <AllEvents />
      <Container>
        <div className="h-auto">
          
          </div>
      </Container>
    </Main>
  );
};
export default Home;
