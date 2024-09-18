import { Container } from './Container';

export const Hero: React.FC = () => {

  return (
    <Container>
      <div
        className={`w-full aspect-[1320/583] bg-[url('public/images/HeroSliderImg.webp')] bg-contain bg-no-repeat`}
      ></div>
    </Container>
  );
};