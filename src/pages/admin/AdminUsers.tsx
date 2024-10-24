import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { getUsers } from '@/utils/adminHttp';
import { MdOutlineRefresh } from 'react-icons/md';
import AdminTable from '@/components/admin/AdminTable';
import UserCard from '@/components/admin/UserCard';

export interface User {
  name: string;
  phone: string;
  email: string;
  date: string;
  role: string;
  status: string;
}

const AdminUsers = () => {
  const { t } = useTranslation('adminUser');
  const cols = t('colTable', { returnObjects: true });

  const [users, setUsers] = useState<User[]>([]);

  const handleGetUsers = async () => {
    const users = await getUsers();
    setUsers(users);
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleChangeData = (data: User[]) => {
    setUsers(data);
  };

  return (
    <main className="bg-lightPurple">
      <button
        onClick={getUsers}
        className="flex gap-1 text-textDark text-xs leading-6 font-lato focus:outline-0 mb-[15px]"
      >
        <MdOutlineRefresh className="w-6 h-6" />
        {t('refresh')}
      </button>
      <div>
        <AdminTable cols={cols} data={users} setUsers={handleChangeData}></AdminTable>
      </div>
    </main>
  );
};

export default AdminUsers;
