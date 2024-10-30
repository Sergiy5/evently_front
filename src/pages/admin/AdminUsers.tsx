import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

import { MdOutlineRefresh } from 'react-icons/md';
import AdminTable from '@/components/admin/AdminTable';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { fetchUsers } from '@/redux/users/operations';
import { User } from '@/redux/users/usersSlice';
import { selectUsers } from '@/redux/users/selectors';
import { BiChevronDown } from 'react-icons/bi';

const AdminUsers = () => {
  const { t } = useTranslation('adminUser');
  const cols = t('colTable', { returnObjects: true });
  const dispatch = useAppDispatch();
  const adminUsers = useAppSelector(selectUsers);

  const [users, setUsers] = useState<User[]>([]);
  const [quantityUsers, setQuanitityUsers] = useState<number>(20);
  const [page, setPage] = useState<number>(1);

  const totalUser = adminUsers.length;
  const minUserPage = quantityUsers * (page - 1) + 1;
  const maxUserPage =
    page * quantityUsers > totalUser ? totalUser : page * quantityUsers;

  useEffect(() => {
    setUsers(adminUsers);
  }, [adminUsers]);

  const handleGetUsers = async () => {
    await dispatch(fetchUsers());
  };

  useEffect(() => {
    handleGetUsers();
  }, []);

  const handleChangePage = (direction: 'up' | 'down') => {
    setPage(currPage => {
      if (direction === 'up') {
        const maxPage = totalUser / quantityUsers;
        return currPage >= maxPage ? currPage : currPage + 1;
      } else {
        return currPage > 1 ? currPage - 1 : 1;
      }
    });
  };

  const handleChangeQuantitty = (event: any) => {
    setQuanitityUsers(+event?.target.value);
    setPage(1);
  };

  return (
    <main className="bg-lightPurple">
      <button
        onClick={handleGetUsers}
        className="flex gap-1 text-textDark text-xs leading-6 font-lato focus:outline-0 mb-[15px]"
      >
        <MdOutlineRefresh className="w-6 h-6" />
        {t('refresh')}
      </button>
      <div>
        <AdminTable
          cols={cols}
          data={users}
          from={minUserPage - 1}
          to={maxUserPage}
        ></AdminTable>
      </div>
      <div className="flex items-center justify-end mt-[13px] text-xs font-lato text-textDark">
        <p className="h-fit w-fit rounded-[10px] border border-buttonPurple bg-background p-[3px_6px] mr-[10px]">
          {minUserPage}-{maxUserPage} з {totalUser}
        </p>
        <p className="mr-4">Кількість користувачів</p>
        <div className="flex gap-2">
          <button
            onClick={() => handleChangePage('down')}
            className="focus:outline-0"
          >
            <BiChevronDown className="rotate-90 w-6 h-6" />
          </button>
          <p className="text-base">{page}</p>
          <button
            onClick={() => handleChangePage('up')}
            className="focus:outline-0"
          >
            <BiChevronDown className="-rotate-90 w-6 h-6" />
          </button>
        </div>
        <select
          className="h-fit w-fit rounded-[10px] border border-buttonPurple bg-background px-1 py-[3px] mr-2"
          onChange={handleChangeQuantitty}
          defaultValue={20}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
        <p>Елементів на сторінці</p>
      </div>
    </main>
  );
};

export default AdminUsers;
