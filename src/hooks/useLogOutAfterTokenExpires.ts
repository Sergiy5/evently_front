import { useEffect } from 'react';

import { logOut } from '@/redux/auth/operations';
import { selectToken } from '@/redux/auth/selectors';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';

export function useLogOutAfterTokenExpires() {
  const token = useAppSelector(selectToken);

  const dispatch = useAppDispatch();

  const tokenExpires = token !== null && jwtDecode(token).exp;
  const expirationDate = tokenExpires && dayjs(tokenExpires * 1000);
  const expirationDateFormatted =
    expirationDate && expirationDate.format('YYYY-MM-DD HH:mm:ss');
  const todayDateFormatted = dayjs().format('YYYY-MM-DD HH:mm:ss');

  useEffect(() => {
    if (
      expirationDateFormatted &&
      todayDateFormatted > expirationDateFormatted
    ) {
      dispatch(logOut());
    }
  }, [dispatch, expirationDateFormatted, todayDateFormatted]);
}
