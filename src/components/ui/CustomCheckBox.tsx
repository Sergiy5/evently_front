import { useState } from 'react';
import { MdDone } from 'react-icons/md';


interface CustomCheckboxProps {
  checked?: boolean;
  label: string;
  className: string;
  onChange: (value: boolean) => void;
}   

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
    checked,
  onChange,
    label,
  className
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
      setIsChecked(!isChecked);
      onChange(!isChecked);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={toggleCheckbox}
        className="appearance-none"
      />
      <div
        className={` h-5 w-5 flex items-center justify-center bg-white ${className}`}
      >
        {isChecked && <MdDone className="text-buttonPurple w-6 h-6 " />}{' '}
      </div>
      <span className="ml-2">{label}</span>
    </label>
  );
};
