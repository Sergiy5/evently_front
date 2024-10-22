import { ProfileTabLayout } from '@/components/layout/ProfileTabLayout';
import { selectIsLoggedIn } from '@/redux/auth/selectors';
import { useSelector } from 'react-redux';

const LoginRouter = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? <ProfileTabLayout /> : <ProfileTabLayout />;
};

export default LoginRouter;
