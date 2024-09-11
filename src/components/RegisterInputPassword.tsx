import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { statusPassword, validatePassword } from '@/utils';
import {
  PrivacyAgreement,
  SharedBtn,
  SharedInput,
  StatusBarPassword,
} from './ui';

export interface RegisterUserInterface {
  name: string;
  email: string;
  password: string;
}
interface RegisterFormInputs {
  name: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterInputPasswordProps {
  setStatusAuth: (status: 'confirm_email') => void;
  setUserData: React.Dispatch<React.SetStateAction<RegisterUserInterface>>;
}

interface RequiredPasswordInterface {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

export const RegisterInputPassword: React.FC<RegisterInputPasswordProps> = ({
  setStatusAuth,
  setUserData,
}) => {
  
  const [onInputPassword, setOnInputPassword] = useState('');
  const [requiredPassword, setRequiredPassword] =
    useState<RequiredPasswordInterface>({
      hasMinLength: false,
      hasUppercase: false,
      hasNumber: false,
      hasSpecialChar: false,
    });

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid, errors },
  } = useForm<RegisterFormInputs>({
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    const { name, password } = data;

    setUserData(prev => ({ ...prev, password, name }));
    setStatusAuth('confirm_email');
  };

  useEffect(() => {
    setRequiredPassword(prev => ({
      ...prev,
      ...statusPassword(onInputPassword),
    }));
  }, [onInputPassword]);

  return (
    <>
      <div className={`flex flex-col gap-8 mt-12 mb-6 mx-9 w-[500px]`}>
        <h1>Створити акаунт</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg gap-8"
        >
          <SharedInput
            placeholder="Ім'я"
            id="name"
            autocomplete="name"
            type="text"
            register={register}
            validation={{ required: true }}
            errors={errors}
          />
          <SharedInput
            onInput={(value: string) => {
              setOnInputPassword(value);
              console.log('PASSWORD_ON_INPUT', value);
            }}
            placeholder="Пароль"
            id="password"
            autocomplete="current-password"
            type="password"
            register={register}
            validation={{ required: true, validate: validatePassword }}
            errors={errors}
          />

          <StatusBarPassword
            requiredPassword={requiredPassword}
            className="-my-4"
          />

          <SharedInput
            placeholder="Підтвердіть пароль"
            id="confirmPassword"
            autocomplete="new-password"
            type="password"
            register={register}
            validation={{
              required: true,
              validate: value => value === watch('password'),
            }}
            errors={errors}
          />
          <SharedBtn
            type="submit"
            disabled={!isValid}
            text="Створити акаунт"
          ></SharedBtn>
        </form>
        <PrivacyAgreement className="mt-12 h-[38px]" />
      </div>
    </>
  );
};
