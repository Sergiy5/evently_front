import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { VscEye } from 'react-icons/vsc';
import { VscEyeClosed } from 'react-icons/vsc';

interface CustomInputProps {
  label: string;
  type?: string;
  id: string;
  name?: string;
  isValid?: boolean | null | string;
  defaultValue?: string;
  autocomplete?: string;
  onInput?: (value: string) => void | undefined;
}

export const SharedInput: React.FC<CustomInputProps> = ({
  label,
  id,
  name,
  type,
  autocomplete,
  defaultValue,
  onInput,
  isValid,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(() => (defaultValue ? true : false));
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value !== '');
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && onInput) onInput(e.target.value);
  };

  // Show password =================================================================
  const passwordInput = document.getElementById('password') as HTMLInputElement;
  const confirmPasswordInput = document.getElementById(
    'confirm-password'
  ) as HTMLInputElement;

   const togglePasswordVisibility = () => {
     setPasswordVisible(!passwordVisible);
     };

  useEffect(() => {
    if (id === 'password' && passwordInput) {
      passwordInput.type = passwordVisible ? 'text' : 'password';
    }
    if (id === 'confirm-password' && confirmPasswordInput) {
      confirmPasswordInput.type = passwordVisible ? 'text' : 'password';
    }
  }, [passwordVisible]);

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
            'border-red-400 ': !isValid && isValid !== null,
            'border-success': isValid,
          }
        )}
        {...props}
      />
      {['password', 'confirm-password'].includes(id) && (
        <span
          id="show-password"
          className="absolute right-5 top-3 cursor-pointer"
        >
          {passwordInput?.type === 'password' ||
          confirmPasswordInput?.type === 'password' ? (
            <VscEyeClosed onClick={togglePasswordVisibility} />
          ) : (
            <VscEye onClick={togglePasswordVisibility} />
          )}
        </span>
      )}
      <label
        htmlFor={id}
        className={clsx(
          'absolute bg-transparent left-5 text-accentColor transition-all duration-200 ease-in-out',
          isFocused || hasValue ? '-top-6' : ' top-2'
        )}
      >
        {label}
      </label>
    </div>
  );
};
