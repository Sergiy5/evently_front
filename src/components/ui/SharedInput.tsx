import { useState } from "react";
import clsx from "clsx";

interface CustomInputProps {
  label: string;
  type?: string;
  id: string;
  name?: string;
  isValid?: boolean | null;
  defaultValue?: string;
  autocomplete?: string;
  onInput?:(value: string) => void | undefined;
}

export const SharedInput: React.FC<CustomInputProps> = ({
  label,
  id,
  name,
  type = id,
  autocomplete,
  defaultValue,
  onInput,
  isValid,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(() => (defaultValue ? true : false));

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value !== "");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
if (e.target.value && onInput) onInput(e.target.value);
  };

  const passwordInput = document.getElementById('password') as HTMLInputElement;
  // const confirmPasswordInput = document.getElementById(
  //   'confirm-password'
  // )
  const showPasswordCheckbox = document.getElementById(
    'show-password'
  ) as HTMLInputElement;

   showPasswordCheckbox?.addEventListener('change', () => {
     if ((showPasswordCheckbox as HTMLInputElement).checked) {
       passwordInput.type = 'text';
     } else {
       passwordInput.type = 'password';
     }
   });

  return (
    <div className="relative">
      <input
        onInput={handleInputChange}
        id={id}
        type={type}
        defaultValue={defaultValue ?? ''}
        name={name}
        autoComplete={autocomplete ?? 'off'}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={clsx(
          `flex-grow w-full font-medium h-10 text-xl text-primary bg-inputColor
           rounded-[18px] px-5 focus:outline-none transition-all duration-200 ease-in-out
            outline-none border-2`,
          {
            'border-red-400 ':
              !isValid && isValid !== null,
            'border-success': isValid
          }
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className={clsx(
          'absolute bg-transparent left-5 text-accentColor transition-all duration-200 ease-in-out',
          isFocused || hasValue ? '-top-6' : ' top-2'
        )}
      >
        {label}
      </label>
      {label === 'password' && (
        <label>
          <input type="checkbox" id="show-password" />
          Show password
        </label>
      )}
    </div>
  );
};