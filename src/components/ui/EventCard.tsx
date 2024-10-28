import { SharedBtn } from './SharedBtn';
import { PiHeartLight } from 'react-icons/pi';
import { PiHeartFill } from 'react-icons/pi';
import { useState } from 'react';
import { IEvent } from '@/types/components';

interface EventCardProps {
  event: IEvent;
}
export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isCheked, setIsCheked] = useState(false);
  const handleCheck=()=>{
      setIsCheked(!isCheked)
  }
  // console.log("EVENTS_>>>>", event)
  const { id, title, date, category, price, location, type } = event;

  return (
    <div
      id={`${id}`}
      className={`group relative flex overflow-hidden items-start bg-[url('public/images/CardImage.webp')]
         rounded-[20px] bg-no-repeat w-[311px] h-[514px]`}
    >
      <div className={`flex justify-end p-6 w-full `}>
        <button
          type="button"
          onClick={() => handleCheck()}
          className={`focus:outline-none`}
        >
          {isCheked ? (
            <PiHeartFill className={`w-6 h-6 text-borderColor`} />
          ) : (
            <PiHeartLight className="w-6 h-6 text-background" />
          )}
        </button>
      </div>
      <div
        className={`absolute flex flex-col items-start gap-2 justify-between w-full py-4 px-5 h-[365px]
          rounded-t-[20px] bg-hoverCard transition-all ease-in-out duration-300 -bottom-[101px]
          ${category === 'TOP_EVENTS' ? 'group-hover:-bottom-0' : 'group-hover:-bottom-10'}
          `}
      >
        <div
          className={`flex items-center justify-center h-8 rounded-[20px]
                 border-[2px] border-borderColor bg-bg-gradient`}
        >
          <p className={`font-normal text-md text-textDark px-4 py-2.5 `}>
            {type}
          </p>
        </div>
        <h2 className={`min-h-[72px] text-2xl text-textDark`}>{title}</h2>
        <ul
          className={`flex flex-col gap-[18px] font-normal text-md text-textDark justify-between w-full`}
        >
          <li>{`${date?.day}, ${date?.time}`}</li>
          <li>{location?.city}</li>
          <li>{`Від ${price} грн`}</li>
        </ul>

        <SharedBtn type="button" primary className="w-[230px] h-12 mx-auto">
          Хочу
        </SharedBtn>
        <p className="text-error mx-auto">Залишилось 30 квитків</p>
      </div>
    </div>
  );
};
