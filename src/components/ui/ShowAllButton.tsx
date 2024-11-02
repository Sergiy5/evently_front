import { ButtonHTMLAttributes } from 'react';
import { BiRightArrowCircle } from 'react-icons/bi';

interface ShowAllButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const ShowAllButton: React.FC<ShowAllButtonProps> = ({ ...props }) => {
  return (
    <button
      {...props}
      className="w-[200px] h-[48px] border-borderColor border-[1px] mx-auto
    rounded-[15px] flex justify-center items-center gap-[8px] focus:outline-none
    hover:bg-borderColor hover:text-background hover:fill-background
    transition-all duration-300 active:scale-95"
    >
      <span>Показати усі</span>
      <BiRightArrowCircle width={24} height={24} />
    </button>
  );
};
