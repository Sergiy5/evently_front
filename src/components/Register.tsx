import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from '@/utils';
import { SharedInput } from './ui';
import { register as registerUser } from '@/redux/auth/operations';
import { toast } from 'react-toastify';

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
    watch,
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
        <h1>Увійти в акаунт</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col rounded-lg gap-8 w-[500px]"
        >
          <SharedInput
            label="Name"
            placeholder="Ваше імʼя"
            id="name"
            autocomplete="name"
            type="text"
            register={register}
            validation={{ required: true }}
            errors={errors}
          />
          <SharedInput
            label="Email"
            id="email"
            autocomplete="email"
            type="email"
            register={register}
            validation={{ required: true, validate: validateEmail }}
            errors={errors}
          />
          <SharedInput
            label="Password"
            id="password"
            autocomplete="current-password"
            type="password"
            register={register}
            validation={{ required: true, validate: validatePassword }}
            errors={errors}
          />
          <SharedInput
            label="Confirm Password"
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
          <button
            type="submit"
            disabled={!isValid}
            className={`bg-buttonColor hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!isValid ? 'opacity-50' : ''}`}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};
