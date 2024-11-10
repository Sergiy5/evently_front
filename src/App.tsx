import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { useGetLikedEventsWithSkip } from './hooks/useGetLikedEventsWithSkip';
import {
  selectIsLoggedIn,
  selectToken,
  selectUser,
} from './redux/auth/selectors';
import { setAllEvents } from './redux/events/eventsSlice';
import { EventsApi } from './redux/events/operations';
import router from './routing';
import { getEvents } from './utils/eventsHttp';

const App: React.FC = () => {
  const { id: userId } = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  useGetLikedEventsWithSkip(userId);

  useEffect(() => {
    if (!isLoggedIn || !token) {
      dispatch(EventsApi.util.resetApiState());
    }
  }, [isLoggedIn, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEvents();
        dispatch(setAllEvents(response));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
