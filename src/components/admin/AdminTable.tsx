import React, { useState } from 'react';
import clsx from 'clsx';
import { nanoid } from '@reduxjs/toolkit';
import axios from 'axios';

import UserCard from './UserCard';
import { BsFilter } from 'react-icons/bs';
import { User } from '@/redux/users/usersSlice';
import sortUser from '@/utils/sortUser';
import { Modal } from '../ui';
import { SharedBtn } from '../ui';

interface IProps {
  cols: string[];
  data: User[] | [];
  from: number;
  to: number;
}

const AdminTable: React.FC<IProps> = ({ cols, data, from, to }) => {
  const [sort, setSort] = useState<
    { col: string; direction: number } | undefined
  >({ col: cols[3], direction: 1 });
  const [openPopUp, setOpenPopUp] = useState<number | undefined>(undefined);
  const [confirmationDelete, setConfirmationDelete] = useState<boolean>(false);
  const [confirmationChangeStatus, setConfirmationChangeStatus] =
    useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  // add async function deleteUser
  const deleteUser = async () => {
    const response = await axios.delete('admin/' + selectedUser?.id);
    if (response.status === 200) {
      setOpenPopUp(undefined);
      setConfirmationDelete(false);
    }
  };

  // add async function changeStatusUser
  const changeStatusUser = () => {
    console.log(selectedUser?.name);
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
        return { col, direction: 1 };
      } else {
        let direction = currState.direction as number;

        if (direction === 2) {
          return { col, direction: 0 };
        }

        return { col, direction: direction + 1 };
      }
    });
  };

  const handleOpenModal = (variant: 'status' | 'delete') => {
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

  // const widths = ['128px', '108px', '128px', '131px', '128px', '135px'];
  // const widths = ['17%', '14%', '17%', '17%', '17%', '18%'];

  return (
    <>
      <table
        className="rounded border border-buttonPurple border-separate border-spacing-0 w-full h-full table-fixed"
        onClick={event => handleClosePopUp(event)}
      >
        <thead>
          <tr className="h-[58px]">
            {cols.map((col, index) => (
              <th
                key={col}
                onClick={() => handleChangeSort(col)}
                className={clsx(
                  'bg-lightBlue border-buttonPurple border p-[10px_12px] text-textDark text-[16px] leading-4 font-bold align-text-top text-wrap max-w-[135px] min-w-[90px]'
                )}
              >
                <p
                  className={clsx('relative', {
                    'pr-6': col === sort?.col && sort?.direction !== 0,
                  })}
                >
                  {col}
                  {col === sort?.col && sort?.direction !== 0 && (
                    <BsFilter
                      className={clsx(
                        'w-6 h-6 absolute right-0 top-1/2 -translate-y-1/2',
                        {
                          'rotate-180':
                            col === sort?.col && sort.direction === 2,
                          'rotate-0': col === sort?.col && sort.direction === 1,
                        }
                      )}
                    />
                  )}
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
      <Modal
        isOpen={confirmationDelete}
        onClose={() => setConfirmationDelete(false)}
        hiddenCross
      >
        <div className="border border-buttonPurple rounded-[20px] bg-lightBlue py-6 px-8 w-[362px] text-center">
          <p className="text-2xl text-textDark font-lato">
            Ви точно хочете видалити цього користувача?
          </p>
          <div className="flex justify-between mt-6">
            <SharedBtn
              type="button"
              primary
              className="w-[120px] h-8 !py-0"
              onClick={deleteUser}
            >
              Taк
            </SharedBtn>
            <SharedBtn
              type="button"
              secondary
              className="w-[120px] h-8 !py-0"
              onClick={() => setConfirmationDelete(false)}
            >
              Ні
            </SharedBtn>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={confirmationChangeStatus}
        onClose={() => setConfirmationChangeStatus(false)}
        hiddenCross
      >
        <div className="border border-buttonPurple rounded-[20px] bg-lightBlue py-6 px-8 w-[362px] text-center">
          <p className="text-2xl text-textDark font-lato">
            Ви точно хочете змінити статус цього користувача?
          </p>
          <div className="flex justify-between mt-6">
            <SharedBtn
              type="button"
              primary
              className="w-[120px] h-8 !py-0"
              onClick={changeStatusUser}
            >
              Taк
            </SharedBtn>
            <SharedBtn
              type="button"
              secondary
              className="w-[120px] h-8 !py-0"
              onClick={() => setConfirmationChangeStatus(false)}
            >
              Ні
            </SharedBtn>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdminTable;
