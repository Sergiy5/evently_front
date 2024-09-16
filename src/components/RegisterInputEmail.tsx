import { useForm } from 'react-hook-form';
import { validateEmail } from '@/utils';
import { GoogleLoginButton, SharedInput } from './ui';
// import { toast } from 'react-toastify';
import { SharedBtn } from './ui/SharedBtn';
import { IRegisterFormInputEmail, IRegisterUser } from '@/types';

interface RegisterInputEmailProps {
  setUserData: React.Dispatch<React.SetStateAction<IRegisterUser>>;
  setStatusAuth: (status: 'register_email' | 'register_password') => void;
  onCloseModal: () => void;
  email: string;
}

export const RegisterInputEmail: React.FC<RegisterInputEmailProps> = ({
  onCloseModal,
  setStatusAuth,
  setUserData,
  email,
}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IRegisterFormInputEmail>({
    mode: 'onChange',
  });

  const onSubmit = async (data: IRegisterFormInputEmail) => {
    if (!data) return;

    const userData = Object.fromEntries(Object.entries(data));
    const email = userData.email;

    setUserData(prev => ({ ...prev, email }));

    setStatusAuth('register_password');
  };

  return (
    <>
      <div className={`flex flex-col mt-12 mx-[57px]`}>
        <h1 className="mb-6">Створити акаунт</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg gap-6 w-[500px]"
        >
          <SharedInput
            id="email"
            defaultValue={email}
            placeholder="Електронна пошта "
            autocomplete="email"
            type="email"
            register={register}
            validation={{ required: true, validate: validateEmail }}
            errors={errors}
          />
          <span className="text-base ml-auto mr-auto">або</span>

          <GoogleLoginButton onCloseModal={onCloseModal} />

          <SharedBtn type="submit" disabled={!isValid} className="mt-8">
            Продовжити
          </SharedBtn>
        </form>
      </div>
    </>
  );
};
