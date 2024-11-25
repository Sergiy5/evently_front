import { Navigate } from 'react-router';

import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

import { ProfileTabLayout } from '@/components/layout/ProfileTabLayout';

const LoginRouter = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <ProfileTabLayout /> : <Navigate to="/" />;
};

export default LoginRouter;
