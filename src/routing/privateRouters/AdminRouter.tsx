import { useAppSelector } from '@/hooks/hooks';
import { selectUser } from '@/redux/auth/selectors';
import { Navigate, Outlet } from 'react-router';

const AdminRouter = () => {
  const user = useAppSelector(selectUser);

  return user.role === 'ADMIN' ? <Outlet /> : <Navigate to="/evently_front" />;
};

export default AdminRouter;
