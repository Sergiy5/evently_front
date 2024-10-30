import { SharedBtn } from './SharedBtn';
import { PiHeartLight } from 'react-icons/pi';
import { PiHeartFill } from 'react-icons/pi';
import { useEffect, useState } from 'react';
import { IEvent } from '@/types/components';
import { CiLocationOn } from 'react-icons/ci';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { addEventToLiked, removeEventFromLiked } from '@/utils/eventsHttp';
import { selectUser } from '@/redux/auth/selectors';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface EventCardProps {
  event: IEvent;
}
export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [isChecked, setIsCheked] = useState<boolean | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const { id, title, date, category, price, location, type, photoUrl } = event;
  const { userId } = useSelector(selectUser);

  useEffect(() => {
    if (isChecked === null) return;
    if (isChecked) {
      const addLiked = async (userId: string, eventId: number) => {
        try {
          const response = await addEventToLiked(userId, eventId.toString());
          if (response.status === 201) {
            setIsLiked(true);
          }
          if (response.status === 401 || response.status === 403) {
            return toast.error(`Щоб зберегти, потрібно залогінитись!`);
          }
        } catch (error) {
          console.log(error);
        }
      };
      addLiked(userId, id);
    }

    if (!isChecked) {
      const deleteFromLiked = async (userId: string, eventId: number) => {
        try {
          const response = await removeEventFromLiked(userId, eventId);
          if (response.status === 200) {
            setIsLiked(false);
          }
          if (response.status === 401 || response.status === 403) {
            return toast.error(`Щоб зберегти, потрібно залогінитись!`);
          }
        } catch (error) {
          console.log(error);
        }
      };
      deleteFromLiked(userId, id);
    }
  }, [isChecked, userId, id]);

  return (
    <div
      id={`${id}`}
      className={`group mb-4 relative flex overflow-hidden items-start rounded-[20px] w-[311px] h-[514px] shadow-eventCardShadow `}
    >
      <img src={photoUrl} alt={title} />
      <div className={`flex absolute justify-end p-6 w-full `}>
        <button
          type="button"
          onClick={() => setIsCheked(!isChecked)}
          className={`focus:outline-none`}
        >
          {isLiked ? (
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
          <li className="flex items-center gap-[18px]">
            {' '}
            <AiOutlineCalendar size="24px" />
            <p>{`${date?.day}, ${date?.time}`}</p>
          </li>
          <li className="flex items-center gap-[18px]">
            {' '}
            <CiLocationOn size="24px" /> <p>{location?.city}</p>
          </li>
          <li className="flex items-center gap-[18px]">
            <FaRegMoneyBillAlt size="24px" />
            {price === 0 ? (
              <p className="text-error">Безкоштовно</p>
            ) : (
              <p>{`Від ${price} грн`}</p>
            )}{' '}
          </li>
        </ul>

        <SharedBtn type="button" primary className="w-[230px] h-12 mx-auto">
          Хочу
        </SharedBtn>
        <p className="text-error mx-auto">Залишилось 30 квитків</p>
      </div>
    </div>
  );
};
