import { useGetLikedEventsWithSkip } from '@/hooks/query/useGetLikedEventsWithSkip';

import { ListEvents } from '@/components/listEvents/ListEvents';

const Favourite: React.FC = () => {
  const { data: likedEventsAll } = useGetLikedEventsWithSkip();

  return (
    <>
      {!likedEventsAll ? (
        <span>Не знайшов подію, яка цікавить? Чому б не створити власну?</span>
      ) : (
        <ListEvents events={likedEventsAll} favorite />
      )}
    </>
  );
};

export default Favourite;
