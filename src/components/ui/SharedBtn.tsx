import clsx from "clsx";

interface SharedBtnProps {
  type: 'button' | 'submit' | 'reset';
  text?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  transparent?: boolean;
  width?: string;
}
export const SharedBtn: React.FC<SharedBtnProps> = ({
  type,
  text,
  children,
  disabled,
  onClick,
  transparent,
  width,
}) => {
  console.log(width)
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `rounded-tl-[71px] focus:outline-none rounded-tr-lg rounded-br-[71px] rounded-bl-lg h-[60px] font-bold py-2 px-4`,
        {
          'opacity-50 cursor-default': disabled,
          'cursor-pointer': !disabled,
        },
        {
          'border border-buttonPurple bg-transparent text-buttonPurple':
            transparent,
          'bg-buttonPurple text-white': !transparent,
        },
        width ? `w-[${width}]` : 'w-full' // This correctly uses the width class
      )}
    >
      {text}
      {children}
    </button>
  );
};
