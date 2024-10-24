import { ProfileTabLayout } from '@/components/layout/ProfileTabLayout';
import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const LoginRouter = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <ProfileTabLayout /> : <Navigate to="/evently_front" />;
};

export default LoginRouter;
