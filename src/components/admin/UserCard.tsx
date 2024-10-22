import React from 'react';

import { User } from '@/pages/admin/AdminUsers';
import { BiEditAlt } from 'react-icons/bi';

interface IProps {
  item: User;
  index: number;
}

const UserCard: React.FC<IProps> = ({ item, index }) => {
  return (
    <tr key={item.email} className="">
      <td className="bg-background border border-buttonPurple text-textDark text-xs p-[10px_12px] align-text-top text-nowrap">
        {index + 1}. <span className="underline">{item.name}</span>
      </td>
      <td className="bg-background border border-buttonPurple text-textDark text-xs p-[10px_12px] align-text-top text-nowrap">
        {item.phone}
      </td>
      <td className="bg-background border border-buttonPurple text-textDark text-xs p-[10px_12px] align-text-top text-nowrap">
        {item.email}
      </td>
      <td className="bg-background border border-buttonPurple text-textDark text-xs p-[10px_12px] align-text-top text-nowrap">
        {item.date}
      </td>
      <td className="bg-background border border-buttonPurple text-textDark text-xs p-[10px_12px] align-text-top text-nowrap">
        {item.role}
      </td>
      <td className="bg-background border border-buttonPurple text-textDark text-xs p-[10px_12px]">
        <BiEditAlt className='w-6 h-6 mx-auto'/>
      </td>
    </tr>
  );
};

export default UserCard;
