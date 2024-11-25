import React, { useState } from 'react';
import { BsFilter } from 'react-icons/bs';

import { useAppDispatch } from '@/redux/hooks';
import { fetchUsers } from '@/redux/users/operations';

import sortUser from '@/utils/sortUser';
import { nanoid } from '@reduxjs/toolkit';
import axios from 'axios';
import clsx from 'clsx';

import ModalAdmin from './ModalAdmin';
import UserCard from './UserCard';

interface IProps {
  cols: string[];
  data: User[] | [];
  from: number;
  to: number;
}

const AdminTable: React.FC<IProps> = ({ cols, data, from, to }) => {
  const [sort, setSort] = useState<
    { col: string; direction: boolean } | undefined
  >({ col: cols[3], direction: false });
  const [openPopUp, setOpenPopUp] = useState<number | undefined>(undefined);
  const [confirmationDelete, setConfirmationDelete] = useState<boolean>(false);
  const [confirmationChangeStatus, setConfirmationChangeStatus] =
    useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  const dispatch = useAppDispatch();

  // add async function deleteUser
  const deleteUser = async () => {
    const response = await axios.delete('admin/users/' + selectedUser?.id);
    if (response.status === 200) {
      setOpenPopUp(undefined);
      setConfirmationDelete(false);
      dispatch(fetchUsers());
    }
  };

  // add async function changeStatusUser
  const changeStatusUser = async () => {
    let url = selectedUser?.email;
    console.log(url);

    const response = await axios.patch(
      `admin/users/${selectedUser?.status === 'ACTIVE' ? 'ban/' : 'unban/'}` +
        url
    );
    if (response.status === 200) {
      setOpenPopUp(undefined);
      setConfirmationChangeStatus(false);
      dispatch(fetchUsers());
    }
  };

  const handlePopUp = (id: number) => {
    setSelectedUser(sortedData[id]);
    setOpenPopUp(id);
  };

  const handleClosePopUp = (event: any) => {
    if (event.target.tagName === 'svg' || event.target.tagName === 'path') {
      return;
    }

    setOpenPopUp(undefined);
  };

  const handleChangeSort = (col: string) => {
    setSort(prevState => {
      const currState = { ...prevState };
      if (currState.col !== col) {
        return { col, direction: true };
      } else {
        return { col, direction: !currState.direction };
      }
    });
  };

  const handleOpenModal = (variant: 'status' | 'delete', user: User) => {
    setSelectedUser(user);
    if (variant === 'delete') {
      setConfirmationDelete(true);
    } else {
      setConfirmationChangeStatus(true);
    }
  };

  let sortedData = [...data];
  if (sort) {
    sortedData = sortUser(sort, cols, data);
  }

  return (
    <>
      <table
        className="rounded border border-buttonPurple border-separate border-spacing-0 w-full h-full table-fixed"
        onClick={event => handleClosePopUp(event)}
      >
        <thead>
          <tr className="h-[58px]">
            {cols.map(col => (
              <th
                key={col}
                onClick={() => handleChangeSort(col)}
                className={clsx(
                  'bg-lightBlue border-buttonPurple border p-[10px_12px] text-textDark text-[16px] leading-4 font-bold align-text-top text-wrap max-w-[135px] min-w-[90px] hover:cursor-pointer'
                )}
              >
                <p className="relative pr-6">
                  {col}

                  <BsFilter
                    className={clsx(
                      'w-6 h-6 absolute right-0 top-1/2 -translate-y-1/2 ',
                      {
                        'rotate-180 fill-buttonPurple':
                          col === sort?.col && sort.direction,
                        'rotate-0 fill-buttonPurple':
                          col === sort?.col && !sort.direction,
                      }
                    )}
                  />
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.slice(from, to).map((item, index) => (
            <UserCard
              key={nanoid()}
              item={item}
              index={index + from}
              idPopUp={openPopUp}
              openPopUp={handlePopUp}
              openModal={handleOpenModal}
            />
          ))}
        </tbody>
      </table>
      <ModalAdmin
        text="Ви точно хочете видалити цього користувача?"
        isOpen={confirmationDelete}
        onClose={() => setConfirmationDelete(false)}
        clickYes={deleteUser}
      />
      <ModalAdmin
        text="Ви точно хочете змінити статус цього користувача?"
        isOpen={confirmationChangeStatus}
        onClose={() => setConfirmationChangeStatus(false)}
        clickYes={changeStatusUser}
      />
    </>
  );
};

export default AdminTable;
