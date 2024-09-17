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
        `rounded-tl-[71px] font-normal focus:outline-none rounded-tr-lg rounded-br-[71px] rounded-bl-lg h-[60px]
        active:shadow-shadowPrimaryBtn py-2 px-4 ${className}`,

        {
          'border border-buttonPurple bg-transparent text-textDark active:bg-lightPurple active:shadow-shadowSecondaryBtn':
          transparent,
          'bg-buttonPurple text-white': !transparent,
        },
        {
          'disabled cursor-default active:shadow-none': disabled,
          'cursor-pointer': !disabled,
        }
      )}
    >
      {children}
    </button>
  );
};
