import { Navigate, Outlet } from 'react-router';

import { selectUser } from '@/redux/auth/selectors';
import { useAppSelector } from '@/redux/hooks';

const AdminRouter = () => {
  const user = useAppSelector(selectUser);

  return user.role === 'ADMIN' ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRouter;
