import React, { ButtonHTMLAttributes } from 'react';
import { FcGoogle } from 'react-icons/fc';

type Buttons = 'button' | 'google';

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  height?: string;
  width?: string;
  variant?: Buttons;
}

const Button: React.FC<IProps> = ({
  height,
  width,
  variant = 'button',
  children,
  ...props
}) => {
  const defaultClasses = ' text-center font-lato font-normal text-xl leading-6';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const variants: any = {
    button: {
      class:
        'bg-buttonPurple rounded-[71px_8px] text-background w-[230px] h-[48px]',
    },
    google: {
      class:
        'bg-background rounded-[20px] text-textDark w-[500px] h-[70px] flex justify-center items-center gap-[7px]',
      children: (
        <>
          <FcGoogle className="w-[42px] h-[43px]" />
          Продовжити через Google
        </>
      ),
    },
  };

  return (
    <button
      className={variants[variant].class + defaultClasses}
      style={{ width: width || undefined, height: height || undefined }}
      {...props}
    >
      {variants[variant].children || children}
    </button>
  );
};

export default Button;

export const GoogleButton = () => { };
