import { useAppSelector } from '@/redux/hooks';
import { selectUser } from '@/redux/auth/selectors';
import { Navigate, Outlet } from 'react-router';

const AdminRouter = () => {
  const user = useAppSelector(selectUser);

  return user.role === 'ADMIN' ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRouter;
