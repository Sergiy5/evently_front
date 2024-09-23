import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { statusPassword, validateName, validatePassword } from '@/utils';
import {
  PrivacyAgreement,
  SharedBtn,
  SharedInput,
  SharedItemStatusBar,
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
    const { name, password, confirmPassword } = data;

    setUserData(prev => ({ ...prev, password, name, confirmPassword }));
    setStatusAuth('confirm_email');
  };

  useEffect(() => {
    setRequiredPassword(prev => ({
      ...prev,
      ...statusPassword(onInputPassword),
    }));
  }, [onInputPassword]);
console.log(errors.name);
  return (
    <>
      <h1 className={`mb-8`}>Створити акаунт</h1>
      <div className={`flex flex-col h-full justify-between`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg gap-10 w-[500px]"
        >
          <div className="relative">
            <SharedInput
              id="name"
              defaultValue={name}
              placeholder="Ім'я"
              autocomplete="on"
              type="text"
              register={register}
              validation={{ required: true, validate: validateName }}
              errors={errors}
            />
            {errors.name?.message && (
              <SharedItemStatusBar
                valid={!errors.name}
                text={errors.name?.message ?? "Ім'я відповідає вимогам"}
                sizeIcon={`w-6 h-6`}
                className={`absolute mt-[4px]`}
              />
            )}
          </div>
          <div className="relative">
            <SharedInput
              onInput={(value: string) => {
                setOnInputPassword(value);
              }}
              placeholder="Пароль"
              id="password"
              autocomplete="on"
              type="password"
              register={register}
              validation={{ required: true, validate: validatePassword }}
              errors={errors}
            />

            {errors.password?.message && <StatusBarPassword
              requiredPassword={requiredPassword}
              className="absolute mt-[4px]"
            />}
          </div>

          <div className={`relative`}>
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
            {errors.confirmPassword && (
              <SharedItemStatusBar
                valid={false}
                text="Паролі не співпадають"
                sizeIcon={``}
                className={`absolute mt-[4px]`}
              />
            )}
          </div>

          <SharedBtn
            type="submit"
            disabled={!isValid}
            primary
            className={`w-[364px] mt-10 ml-auto mr-auto`}
          >
            Створити акаунт
          </SharedBtn>
        </form>
        <PrivacyAgreement />
      </div>
    </>
  );
};
