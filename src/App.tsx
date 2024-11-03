import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { selectToken, selectUser } from './redux/auth/selectors';
import { deleteLikedEvents } from './redux/events/eventsSlice';
import { fetchLikedEvents } from './redux/events/operations';
import router from './routing';

const App: React.FC = () => {
  const { id: userId } = useAppSelector(selectUser);
  const token = useAppSelector(selectToken);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(fetchLikedEvents({ userId, token }));
    } else {
      dispatch(deleteLikedEvents());
    }
  }, [userId, token, dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
