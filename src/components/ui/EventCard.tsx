import { SharedBtn } from './SharedBtn';
import { PiHeartLight } from 'react-icons/pi';
import { PiHeartFill } from 'react-icons/pi';
import { useState } from 'react';

interface EventCardProps {
  event: {};
}
export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isCheked, setIsCheked] = useState(false);
  const handleCheck=()=>{
      setIsCheked(!isCheked)
  }
  // console.log("EVENTS_>>>>", events)

  return (
    <div
      className={`group relative flex overflow-hidden items-start bg-[url('public/images/CardImage.webp')]
         rounded-[20px] bg-no-repeat w-[311px] h-[483px]`}
    >
      <div className={`flex justify-end p-6 w-full `}>
        <button
          type="button"
          onClick={() => handleCheck()}
          className={`focus:outline-none`}
        >
          {isCheked ? (
            <PiHeartFill className={`w-6 h-6 text-lightPink`} />
          ) : (
            <PiHeartLight className="w-6 h-6 text-lightPink" />
          )}
        </button>
      </div>
      <div
        className={`absolute flex flex-col items-start gap-6 -bottom-[122px] w-full pt-8 pb-6 px-3 h-[315px]
          rounded-t-[20px] bg-hoverCard transition-all ease-in-out duration-300 group-hover:bottom-0`}
      >
        <div
          className={`flex items-center justify-center px-4 py- h-8 rounded-[20px]
                 border-[2px] border-borderColor bg-bg-gradient`}
        >
          <p className={`font-normal text-xl text-textDark`}>Майстер клас</p>
        </div>
        <h3></h3>
        <ul className={`flex font-bold justify-between w-full`}>
          <li>18 вересня 17:00</li>
          <li>Від 500 грн</li>
        </ul>
        <div className="flex flex-col items-center gap-8 h-[91px]">
          <h2>Свічки власноруч</h2>
          <p>Київ, вул. Космонавтів 40</p>
        </div>
        <SharedBtn type="button" primary className="w-[287px]">
          Хочу
        </SharedBtn>
        <p>Залишилось 30 квитків</p>
      </div>
    </div>
  );
};
