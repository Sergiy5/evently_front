import React, { useRef, useState } from 'react';

import CellItem from './CellTable';
import { User } from '@/redux/users/usersSlice';
import { TfiLock } from 'react-icons/tfi';
import { AiOutlineUserSwitch } from 'react-icons/ai';

interface IProps {
  item: User;
  index: number;
  idPopUp?: number;
  openPopUp: (id: number) => void;
  openModal: (variant: 'delete' | 'status') => void;
}

const UserCard: React.FC<IProps> = ({
  item,
  index,
  idPopUp,
  openPopUp,
  openModal,
}) => {
  return (
    <tr key={item.email} className="relative">
      <CellItem>
        <p className="flex justify-between">
          <span>
            {index + 1}. <span className="underline">{item.name}</span>
          </span>
          {item.status === 'BANNED' && (
            <TfiLock className="fill-lightRed w-3 h-3" />
          )}
        </p>
      </CellItem>
      <CellItem>{item.location || 'Не вказано'}</CellItem>
      <CellItem>{item.email}</CellItem>
      <CellItem>
        {item.creationDate ? `${item.creationDate}` : 'Не вказанно'}
      </CellItem>
      <CellItem classes="text-center">
        {item.role ? item.role : 'Не вказанно'}
      </CellItem>
      <CellItem>
        <AiOutlineUserSwitch
          className="w-6 h-6 mx-auto"
          onClick={() => openPopUp(index)}
        />
      </CellItem>
      {idPopUp === index && (
        <td className="w-0 border-none p-0">
          <div className="absolute top-1/2 -right-[35px] -translate-y-1/2 bg-lightBlue rounded-[20px] w-[229px] h-[102px] py-6 px-5 z-10">
            <button onClick={() => openModal('status')}>
              {item.status === 'ACTIVE'
                ? 'Заблокувати користувача'
                : 'Poзблокувати користувача'}
            </button>
            <button onClick={() => openModal('delete')}>
              Видалити користувача
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default UserCard;
