import { selectUser } from '@/redux/auth/selectors';

import { useAppSelector } from '@/hooks/hooks';
import { useGetLikedEventsWithSkip } from '@/hooks/useGetLikedEventsWithSkip';

import { ListEvents } from '@/components/listEvents/ListEvents';

const Favourite: React.FC = () => {
  const { id: userId } = useAppSelector(selectUser);

  const { data: likedEventsAll } = useGetLikedEventsWithSkip(userId);

  return (
    <>
      {!likedEventsAll ? (
        <span>Не знайшов подію, яка цікавить? Чому б не створити власну?</span>
      ) : (
        <ListEvents events={likedEventsAll} />
      )}
    </>
  );
};

export default Favourite;
