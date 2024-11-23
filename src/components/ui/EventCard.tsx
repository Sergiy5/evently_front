import { useEffect, useState } from 'react';
import { AiOutlineCalendar } from 'react-icons/ai';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { GrLocation } from 'react-icons/gr';
import { PiHeartLight } from 'react-icons/pi';
import { PiHeartFill } from 'react-icons/pi';
import { toast } from 'react-toastify';

import { selectUser } from '@/redux/auth/selectors';
import {
  useAddLikedEventMutation,
  useDeleteLikedEventMutation,
} from '@/redux/events/operations';
import { useAppSelector } from '@/redux/hooks';

import { useGetLikedEventsWithSkip } from '@/hooks/query/useGetLikedEventsWithSkip';

import { SharedBtn } from './SharedBtn';

interface EventCardProps {
  event: Event;
  top?: boolean;
  favorite?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  top = false,
  favorite = false,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const {
    id: eventId,
    title,
    date,
    category,
    price,
    location,
    type,
    photoUrl,
  } = event;

  const { id: userId } = useAppSelector(selectUser);

  const { data: likedEventsAll } = useGetLikedEventsWithSkip(userId);
  const [addLikedEvent] = useAddLikedEventMutation();
  const [deleteLikedEvent] = useDeleteLikedEventMutation();

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
      const addLiked = async () => {
        try {
          if (userId) {
            await addLikedEvent({ userId, eventId, event });
          } else {
            return toast.error('Щоб зберегти, потрібно залогінитись!');
          }
        } catch (error) {
          console.log(error);
        }
      };
      addLiked();
    } else {
      const deleteFromLiked = async () => {
        try {
          if (userId) {
            await deleteLikedEvent({ userId, eventId });
          } else {
          }
        } catch (error) {
          console.log(error);
          return error;
        }
      };
      deleteFromLiked();
    }
  };

  useEffect(() => {
    if (likedEventsAll) {
      setIsLiked(likedEventsAll.some(item => item.id === event.id));
    }
  }, [likedEventsAll]);

  return (
    <div
      id={`${eventId}`}
      className={`group relative flex overflow-hidden items-start rounded-[20px] shadow-eventCardShadow ${
        top ? 'mb-[10px]' : ''
      } ${favorite ? 'w-[284px] h-[480px]' : 'w-[312px] h-[514px]'} `}
    >
      <img src={photoUrl} alt={title} width={'100%'} />
      <div className={`flex absolute justify-between p-6 w-full`}>
        {category === 'TOP_EVENTS' && (
          <div className="flex justify-center items-center w-[58px] h-[35px] bg-badge-gradient rounded-[20px]">
            <span className="text-background">ТОП</span>
          </div>
        )}
        <button
          type="button"
          onClick={toggleIsLiked}
          className={`focus:outline-none ml-auto bg-background w-[32px] h-[32px] flex items-center justify-center rounded-full opacity-60`}
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
        <h2
          className={`min-h-[72px] text-2xl text-textDark group-hover:line-clamp-none ${favorite ? 'line-clamp-2' : ''}`}
        >
          {title}
        </h2>

        <ul
          className={`flex flex-col gap-[18px] font-normal text-md text-textDark justify-between w-full`}
        >
          <li className="flex items-center gap-[18px]">
            <AiOutlineCalendar size="24px" />
            <p>{`${date?.day}, ${date?.time}`}</p>
          </li>
          <li className="flex items-center gap-[18px]">
            <GrLocation size="24px" />
            <p
              className={
                favorite ? 'truncate group-hover:whitespace-normal' : ''
              }
            >
              {slicedStreet()}
            </p>
          </li>
          <li className="flex items-center gap-[18px]">
            <FaRegMoneyBillAlt size="24px" />
            {price === 0 ? (
              <p className="text-error">Безкоштовно</p>
            ) : (
              <p>{`${price} ₴`}</p>
            )}
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
