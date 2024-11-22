import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import axios from 'axios';

import { useGetLikedEventsWithSkip } from './hooks/query/useGetLikedEventsWithSkip';
import { selectIsLoggedIn, selectToken } from './redux/auth/selectors';
import { EventsApi } from './redux/events/operations';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import router from './routing';

const App: React.FC = () => {
  const token = useAppSelector(selectToken);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  useGetLikedEventsWithSkip();

  useEffect(() => {
    if (!isLoggedIn || !token) {
      dispatch(EventsApi.util.resetApiState());
    }
  }, [isLoggedIn, dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
