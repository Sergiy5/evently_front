import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { selectToken, selectUser } from './redux/auth/selectors';
import { deleteAllLikedEvents, setAllEvents } from './redux/events/eventsSlice';
import { fetchLikedEvents } from './redux/events/operations';
import router from './routing';
import { getEvents } from './utils/eventsHttp';

const App: React.FC = () => {
  const { id: userId } = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchLikedEvents({ userId, token }));
    } else {
      dispatch(deleteAllLikedEvents());
    }
  }, [userId, token, dispatch]);

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
