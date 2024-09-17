import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { UseFormReturn } from 'react-hook-form';
// import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
interface SharedInputProps {
  label?: string;
  onInput?: (value: string) => void;
  placeholder?: string;
  autocomplete?: string;
  id: string;
  type: string;
  defaultValue?: string;
  register: UseFormReturn<any, any>['register'];
  errors: UseFormReturn<any, any>['formState']['errors'];
  validation?: {
    required?: boolean;
    validate?: (value: string) => string | boolean;
  };
}

export const SharedInput: React.FC<SharedInputProps> = ({
  label,
  id,
  type,
  register,
  errors,
  validation,
  autocomplete,
  defaultValue,
  placeholder,
  onInput,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(() => (defaultValue ? true : false));
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleFocus = () => {
    setIsFocused(prev => !prev);
  };

  // Show password =================================================================
  
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  
  const onInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInput && onInput(e.target.value);
    
    if (e.target.value.length > 1) setHasValue(true);
    else setHasValue(false);
  };
  
  useEffect(() => {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const confirmPasswordInput = document.getElementById(
      'confirmPassword'
    ) as HTMLInputElement;
    if (id === 'password' && passwordInput) {
      passwordInput.type = passwordVisible ? 'text' : 'password';
    }
    if (id === 'confirmPassword' && confirmPasswordInput) {
      confirmPasswordInput.type = passwordVisible ? 'text' : 'password';
    }
  }, [passwordVisible]);

  return (
    <div className="relative">
      <label
        className={clsx(
          'absolute bg-transparent left-5 text-accentColor transition-all duration-200 ease-in-out',
          isFocused || hasValue ? '-top-6' : ' top-2'
        )}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        onInput={onInputHandler}
        placeholder={placeholder}
        autoComplete={autocomplete}
        onFocus={handleFocus}
        defaultValue={defaultValue}
        {...register(id, { ...validation, onBlur: handleFocus })}
        className={clsx(
          `flex-grow w-full font-medium h-[60px] text-base bg-background placeholder:text-darkGray
           rounded-[20px] px-5 py-6 focus:outline-none transition-all duration-200 ease-in-out
            outline-none border`,
          {
            'border-transparent': !errors[id] && !hasValue,
            'border-error  text-error': errors[id],
            'border-success': !errors[id] && hasValue,
          }
        )}
      />
      {['password', 'confirmPassword'].includes(id) && (
        <span
          id="show-password"
          className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer"
        >
          {passwordVisible ? (
            <AiOutlineEye
              onClick={togglePasswordVisibility}
              className={clsx(`w-6 h-auto ${errors[id] && 'text-error'}`)}
            />
          ) : (
            <AiOutlineEyeInvisible
              onClick={togglePasswordVisibility}
              className={clsx(
                `w-6 h-auto ${errors[id] && 'text-error'}`
              )}
            />
          )}
        </span>
      )}
      {/* {errors[id] && (
        <p className="text-red-500 text-xs">{String(errors[id].message)}</p>
      )} */}
    </div>
  );
};
