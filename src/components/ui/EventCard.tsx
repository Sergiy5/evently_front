import { SharedBtn } from './SharedBtn';
import { PiHeartLight } from 'react-icons/pi';
import { PiHeartFill } from 'react-icons/pi';
import events from '@/assets/fakeData/events';
import { useState } from 'react';

interface EventCardProps {
  event: {};
}
export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isCheked, setIsCheked] = useState(false);

  // console.log("EVENTS_>>>>", events)

  // if (events.length) {
  //   events.map(event => <h2>{event.name}</h2>)
  // }
  return (
    <div
      className={`group relative flex overflow-hidden items-start bg-[url('public/images/CardImage.webp')]
         rounded-[20px] bg-no-repeat w-[311px] h-[483px]`}
    >
      <div className={`flex justify-between p-6 w-full `}>
        <div
          className={`flex items-center justify-center w-32 h-8 rounded-[20px]
                 border-[2px] border-white bg-white bg-opacity-30`}
        >
          <p className={`text-white font-light text-base`}>Майстер клас</p>
        </div>
        {isCheked ? (
          <PiHeartFill className={`w-6 h-6 text-lightPink`} />
        ) : (
          <PiHeartLight className="w-6 h-6 text-lightPink" />
        )}
      </div>
      <div
        className={`absolute flex flex-col items-center justify-between -bottom-[92px] w-full py-8 px-3 h-[292px]
             rounded-t-[20px] bg-hoverCard transition-all ease-in-out duration-300 group-hover:bottom-0`}
      >
        <ul className={`flex justify-between w-full`}>
          <li>16.09.24-25.0924</li>
          <li>17:00</li>
          <li>Київ</li>
        </ul>
        <h2>Свічки власноруч</h2>
        <p>Від 500 грн</p>
        <SharedBtn type="button" className="w-[287px]">
          Хочу
        </SharedBtn>
      </div>
    </div>
  );
};
