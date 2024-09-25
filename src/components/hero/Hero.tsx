import { Container } from '../container/Container';

export const Hero: React.FC = () => {
  return (
    <Container>
      <div
        className={`w-full aspect-[1320/583] bg-[url('public/images/HeroSliderImg2.webp')] bg-contain bg-no-repeat`}
      ></div>
    </Container>
  );
};
