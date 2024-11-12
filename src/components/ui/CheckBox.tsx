import { InputHTMLAttributes, useState } from 'react';
import { MdDone } from 'react-icons/md';

interface CustomCheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CustomCheckboxProps> = ({
  label,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        {...props}
        className="appearance-none"
      />
      <div className={` h-5 w-5 flex items-center justify-center bg-lightPink`}>
        {isChecked && <MdDone className="text-black w-6 h-6 " />}
      </div>
      <span className="ml-2">{label}</span>
    </label>
  );
};
