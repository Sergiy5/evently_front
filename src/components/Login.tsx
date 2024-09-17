import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/hooks';
import { validateEmail, validatePassword } from '@/utils';
import { GoogleLoginButton, SharedInput, SharedItemStatusBarPassword } from './ui';
import { logIn } from '@/redux/auth/operations';
import { SharedBtn } from './ui/SharedBtn';
import { ILoginUser } from '@/types';
import { CustomCheckbox } from './ui/CustomCheckBox';


export interface LoginProps {
  onCloseModal: () => void;
  setStatusAuth: (status: 'login' | 'register_email') => void;
}

export const Login: React.FC<LoginProps> = ({
  onCloseModal,
  setStatusAuth,
}) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ILoginUser>({
    mode: 'onChange',
  });

  const onSubmit = async (data: ILoginUser) => {
    const { email, password, rememberMe } = data;
    try {
      const result = await dispatch(logIn({ email, password, rememberMe }));

      toast.success(`Welcome ${result.payload.name}!`);
    } catch (error) {
      console.error(error);
      toast.error(`You are not logged in ${error}`);
    } finally {
      onCloseModal();
    }
  };

  const handleRememberMeChange = () => {
    setUserData(prevState => ({
      ...prevState,
      rememberMe: !prevState.rememberMe,
    }));
  };

  return (
    <>
        <h1 className="mb-6">Увійти в акаунт</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex flex-col rounded-lg gap-6 w-[500px]"
        >
          <SharedInput
            id="email"
            autocomplete="email"
            placeholder="Електронна пошта "
            type="email"
            register={register}
            validation={{ required: true, validate: validateEmail }}
            errors={errors}
          />
          <SharedInput
            id="password"
            autocomplete="current-password"
            placeholder="Пароль"
            type="password"
            register={register}
            validation={{ required: true, validate: validatePassword }}
            errors={errors}
          />
          <div
            className={`absolute flex flex-row justify-between w-full top-[160px] right-0`}
          >
            {errors.password ? (
              <SharedItemStatusBarPassword
                valid={false}
                text={`${errors?.password?.message}`}
                sizeIcon={`w-6 h-6`}
              />
            ) : (
              <CustomCheckbox
                checked={userData.rememberMe}
                onChange={handleRememberMeChange}
                label="Запам'ятати мене"
                className={``}
              />
            )}
            <Link
              to={'/forgot-password'}
              className={`border-b border-textColor text-base font-normal`}
            >
              Забули пароль?
            </Link>
          </div>
          <span className="text-base ml-auto mr-auto">або</span>
          <div
            className={`flex gap-2.5 items-center justify-center w-[500px] h-[70px] bg-bgColor rounded-[20px]`}
          >
            <GoogleLoginButton onCloseModal={onCloseModal} />
          </div>
          <div className={`flex gap-2.5 -mt-4 h-5`}>
            <span> У вас немає акаунту?</span>
            <button
              type="button"
              onClick={() => setStatusAuth('register_email')}
              className={`text-buttonPurple`}
            >
              Створити
            </button>
          </div>
          <SharedBtn type="submit" disabled={!isValid} className={`w-[364px] mx-auto`}>
            Увійти
          </SharedBtn>
        </form>
    </>
  );
};
