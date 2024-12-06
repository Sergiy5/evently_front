import React from 'react';
import { BiChevronDown } from 'react-icons/bi';

interface IProps {
  page: number;
  // eslint-disable-next-line no-unused-vars
  changePage: (direction: 'up' | 'down') => void;
}

const Navigation: React.FC<IProps> = ({ page, changePage }) => {
  return (
    <div className="flex gap-2">
      <button onClick={() => changePage('down')} className="focus:outline-0">
        <BiChevronDown className="rotate-90 w-6 h-6" />
      </button>
      <p className="text-base">{page}</p>
      <button onClick={() => changePage('up')} className="focus:outline-0">
        <BiChevronDown className="-rotate-90 w-6 h-6" />
      </button>
    </div>
  );
};

export default Navigation;
