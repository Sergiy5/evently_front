import { InputHTMLAttributes } from 'react';
import { MdDone } from 'react-icons/md';

import clsx from 'clsx';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <label className="flex items-center cursor-pointer">
      <input type="checkbox" {...props} className="appearance-none" />
      <div className="h-5 w-5 flex items-center justify-center bg-lightPink rounded-[5px]">
        {props.checked && <MdDone className="text-black w-6 h-6" />}
      </div>
      <span
        className={clsx('ml-2 hover:text-buttonPurple', {
          'text-buttonPurple font-bold': props.checked,
        })}
      >
        {label}
      </span>
    </label>
  );
};
