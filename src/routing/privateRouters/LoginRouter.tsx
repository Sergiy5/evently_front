import { Navigate } from 'react-router';

import { ProfileTabLayout } from '@/components/layout/ProfileTabLayout';
import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

const LoginRouter = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <ProfileTabLayout /> : <Navigate to="/" />;
};

export default LoginRouter;
