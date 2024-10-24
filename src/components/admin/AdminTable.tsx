import React, { useState } from 'react';
import clsx from 'clsx';

import { User } from '@/pages/admin/AdminUsers';
import UserCard from './UserCard';
import { BsFilter } from 'react-icons/bs';
import { nanoid } from '@reduxjs/toolkit';

interface IProps {
  cols: string[];
  data: User[] | [];
  setUsers: () => {};
}

const AdminTable: React.FC<IProps> = ({ cols, data }) => {
  const [sort, setSort] = useState<
    { col: string; direction: number } | undefined
  >(undefined);

  const handleChangeSort = (col: string) => {
    setSort(prewState => {
      const currState = { ...prewState };
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

  console.log(sort);

  let sortedData = [...data];
  if (sort) {
    if (sort.col === cols[0]) {
      sortedData = sortedData.sort((user1, user2) =>
        sort.direction === 1
          ? user1.name.localeCompare(user2.name)
          : user2.name.localeCompare(user1.name)
      );
    } else {
      sortedData = [...data];
    }
  }

  return (
    <table className="rounded border border-buttonPurple border-separate border-spacing-0 overflow-hidden w-full h-full">
      <thead>
        <tr className="h-[58px]">
          {cols.map(col => (
            <th
              key={col}
              onClick={() => handleChangeSort(col)}
              className={clsx(
                'bg-lightBlue border-buttonPurple border p-[10px_12px] text-textDark text-[16px] leading-4 font-bold align-text-top text-wrap'
              )}
            >
              <p className="relative pr-6">
                {col}
                {col === sort?.col ||
                  (sort?.direction !== 0 && (
                    <BsFilter
                      className={clsx(
                        'w-6 h-6 absolute right-0 top-1/2 -translate-y-1/2',
                        {
                          hidden: col !== sort?.col || sort.direction === 0,
                          'rotate-180':
                            col === sort?.col && sort.direction === 2,
                          'rotate-0': col === sort?.col && sort.direction === 1,
                        }
                      )}
                    />
                  ))}
              </p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.slice(0, 20).map((item, index) => (
          <UserCard key={nanoid()} item={item} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
