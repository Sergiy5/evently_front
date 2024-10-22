import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { User } from '@/pages/admin/AdminUsers';

interface IProps {
  cols: string[];
  data: User[] | [];
  children: ReactElement;
}

const AdminTable: React.FC<IProps> = ({ cols, children }) => {
  return (
    <table className="rounded border border-buttonPurple border-separate border-spacing-0 overflow-hidden w-full h-full">
      <thead>
        <tr className="h-[58px]">
          {cols.map(col => (
            <th
              key={col}
              className={clsx(
                'bg-lightBlue border-buttonPurple border p-[10px_12px] text-textDark text-[16px] leading-4 font-bold align-text-top'
              )}
            >
              {col}
            </th>
          ))}
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default AdminTable;
