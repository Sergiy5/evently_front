import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/hooks';
import { validateEmail, validatePassword } from '@/utils';
import { GoogleLoginButton, SharedInput } from './ui';
import { logIn } from '@/redux/auth/operations';
import { SharedBtn } from './ui/SharedBtn';

export interface LoginUserInterface {
  email: string;
  password: string;
}

export interface LoginProps {
  onCloseModal: () => void;
  setStatusAuth: (status: 'login' | 'register') => void;
}

export const Login: React.FC<LoginProps> = ({
  onCloseModal,
  setStatusAuth,
}) => {
  const [userData, setUserData] = useState({ email: '', password: '' })
  
  const dispatch = useAppDispatch();
  
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<LoginUserInterface>({
    mode: 'onChange',
  });
  
  const onSubmit = async (data: LoginUserInterface) => {

    const email = data.email;
    const password = data.password;
    setUserData({email, password})
  };

  useEffect(() => {
    if(!userData.email.length && !userData.password.length) return
    const loginUser = async () => {
      try {
        const result = await dispatch(logIn(userData));

        console.log(result);
        // !result?.error
        //   ? toast.success('Welcome!')
        //   : toast.error('You are not logged in');
      } catch (error) {
        console.error(error);
      } finally {
        onCloseModal();
      
      }
    };
    loginUser();
  }, [userData]);

  return (
    <>
      <div className={`flex flex-col p-9`}>
        <h1 className="mb-6">Увійти в акаунт</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative flex flex-col  rounded-lg gap-8 w-[500px]"
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
          <div className={`absolute top-[180px] right-0`}>
            {' '}
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
            
            <GoogleLoginButton />

          </div>
          <div className={`flex gap-2.5`}>
            <span> У акаунту вас немає акаунту?</span>
            <button
              type="button"
              onClick={() => setStatusAuth('register')}
              className={`text-buttonColor`}
            >
              Створити
            </button>
          </div>
          <SharedBtn
            type="submit"
            disabled={!isValid}
            text="Увійти"
          ></SharedBtn>
        </form>
      </div>
    </>
  );
};
