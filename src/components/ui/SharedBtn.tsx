interface SharedBtnProps {
  type: 'button' | 'submit' | 'reset';
  text?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}
export const SharedBtn: React.FC<SharedBtnProps> = ({
  type,
  text,
  children,
  disabled,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`bg-buttonColor rounded-tl-[71px] focus:outline-none rounded-tr-lg rounded-br-[71px] rounded-bl-lg
                 h-[70px] text-white font-bold py-2 px-4 ${disabled ? 'opacity-50 cursor-default' : 'cursor-pointer'}`}
    >
      {text}
      {children}
    </button>
  );
};