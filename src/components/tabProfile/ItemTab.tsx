import clsx from 'clsx';
import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

interface IProps {
  item: {
    title: string;
    url: string;
    icon: ReactElement;
  };
  openTab: () => void;
  isOpen?: boolean;
}

const ItemTab: React.FC<IProps> = ({ item, openTab, isOpen }) => {
  const isAdmin = item.title === 'Адміністрування';

  return (
    <li className="px-1" key={item.title}>
      <NavLink
        to={item.url}
        end
        onClick={isAdmin ? () => openTab() : () => {}}
        className={({ isActive }) =>
          clsx('w-full pt-[11px] pb-[10px] pl-7 flex gap-2', {
            'rounded-[15px] bg-buttonPurple':
              isActive && item.title !== 'Адміністрування',
          })
        }
      >
        {item.icon}
        <p className="text-textDark text-[24px] leading-6">{item.title}</p>
        {isAdmin &&
          (isOpen ? (
            <BiChevronDown className="w-6 h-6" />
          ) : (
            <BiChevronUp className="w-6 h-6" />
          ))}
      </NavLink>
    </li>
  );
};

export default ItemTab;
