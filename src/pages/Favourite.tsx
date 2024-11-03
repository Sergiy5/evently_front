import { getLikedEvents } from '@/redux/events/selectors';

import { useAppSelector } from '@/hooks/hooks';

import { ListEvents } from '@/components/listEvents/ListEvents';

const Favourite: React.FC = () => {
  const likedEvents = useAppSelector(getLikedEvents);

  return (
    <>
      {likedEvents.length === 0 ? (
        <span>
          Не знайшли подію, яка вас цікавить? Чому б не створити власну?
        </span>
      ) : (
        <ListEvents events={likedEvents} />
      )}
    </>
  );
};

export default Favourite;
