import { useState } from 'react';
import { SharedInput } from './ui';
import { validateEmail, validatePassword } from '@/utils';
import { toast } from 'react-toastify';

// import { useAppDispatch } from '@/hooks/hooks';
// import { register } from '@/redux/auth/operations';
// import {register} from '@/redux/auth/operations';

// interface UserData {
//   email: string;
//   password: string;
//   name: string;
//   'confirm password': string;
// }
export const Auth: React.FC = () => {
  // const [userData, setUserData] = useState<UserData | {}>();
  const [isValidData, setIsValidData] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);

  // const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    formData.forEach((value, key) => {
      formData.set(key, String(value).trim());
    });

    const data = Object.fromEntries(formData);

    const { email, password, 'confirm password': confirmPassword } = data;

    const emptyFields = Object.keys(data).filter(key => data[key] === '');

    if (emptyFields.length > 0) {
      emptyFields.forEach(field => {
        return toast.error(`${field} is required`);
      });
    } else if (!validateEmail(email as string)) {
      setIsValidData(false);

      return toast.error('Invalid email');
    } else if (!validatePassword(password as string)) {
      setIsValidData(true);

      return toast.error(
        'Password must be at least 8 characters, with uppercase, lowercase, digit, and special character.'
      );
    } else if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    } else {
      // setUserData({ name, email, password });
    }
  };
  // useEffect(() => {
  //   if (!userData) return;

  //   const regUser = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await await dispatch(register(userData));

  //       if (response) {
  //         return toast.success(
  //           `User ${response.user.name} registered successfully`
  //         );
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   regUser(userData);
  // }, [ userData]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col rounded-lg p-6 gap-8 bg-gray-50 w-[480px]"
    >
      <SharedInput id="name" label="name" name="name" />
      <SharedInput
        id="email"
        label="email"
        name="email"
        isValid={isValidData}
      />
      <SharedInput
        id="password"
        label="password"
        name="password"
        isValid={isValidData}
      />
      <SharedInput
        id="repeat password"
        label="repeat password"
        name="repeat password"
      />
      <button
        type="submit"
        className={`text-light bg-secondary rounded-lg py-2 hover:bg-warning focus:outline-none`}
      >
        Submit
      </button>
    </form>
  );
};
