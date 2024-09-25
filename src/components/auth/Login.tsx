import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/hooks';
import { validateEmail, validatePassword } from '@/utils';
import { GoogleLoginButton, SharedInput, SharedItemStatusBar} from '../ui';
import { logIn } from '@/redux/auth/operations';
import { SharedBtn } from '../ui/SharedBtn';
import { ILoginUser } from '@/types';
import { CustomCheckbox } from '../ui/CustomCheckBox';

interface LoginProps {
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
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<null | boolean>(null);

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

      console.log("RESULT_LOGIN_>>>>>>>>>>",result)

      if (result.meta.requestStatus === "rejected") setIsUserLoggedIn(false);
      if (result.meta.requestStatus === 'fulfilled') {
        
        setIsUserLoggedIn(true)
        toast.success(`Welcome ${result.meta.arg.email}!`);
        onCloseModal();
      };
      
    } catch (error) {
      console.error(error);
      toast.error(`You are not logged in ${error}`);
    } finally {
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
        className="flex flex-col rounded-lg gap-10 w-[500px]"
      >
        <div className={`relative`}>
          <SharedInput
            id="email"
            autofocus
            onInput={() => {
              setIsUserLoggedIn(null);
            }}
            autocomplete="email"
            placeholder="Електронна пошта "
            type="email"
            register={register}
            validation={{ required: true, validate: validateEmail }}
            errors={errors}
          />
          {errors.email?.message ? (
            <SharedItemStatusBar
              valid={!errors.email?.message}
              text={`${errors.email?.message}`}
              sizeIcon={`w-6 h-6`}
              className={`absolute mt-[4px]`}
            />
          ) : (
            !isUserLoggedIn &&
            isUserLoggedIn !== null && (
              <SharedItemStatusBar
                valid={false}
                text={`Акаунт з такою електронною поштою не знайдено.`}
                sizeIcon={`w-6 h-6`}
                className={`absolute mt-[4px]`}
              />
            )
          )}
        </div>
        <div className={`relative`}>
          <SharedInput
            id="password"
            onInput={() => {
              setIsUserLoggedIn(null);
            }}
            autocomplete="current-password"
            placeholder="Пароль"
            type="password"
            register={register}
            validation={{ required: true, validate: validatePassword }}
            errors={errors}
          />
          {errors.password?.message && (
            <SharedItemStatusBar
              valid={!errors.password?.message}
              text={`${errors.password?.message}`}
              sizeIcon={`w-6 h-6`}
              className={`absolute mt-[4px]`}
            />
          )}
          <Link
            to={'/forgot-password'}
            className={` absolute border-b border-textColor text-xs font-normal flex w-22 top-16 right-0`}
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
        <div className={`flex justify-between  w-full -mt-8 h-5`}>
          <CustomCheckbox
            checked={userData.rememberMe}
            onChange={handleRememberMeChange}
            label="Запам'ятати мене"
            className={``}
          />

          <div className={`flex gap-2 text-base`}>
            <span className={`text-black `}> У вас немає акаунту?</span>
            <button
              type="button"
              onClick={() => setStatusAuth('register_email')}
              className={`text-black underline
                `}
            >
              Створити
            </button>
          </div>
        </div>
        <SharedBtn
          type="submit"
          disabled={!isValid}
          primary
          className={`w-[364px] mx-auto`}
        >
          Увійти
        </SharedBtn>
      </form>
    </>
  );
};
