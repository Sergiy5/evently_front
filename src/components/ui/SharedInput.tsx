import { useState } from "react";
import clsx from "clsx";
import { validateEmail, validatePassword } from "@/utils";

interface CustomInputProps {
  label: string;
  type?: string;
  id: string;
  name?: string;
  isValid?: boolean;
  defaultValue?: string;
  autocomplete?: string;
}

export const SharedInput: React.FC<CustomInputProps> = ({
  label,
  id,
  name,
  type = id,
  autocomplete,
  defaultValue,
  isValid,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(() => (defaultValue ? true : false));
  const [isValidData, setIsValidData] = useState(true);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value !== "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isValid && isValid !== undefined) {
      if (e.target.name === "email") {
        validateEmail(e.target.value)
          ? setIsValidData(true)
          : setIsValidData(false);
      }
      if (e.target.name === "password") {
        validatePassword(e.target.value)
          ? setIsValidData(true)
          : setIsValidData(false);
      }
    }
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
        autoComplete={autocomplete ?? "off"}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={clsx(
          `flex-grow w-full font-medium h-10 text-xl text-primary bg-inputColor
           rounded-[18px] px-5  focus:outline-none transition-all duration-200 ease-in-out
            outline-none border-[1px] border-transparent focus:border-accentColor hover:border-accentColor`,
          {
            'border-red-400 focus:border-red-400 hover:border-red-400 ':
              !isValidData,
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
