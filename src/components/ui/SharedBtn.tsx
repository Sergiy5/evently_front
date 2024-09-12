import clsx from "clsx";

interface SharedBtnProps {
  type: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  transparent?: boolean;
  className?:string;
}
export const SharedBtn: React.FC<SharedBtnProps> = ({
  type,
  children,
  disabled,
  onClick,
  transparent,
  className,
}) => {

  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `rounded-tl-[71px] focus:outline-none rounded-tr-lg rounded-br-[71px] rounded-bl-lg h-[60px] font-bold py-2 px-4 ${className}`,
        // width ? `w-${width}` : 'w-full', // This correctly uses the width class
        {
          'opacity-50 cursor-default': disabled,
          'cursor-pointer': !disabled,
        },
        {
          'border border-buttonPurple bg-transparent text-buttonPurple':
            transparent,
          'bg-buttonPurple text-white': !transparent,
        }
      )}
    >
      {children}
    </button>
  );
};
