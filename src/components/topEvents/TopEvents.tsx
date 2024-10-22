import { EventCard } from '../ui';
import { Settings } from 'react-slick';
import { MySliderBtn } from '../ui/MySliderBtn';
import { MySlider } from '../ui/MySlider';
import {events} from '@/assets/fakeData/events';
import { Container } from '../container/Container';

interface TopEvents {
  events: number;
}
export const TopEvents: React.FC<TopEvents> = ({ }) => {
  
// useEffect(() => {
//   console.log(events);
// }, [events]);
  
  const settings: Settings = {
    pauseOnHover: true,
    slidesToShow: 4.25,
    slidesToScroll: 4,
    infinite: false,
    nextArrow: <MySliderBtn />,
    prevArrow: <MySliderBtn prev_style={'rotate-180'} />,
    arrows: true,
    pauseOnFocus: true,
    initialSlide: 0,
    lazyLoad: 'ondemand',
    // centerMode: true,
    // centerPadding: '2%',
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
