import React, { ReactElement } from 'react';

interface IProps {
  children: ReactElement | string;
  classes?: string;
}

const CellItem: React.FC<IProps> = ({ classes, children }) => {
  let className =
    'bg-background border border-buttonPurple text-textDark text-xs p-[10px_12px] text-nowrap ';
  className += classes && classes;

  return <td className={className}>{children}</td>;
};

export default CellItem;
