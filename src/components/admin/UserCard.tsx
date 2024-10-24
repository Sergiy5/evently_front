import React from 'react';

import { User } from '@/pages/admin/AdminUsers';
import { BiEditAlt } from 'react-icons/bi';
import CellItem from './CellTable';

interface IProps {
  item: User;
  index: number;
}

const UserCard: React.FC<IProps> = ({ item, index }) => {
  return (
    <tr key={item.email} className="">
      <CellItem>
        <>
          {index + 1}. <span className="underline">{item.name}</span>
        </>
      </CellItem>
      <CellItem>{item.phone}</CellItem>
      <CellItem>{item.email}</CellItem>
      <CellItem>{item.date.slice(0, 10)}</CellItem>
      <CellItem classes='text-center'>{item.role}</CellItem>
      <CellItem>
        <BiEditAlt className="w-6 h-6 mx-auto" />
      </CellItem>
    </tr>
  );
};

export default UserCard;
