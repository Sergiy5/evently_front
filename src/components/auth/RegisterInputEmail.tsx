import { useForm } from 'react-hook-form';
import { validateEmail } from '@/utils';
import {
  GoogleLoginButton,
  PrivacyAgreement,
  SharedInput,
  SharedItemStatusBar,
} from '../ui';
// import { toast } from 'react-toastify';
import { SharedBtn } from '../ui/SharedBtn';
import { IRegisterFormInputEmail, IRegisterUser } from '@/types';
import { getUserByEmail } from '@/api/getUserByEmail';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

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

  const [emailUser, setEmailUser] = useState<string>('');

  const onSubmit = async (data: IRegisterFormInputEmail) => {
    if (!data) return;

    const userData = Object.fromEntries(Object.entries(data));
    const email = userData.email;
    setEmailUser(email);

  }

  useEffect(() => {

  if(!emailUser) return
  const getUser = async (email: string) => {
    
    console.log(emailUser)
  try {
    const response = await getUserByEmail(email);
    
    if (!response) {
      return toast.error(`Така електронна адреса вже існує`);
    }

    if (response?.status === 200) {
      setUserData(prev => ({ ...prev, email }));

      setStatusAuth('register_password');
    }
  } catch (error) {
      // console.log(error)
    }
  }
getUser(emailUser);

  }, [emailUser]);

  return (
    <>
      <h1 className="mb-8">Створити акаунт</h1>
      <div className={`flex flex-col h-full justify-between`}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg gap-6 w-[500px]"
        >
          <div className={`relative`}>
            <SharedInput
              id="email"
              autofocus
              defaultValue={email}
              placeholder="Електронна пошта "
              autocomplete="email"
              type="email"
              register={register}
              validation={{ required: true, validate: validateEmail }}
              errors={errors}
            />
            {errors.email?.message && (
              <SharedItemStatusBar
                valid={!errors.email?.message}
                text={`${errors.email?.message}`}
                sizeIcon={`w-6 h-6`}
                className={`absolute mt-[4px]`}
              />
            )}
          </div>
          <span className="text-base ml-auto mr-auto">або</span>

          <GoogleLoginButton onCloseModal={onCloseModal} />

          <SharedBtn
            type="submit"
            disabled={!isValid}
            primary
            className="mt-10 w-[364px] mx-auto"
          >
            Продовжити
          </SharedBtn>
        </form>
        <PrivacyAgreement />
      </div>
    </>
  );
};
