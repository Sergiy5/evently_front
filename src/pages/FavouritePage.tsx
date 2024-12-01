import { useGetLikedEventsWithSkip } from '@/hooks/query/useGetLikedEventsWithSkip';

import { ListEvents } from '@/components/allEvents/ListEvents';

const FavouritePage: React.FC = () => {
  const { data: likedEventsAll } = useGetLikedEventsWithSkip();

  return (
    <>
      {!likedEventsAll || likedEventsAll.length === 0 ? (
        <span>Не знайшов подію, яка цікавить? Чому б не створити власну?</span>
      ) : (
        <ListEvents events={likedEventsAll} />
      )}
    </>
  );
};

export default FavouritePage;
