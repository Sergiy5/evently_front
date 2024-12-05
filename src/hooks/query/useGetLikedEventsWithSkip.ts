import {
  selectIsLoggedIn,
  selectToken,
  selectUser,
} from '../../redux/auth/selectors';
import { useGetLikedEventsQuery } from '../../redux/events/operations';
import { useAppSelector } from '../../redux/hooks';

export const useGetLikedEventsWithSkip = () => {
  const token = useAppSelector(selectToken);
  const IsLoggedIn = useAppSelector(selectIsLoggedIn);
  const { id: userId } = useAppSelector(selectUser);

  return useGetLikedEventsQuery(userId, {
    skip: !token || !IsLoggedIn || !userId,
  });
};
