import { selectIsLoggedIn, selectToken } from '../../redux/auth/selectors';
import { useGetLikedEventsQuery } from '../../redux/events/operations';
import { useAppSelector } from '../../redux/hooks';

export const useGetLikedEventsWithSkip = (userId: string) => {
  const token = useAppSelector(selectToken);
  const IsLoggedIn = useAppSelector(selectIsLoggedIn);

  return useGetLikedEventsQuery(userId, {
    skip: !token || !IsLoggedIn,
  });
};
