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
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={` rounded-tl-[71px] focus:outline-none rounded-tr-lg rounded-br-[71px] rounded-bl-lg
                 h-[60px]  font-bold py-2 px-4
                  ${disabled ? 'opacity-50 cursor-default' : 'cursor-pointer'}
                  ${transparent ? 'border border-buttonPurple bg-transparent text-buttonPurple' : 'bg-buttonPurple text-white'}
                  ${width ? `w-${width}` : 'w-full'}`}
    >
      {text}
      {children}
    </button>
  );
};
