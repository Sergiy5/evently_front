import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from '@/utils';
import { SharedInput } from './ui';
import { register as registerUser } from '@/redux/auth/operations';
import { toast } from 'react-toastify';
import { SharedBtn } from './ui/SharedBtn';
import { FcGoogle } from 'react-icons/fc';

export interface RegisterUserInterface {
  name: string;
  email: string;
  password: string;
}
interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const Register = ({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) => {

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<RegisterFormInputs>({
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormInputs) => {

    const userData = Object.fromEntries(
      Object.entries(data).filter(([key]) => key !== 'confirmPassword')
    );
    // Submit data to API or perform other actions
    try {
      await registerUser(userData as RegisterUserInterface);

      toast.success('User registered successfully');
    } catch (error) {
      console.error(error);
    } finally {
    }
    onCloseModal();
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
          <button
            type="button"
            className={`flex gap-2.5 items-center justify-center w-[500px] h-[70px] bg-bgColor rounded-[20px]`}
          >
            <FcGoogle className="w-12 h-12" />
            Продовжити через Google
          </button>

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
