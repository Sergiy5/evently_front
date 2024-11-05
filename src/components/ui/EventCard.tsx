import { useEffect, useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { PiHeartLight } from 'react-icons/pi';
import { PiHeartFill } from 'react-icons/pi';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { selectUser } from '@/redux/auth/selectors';
import { addLikedEvent, deleteLikedEvent } from '@/redux/events/eventsSlice';
import { getLikedEvents } from '@/redux/events/selectors';

import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { addEventToLiked, removeEventFromLiked } from '@/utils/eventsHttp';

import { SharedBtn } from './SharedBtn';

interface EventCardProps {
  event: Event;
  top?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, top = false }) => {
  const [isLiked, setIsLiked] = useState(false);

  const { id, title, date, category, price, location, type, photoUrl } = event;

  const { id: userId } = useSelector(selectUser);
  const likedEventsAll = useAppSelector(getLikedEvents);

  const dispatch = useAppDispatch();

  // TODO
  const address = location.city + ', ' + location.street;
  const slicedStreet = () => {
    if (address.length > 29) {
      return address.slice(0, 28) + '...';
    } else {
      return address;
    }
  };

  const toggleIsLiked = () => {
    if (!isLiked) {
      const addLiked = async (userId: string, eventId: string) => {
        try {
          const response = await addEventToLiked(userId, eventId);
          if (response.status === 201) {
            dispatch(addLikedEvent(event));
          }
        } catch (error) {
          console.log(error);
          return error;
        }
      };
      addLiked(userId, id);
    } else {
      const deleteFromLiked = async (userId: string, eventId: string) => {
        try {
          const response = await removeEventFromLiked(userId, eventId);
          if (response.status === 200) {
            dispatch(deleteLikedEvent(id));
          }
        } catch (error) {
          console.log(error);
          return toast.error('Щоб зберегти, потрібно залогінитись!');
        }
      };
      deleteFromLiked(userId, id);
    }
  };

  useEffect(() => {
    setIsLiked(likedEventsAll.some(item => item.id === event.id));
  }, [likedEventsAll]);

  return (
    <div
      id={`${id}`}
      className={`group relative flex overflow-hidden items-start rounded-[20px] w-[312px] h-[514px] shadow-eventCardShadow ${
        top ? 'mb-[10px]' : ''
      }`}
    >
      <img src={photoUrl} alt={title} />
      <div className={`flex absolute justify-end p-6 w-full `}>
        <button
          type="button"
          onClick={toggleIsLiked}
          className={`focus:outline-none`}
        >
          {isLiked ? (
            <PiHeartFill className={`w-6 h-6 text-borderColor`} />
          ) : (
            <PiHeartLight className="w-6 h-6 text-borderColor" />
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
            <GrLocation size="24px" /> <p>{slicedStreet()}</p>
          </li>
          <li className="flex items-center gap-[18px]">
            <FaRegMoneyBillAlt size="24px" />
            {price === 0 ? (
              <p className="text-error">Безкоштовно</p>
            ) : (
              <p>{`${price} грн`}</p>
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
