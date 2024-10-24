import { Settings } from 'react-slick';
import { MySliderBtn } from '../ui/MySliderBtn';
import { MySlider } from '../ui/MySlider';
import { Container } from '../container/Container';
import { EventCard } from '../ui';
import { events } from '@/assets/fakeData/events';


interface TopEvents {
}
export const TopEvents: React.FC<TopEvents> = ({ }) => {

  const settings: Settings = {
    pauseOnHover: true,
    slidesToShow: 4.25,
    slidesToScroll: 4,
    speed: 2000,
    infinite: false,
    nextArrow: <MySliderBtn next_style={true} />,
    prevArrow: <MySliderBtn />,
    arrows: true,
    pauseOnFocus: true,
    initialSlide: 0,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '10%',
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div className={`flex flex-col gap-8`}>
      <Container>
        <h1>Топ подій</h1>
      </Container>
      <MySlider
        arraySlides={events}
        SlideComponent={EventCard}
        settings={settings}
      />
    </div>
  );
};
