import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { statusPassword, validatePassword } from '@/utils';
import {
  PrivacyAgreement,
  SharedBtn,
  SharedInput,
  StatusBarPassword,
} from './ui';
import {
  IRegisterFormInputsPassword,
  IRegisterUser,
  IRequiredPassword,
} from '@/types';

interface RegisterInputPasswordProps {
  setStatusAuth: (status: 'confirm_email') => void;
  setUserData: React.Dispatch<React.SetStateAction<IRegisterUser>>;
  name: string;
}

export const RegisterInputPassword: React.FC<RegisterInputPasswordProps> = ({
  setStatusAuth,
  setUserData,
  name,
}) => {
  const [onInputPassword, setOnInputPassword] = useState('');
  const [requiredPassword, setRequiredPassword] = useState<IRequiredPassword>({
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
  } = useForm<IRegisterFormInputsPassword>({
    mode: 'onChange',
  });

  const onSubmit = async (data: IRegisterFormInputsPassword) => {
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
      <div className={`flex flex-col mt-12 mx-[57px]`}>
        <h1>Створити акаунт</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg gap-6 w-[500px]"
        >
          <SharedInput
            id="name"
            defaultValue={name}
            placeholder="Ім'я"
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
            autocomplete="on"
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
          <SharedBtn type="submit" disabled={!isValid}>
            Створити акаунт
          </SharedBtn>
        </form>
        <PrivacyAgreement className="mt-12 h-[38px]" />
      </div>
    </>
  );
};
