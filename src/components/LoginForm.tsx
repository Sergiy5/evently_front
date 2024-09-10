import { useForm } from 'react-hook-form';
import { validateEmail, validatePassword } from '@/utils';
import { SharedInput } from './ui';
import { logIn as loginUser } from '@/redux/auth/operations';
import { toast } from 'react-toastify';
import { useState } from 'react';

export interface LoginUserInterface {
  email: string;
  password: string;
}

export const LoginForm = ({ onCloseModal }: { onCloseModal: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { isValid, errors },
  } = useForm<LoginUserInterface>({
    mode: 'onChange',
  });

  const onSubmit = async (data: LoginUserInterface) => {
    setIsLoading(true);

    try {
      await loginUser(data as LoginUserInterface);
      toast.success('User logged in successfully');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    onCloseModal();
  };

  return (
    <div>
      <h2>Увійти в акаунт</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col rounded-lg p-6 gap-8 bg-gray-50 w-[480px]"
      >
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
        <button
          type="submit"
          disabled={!isValid}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!isValid ? 'opacity-50' : ''}`}
        >
          Login
        </button>
      </form>
      {isLoading && <div>LOADING...</div>}
    </div>
  );
};
