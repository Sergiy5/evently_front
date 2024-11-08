import { ButtonHTMLAttributes, ReactNode } from 'react';
import { IconType } from 'react-icons';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: IconType;
  children?: ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  Icon,
  children,
  ...props
}) => {
  return (
    <button className="focus:outline-none relative" {...props}>
      <Icon className="w-[24px] h-[24px] cursor-pointer hover:[color:#9B8FF3]" />
      {children}
    </button>
  );
};
