import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { validateEmail, validatePassword } from '@/utils';
import { SharedInput } from './ui';
// import { toast } from 'react-toastify';

interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterForm = ({
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

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = async (data: RegisterFormInputs) => {
    // Submit data to API or perform other actions
    onCloseModal();
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col rounded-lg p-6 gap-8 bg-gray-50 w-[480px]"
    >
      <SharedInput
        label="Name"
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
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!isValid ? 'opacity-50' : ''}`}
      >
        Register
      </button>
    </form>
  );
};

{
  /* <div className="mb-4">
  <label
    className="block text-gray-700 text-sm font-bold mb-2"
    htmlFor="name"
  >
    Name
  </label>
  <input
    type="text"
    id="name"
    className={`block w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
    {...register('name', { required: true })}
  />
  {errors.name && (
    <p className="text-red-500 text-xs">Name is required</p>
  )}
</div>

<div className="mb-4">
  <label
    className="block text-gray-700 text-sm font-bold mb-2"
    htmlFor="email"
  >
    Email
  </label>
  <input
    type="email"
    id="email"
    className={`block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
    {...register('email', { required: true, validate: validateEmail })}
  />
  {errors.email && <p className="text-red-500 text-xs">Invalid email</p>}
</div>

<div className="mb-4">
  <label
    className="block text-gray-700 text-sm font-bold mb-2"
    htmlFor="password"
  >
    Password
  </label>
  <input
    type={passwordVisible ? 'text' : 'password'}
    id="password"
    className={`block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
    {...register('password', {
      required: true,
      validate: validatePassword,
    })}
  />
  <button
    type="button"
    onClick={togglePasswordVisibility}
    className="text-gray-700 text-sm font-bold"
  >
    {passwordVisible ? 'Hide' : 'Show'}
  </button>
  {errors.password && (
    <p className="text-red-500 text-xs">Invalid password</p>
  )}
</div>

<div className="mb-4">
  <label
    className="block text-gray-700 text-sm font-bold mb-2"
    htmlFor="confirmPassword"
  >
    Confirm Password
  </label>
  <input
    type="password"
    id="confirmPassword"
    className={`block w-full p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
    {...register('confirmPassword', {
      required: true,
      validate: value => value === watch('password'),
    })}
  />
  {errors.confirmPassword && (
    <p className="text-red-500 text-xs">Passwords do not match</p>
  )}
</div> */
}
