import { selectIsLoggedIn, selectUser } from '../../redux/auth/selectors';
import { useGetLikedEventsQuery } from '../../redux/events/operations';
import { useAppSelector } from '../../redux/hooks';

export const useGetLikedEventsWithSkip = () => {
  const IsLoggedIn = useAppSelector(selectIsLoggedIn);
  const { id: userId } = useAppSelector(selectUser);

  return useGetLikedEventsQuery(userId, {
    skip: !IsLoggedIn,
  });
};
