import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import axios from 'axios';

import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { useGetLikedEventsWithSkip } from './hooks/query/useGetLikedEventsWithSkip';
import {
  selectIsLoggedIn,
  selectToken,
  selectUser,
} from './redux/auth/selectors';
import { EventsApi } from './redux/events/operations';
import router from './routing';

const App: React.FC = () => {
  const { id: userId } = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  useGetLikedEventsWithSkip(userId);

  useEffect(() => {
    if (!isLoggedIn || !token) {
      dispatch(EventsApi.util.resetApiState());
    }
  }, [isLoggedIn, dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
