import { useLoaderData } from 'react-router';
import { getUsers } from '@/utils/adminHttp';

const AdminUsers = () => {
  const data = useLoaderData() as any[];

  return <main>Admin Users</main>;
};

export default AdminUsers;
