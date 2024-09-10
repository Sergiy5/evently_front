import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from '@/utils';
import { SharedInput } from './ui';
import { logIn as loginUser } from '@/redux/auth/operations';
import { toast } from 'react-toastify';
import { FcGoogle } from 'react-icons/fc';
import { Link, NavLink } from 'react-router-dom';

export interface LoginUserInterface {
  email: string;
  password: string;
}

export const Login = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { isValid, errors },
  } = useForm<LoginUserInterface>({
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginUserInterface) => {
    try {
      await loginUser(data as LoginUserInterface);
      toast.success('User logged in successfully');
    } catch (error) {
      console.error(error);
    } finally {
    }
    onCloseModal();
  };

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
          <button
            type="button"
            className={`flex gap-2.5 items-center justify-center w-[500px] h-[70px] bg-bgColor rounded-[20px]`}
          >
            <FcGoogle className="w-12 h-12" />
            Продовжити через Google
          </button>
          <div className={`flex gap-2.5`}>
            <span> У акаунту вас немає акаунту?</span>
            <button className={`text-buttonColor`}>Створити</button>
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className={`bg-buttonColor rounded-tl-[71px] rounded-tr-lg rounded-br-[71px] rounded-bl-lg
                 h-[70px] text-white font-bold py-2 px-4 cursor-pointer
                 ${!isValid ? 'opacity-50 cursor-default' : ''}`}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};
