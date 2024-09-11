import { useForm } from 'react-hook-form';
import { validateEmail} from '@/utils';
import { GoogleLoginButton, SharedInput } from './ui';
// import { toast } from 'react-toastify';
import { SharedBtn } from './ui/SharedBtn';

export interface RegisterUserInterface {
  name: string;
  email: string;
  password: string;
}
interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterInputEmailProps {
  onCloseModal?: () => void;
  handleUserEmail: (email: string) => void;
  setStatusAuth: (status: 'register' |'register_password') => void;
}

export const RegisterInputEmail: React.FC<RegisterInputEmailProps> = ({
setStatusAuth,
  handleUserEmail
}) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<RegisterFormInputs>({
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    if (!data) return
console.log("SUPMIT_EMAIL_>>>>>>>>>>",data)
    const userData = Object.fromEntries(Object.entries(data));
    const email = userData.email;
    handleUserEmail(email);
    setStatusAuth('register_password');
  };

  return (
    <>
      <div className={`flex flex-col p-9`}>
        <h1 className="mb-6">Створити акаунт</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg gap-8 w-[500px]"
        >
          <SharedInput
            id="email"
            placeholder="Електронна пошта "
            autocomplete="email"
            type="email"
            register={register}
            validation={{ required: true, validate: validateEmail }}
            errors={errors}
          />
          <span className="text-base ml-auto mr-auto">або</span>

          <GoogleLoginButton />

          <SharedBtn
            type="submit"
            disabled={!isValid}
            text="Продовжити"
          ></SharedBtn>
        </form>
      </div>
    </>
  );
};
