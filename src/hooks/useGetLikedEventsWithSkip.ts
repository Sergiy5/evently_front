import { useAppSelector } from '../hooks/hooks';
import { selectIsLoggedIn, selectToken } from '../redux/auth/selectors';
import { useGetLikedEventsQuery } from '../redux/events/operations';

export const useGetLikedEventsWithSkip = (userId: string) => {
  const token = useAppSelector(selectToken);
  const IsLoggedIn = useAppSelector(selectIsLoggedIn);

  return useGetLikedEventsQuery(userId, {
    skip: !token && !IsLoggedIn,
  });
};
