import { Settings } from 'react-slick';
import { MySliderBtn } from '../ui/MySliderBtn';
import { MySlider } from '../ui/MySlider';
import { Container } from '../container/Container';
import { EventCard } from '../ui';

 export const events = [
   {
     id: 1,
     status: 'top',
     rating: 10,
     title: 'Ground become.',
     category: 'концерт',
     date: { day: '09.09.2024', time: '16:00' },
     // end: { day: "09.09.2024", time: "23:00" },
     location: { city: 'Chernihiv' },
     tickets: 35,
     price: '1637 грн',
   },
   {
     id: 2,
     status: 'top',
     rating: 10,
     title: 'Drop well none daughter.',
     category: 'спорт',
     date: { day: '26.09.2024', time: '08:00' },
     // end: { day: "26.09.2024", time: "21:00" },
     location: { city: 'Chernihiv' },
     tickets: 23,
     price: '1173 грн',
   },
   {
     id: 3,
     status: 'top',
     rating: 6,
     title: 'Quite often evidence.',
     category: 'stand-up',
     date: { day: '10.09.2024', time: '16:00' },
     // end: { day: "10.09.2024", time: "21:00" },
     location: { city: 'Odesa' },
     tickets: 67,
     price: '1816 грн',
   },
   {
     id: 4,
     status: 'top',
     rating: 10,
     title: 'Agree with.',
     category: 'спорт',
     date: { day: '20.09.2024', time: '10:00' },
     // end: { day: "20.09.2024", time: "21:00" },
     location: { city: 'Lviv' },
     tickets: 89,
     price: '1429 грн',
   },
   {
     id: 5,
     status: 'top',
     rating: 5,
     title: 'Interview reality.',
     category: 'спорт',
     date: { day: '15.09.2024', time: '09:00' },
     // end: { day: "15.09.2024", time: "23:00" },
     location: { city: 'Odesa' },
     tickets: 12,
     price: '1709 грн',
   },
   {
     id: 50,
     status: 'top',
     rating: 5,
     title: 'Often huge you south.',
     category: 'stand-up',
     date: { day: '25.09.2024', time: '10:00' },
     // end: { day: "25.09.2024", time: "22:00" },
     location: { city: 'Zaporizhzhia' },
     tickets: 10,
     price: '717 грн',
   },
   {
     id: 1,
     status: 'top',
     rating: 5,
     title: 'Despite occur.',
     category: 'stand-up',
     date: { day: '07.09.2024', time: '11:00' },
     // end: { day: "07.09.2024", time: "21:00" },
     location: { city: 'Odesa' },
     tickets: 28,
     price: '585 грн',
   },
   {
     id: 2,
     status: 'top',
     rating: 8,
     title: 'Exactly southern.',
     category: 'майстер-клас',
     date: { day: '03.09.2024', time: '09:00' },
     // end: { day: "03.09.2024", time: "22:00" },
     location: { city: 'Lviv' },
     tickets: 19,
     price: '1461 грн',
   },
   {
     id: 3,
     status: 'top',
     rating: 8,
     title: 'Affect member pick.',
     category: 'stand-up',
     date: { day: '24.09.2024', time: '13:00' },
     // end: { day: "24.09.2024", time: "23:00" },
     location: { city: 'Mykolaiv' },
     tickets: 256,
     price: '192 грн',
   },
   {
     id: 4,
     status: 'top',
     rating: 8,
     title: 'Gas leg.',
     category: 'майстер-клас',
     date: { day: '02.09.2024', time: '16:00' },
     // end: { day: "02.09.2024", time: "21:00" },
     location: { city: 'Vinnytsia' },
     tickets: 456,
     price: '1707 грн',
   },
   {
     id: 5,
     status: 'top',
     rating: 6,
     title: 'Trouble.',
     category: 'концерт',
     date: { day: '17.09.2024', time: '17:00' },
     // end: { day: "17.09.2024", time: "22:00" },
     location: { city: 'Odesa' },
     tickets: 89,
     price: '91 грн',
   },
   {
     id: 50,
     status: 'top',
     rating: 10,
     title: 'Maybe scene leader.',
     category: 'майстер-клас',
     date: { day: '14.09.2024', time: '13:00' },
     // end: { day: "14.09.2024", time: "22:00" },
     location: { city: 'Kyiv' },
     tickets: 1256,
     price: '1530 грн',
   },
 ];


interface TopEvents {
  events: number;
}
export const TopEvents: React.FC<TopEvents> = ({ }) => {
  // const [newEvents, setNewEvents] = useState<IEvent[]>(events);
  
// useEffect(() => {
//   console.log(events);
// }, [events]);
  // console.log(newEvents);
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
