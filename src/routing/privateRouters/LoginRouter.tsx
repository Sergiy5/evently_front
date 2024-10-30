import { Navigate } from 'react-router';

import { ProfileTabLayout } from '@/components/layout/ProfileTabLayout';
import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useAppSelector } from '@/hooks/hooks';

const LoginRouter = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  return isLoggedIn ? <ProfileTabLayout /> : <Navigate to="/evently_front" />;
};

export default LoginRouter;
