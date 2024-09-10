interface SharedBtnProps {
  type: 'button' | 'submit' | 'reset';
  text?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}
export const SharedBtn: React.FC<SharedBtnProps> = ({
  type,
  text,
  children,
  disabled,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`bg-buttonColor rounded-tl-[71px] rounded-tr-lg rounded-br-[71px] rounded-bl-lg
                 h-[70px] text-white font-bold py-2 px-4 cursor-pointer ${disabled ? 'opacity-50 cursor-default' : ''}`}
    >
      {text}
      {children}
    </button>
  );
};