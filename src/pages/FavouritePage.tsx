import { useGetLikedEventsWithSkip } from '@/hooks/query/useGetLikedEventsWithSkip';

import { ListEvents } from '@/components/allEvents/ListEvents';
import Spinner from '@/components/ui/Spinner';

const FavouritePage: React.FC = () => {
  const { data: likedEventsAll, isLoading } = useGetLikedEventsWithSkip();

  if (isLoading) return <Spinner />;

  return (
    <>
      {!likedEventsAll || likedEventsAll.length === 0 ? (
        !isLoading && (
          <span>
            Не знайшов подію, яка цікавить? Чому б не створити власну?
          </span>
        )
      ) : (
        <ListEvents events={likedEventsAll} />
      )}
    </>
  );
};

export default FavouritePage;
